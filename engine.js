import {beginUnitAction,recordFireEvent} from './fire-events.js';
import {commandState,commandCount,rollCommandBowl,discardCommandDie,closeCommandDiscard} from './command.js';
import {COMMAND_ABILITIES,getCommandAbility,getBoardAbilities,getCommandBoard} from './command-board.js';
import { commandOrderError, resolveCommandOrder, actionCommandBonus, commandDefenseBonus, consumeCommandAction, consumeRetainCommandEffect, expireCommandScope } from "./orders.js";
import { validateGameSave } from "./save-validation.js";
import { VERSION, B, TYPES, QUALITIES, SCENARIOS, WEAPONS, ARMOR, PROGRAMS, CATALOG } from "./data.js";
import { armyTemplate, validateArmy, buildArmyUnits, unitValue } from "./army.js";
import { boardOf, tableContains, arrangeDeployment, validateDeployment, inDeploymentZone } from "./table.js";
import { generateBattlefield, validateBattlefield, TERRAIN_RULES } from "./battlefields.js";
import { dist, mix, near, center, feature, sight, firePoint, inArc, footprint, inside, crosses, movementTerrain, exposureWindows, onBoard, edgeDistance, pointSegmentDistance, wholeBaseVisibleDuringMove } from "./geometry.js";
import { pool, raw, commandDice, withDice } from "./rolls.js";
const alive = (s) => s.units.filter((u) => !u.dead && !u.surrendered), living = (s) => alive(s).filter((u) => !u.offTable), unit = (s, id) => s.units.find((u) => u.id === id && !u.dead && !u.surrendered), isSquad = (u) => !!TYPES[u?.type]?.squad, commander = (u) => ["pc", "cc", "bc"].includes(u?.type), vehicle = (u) => ["vehicle", "drone"].includes(u?.type), armored = (u) => vehicle(u) || u?.type === "android" || ARMOR[u?.armor]?.powered;
const canShoot = (u) => !!u && !u.decoy && !commander(u) && !u.dead && !u.surrendered && !u.offTable && !u.abandoned && !u.limbered && !["suppressed", "routed"].includes(u.status);
const visibleUnits = (s, side) => [...living(s).filter((u) => u.side === side || !u.hidden).map((u) => u.camouflaged ? { ...u, type: "camouflage-marker", label: "Camouflaged contact", concealedContact: true, quality: u.side === side ? u.quality : "regular", prone: false, noFire: false, status: "ready" } : u), ...s.decoys.filter((d) => !d.revealed)];
function log(s, text, kind = "event", dice = null) {
  s.log.push({ n: s.actions, initiative: s.initiative, side: s.active, text, kind, dice });
  if (s.log.length > 300) s.log.shift();
}
const shuffle = (s, a) => {
  for (let i = a.length - 1; i > 0; i--) {
    s.seed = Math.imul(s.seed, 1664525) + 1013904223 >>> 0;
    const j = Math.floor(s.seed / 4294967296 * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
function newGame(options = {}) {
  const scenario = SCENARIOS[options.scenario] ? options.scenario : "crossroads", armies = (options.armies || [armyTemplate("athenian"), armyTemplate("dominion")]).map((a) => structuredClone(validateArmy(a))), s = { format: "kdwarf-operations", version: VERSION, scenario, options: { mode: "solo", difficulty: "normal", autoRoll: false, board: "athenian", ...options, armies }, seed: (options.seed ?? Date.now()) >>> 0, active: 0, initiative: 0, actions: 0, phase: "recon", deployment: false, winner: null, units: armies.flatMap((a, i) => buildArmyUnits(a, i)), terrain: [], smoke: [], static: [], repeaters: [], hazards: [], decoys: [], pending: null, firefight: null, programPending: null, combat: null, smokeChoice: null, pendingDice: null, lastRoll: null, lastFire: null, fireEvents:[],fireEventSerial:0,lastMoves: [], knownFeatures: [], log: [], morale: [{ cards: [], specials: [], fmr: 0, air: [] }, { cards: [], specials: [], fmr: 0, air: [] }], events: [], commands: [commandState(), commandState()], orderStack: [], orderWindow: null, effects: [], objectives: [], recon: { markers: [], deployment: [], supremacy: null, bids: [0, 0], turn: 0, passes: 0 }, history: [] };
  const map = options.battlefield ? validateBattlefield(structuredClone(options.battlefield)) : generateBattlefield({ seed: s.seed, style: scenario === "woods" ? "woodland" : "mixed", board: { shape: "square", width: 1300, height: 1300 }, name: SCENARIOS[scenario].name });
  s.options.battlefield = structuredClone(map);
  s.terrain = structuredClone(map.terrain).map((t) => ({ ...t, cover: t.cover ?? (TERRAIN_RULES[t.type]?.protection === "depression" ? 0 : 1) }));
  s.options.deployment = { blue: { edge: "west", depth: 25 }, red: { edge: "east", depth: 25 }, first: 0, concealment: "none", ...options.deployment };
  arrangeDeployment(s);
  for (const side of [0, 1]) s.morale[side].fmr = Math.max(1, s.units.filter((u) => u.side === side).reduce((n, u) => n + unitValue(u).fmr, 0));
  const specials = ["air", "mine", "heroism", "confusion", "ammunition", "breakdown"];
  s.deck = shuffle(s, [...Array(9).fill(1), ...Array(20).fill(2), ...Array(20).fill(4), ...Array(9).fill(5), ...specials.flatMap((k) => Array(2).fill(k))].map((value, i) => ({ id: "mc-" + i, value })));
  const counts = [0, 1].map((side) => living(s).filter((u) => u.side === side && u.type === "recon").length);
  s.recon.supremacy = counts[0] === counts[1] ? null : counts[0] > counts[1] ? 0 : 1;
  s.recon.turn = s.recon.supremacy ?? 0;
  const b = boardOf(s);
  for (const side of [0, 1]) for (let i = 0; i < counts[side]; i++) s.recon.markers.push({ id: `recon-${side}-${i}`, side, x: side ? b.width - 40 : 40, y: b.height * (i + 1) / (counts[side] + 1), locked: false });
  if (!s.recon.markers.length) s.phase = "deployment";
  log(s, "K-Dwarf command link established. Resolve reconnaissance, deploy your force, then begin the battle.");
  return s;
}
function checkVictory(s) {
  if (s.winner !== null) return;
  for (const side of [0, 1]) if (s.morale[side].cards.reduce((n, c) => n + c.value, 0) > s.morale[side].fmr) {
    s.winner = 1 - side;
    log(s, `${side ? "Red" : "Blue"} suffers strategic defeat: morale burden exceeds initial FMR.`, "victory");
    return;
  }
  if (s.phase === "battle") {
    const side = s.active, own = alive(s).filter((u) => u.side === side && !u.crewOf);
    if (!own.length) {
      s.winner = 1 - side;
      log(s, "Force eliminated.", "victory");
    }
  }
}
function drawMorale(s, side, why = "Morale event") {
  if (!s.deck.length) {
    checkVictory(s);
    return null;
  }
  const card = s.deck.pop();
  if (typeof card.value === "number") {
    s.morale[side].cards.push(card);
    log(s, `${side ? "Red" : "Blue"} draws a private Force Morale card: ${why}.`, "morale");
  } else if (["mine", "heroism"].includes(card.value)) {
    s.morale[side].specials.push(card);
    log(s, `${side ? "Red" : "Blue"} receives a private special morale card.`, "morale");
  } else if (card.value === "air") {
    s.morale[side].air.push({ ...card, due: s.initiative + 1 });
    log(s, `${side ? "Red" : "Blue"} has an Air Attack arriving at its next initiative.`, "morale");
  } else {
    s.events.push({ id: card.id, kind: "morale", card, side });
    log(s, `Special card: ${card.value}. ${side ? "Red" : "Blue"} must select an eligible enemy.`, "morale");
  }
  checkVictory(s);
  return card;
}
function expire(s) {
  s.smoke = s.smoke.filter((m) => m.expires !== s.initiative && !(m.untilSide === s.active && m.placed < s.initiative));
  s.static = s.static.filter((m) => m.expires !== s.initiative && !(m.untilSide === s.active && m.placed < s.initiative));
  for (const u of s.units) {
    u.noFire = u.noRally = u.noSkill = u.noCounterware = false;
    if (u.originalSide !== void 0 && u.markers.some((m) => m.kind === "possession" && (m.expires === s.initiative || m.untilSide === s.active && m.placed < s.initiative))) {
      u.side = u.originalSide;
      delete u.originalSide;
    }
    u.markers = u.markers.filter((m) => m.expires !== s.initiative && !(m.untilSide === s.active && m.placed < s.initiative));
  }
  s.effects = s.effects.filter((e) => !e.expired && !e.used);
}
function shift(s, why = "Initiative passes", {mandatory=false}={}) {
  if (s.winner !== null) return;
  const protect = !mandatory && consumeRetainCommandEffect(s, { side: s.active, kind: s.actionContext?.kind, ids: s.actionContext?.ids, scope: s.activeOrderScope });
  if (protect) {
    protect.used = true;
    log(s, "Command effect retains initiative: " + why);
    return;
  }
  s.active = 1 - s.active;
  startInitiative(s, why);
}
function startInitiative(s, why = "Battle begins") {
  s.initiative++;
  replaceCommanders(s);
  expire(s);
  s.commands[s.active].used = [];
  const own=living(s).filter(u=>u.side===s.active),c=s.commands[s.active];
  c.held??={};c.cycle??=0;c.discarded??=0;
  if(!c.initialized||!commandCount(c))rollCommandBowl(s,s.active);
  c.discardAvailable=true;
  log(s, `${why}. ${s.active ? "Red" : "Blue"} initiative ${s.initiative}.`, "initiative");
  for (const c of s.morale[s.active].air.filter((c2) => c2.due < s.initiative || c2.due === s.initiative)) s.events.push({ id: c.id, kind: "morale", card: c, side: s.active });
  s.morale[s.active].air = [];
  if (s.objectives.length && s.objectives.every((o) => o.owner === s.active)) {
    s.winner = s.active;
    log(s, "All objectives controlled at the beginning of initiative.", "victory");
  } else if (own.length && own.every((u) => ["suppressed", "routed"].includes(u.status))) {
    s.winner = 1 - s.active;
    log(s, "Domination: every deployed opposing unit is suppressed or routed.", "victory");
  }
  checkVictory(s);
}
function resolveReconBid(s, bids) {
  if (s.phase !== "recon" && s.phase !== "deployment") throw Error("Reconnaissance is already complete.");
  if (s.recon.supremacy !== null) return;
  for (const b of bids) if (!Number.isInteger(b) || b < 0 || b > 20) throw Error("Bid 0–20 morale cards.");
  s.recon.bids = [...bids];
  let winner;
  if (bids[0] !== bids[1]) {
    winner = bids[0] > bids[1] ? 0 : 1;
    s.recon.wager = { side: winner, count: bids[winner] };
  } else {
    drawMorale(s, 0, "Recon bid tie");
    drawMorale(s, 1, "Recon bid tie");
    let a, b;
    do {
      a = raw(s, 1, 12, { side: 0, label: "Recon supremacy roll-off" })[0];
      b = raw(s, 1, 12, { side: 1, label: "Recon supremacy roll-off" })[0];
    } while (a === b);
    winner = a > b ? 0 : 1;
  }
  s.recon.supremacy = winner;
  s.recon.turn = winner;
  log(s, `${winner ? "Red" : "Blue"} has reconnaissance supremacy.`);
}
function moveRecon(s, id, to, lock = false) {
  if (s.phase !== "recon") throw Error("Not in reconnaissance.");
  if (s.recon.supremacy === null) throw Error("Resolve recon supremacy first.");
  const u = s.recon.markers.find((u2) => u2.id === id);
  if (!u || u.side !== s.recon.turn || u.locked) throw Error("Choose an unlocked marker of the current recon side.");
  if (!tableContains(s, to, 32)) throw Error("Keep the marker on the table.");
  const route = movementTerrain(s, u, to);
  if (!route.ok) throw Error(route.reason);
  const friendly = s.recon.markers.filter((v) => v.side === u.side && v.id !== u.id);
  if (friendly.length && !friendly.some((v) => sight(s, { ...to, pointOnly: true }, { ...v, pointOnly: true }).clear)) throw Error("Maintain the friendly recon LOS chain.");
  const enemies = s.recon.markers.filter((v) => v.side !== u.side), cuts = [];
  for (let i = 0; i <= 100; i++) {
    const p = mix(u, to, i / 100);
    if (enemies.some((v) => sight(s, { ...p, pointOnly: true }, { ...v, pointOnly: true }).clear)) {
      cuts.push(i / 100);
      break;
    }
  }
  Object.assign(u, cuts.length ? mix(u, to, cuts[0]) : to);
  if (lock || cuts.length) {
    u.locked = true;
    for (const e of enemies) if (sight(s, { ...u, pointOnly: true }, { ...e, pointOnly: true }).clear) e.locked = true;
  }
  s.recon.turn = 1 - s.recon.turn;
  for (const side of [0, 1]) {
    const ms = s.recon.markers.filter((m) => m.side === side);
    if (!ms.length || ms.every((m) => m.locked)) {
      s.phase = "deployment-markers";
      s.recon.turn = s.recon.supremacy;
      break;
    }
  }
  log(s, "Recon marker moved" + (u.locked ? " and locked." : "."));
}
function finishRecon(s) {
  if (s.recon.supremacy === null) throw Error("Resolve supremacy first.");
  for (const m of s.recon.markers.filter((m2) => m2.side === s.recon.turn)) m.locked = true;
  s.phase = "deployment-markers";
  s.recon.turn = s.recon.supremacy;
}
function placeDeploymentMarker(s, side, to) {
  if (s.phase !== "deployment-markers") throw Error("Not placing deployment markers.");
  if (side !== s.recon.turn) throw Error("Alternate deployment markers.");
  const ms = s.recon.markers.filter((m) => m.side === side), edge = side === 0 ? "west" : "east", back = (m) => side === 0 ? to.x <= m.x : to.x >= m.x;
  if (!tableContains(s, to) || ms.length && !ms.some(back)) throw Error("Place the deployment marker behind a friendly recon marker.");
  const f = feature(s, to);
  if (!f && Math.min(to.x, boardOf(s).width - to.x) > B * 2) throw Error("Use cover behind the recon marker, or your table edge.");
  s.recon.deployment.push({ id: "objective-" + s.recon.deployment.length, side, x: to.x, y: to.y, owner: side });
  s.recon.turn = 1 - side;
  const quota = (i) => Math.max(1, s.recon.markers.filter((m) => m.side === i).length);
  if (s.recon.deployment.filter((m) => m.side === s.recon.turn).length >= quota(s.recon.turn)) s.recon.turn = side;
  if ([0, 1].every((i) => s.recon.deployment.filter((m) => m.side === i).length >= quota(i))) {
    s.phase = "deployment";
    s.deployment = true;
    s.active = s.recon.supremacy;
  }
  log(s, "Deployment marker placed.");
}
function deploymentMove(s, id, p) {
  const u = unit(s, id);
  if (s.phase !== "deployment" || !u || u.side !== s.active || u.offTable) throw Error("Deploy a friendly on-table stand.");
  if (!onBoard({ ...u, ...p }, s)) throw Error("Keep the stand on the table.");
  const b = boardOf(s), edge = u.side === 0 ? p.x < B * 2 : p.x > b.width - B * 2, markers = s.recon.deployment.filter((m) => m.side === u.side), recon2 = u.type === "recon" ? s.recon.markers.filter((m) => m.side === u.side) : [];
  if (!edge && ![...markers, ...recon2].some((m) => (u.side === 0 ? p.x <= m.x : p.x >= m.x) && dist(p, m) < B * 6 && feature(s, p))) throw Error("Deploy on your edge or in cover behind a deployment marker (recon may also use recon markers).");
  if (living(s).some((v) => v.id !== id && dist(v, p) < 27)) throw Error("Keep bases apart.");
  Object.assign(u, p);
}
function beginBattle(s) {
  if (!["deployment", "deployment-markers"].includes(s.phase)) throw Error("Finish recon before battle.");
  if (s.recon.supremacy === null) resolveReconBid(s, [0, 0]);
  s.objectives = s.recon.deployment.length ? structuredClone(s.recon.deployment) : [{ id: "obj-0", x: boardOf(s).width * 0.45, y: boardOf(s).height * 0.5, owner: null }, { id: "obj-1", x: boardOf(s).width * 0.7, y: boardOf(s).height * 0.5, owner: null }];
  s.phase = "battle";
  s.deployment = false;
  s.active = s.recon.supremacy;
  for (const side of [0, 1]) if (side !== s.recon.supremacy) drawMorale(s, side, "No recon supremacy");
  if (s.recon.wager) for (let i = 0; i < s.recon.wager.count; i++) drawMorale(s, s.recon.wager.side, "Recon wager");
  for (const u of living(s)) {
    if (u.camouflaged) {
      if (!u.specialOps) throw Error("Only special operators may deploy camouflaged.");
      const b = boardOf(s);
      camouflage(s, u, { x: Math.min(b.width - 20, Math.max(20, u.x + (u.side ? -48 : 48))), y: u.y }, true);
    }
    if (u.type === "hacker") s.repeaters.push({ id: "rep-" + u.id, side: u.side, x: u.x + 24, y: u.y });
  }
  startInitiative(s);
}
function available(s, allowCombat = false) {
  if (s.combat && !allowCombat) throw Error("Resolve melee or add another infantry charger.");
  if (s.routQueue?.length) throw Error("Resolve compulsory routs first.");
  if (s.phase !== "battle" || s.winner !== null || s.pending || s.firefight || s.programPending || s.smokeChoice || s.events.length || s.orderWindow) throw Error("Resolve the current phase or pending decision first.");
}
function canMove(s, u, end, kind = "move") {
  if (!u || u.dead || u.surrendered || u.offTable) return "Choose a deployed stand.";
  if(u.decoy&&kind==="assault")return "Decoys cannot assault or attack.";
  if (u.type === "indirect" && u.permanent && kind !== "pivot") return "A permanent battery cannot move from its firing position.";
  if (u.towed && kind !== "pivot") return "A towed weapon moves with its limbered vehicle; it may only pivot when unlimbered.";
  if (u.status !== "ready" && kind !== "prone") return "Rally this stand before moving.";
  if (u.prone && !["stand", "prone"].includes(kind)) return "Stand up before moving.";
  if (!onBoard({ ...u, ...end }, s)) return "Keep the base inside the table.";
  if (["pivot", "stand", "prone"].includes(kind)) return null;
  if (kind === "retreat") {
    if (vehicle(u) || u.type === "android") return "This unit cannot withdraw.";
    const f2 = feature(s, u);
    if (!f2 || !footprint(u).every(([x, y]) => inside({ x, y }, f2.points))) return "Withdraw from wholly inside a terrain feature.";
    const a = Math.atan2(end.y - u.y, end.x - u.x) * 180 / Math.PI, delta = (a - u.facing + 540) % 360 - 180;
    if (Math.abs(delta) < 90) return "Withdraw into the rear 180°.";
  }
  for (const h of s.hazards || []) {
    if (pointSegmentDistance(h, u, end) > h.radius + B / 2) continue;
    if (h.kind === "barrier" && vehicle(u)) return "An intact barrier blocks vehicles; clear it with an engineer.";
    if (h.kind === "wire" && !vehicle(u) && dist(u, h) > h.radius + B / 2 && dist(end, h) > h.radius + B / 2) return "Stop at the barbed wire on contact, then cross in a new move.";
  }
  const terrain = movementTerrain(s, u, end);
  if (!terrain.ok) return terrain.reason;
  const f = feature(s, end);
  if (f && !commander(u) && living(s).filter((v) => v.id !== u.id && !commander(v) && v.side === u.side && feature(s, v)?.id === f.id).length >= f.capacity) return "Terrain capacity reached.";
  if (living(s).some((v) => v.id !== u.id && v.side === u.side && edgeDistance(v, { ...u, ...end }) < 0.1)) return "Bases may not overlap at the endpoint.";
  if (kind !== "assault" && living(s).some((v) => v.side !== u.side && !v.hidden && edgeDistance(v, { ...u, ...end }) < 0.1)) return "Use Melee to enter contact.";
  return null;
}
function previewMovement(s, ids, to, { kind = "move", destinations = {} } = {}) {
  try {
    const us = ids.map((id) => contact(s, id));
    if (!us.length || us.some((u) => !u || u.side !== s.active)) throw Error("Choose your own stands.");
    if (us.length > 1) {
      const troops = us.filter((u) => !commander(u));
      if (troops.some((u) => u.platoon !== troops[0].platoon) || us.some((u) => commander(u) && troops.some((t) => !ownCommand(s, u, t)))) throw Error("Group movement requires one platoon.");
      if (us.some((a) => us.some((b) => a !== b && !sight(s, a, b).clear))) throw Error("Group members must see each other.");
    }
    const moves = us.map((u) => {
      const end = destinations[u.id] || { x: to.x + u.x - us[0].x, y: to.y + u.y - us[0].y }, facing = dist(u, end) > 0.01 ? Math.atan2(end.y - u.y, end.x - u.x) * 180 / Math.PI : u.facing, error = canMove(s, u, { ...u, ...end, facing }, kind);
      if (error) throw Error(u.id + ": " + error);
      return { id: u.id, from: { x: u.x, y: u.y, facing: u.facing }, to: { ...end, facing } };
    });
    if (moves.length > 1) {
      const seen = /* @__PURE__ */ new Set([moves[0].id]);
      while (true) {
        const before = seen.size;
        for (const m of moves) if (!seen.has(m.id) && moves.some((n) => seen.has(n.id) && sight(s, { ...contact(s, m.id), ...m.to }, { ...contact(s, n.id), ...n.to }).clear)) seen.add(m.id);
        if (seen.size === before) break;
      }
      if (seen.size !== moves.length) throw Error("Group endpoints must form an unbroken LOS chain.");
    }
    return { moves };
  } catch (e) {
    return { error: e.message };
  }
}
function beginMove(s, ids, to, options = {}) {
  available(s, options.kind === "assault");
  if (s.combat && options.kind !== "assault") throw Error("Resolve melee before ordinary movement.");
  const plan = previewMovement(s, ids, to, options);
  if (plan.error) throw Error(plan.error);
  if (options.kind === "assault") {
    const enemy = unit(s, options.target);
    if (!enemy || enemy.side === s.active || enemy.hidden || enemy.camouflaged) throw Error("Discover a deployed enemy before charging it.");
    const units = ids.map((id) => contact(s, id));
    if (units.some((u) => vehicle(u) || ["heavy", "indirect", "hmg"].includes(u.type))) throw Error("Only infantry may initiate melee.");
    if (units.some(commander) && !units.some((u) => !commander(u))) throw Error("Commanders need assisting subordinate infantry to charge.");
  }
  beginUnitAction(s,ids);
  s.actions++;
  s.pending = { side: s.active, moves: plan.moves, index: 0, kind: options.kind || "move", target: options.target || null, reacted: false, reactors:[],progress:0, shift: false };
  advanceMovement(s);
}
function reactionWindows(s, f, shooting = true) {
  const p=s.pending;if(!p||p.reactors?.includes(f.id))return[];
  const m=p.moves[p.index],u=contact(s,m.id),initial=feature(s,m.from)?.id;
  if(!u)return[];
  const windows=exposureWindows(s,f,{...u,...m.from,facing:m.to.facing},m.to,t=>(p.kind!=="retreat"||feature(s,t)?.id!==initial)&&(shooting?!fireEligibility(s,f,t,{reactive:true}):sight(s,f,t).clear));
  return windows.filter(([lo,hi])=>hi>=(p.progress||0)).map(([lo,hi])=>[Math.max(lo,p.progress||0),hi]);
}
function reactionCandidates(s){
  if(!s.pending)return[];
  return living(s).filter(f=>f.side!==s.pending.side&&!['suppressed','routed'].includes(f.status)&&!s.pending.reactors?.includes(f.id)).flatMap(f=>{const windows=reactionWindows(s,f,false);return windows.length?[{id:f.id,windows}]:[];});
}
function reactionOptions(s) {
  if(!s.pending)return[];
  return living(s).filter(f=>f.side!==s.pending.side&&canShoot(f)&&!f.noFire).flatMap(f=>{const windows=reactionWindows(s,f);return windows.length?[{id:f.id,windows}]:[];});
}
function reactionPoint(s,ids,t){
  const p=s.pending;if(!p||!Number.isFinite(t)||t<(p.progress||0)||t>1)throw Error('Choose a point on the remaining movement route.');
  if(!ids.length||new Set(ids).size!==ids.length||ids.some(id=>p.reactors?.includes(id)))throw Error('Each reacting unit may participate only once during this move.');
  const m=p.moves[p.index],u=contact(s,m.id),at={...u,...mix(m.from,m.to,t),facing:m.to.facing};
  for(const id of ids){const f=unit(s,id);if(!f||f.side===p.side||['suppressed','routed'].includes(f.status)||!sight(s,f,at).clear||(p.kind==='retreat'&&feature(s,at)?.id===feature(s,m.from)?.id))throw Error('The reacting unit must see the mover at this route point.');}
  return{p,m,u,at};
}
function finishMover(s, t = 1) {
  const p = s.pending, m = p.moves[p.index], u = contact(s, m.id);
  if (u) {
    if(!u.decoy)resolveMovementHazards(s, u, m.from, mix(m.from, m.to, t), p);
    Object.assign(u, mix(m.from, m.to, t));
    u.facing = m.to.facing;
    for (const cargo of s.units.filter((v) => v.transportId === u.id || v.towId === u.id || v.id === u.crew)) {
      cargo.x = u.x;
      cargo.y = u.y;
    }
    if (p.kind === "stand") u.prone = false;
    u.hidden = false;
    s.lastMoves = [...s.lastMoves.filter((m2) => m2.id !== u.id), { id: u.id, from: m.from, to: { x: u.x, y: u.y }, initiative: s.initiative }].slice(-16);
    const f = feature(s, u);
    if (!u.decoy&&f) for (const e of living(s).filter((v) => v.hidden && v.side !== u.side && feature(s, v)?.id === f.id)) e.hidden = false;
    for (const o of (u.decoy?[]:s.objectives)) if (dist(u, o) < B) {
      if (o.owner !== null && o.owner !== u.side) drawMorale(s, o.owner, "Objective captured");
      o.owner = u.side;
    }
    log(s, `${u.label} completes movement.`);
  }
  p.index++;
  p.reacted = false;p.reactors=[];p.progress=0;
}
function advanceMovement(s) {
  while (s.pending && s.pending.index < s.pending.moves.length) {
    if (!s.pending.reacted && reactionCandidates(s).length) return;
    finishMover(s);
  }
  if (!s.pending) return;
  const p = s.pending;
  s.pending = null;
  if (p.kind === "rout") {
    completeRout(s, contact(s, p.routId));
    checkVictory(s);
    return;
  }
  if (p.kind === "assault") {
    const target = unit(s, p.target), as = p.moves.map((m) => contact(s, m.id)).filter((u) => u && u.status === "ready" && target && (edgeDistance(u, target) < 2 || feature(s, target)?.type === "building" && feature(s, u)?.id === feature(s, target)?.id));
    if (as.length && target) {
      const ds = living(s).filter((u) => u.side !== p.side && (u.id === target.id || feature(s, target)?.type === "building" && feature(s, u)?.id === feature(s, target)?.id));
      s.combat = { side: p.side, target: target.id, attackers: [.../* @__PURE__ */ new Set([...s.combat?.attackers || [], ...as.map((u) => u.id)])], defenders: ds.map((u) => u.id), origins: { ...s.combat?.origins || {}, ...Object.fromEntries(p.moves.map((m) => [m.id, m.from])) } };
    }
  }
  if (p.shift) shift(s, "Movement stopped by suppression or worse");
  checkVictory(s);
}
function declineReaction(s) {
  if (!s.pending) throw Error("No movement reaction.");
  s.pending.reacted = true;
  finishMover(s);
  advanceMovement(s);
}
function assaultDestination(s,a,t){
 if(feature(s,t)?.type==='building')return center(feature(s,t));
 const angle=Math.atan2(a.y-t.y,a.x-t.x),dx=Math.cos(angle),dy=Math.sin(angle);let lo=0,hi=B*2;
 for(let i=0;i<48;i++){const d=(lo+hi)/2,p={...a,x:t.x+dx*d,y:t.y+dy*d};p.facing=Math.atan2(p.y-a.y,p.x-a.x)*180/Math.PI;if(edgeDistance(p,t)>.75)hi=d;else lo=d;}
 return{x:t.x+dx*hi,y:t.y+dy*hi};
}
function hug(s, id) {
  available(s);
  const u = unit(s, id);
  if (!u || u.side !== s.active || vehicle(u) || ["suppressed", "routed"].includes(u.status) || u.prone) throw Error("Choose eligible stationary infantry.");
  if (feature(s, u)?.cover) throw Error("This terrain already gives cover.");
  beginUnitAction(s,[u.id]);
  reveal(s, u);
  u.prone = true;
  s.actions++;
  log(s, u.id + " goes prone.");
}
function ownCommand(s, c, u) {
  return c.side === u.side && (c.type === "bc" || c.type === "cc" && c.company === u.company || c.type === "pc" && c.platoon === u.platoon);
}
function commandBonus(s, u, kind = "rally") {
  return Math.max(0, ...living(s).filter((c) => commander(c) && c.id !== u.id && c.status !== "suppressed" && ownCommand(s, c, u) && sight(s, c, u).clear && (kind !== "melee" || s.combat && [...s.combat.attackers, ...s.combat.defenders].includes(c.id))).map((c) => c.type === "pc" ? 1 : c.type === "cc" ? 2 : 3));
}
function marked(u, key) {
  return u.markers?.some((m) => m.kind === key);
}
function fireEligibility(s, f, t, { reactive = false, mode = "single" } = {}) {
  if (!canShoot(f)) return "This stand cannot shoot.";
  if (!t || t.decoy || t.dead || t.surrendered || t.offTable || t.side === f.side) return "Choose a deployed enemy.";
  const fw = WEAPONS[f.weapon], ff = feature(s, f), tf = feature(s, t);
  if (fw?.meleeOrBothWhollyInTerrainDice === 0 && ff && tf && footprint(f).every(([x, y]) => inside({ x, y }, ff.points)) && footprint(t).every(([x, y]) => inside({ x, y }, tf.points))) return "This weapon cannot fire with both units wholly within terrain.";
  if (t.hidden || t.camouflaged) return "Discover this contact or recon its terrain before attacking.";
  if (reactive && f.noFire) return "NO FIRE for the remainder of this initiative.";
  if (s.combat && [...s.combat.attackers, ...s.combat.defenders].includes(f.id)) return "This stand is engaged in melee.";
  if (feature(s, t)?.type === "depression" && feature(s, f)?.type !== "hill") return "Depression protects this target unless the firer is on a hill.";
  const los = sight(s, f, t, { direct: true });
  if (!los.clear) return los.reason;
  if (mode !== "single" && (marked(f, "isolation") || inStatic(s, f))) return "Isolation/static prevents coordinated fire.";
  return null;
}
function nearestTargets(s, f) {
  const targets = living(s).filter((t) => t.side !== f.side && !t.hidden && !t.camouflaged && !fireEligibility(s, f, t));
  if (!targets.length) return [];
  const nearest = Math.min(...targets.map((t) => dist(f, t)));
  return targets.filter((t) => dist(f, t) <= nearest + 1e-6);
}
function fireSet(s, ids, targetId, mode = "single", reactive = false) {
  const fs = ids.map((id) => unit(s, id)), t = unit(s, targetId);
  if (!fs.length || fs.some((f) => !f) || !t) return { error: "Choose firing stands and an enemy." };
  if (new Set(ids).size !== ids.length) return { error: "A stand cannot fire twice in one pool." };
  if (mode === "single" && fs.length !== 1) return { error: "Single fire uses one stand." };
  if (mode !== "single" && fs.length < 2) return { error: "Choose two or more stands for coordinated fire." };
  if (fs.some((f) => f.side !== fs[0].side || f.platoon !== fs[0].platoon)) return { error: "Coordinated fire requires one platoon." };
  for (const f of fs) {
    const error = fireEligibility(s, f, t, { reactive, mode });
    if (error) return { error: f.id + ": " + error };
  }
  if (mode === "group" && fs.some((a) => fs.some((b) => a !== b && !sight(s, a, b).clear))) return { error: "Group firers must have mutual LOS." };
  if (mode === "crossfire") {
    const pc = living(s).find((c) => c.side === fs[0].side && c.type === "pc" && c.platoon === fs[0].platoon && c.status !== "suppressed");
    if (!pc || !sight(s, pc, t).clear || fs.some((f) => !sight(s, f, pc).clear)) return { error: "Command Fire requires a PC seeing the target and every firer." };
  }
  return { firers: fs, target: t, reference: fs[0] };
}
function firingProfile(s, f, t, { reactive = false, melee = false, indirect = false, weapon = f.weapon, fireType = "normal", recon: recon2 = false } = {}) {
  const w = WEAPONS[weapon] || WEAPONS.rifle, a = ARMOR[t.armor] || ARMOR.none, ft = feature(s, f), tt = feature(s, t), both = ft && tt && footprint(f).every(([x, y]) => inside({ x, y }, ft.points)) && footprint(t).every(([x, y]) => inside({ x, y }, tt.points)), close = melee || both, reasons = [], add = (n, why) => {
    if (n) reasons.push({ n, why });
  };
  let source = w.normalDice || 4;
  add(w.normalAdvantage || 0, "weapon");
  if (vehicle(t)) source = w.normalVsVehicleDice ?? source;
  if (!armored(t)) add(w.normalVsInfantryAdvantage || 0, "anti-infantry");
  if (armored(t)) add(w.vsAndroidPowerArmorVehicleAdvantage || 0, "penetration");
  if (close) {
    source = w.meleeOrBothWhollyInTerrainDice ?? source;
    if (!armored(t)) {
      source = w.meleeOrBothWhollyInTerrainVsInfantryDice ?? source;
      add(w.meleeOrBothWhollyInTerrainVsInfantryAdvantage || 0, "close weapon");
    }
    add(w.meleeOrBothWhollyInTerrainAdvantage || 0, "close weapon");
    if (ft?.type === "building" && tt?.type === "building") {
      source = w.bothWhollyInBuildingVsInfantryDice ?? source;
      add(w.bothWhollyInBuildingVsInfantryAdvantage || 0, "inside structure");
    }
  }
  if (fireType === "he" && !armored(t)) {
    source = w.heavyExplosiveVsInfantryDice ?? source;
    add(w.heavyExplosiveAdvantage || 0, "HE");
  }
  if (fireType === "penetrating" && armored(t)) {
    source = w.penetratingVsVehicleDice ?? source;
    add(w.penetratingAdvantage || 0, "penetrating");
  }
  if (fireType === "incendiary") {
    source = w.incendiaryDice ?? source;
    add(w.incendiaryAdvantage || 0, "incendiary");
  }
  const count = Math.max(0, Math.min(3, source));
  add(Math.max(0, source - 4), "weapon profile conversion");
  if (!melee) {
    const cover = tt?.cover ?? (tt && TERRAIN_RULES[tt.type]?.protection !== "depression" ? 1 : 0);
    if (!(indirect && tt && TERRAIN_RULES[tt.type]?.protection === "direct")) add(-cover, "cover");
    if (t.prone) add(reactive ? -2 : -1, "prone target");
    if(reactive&&s.pending?.moves[s.pending.index]?.id===t.id){const m=s.pending.moves[s.pending.index];if(!wholeBaseVisibleDuringMove(s,f,t,m.from,m.to))add(-1,'fleeting narrow-gap target');}
    const arc = vehicle(f) ? f.turret ? 90 : 45 : ["hmg", "heavy", "indirect"].includes(f.type) ? 45 : 90;
    if (!inArc(s, f, t, arc)) add(-1, "outside firing arc");
    if (!reactive && !w.ignoresTargetProximity && !nearestTargets(s, f).some((u) => u.id === t.id)) add(-1, "farther target");
    if (vehicle(t) && living(s).some((u) => u.side !== f.side && !armored(u) && !fireEligibility(s, f, u))) add(-1, "infantry priority");
    if (!armored(t) && w.vsAndroidPowerArmorVehicleAdvantage && living(s).some((u) => u.side !== f.side && vehicle(u) && !fireEligibility(s, f, u))) add(-1, "vehicle priority");
    if (a.referencedWeaponKeywords.includes("all") || a.referencedWeaponKeywords.includes(f.weaponType)) add(1, "armor vulnerability");
    add(-a.incomingDisadvantage, "powered armor");
    if (["vehicle", "drone", "android"].includes(t.type)) {
      const angle = Math.atan2(f.y - t.y, f.x - t.x) * 180 / Math.PI, delta = Math.abs((angle - t.facing + 540) % 360 - 180), face = indirect ? "top" : delta < 45 ? "front" : delta > 135 ? "rear" : "sides";
      add(-(t.armorFaces[face] ?? t.armorFaces.rear ?? 0), face + " armor");
    }
    if (f.weaponType === "explosive") add(1, "explosive");
    if (f.weaponType === "antimatter") add(2, "antimatter");
    if (recon2) add(-2, "recon by fire");
  } else {
    add(a.meleeAdvantage, "powered melee");
    add(commandBonus(s, f, "melee"), "commander in melee");
    if (s.smoke.some((m) => inside(f, m.radius ? Array.from({ length: 32 }, (_, i) => [m.x + Math.cos(i * Math.PI / 16) * m.radius, m.y + Math.sin(i * Math.PI / 16) * m.radius]) : []))) add(-1, "smoke in melee");
  }
  if (marked(f, "isolation")) add(-1, "isolation");
  if (marked(f, "assist")) add(1, "Assist program");
  if (f.hidden && reactive && ft && ft.id === tt?.id) add(1, "ambush");
  const command = actionBonus(s, f, melee ? "melee" : "shoot");
  if (s.firefight?.mode !== "crossfire") command.adv -= command.effects.filter((e) => e.commandFire).reduce((n, e) => n + (e.adv || 0), 0);
  add(command.adv, "Command Order");
  const defense = commandDefenseBonus(s, t, { cover: tt?.cover ?? (tt ? 1 : 0), kind: melee ? "melee" : "shoot", scope: s.activeOrderScope });
  add(defense.coverReduction, "Bad Cover");
  add(-defense.dis, "Command protection");
  return { count, modifier: command.modifier, adv: reasons.filter((v) => v.n > 0).reduce((n, v) => n + v.n, 0), dis: -reasons.filter((v) => v.n < 0).reduce((n, v) => n + v.n, 0), reasons, weapon: w };
}
const diceCount = (s, f, t, opts = {}) => firingProfile(s, f, t, opts).count;
function kill(s, t, why = "Destroyed") {
  if (t.dead || t.surrendered) return;
  t.dead = true;
  t.offTable = true;
  if (t.crewOf) {
    const gun = unit(s, t.crewOf);
    if (gun) gun.abandoned = true;
  }
  if (commander(t)) {
    s.commandLosses ??= [];
    s.commandLosses.push(t.id);
  }
  drawMorale(s, t.side, why);
  log(s, t.id + " " + why + ".");
  if (t.crew) {
    const crew = unit(s, t.crew);
    if (crew) {
      crew.offTable = false;
      crew.reserve = false;
      crew.x = t.x;
      crew.y = t.y;
    }
  }
}
function applyHits(s, t, hits, { moving = false, terrifying = false } = {}) {
  let n = Math.min(4, hits);
  if (terrifying && n < 4) n++;
  if (t.abandoned && n < 4) return "abandoned weapon unaffected";
  if (t.transportId && hits >= 3) {
    t.offTable = false;
    t.transportId = null;
  }
  if (t.status === "routed" && moving && n >= 1) {
    t.surrendered = true;
    t.offTable = true;
    if (commander(t)) {
      s.commandLosses ??= [];
      s.commandLosses.push(t.id);
    }
    drawMorale(s, t.side, "Unit surrendered");
    return "surrendered";
  }
  if (n >= 4) {
    const medic = living(s).find((u) => u.side === t.side && u.id !== t.id && u.type === "medic" && u.status !== "suppressed" && edgeDistance(u, t) < 1);
    if (medic && !vehicle(t) && t.type !== "android") {
      beginUnitAction(s,[medic.id]);
      const save = pool(s, medic, { adv: 1, label: "Medic emergency recovery" });
      if (save.successes) {
        routeUnit(s, t);
        return "routed (medic saved destruction)";
      }
    }
    kill(s, t);
    return "destroyed";
  }
  if (n === 3) {
    if (["android", "drone"].includes(t.type)) {
      t.status = "suppressed";
      t.prone = t.type === "android";
      return "suppressed (cannot rout)";
    }
    routeUnit(s, t);
    return "routed";
  }
  if (n === 2) {
    if (t.status !== "routed") t.status = "suppressed";
    if (!vehicle(t)) t.prone = true;
    return "suppressed";
  }
  if (n === 1) {
    if (t.status === "ready") t.status = "pinned";
    return "pinned";
  }
  return "no effect";
}
function routeUnit(s, t) {
  if (["android", "drone"].includes(t.type)) {
    t.status = "suppressed";
    return;
  }
  if (t.crew) {
    const crew = unit(s, t.crew);
    t.abandoned = true;
    t.status = "ready";
    if (crew) {
      crew.x = t.x;
      crew.y = t.y;
      crew.offTable = false;
      routeUnit(s, crew);
    }
    return;
  }
  t.status = "routed";
  t.prone = true;
  s.routQueue ??= [];
  if (!s.routQueue.includes(t.id)) s.routQueue.push(t.id);
}
function resolveRout(s, id) {
  if (!s.routQueue?.includes(id) || s.pending) throw Error("No compulsory rout is ready.");
  const u = unit(s, id);
  if (!u) {
    s.routQueue = s.routQueue.filter((v) => v !== id);
    return;
  }
  beginUnitAction(s,[u.id]);
  const behind = s.terrain.filter((t) => u.side === 0 ? center(t).x < u.x : center(t).x > u.x).sort((a, b) => dist(u, center(a)) - dist(u, center(b))), to = behind.map(center).find((p) => tableContains(s, p, 16) && movementTerrain(s, u, p).ok) || { x: u.side ? boardOf(s).width - 24 : 24, y: u.y };
  s.routQueue = s.routQueue.filter((v) => v !== id);
  s.pending = { side: u.side, moves: [{ id: u.id, from: { x: u.x, y: u.y, facing: u.facing }, to: { ...to, facing: u.facing } }], index: 0, kind: "rout", routId: id, reacted: false, shift: false };
  advanceMovement(s);
}
function completeRout(s, u) {
  if (!u || u.dead || u.surrendered) return;
  const r = pool(s, u, { label: "Compulsory rout rally" });
  u.status = "suppressed";
  if (!r.successes) {
    u.offTable = true;
    u.reserve = true;
    drawMorale(s, u.side, "Failed compulsory rally");
  }
  log(s, `${u.id} ${u.offTable ? "returns to reserves; rally before redeployment" : "halts in cover, still Suppressed"}.`);
  if(r.successes<2&&s.active===u.side)shift(s,"Compulsory rally scored fewer than two successes",{mandatory:true});
}
function shots(s, fs, t, opts = {}) {
  return fs.flatMap((f) => {
    let weapons = opts.reactive || !armored(f) ? [opts.weapon || f.weapon] : [f.weapon, ...f.extraWeapons || []];
    if (actionBonus(s, f, opts.melee ? "melee" : "shoot").double) weapons = weapons.flatMap((w) => [w, w]);
    return weapons.flatMap((weapon) => {
      const profile = firingProfile(s, f, t, { ...opts, weapon });
      if (!profile.count) return [];
      const result = pool(s, f, { ...profile, label: opts.melee ? "Melee" : opts.recon ? "Recon by fire" : opts.indirect ? "Indirect fire" : opts.reactive ? "Reactive fire" : "Shooting" }), w = profile.weapon, promote = opts.fireType === "incendiary" ? w.incendiaryCategoryPromotion : w.categoryPromotion, hits = Math.min(result.explosions.length ? 4 : 3, result.successes + (promote && result.successes <= Object.keys(promote).length - 1 ? 1 : 0));
      return { f, t, result, hits, fireMode:opts.fireMode||(opts.indirect?"indirect":opts.reactive?"reactive":"single"), from: sight(s, f, t).from || firePoint(s, f), to: sight(s, f, t).to || firePoint(s, t), terrifying: !!promote };
    });
  });
}
function applyShots(s, all, { reactive = false, moving = false, indirect = false } = {}) {
  let best = 0;
  s.lastFire = { action: s.actions, initiative: s.initiative, reactive, shots: [] };
  for (const { f, t, result, hits, from, to, terrifying,fireMode } of all) {
    reveal(s, f);
    t.profileKnown = true;
    const outcome = t.dead || t.surrendered ? "target already removed" : applyHits(s, t, hits, { moving, terrifying: false });
    for (const passenger of (all[0]?.result.label==="Melee"?[]:s.units.filter((v) => v.transportId === t.id && !v.dead && !v.surrendered))) applyHits(s, passenger, hits, { moving });
    if (reactive && hits < 2) f.noFire = true;
    best = Math.max(best, hits);
    if(result.label!=="Melee")recordFireEvent(s,{firerId:f.id,targetId:t.id,side:f.side,from,to,result:outcome,mode:fireMode||(indirect?'indirect':'single')});
    s.lastFire.shots.push({ firerId: f.id, targetId: t.id, side: f.side, from, to, dice: result.kept, result: outcome, concealed: false, pool: result });
    log(s, `${f.id} → ${t.id}: ${result.successes} successes · ${outcome}.`, "fire", result.kept);
    if (terrifying && !t.terrified) {
      t.terrified = true;
      drawMorale(s, t.side, "First terrifying attack");
    }
    if (indirect && hits >= 3 || s.effects.some((e) => e.terrifying && e.side === f.side && !e.used) && (t.dead || t.surrendered)) for (const v of living(s).filter((v2) => v2.id !== t.id && sight(s, t, v2).clear)) applyHits(s, v, v.status === "suppressed" ? 3 : 2);
  }
  consumeCommandAction(s, { kind: all[0]?.result.label === "Melee" ? "melee" : "shoot", actors: all.map((v) => v.f), targets: all.map((v) => v.t), scope: s.activeOrderScope });
  checkVictory(s);
  return best;
}
function directFire(s, ids, target, mode = "single", options = {}) {
  available(s);
  if (s.combat) throw Error("Resolve melee first.");
  const fs = fireSet(s, ids, target, mode);
  if (fs.error) throw Error(fs.error);
  if (fs.firers.some((f) => f.side !== s.active)) throw Error("Use active-side firers.");
  beginUnitAction(s,ids);
  for (const f of fs.firers) reveal(s, f);
  s.firefight = { side: s.active, ids: [...ids], target, mode, options, round: 0 };
  log(s, "Shooting declared. Opponent may react with fire, movement, rally, skill, or pass.");
}
function resolveFirefight(s, { ids = [], mode = "single", decline = false } = {}) {
  const p = s.firefight;
  if (!p) throw Error("No shooting reaction is pending.");
  const as = p.ids.map((id) => unit(s, id)).filter(Boolean), target = unit(s, p.target);
  if (!as.length || !target) {
    s.firefight = null;
    return;
  }
  let ds = [];
  if (!decline && ids.length) {
    const def = fireSet(s, ids, as[0].id, mode, true);
    if (def.error) throw Error(def.error);
    ds = def.firers;
    if (ds.some((u) => u.side === p.side)) throw Error("Choose reactive enemy firers.");
  }
  beginUnitAction(s,ds.map(u=>u.id));
  s.actions++;
  let aBest = 0, dBest = 0, round = 0;
  do {
    if (++round > 150) throw Error("Firefight failed to resolve.");
    const legal = as.filter((f) => !fireEligibility(s, f, target));
    const a = shots(s, legal, target, {...p.options,fireMode:p.mode}), d = ds.length ? shots(s, ds, as[0], { reactive: true,fireMode:mode==="single"?"reactive":mode }) : [];
    aBest = applyShots(s, a);
    dBest = d.length ? applyShots(s, d, { reactive: true }) : 0;
    if (!ds.length || aBest >= 2 || dBest >= 2) break;
  } while (true);
  s.firefight = null;
  const winner = ds.length && dBest >= 2 && (aBest < 2 || dBest >= aBest) ? 1 - p.side : aBest >= 2 ? p.side : 1 - p.side;
  if (s.active !== winner) shift(s, "Shooting outcome");
  else log(s, "Shooting retains initiative.");
  checkVictory(s);
}
function react(s, ids, t = 0.5, mode = "single") {
  const {p,m,u,at}=reactionPoint(s,ids,t),before={x:u.x,y:u.y,facing:u.facing};
  Object.assign(u,at);
  const legal=fireSet(s,ids,u.id,mode,true);
  if(legal.error){Object.assign(u,before);throw Error(legal.error);}
  beginUnitAction(s,ids);
  const all=shots(s,legal.firers,u,{reactive:true,fireMode:mode==="single"?"reactive":mode}),best=applyShots(s,all,{reactive:true,moving:true});
  p.reactors??=[];p.reactors.push(...ids);p.progress=t;
  if(best>=2||u.surrendered||u.dead)p.shift=true;
  if(best>=1||u.surrendered||u.dead)finishMover(s,t);
  advanceMovement(s);
}
function rallyInfo(s, u) {
  return { die: QUALITIES[u.quality].die, adv: commandBonus(s, u), target: 4 };
}
function rally(s, id, { automatic = false, reactive = false } = {}) {
  if (!reactive) available(s);
  const u = unit(s, id);
  if (!u || !["pinned", "suppressed", "routed"].includes(u.status) || !reactive && u.side !== s.active) throw Error("Choose an eligible pinned/suppressed stand.");
  if (["android", "drone"].includes(u.type) || u.breakdown) throw Error("Use engineer/hacker recovery for this unit.");
  beginUnitAction(s,[u.id]);
  reveal(s, u);
  s.actions++;
  if (automatic) {
    u.status = "ready";
    drawMorale(s, u.side, "Automatic rally");
    log(s, u.id + " automatically rallies at a morale cost.");
    return;
  }
  const r = pool(s, u, { adv: commandBonus(s, u) + (marked(u, "assist") ? 1 : 0) + Math.max(0, actionBonus(s, u, "rally").adv), dis: (marked(u, "isolation") ? 1 : 0) + Math.max(0, -actionBonus(s, u, "rally").adv), modifier: actionBonus(s, u, "rally").modifier, label: "Rally" });
  if (r.successes >= 2) u.status = "ready";
  else if (r.successes === 1) u.status = u.status === "pinned" ? "ready" : "pinned";
  else {
    drawMorale(s, u.side, "Rally failure");
    if (reactive) u.noRally = true;
  }
  consumeCommandAction(s, { kind: "rally", actors: [u], scope: s.activeOrderScope });
  log(s, `${u.id} rally: ${r.successes} successes · ${u.status}.`, "rally", r.kept);
  if (!reactive && r.successes < 2) shift(s, "Rally scored fewer than two successes",{mandatory:true});
  if (reactive && r.successes >= 2 && s.pending) s.pending.shift = true;
}
function recon(s, ids, featureId) {
  available(s);
  const terrain = s.terrain.find((t) => t.id === featureId);
  if (!terrain) throw Error("Select a terrain feature.");
  for(const id of ids){const u=unit(s,id);if(!canShoot(u)||u.side!==s.active||!sight(s,u,{...center(terrain),pointOnly:true}).clear)throw Error('Every firer needs LOS to the feature.');}
  beginUnitAction(s,ids);
  let best = 0;const fired=[];
  s.actions++;
  for (const id of ids) {
    const u = unit(s, id);
    if (!canShoot(u) || u.side !== s.active || !sight(s, u, { ...center(terrain), pointOnly: true }).clear) throw Error("Every firer needs LOS to the feature.");
    const target = { ...center(terrain), id: "terrain", side: 1 - u.side, type: "rifle", armor: "none", armorFaces: {}, markers: [], status: "ready" }, profile = firingProfile(s, u, target, { recon: true }), r = pool(s, u, { ...profile, label: "Recon by fire" });
    fired.push({u,r});
    best = Math.max(best, r.successes);
    reveal(s, u);
  }
  const enemies = living(s).filter((u) => u.side !== s.active && feature(s, u)?.id === featureId);
  if (best >= 2) for (const u of enemies) reveal(s, u);
  if (best >= 2) s.decoys = s.decoys.filter((d) => feature(s, d)?.id !== featureId);
  const known=enemies.filter(u=>!u.hidden&&!u.camouflaged);
  for(const {u,r}of fired){const ray=sight(s,u,{...center(terrain),pointOnly:true});for(const t of (known.length?known:[null]))recordFireEvent(s,{firerId:u.id,targetId:t?.id||null,featureId,side:u.side,from:ray.from||firePoint(s,u),to:ray.to||center(terrain),result:`${r.successes} successes; recon reveals contacts, no damage`,mode:'recon'});}
  s.knownFeatures = [.../* @__PURE__ */ new Set([...s.knownFeatures, featureId])];
  if (best < (enemies.length ? 2 : 3)) shift(s, "Recon by fire failed");
}
function smokeMission(s, id, p) {
  available(s);
  const u = unit(s, id);
  if (!u || !commander(u) && u.type !== "fo" && !WEAPONS[u.weapon]?.smoke || u.side !== s.active || u.status === "suppressed" || !sight(s, u, { ...p, pointOnly: true }).clear) throw Error("Choose a visible smoke point from an eligible unit.");
  if (living(s).some((v) => v.side === u.side && dist(v, p) < B / 2)) throw Error("Do not intentionally land smoke on friendly units.");
  beginUnitAction(s,[u.id]);
  reveal(s,u);
  const r = pool(s, u, { adv: commander(u) || u.type === "fo" ? 1 : 0, label: "Smoke mission" }), n = r.successes, side = s.active;
  s.actions++;
  if (!n) {
    s.smokeChoice = { side, chooser: 1 - side, id, target: { ...p }, radius: 3 * 25.4 / 30 * B / 2, untilSide:side };
    shift(s, "Smoke failed");

    return;
  }
  s.smoke.push({ id: "smoke-" + s.actions, side, x: p.x, y: p.y, radius: (n >= 3 ? 5 : 3) * 25.4 / 30 * B / 2, length: n >= 3 ? 5 : 3, angle: 0, placed: s.initiative, ...n === 3 ? { expires: s.initiative + 1 } : { untilSide: side } });
  if (n < 2) shift(s, "Smoke placed with one success");
}
function smokeChoiceError(s, p) {
  const c = s.smokeChoice;
  if (!c) return "No smoke placement pending.";
  if (!tableContains(s, p)) return "Keep the smoke hit point inside the table.";
  if (!sight(s,unit(s,c.id),{...p,pointOnly:true}).clear)return "Off-target smoke must be visible from the firing unit.";
  if (!sight(s, { ...c.target, pointOnly: true }, { ...p, pointOnly: true }).clear) return "Off-target smoke must be visible from the original target point.";
  return null;
}
function completeSmokeChoice(s, p) {
  const c = s.smokeChoice, error = smokeChoiceError(s, p);
  if (error) throw Error(error);
  s.smoke.push({ id: "smoke-" + s.actions, side: c.side, x: p.x, y: p.y, radius: c.radius, length: 3, angle: 0, placed: s.initiative, untilSide:c.side });
  s.smokeChoice = null;
}
function meleeParticipants(s, ids) {
  const direct = ids.map((id) => unit(s, id)).filter(Boolean), extra = direct.flatMap((u) => [unit(s, u.crew), ...alive(s).filter((v) => v.transportId === u.id)].filter(Boolean));
  return [...new Map([...direct, ...extra].map((u) => [u.id, u])).values()];
}
function combatDefenders(s) {
  return meleeParticipants(s, s.combat?.defenders || []);
}
function resolveCombat(s, targets = {}) {
  const c = s.combat;
  if (!c || s.pending) throw Error("No melee is ready.");
  const as = meleeParticipants(s, c.attackers), ds = combatDefenders(s), all = [];
  for (const [own2, enemy] of [[as, ds], [ds, as]]) for (const u of own2) {
    const t = enemy.find((v) => v.id === targets[u.id]) || enemy[0];
    if (t) all.push(...shots(s, [u], t, { melee: true }));
  }
  s.actions++;
  const maxima = [0, 0];
  for (const shot of all) maxima[shot.f.side] = Math.max(maxima[shot.f.side], shot.hits);
  applyShots(s, all);
  c.attackers = c.attackers.filter((id) => unit(s, id) && !unit(s, id).offTable && unit(s, id).status !== "routed");
  c.defenders = c.defenders.filter((id) => unit(s, id) && !unit(s, id).offTable && unit(s, id).status !== "routed");
  if (!c.attackers.length || !c.defenders.length) s.combat = null;
  const own = maxima[s.active], other = maxima[1 - s.active];
  if (other >= 2 && (own < 2 || other >= own) || own < 2) shift(s, "Melee outcome");
  checkVictory(s);
}
function pass(s) {
  available(s);
  if (s.combat) throw Error("Resolve melee first.");
  s.actions++;
  shift(s, "Voluntary pass");
}
function setTabletopMarker(s, id, marker) {
  const u = unit(s, id);
  if (!u) throw Error("Select a deployed stand.");
  if (["ready", "pinned", "suppressed", "routed"].includes(marker)) u.status = marker;
  else if (marker === "noFire") u.noFire = !u.noFire;
  else if (marker === "prone") u.prone = !u.prone;
  log(s, "Referee: " + u.id + " → " + marker);
}
const inStatic = (s, u) => s.static.some((m) => dist(m, u) <= m.radius);
function supportMark(s, caster, t, kind, n) {
  for (const u of s.units) u.markers = u.markers.filter((m) => !(m.caster === caster.id && ["assist", "firewall"].includes(m.kind)) && !(u.id === t.id && ["assist", "firewall"].includes(kind) && ["assist", "firewall"].includes(m.kind)));
  t.markers.push({ kind, caster: caster.id, placed: s.initiative, ...n >= 3 ? { untilSide: caster.side } : { expires: s.initiative + 1 } });
}
function skill(s,id,kind,options={}){
 const u=unit(s,id);if(!u)throw Error('Choose an eligible specialist.');
 const sequence=options.sequence||{total:actionBonus(s,u,'skill').repeats,completed:0,best:0,side:u.side};
 return skillAttempt(s,id,kind,{...options,sequence});
}
function finishSkillAttempt(s,u,kind,result,sequence,options){
 sequence??={total:1,completed:0,best:0,side:u.side};
 sequence.completed++;sequence.best=Math.max(sequence.best,result.sequenceSuccesses??result.successes);
 if(sequence.completed<sequence.total&&u&&!u.dead&&!u.surrendered)return skill(s,u.id,kind,{...options,sequence});
 consumeCommandAction(s,{kind:'skill',actors:[u],scope:s.activeOrderScope});
 if(!options.reactive&&sequence.best<2&&s.active===sequence.side)shift(s,'Skill attempts scored fewer than two successes',{mandatory:true});
 if(options.reactive&&!sequence.best)u.noSkill=true;
 return result;
}
function skillAttempt(s, id, kind, { target = null, to = null, featureId = null, program = null, reactive = false, weapon = null, extra = null, resolving = false, sequence = null } = {}) {
  if (!reactive && !sequence?.completed) available(s);
  const u = unit(s, id), t = target ? (sequence?.completed?s.units.find(v=>v.id===target):unit(s,target)) : null;
  if(!sequence?.completed){
  if (!u || u.offTable && !["reserve", "dismount"].includes(kind) || !reactive && u.side !== s.active || ["suppressed", "routed"].includes(u.status) && kind !== "reserve" || vehicle(u) || u.noSkill) throw Error("Choose an eligible specialist or infantry unit.");
  if (["repair", "heal"].includes(kind) && (!t || t.side !== u.side || (u.type === "hacker" ? !programControl(s, u, t).control : edgeDistance(u, t) > 1))) throw Error("Recovery requires base contact with a friendly target.");
  if (kind === "heal" && (u.type !== "medic" || vehicle(t) || t.type === "android")) throw Error("Medic recovery applies to infantry and powered armor.");
  if (kind === "repair" && (!["engineer", "hacker"].includes(u.type) || u.type === "hacker" && !["android", "drone"].includes(t.type))) throw Error("Use an engineer, or hacker for androids/drones.");
  if(kind==='cancel-support'){
    if(!t)throw Error('Select the supported unit.');
    const remaining=t.markers.filter(m=>!(m.caster===u.id&&['assist','firewall'].includes(m.kind)&&(extra?m.kind===extra:true)));
    if(remaining.length===t.markers.length)throw Error('This hacker has no support marker on that unit.');
    beginUnitAction(s,[u.id]);t.markers=remaining;
    log(s,'Support program voluntarily cancelled.');return;
  }
  if (kind === "program") validateProgram(s, u, t, program, to, extra);
  if (kind === "indirect" && (!commander(u) && u.type !== "fo" || inStatic(s, u) || marked(u, "isolation"))) throw Error("Only an eligible observer or commander can call indirect fire.");
  if (kind === "reserve" && (!u.offTable || s.initiative < 3)) throw Error("Reserves cannot arrive during the first initiative.");
  if (kind === "discover" && !discoverTarget(s, u, target)) throw Error("Choose a visible enemy camouflage marker.");
  if (kind === "camouflage" && to && !tableContains(s, to, 16)) throw Error("Place camouflage markers on the table.");
  if (kind === "camouflage" && (!u.specialOps || living(s).some((e) => e.side !== u.side && sight(s, e, u).clear))) throw Error("Recamouflage requires special operations and no enemy LOS.");
  if (["place-hazard", "clear-hazard", "demolition"].includes(kind) && u.type !== "engineer") throw Error("An engineer is required.");
  if (kind === "place-repeater" && u.type !== "hacker") throw Error("A hacker is required.");
  if (kind === "feat") {
    if (!commander(u) || u.featUsed) throw Error("Choose an unused commander feat.");
    activateFeat(s, u, extra);
    return;
  }
  if (kind === "mount" && (!t || !vehicle(t) || t.side !== u.side || !mountContact(s, u, t) || s.units.filter((v) => v.transportId === t.id).length >= t.transport)) throw Error("Mount an adjacent friendly transport with a free space.");
  if (["reserve", "dismount", "place-hazard", "place-repeater", "camouflage"].includes(kind) && to && !onBoard({ ...u, ...to }, s)) throw Error("Keep the base or marker on the table.");
  if (kind === "dismount") {
    const tr = unit(s, u.transportId || u.crewOf), p = to || tr && { x: tr.x + 32, y: tr.y };
    if (!tr || !p || !onBoard({ ...u, ...p }, s) || !mountContact(s, { ...u, ...p }, tr) || living(s).some((v) => v.id !== tr.id && edgeDistance(v, { ...u, ...p }) < 0.1)) throw Error("Dismount in base contact with the transport or its connected passengers, on an unoccupied surface.");
  }
  if (["limber", "unlimber"].includes(kind)) {
    const tow = unit(s, extra);
    if (!t || !t.towed || t.side !== u.side || edgeDistance(u, t) > 1 || kind === "limber" && (!tow || !vehicle(tow) || tow.side !== u.side || edgeDistance(tow, t) > 1)) throw Error("Select an adjacent towed weapon and an adjacent friendly towing vehicle.");
  }
  if (kind === "reserve") {
    const p = to || { x: u.side ? boardOf(s).width - 24 : 24, y: u.y };
    if (!onBoard({ ...u, ...p }, s)) throw Error("Keep the reserve arrival on the table.");
    if (living(s).some((v) => edgeDistance(v, { ...u, ...p }) < 0.1)) throw Error("Reserve arrivals need an unoccupied base position.");
    if (!u.specialOps && (u.side === 0 ? p.x > B * 2 : p.x < boardOf(s).width - B * 2) && !s.recon.deployment.some((m) => m.side === u.side && dist(m, p) < B * 6)) throw Error("Enter from your own deployment edge or marker.");
  }
  if (kind === "place-hazard" && (!to || dist(u, to) > B * 3 || !["wire", "barrier", "mine"].includes(extra || "wire"))) throw Error("Choose a wire, barrier or mine point within three bases of the engineer.");
  if (kind === "clear-hazard" && !s.hazards.some((h) => h.id === extra && dist(u, h) <= B * 2)) throw Error("Select a hazard adjacent to the engineer.");
  }
  if(!sequence?.completed)beginUnitAction(s,[u.id]);
  const reasons = [], bonuses = actionBonus(s, u, "skill"), adv = (kind === "program" && t && programControl(s, u, t).control ? 1 : 0) + (kind === "program" && t && marked(t, "tracer") ? 1 : 0) + Math.max(0, bonuses.adv) + commandBonus(s, u) + (["recon", "fo", "medic", "engineer", "hacker"].includes(u.type) ? 1 : 0) + (marked(u, "assist") ? 1 : 0), dis = (kind === "program" && t && programControl(s, u, t).enemyRepeater ? 1 : 0) + (kind === "program" && t && marked(t, "firewall") ? 1 : 0) + (marked(u, "isolation") ? 1 : 0) + Math.max(0, -bonuses.adv);
  s.actions++;
  const result=pool(s,u,{adv,dis,modifier:bonuses.modifier,label:"Skill · "+kind+(sequence?.total>1?" · attempt "+(sequence.completed+1):"")});
  let n=result.successes;
  if (kind === "program" && !reactive && program !== "counterware") {
    s.programPending = { id: u.id, side: u.side, target, program, n, result, to, extra, sequence, skillOptions:{target,to,featureId,program,reactive,weapon,extra} };
    log(s, "Program declared. Opposing hackers may use Counterware.", "skill", result.kept);
    return result;
  }
  if (kind !== "camouflage") reveal(s, u);
  if(kind==='heal'||kind==='repair'){
    const second=pool(s,u,{adv,dis:dis+(u.type==='hacker'?1:0),modifier:bonuses.modifier,label:'Recovery · second pool'});
    for(const r of [result,second]){if(r.successes>=2)t.status='ready';else if(r.successes)t.status=t.status==='suppressed'||t.status==='routed'?'pinned':'ready';else drawMorale(s,u.side,'Recovery pool failed');}
    n=Math.max(n,second.successes);if(u.type==='engineer'&&n)t.breakdown=false;
    result.recoverySuccesses=[result.successes,second.successes];result.sequenceSuccesses=n;
  }
  if (n) {
    if (kind === "interact") {
      const o = s.objectives.find((o2) => o2.id === extra) || s.objectives.find((o2) => dist(o2, u) < B * 2);
      if (o) {
        if (o.owner !== null && o.owner !== u.side) drawMorale(s, o.owner, "Objective taken");
        o.owner = u.side;
      }
    } else if (kind === "discover") {
      const decoy = s.decoys.find((d) => d.id === target);
      if (decoy) {
        decoy.revealed = true;
        s.decoys = s.decoys.filter((d) => d.id !== target);
      } else if (t) reveal(s, t);
    } else if (kind === "camouflage") {
      camouflage(s, u, to || { x: u.x + 48, y: u.y });
    } else if (kind === "reserve") {
      if (u.status === "routed" || u.status === "suppressed") {
        u.status = n >= 2 ? "ready" : "pinned";
        if (u.status !== "ready") {
          log(s, "Reserve rally partially succeeds; ready the unit before deploying.");
          return finishSkillAttempt(s,u,kind,result,sequence,{target,to,featureId,program,reactive,weapon,extra});
        }
      }
      const p = to || { x: u.side ? boardOf(s).width - 24 : 24, y: u.y };
      if (!u.specialOps && (u.side === 0 ? p.x > B * 2 : p.x < boardOf(s).width - B * 2) && !s.recon.deployment.some((m) => m.side === u.side && dist(m, p) < B * 6)) throw Error("Enter from your deployment edge or marker.");
      if (u.specialOps && (s.objectives.some((o) => dist(o, p) < B) || living(s).some((e) => e.side !== u.side && edgeDistance(e, { ...u, ...p }) < 2) || feature(s, p)?.type === "building")) throw Error("Combat drop needs a supporting open surface clear of enemy bases and objectives.");
      Object.assign(u, p);
      u.offTable = u.reserve = false;
    } else if (kind === "mount") {
      u.offTable = true;
      u.transportId = t.id;
    } else if (kind === "dismount") {
      const tr = unit(s, u.transportId || u.crewOf);
      u.offTable = false;
      u.transportId = null;
      if (u.crewOf) tr.abandoned = true;
      Object.assign(u, to || { x: tr.x + 32, y: tr.y });
    } else if (kind === "place-repeater") {
      s.repeaters.push({ id: "repeater-" + s.actions, side: u.side, ...to || { x: u.x + 24, y: u.y } });
    } else if (kind === "place-hazard") {
      if (!to || dist(u, to) > B * 3) throw Error("Place an adjacent obstacle/hazard.");
      s.hazards.push({ id: "hazard-" + s.actions, side: u.side, kind: extra || "wire", x: to.x, y: to.y, radius: B, hidden: extra === "mine", quality: u.quality });
    } else if (kind === "clear-hazard") {
      const h = s.hazards.find((h2) => h2.id === extra);
      if (!h || dist(u, h) > B * 2) throw Error("Select an adjacent obstacle.");
      s.hazards = s.hazards.filter((v) => v !== h);
    } else if (kind === "demolition") {
      const f = s.terrain.find((f2) => f2.id === featureId);
      if (!f || !["building", "fortification", "ruins"].includes(f.type) || dist(u, center(f)) > B * 5) throw Error("Select an adjacent structure.");
      for (const v of living(s).filter((v2) => feature(s, v2)?.id === f.id)) {
        const r = pool(s, u, { adv: 1, label: "Demolitions" });
        applyHits(s, v, r.successes);
      }
      f.type = "rough";
      f.name = "Demolition rubble";
      f.cover = 1;
      f.capacity = 8;
    } else if (kind === "indirect") {
      const gun = unit(s, extra);
      if (!gun || gun.side !== u.side || !WEAPONS[weapon || gun.weapon]?.indirect) throw Error("Choose an owned indirect-fire battery.");
      if (!t || !sight(s, u, t).clear) throw Error("The observer must see the target.");
      if (feature(s, t)?.type === "depression" && feature(s, u)?.type !== "hill") throw Error("Depression protects this target unless the observer is on a hill.");
      beginUnitAction(s,[gun.id]);
      const stationary = gun.ranging?.target === t.id && gun.ranging.x === t.x && gun.ranging.y === t.y ? (gun.ranging.bonus || 0) + 1 : 0, profile = firingProfile(s, gun, t, { indirect: true, weapon: weapon || gun.weapon }), r = pool(s, gun, { ...profile, adv: profile.adv + stationary, label: "Indirect barrage" });
      applyShots(s, [{ f: gun, t, result: r, hits: Math.min(4, r.successes), from: u, to: t }], { indirect: true });
      gun.ranging = { target: t.id, x: t.x, y: t.y, bonus: stationary };
    } else if (kind === "program") {
      resolveProgram(s, u, t, program, n, to, extra);
    } else if (kind === "feat") {
      u.featUsed = true;
      const f = u.feat;
      if (f === "Command Control") {
        const cards = s.morale[u.side].cards.splice(-2);
        s.deck = shuffle(s, s.deck.concat(cards));
      } else if (f === "Steelstorm" || f === "Firestorm") s.effects.push({ name: f, side: u.side, all: true, action: f === "Steelstorm" ? "melee" : "shoot", adv: 1 });
      else if (f === "Terrifying") s.effects.push({ name: f, target: u.id, terrifying: true });
      else s.effects.push({ name: f, side: u.side, retain: true });
      if (["Firestorm", "Inspire Heroism"].includes(f)) drawMorale(s, u.side, "Commander feat");
    } else if (kind === "recrew") {
      const gun = unit(s, u.crewOf);
      if (!gun || !gun.abandoned || edgeDistance(gun, u) > 1) throw Error("Only the original adjacent crew can re-crew its weapon.");
      gun.abandoned = false;
      gun.status = "ready";
      u.offTable = true;
      u.reserve = false;
    } else if (["limber", "unlimber"].includes(kind)) {
      if (!t || t.side !== u.side || edgeDistance(u, t) > 1) throw Error("Use an adjacent friendly crew/weapon.");
      t.limbered = kind === "limber";
      t.towId = kind === "limber" ? extra : null;
    }
  }
  log(s, `${u.id} · ${kind}: ${n} successes.`, "skill", result.kept);
  result.sequenceSuccesses=n;
  return finishSkillAttempt(s,u,kind,result,sequence,{target,to,featureId,program,reactive,weapon,extra});
}
function resolveProgram(s, u, t, program, n, to, extra) {
  const allowed = { standard: ["ice", "tracer", "possession", "static", "counterware"], hunter: ["ice", "tracer", "isolation", "counterware", "wipe"], support: ["assist", "firewall"] }[u.module] || [];
  if (!allowed.includes(program)) throw Error("This cyberware module does not provide that program.");
  if (program === "static") {
    if (!to) throw Error("Choose a static-field center.");
    s.static.push({ id: "static-" + s.actions, side: u.side, ...to, radius: (n >= 3 ? 5 : 3) * 25.4 / 30 * B / 2, placed: s.initiative, ...n === 1 || n === 3 ? { expires: s.initiative + 1 } : { untilSide: u.side } });
    return;
  }
  if (program === "wipe") {
    const chosen = (Array.isArray(extra) ? extra : [extra || t?.id]).slice(0, n >= 4 ? 2 : 1);
    for (const id of chosen) {
      const [unitId,markerKind]=id.split('--'),v=unit(s,unitId);
      if (v) {
        const index=markerKind?v.markers.findIndex(m=>m.kind===markerKind):0;
        const removed=index>=0?v.markers.splice(index,1)[0]:null;
        if (removed?.kind === "possession" && v.originalSide !== void 0) {
          v.side = v.originalSide;
          delete v.originalSide;
        }
      } else if (n >= 3) s.static = s.static.filter((m) => m.id !== id);
    }
    return;
  }
  if (!t || inStatic(s, t)) throw Error("Choose a target outside Static.");
  if (program !== "tracer" && !["elite", "super"].includes(t.quality) && !armored(t)) throw Error("Programs target Elite/Super or armored units.");
  if (program === "ice") applyHits(s, t, n);
  else if (["assist", "firewall", "isolation", "tracer"].includes(program)) supportMark(s, u, t, program, n);
  else if (program === "possession") {
    if (n === 2) applyHits(s, t, 2);
    else if (n >= 3) {
      t.originalSide ??= t.side;
      t.side = u.side;
      supportMark(s, u, t, "possession", n >= 4 ? 3 : 2);
    }
  } else if (program === "counterware") throw Error("Counterware is reactive-only.");
}
function resolveMoraleEvent(s, targetId) {
  const e = s.events[0];
  if (!e) throw Error("No special event.");
  const t = unit(s, targetId), kind = e.card.value, eligible = living(s).filter((u) => u.side !== e.side && (kind !== "ammunition" || !vehicle(u)) && (kind !== "breakdown" || armored(u)));
  if (eligible.length && (!t || !eligible.includes(t))) throw Error("Choose an eligible enemy unit.");
  s.events.shift();
  if (t) {
    if (kind === "air" && !t.airAttacked) {
      t.airAttacked = true;
      drawMorale(s, t.side, "First air attack");
    }
    if (kind === "ammunition") applyHits(s, t, 2);
    else if (kind === "breakdown") {
      if (t.status === "ready") t.status = "pinned";
      t.breakdown = true;
    } else {
      const fake = { id: "event-" + kind, side: e.side, quality: kind === "confusion" ? "super" : "veteran", markers: [] }, r = pool(s, fake, { count: 3, adv: kind === "air" ? 2 : kind === "mine" ? 1 : 0, label: "Morale · " + kind });
      applyHits(s, t, r.successes, { moving: kind === "mine" });
    }
  }
  s.deck = shuffle(s, s.deck.concat(e.card));
  checkVictory(s);
}
function playSpecial(s, side, cardId, targetId) {
  const hand = s.morale[side].specials, c = hand.find((c2) => c2.id === cardId), t = unit(s, targetId);
  if (!c || !t) throw Error("Choose a held card and target.");
  if (c.value === "heroism") {
    if (t.side !== side) throw Error("Heroism targets your own unit.");
    s.effects.push({ name: "Heroism", side, target: t.id, retain: true });
  } else if (c.value === "mine") {
    if (!s.pending || s.pending.moves[s.pending.index].id !== t.id || t.side === side) throw Error("Mine Strike targets a moving enemy.");
    const fake = { id: "mine-strike", side, quality: "veteran", markers: [] }, r = pool(s, fake, { adv: 1, label: "Mine Strike" });
    applyHits(s, t, r.successes, { moving: true });
  }
  s.morale[side].specials = hand.filter((v) => v !== c);
  s.deck = shuffle(s, s.deck.concat(c));
}
const ORDERS=Object.values(COMMAND_ABILITIES);
function commandPriority(s){return s.orderWindow?.priority??(s.pending?1-s.pending.side:s.firefight?1-s.firefight.side:s.active);}
function assignOrder(s,side,id,dieIds=null){if(side!==commandPriority(s))throw Error('Wait for your command priority.');const o=getCommandAbility(id),c=s.commands[side];if(!o||!boardAbilities(s,side).some(a=>a.id===id))throw Error('This ability is not on the selected board.');if(o.ongoing&&c.assigned[id]?.length)throw Error('This ongoing ability already has dice.');let chosen=dieIds?c.dice.filter(d=>dieIds.includes(d.id)):c.dice.slice(0,o.cost);if(chosen.length!==o.cost||dieIds&&new Set(dieIds).size!==o.cost)throw Error(`Assign ${o.cost} successful dice to ${o.name}.`);c.dice=c.dice.filter(d=>!chosen.includes(d));(c.assigned[id]??=[]).push(chosen);log(s,`${side?'Red':'Blue'} assigns ${o.cost} successful dice to ${o.name}.`,'order');}
function boardAbilities(s,side){const army=s.options.armies[side];return getBoardAbilities(army.board||s.options.board||army.nation,army.subfaction||null);}
function releaseCommand(s,side,id){const c=s.commands[side];if(side!==commandPriority(s))throw Error('Wait for your command priority.');if(!c.assigned[id]?.length)throw Error('This slot is empty.');delete c.assigned[id];delete c.held[id];s.effects=s.effects.filter(e=>!(e.ongoing&&e.side===side&&e.slot===id));log(s,'Released '+getCommandAbility(id).name+'; assigned dice are spent.','order');}
function activateCommandTrait(s,side,id,target){const o=getCommandAbility(id),c=s.commands[side],u=unit(s,target);if(!o?.ongoing||!c.assigned[id]?.length||c.held[id])throw Error('Arm an inactive ongoing ability first.');if(side!==s.active||s.pending||s.firefight||s.programPending||s.orderWindow||s.events.length)throw Error('Activate an ongoing ability during your initiative outside a pending action.');if(!u||u.offTable||(o.targeting.side==='enemy'?u.side===side:u.side!==side))throw Error('Choose a deployed target on the ability’s required side.');if(o.targeting.unitClass==='infantry'&&vehicle(u)||o.targeting.unitClass==='vehicle'&&!vehicle(u)||o.targeting.requiresTerrain&&!feature(s,u))throw Error('The target does not meet this ability’s requirements.');c.held[id]={target};const effects=Array.isArray(o.effects)?o.effects:[o.effects];for(const effect of effects){s.effects.push({...effect,name:o.name,side,target,slot:id,ongoing:true,...o.targeting.role==='defender'?{role:'defender'}:{}});}log(s,o.name+' is active while its die remains assigned.','order');}
function declareAction(s, action) {
  if (s.orderWindow) throw Error("Resolve the current command response window.");
  closeCommandDiscard(s);
  s.orderWindow = { action: structuredClone(action), side: action.side ?? s.active, priority: action.side ?? s.active, passes: 0 };
  s.orderStack = [];
}
function activateOrder(s, side, id, targetId, cardIds = null) {
  const o = ORDERS.find((o2) => o2.id === id), c = s.commands[side], window = s.orderWindow;
  if (!window || window.priority !== side) throw Error("Wait for your response priority.");
  if (!o || o.ongoing || !c.assigned[id]?.length || !o.basic && c.used.includes(id)) throw Error("This Order is not armed or has already been used.");
  const error = commandOrderError(s, { side, id, target: targetId, cardIds }, { unit, feature });
  if (error) throw Error(error);
  c.assigned[id].shift();
  if (!o.basic) c.used.push(id);
  s.orderStack.push({ side, id, target: targetId, cardIds });
  window.priority = 1 - side;
  window.passes = 0;
}
function passOrders(s) {
  const w = s.orderWindow;
  if (!w) throw Error("No command response window.");
  w.passes++;
  w.priority = 1 - w.priority;
  if (w.passes < 2) return;
  for (const x of [...s.orderStack].reverse()) resolveOrder(s, x);
  const action = { ...w.action, orderScope: w.orderScope };
  s.activeOrderScope = w.orderScope;
  s.orderWindow = null;
  s.orderStack = [];
  if (s.events.length) {
    s.deferredAction = action;
    return;
  }
  performAction(s, action);
}
function resolveOrder(s, entry) {
  return resolveCommandOrder(s, entry, { drawMorale, shuffle, log, unit, feature });
}
function resumeDeferred(s) {
  if (!s.deferredAction || s.events.length) throw Error("Resolve special morale events first.");
  const a = s.deferredAction;
  s.deferredAction = null;
  performAction(s, a);
}
function performAction(s, a) {
  const previous = s.actionContext;
  const orderScope = a.orderScope || s.activeOrderScope;
  s.actionContext = { orderScope, kind: ["fire", "firefight", "react", "recon"].includes(a.type) ? "shoot" : a.type === "combat" ? "melee" : a.type, ids: [...new Set([...a.ids || [], a.id, ...s.firefight?.ids || [], ...s.pending?.moves.map((m) => m.id) || []].filter(Boolean))] };
  try {
    if(!["command-refresh","command-discard","command-assign","command-release","command-trait","order-pass"].includes(a.type))closeCommandDiscard(s);
    switch (a.type) {
      case "command-refresh":
        if(a.side!==commandPriority(s))throw Error("Wait for your command priority.");return rollCommandBowl(s,a.side);
      case "command-discard":return discardCommandDie(s,a.side,a.id);
      case "command-assign":return assignOrder(s,a.side,a.id,a.dice);
      case "command-release":return releaseCommand(s,a.side,a.id);
      case "command-trait":return activateCommandTrait(s,a.side,a.id,a.target);
      case "decoy-remove":if(contact(s,a.id)?.side!==s.active||!s.decoys.some(d=>d.id===a.id))throw Error("Choose your own decoy.");s.decoys=s.decoys.filter(d=>d.id!==a.id);return;
      case "move":
        return beginMove(s, a.ids, a.to, a.options);
      case "fire":
        return directFire(s, a.ids, a.target, a.mode, a.options);
      case "firefight":
        return resolveFirefight(s, a);
      case "react":
        return react(s, a.ids, a.t, a.mode);
      case "decline":
        return declineReaction(s);
      case "rally":
        return a.ids?.length > 1 ? coordinatedRally(s, a.ids, a.mode) : rally(s, a.id, a.options);
      case "recon":
        return recon(s, a.ids, a.featureId);
      case "smoke":
        return smokeMission(s, a.id, a.to);
      case "smoke-place":
        return completeSmokeChoice(s, a.to);
      case "combat":
        return resolveCombat(s, a.targets);
      case "skill":
        return skill(s, a.id, a.kind, a.options);
      case "rout":
        return resolveRout(s, a.id);
      case "pass":
        return pass(s);
      case "begin":
        return beginBattle(s);
      case "bid":
        return resolveReconBid(s, a.bids);
      case "event":
        return resolveMoraleEvent(s, a.target);
      case "program-resolve":
        return finishProgram(s, a.id);
      case "special":
        return playSpecial(s, a.side, a.card, a.target);
      case "order-pass":
        return passOrders(s);
      case "reactive-action":
        return reactiveAction(s, a);
      case "resume-action":
        return resumeDeferred(s);
      default:
        throw Error("Unknown action " + a.type);
    }
  } finally {
    s.actionContext = previous || null;
    if (orderScope && !s.pending && !s.firefight && !s.programPending && !s.orderWindow && !s.deferredAction) {
      expireCommandScope(s, orderScope);
      s.activeOrderScope = null;
    }
  }
}
function validateSave(s) {
  return validateGameSave(s);
}
function reactiveAction(s, a) {
  const pending = s.pending, fight = s.firefight, side = pending ? 1 - pending.side : fight ? 1 - fight.side : null;
  if (side === null) throw Error("No reaction window.");
  let point;if(pending){point=reactionPoint(s,[a.id],a.t??pending.progress??0);Object.assign(point.u,point.at);}
  if (a.kind === "move") {
    const u = unit(s, a.id), to = a.to, error = canMove(s, u, { ...u, ...to });
    if (!u || u.side !== side || error) throw Error(error || "Choose a reacting unit.");
    beginUnitAction(s,[u.id]);
    Object.assign(u, to);
    u.hidden = false;
    s.actions++;
    log(s, u.id + " performs a reactive move.");
  } else if (a.kind === "rally") {
    const u = unit(s, a.id);
    if (!u || u.side !== side || u.noRally) throw Error("Choose an eligible reacting stand.");
    rally(s, a.id, { reactive: true });
  } else if (a.kind === "skill") {
    const u = unit(s, a.id);
    if (!u || u.side !== side || u.noSkill) throw Error("Choose an eligible reacting specialist.");
    skill(s, a.id, a.skill, { ...a.options, reactive: true });
  } else throw Error("Choose movement, rally or skill.");
  if (pending) {pending.reactors??=[];pending.reactors.push(a.id);pending.progress=a.t??pending.progress??0;advanceMovement(s);}
  else resolveFirefight(s, { decline: true });
}
function coordinatedRally(s, ids, mode = "group") {
  available(s);
  const us = ids.map((id) => unit(s, id));
  if (us.length < 2 || us.some((u) => !u || u.side !== s.active || u.platoon !== us[0].platoon || !["pinned", "suppressed"].includes(u.status) || ["android", "drone"].includes(u.type) || u.breakdown)) throw Error("Select two or more eligible stands from one platoon.");
  if (mode === "group" && us.some((a) => us.some((b) => a !== b && !sight(s, a, b).clear))) throw Error("Group rally requires mutual LOS.");
  if (mode === "command") {
    const pc = living(s).find((c) => c.type === "pc" && c.side === s.active && c.platoon === us[0].platoon && c.status !== "suppressed");
    if (!pc || us.some((u) => !sight(s, pc, u).clear)) throw Error("Command rally requires its unsuppressed PC to see all participants.");
  }
  beginUnitAction(s,ids);
  const rolls = us.map((u) => ({ u, r: pool(s, u, { adv: commandBonus(s, u) + (marked(u, "assist") ? 1 : 0) + Math.max(0, actionBonus(s, u, "rally").adv), dis: (marked(u, "isolation") ? 1 : 0) + Math.max(0, -actionBonus(s, u, "rally").adv), modifier: actionBonus(s, u, "rally").modifier, label: "Coordinated rally" }) }));
  s.actions++;
  for (const { u, r } of rolls) {
    if (r.successes >= 2) u.status = "ready";
    else if (r.successes) u.status = u.status === "pinned" ? "ready" : "pinned";
    else drawMorale(s, u.side, "Rally failure");
    log(s, `${u.id}: ${r.successes} rally successes → ${u.status}.`, "rally", r.kept);
  }
  consumeCommandAction(s, { kind: "rally", actors: us, scope: s.activeOrderScope });
  if (Math.max(...rolls.map((v) => v.r.successes)) < 2) shift(s, "Coordinated rally scored fewer than two successes",{mandatory:true});
}
function actionBonus(s, u, kind) {
  return actionCommandBonus(s, u, kind, { scope: s.activeOrderScope });
}
function finishProgram(s, counterId = null) {
  const p = s.programPending;
  if (!p) throw Error("No hostile program is awaiting Counterware.");
  const u = unit(s, p.id), t = unit(s, p.target);
  let n = p.n, counter = 0, side = 1 - p.side;
  if (counterId) {
    const h = unit(s, counterId);
    if (!h || h.offTable || h.side !== side || h.type !== "hacker" || !["standard", "hunter"].includes(h.module) || ["suppressed", "routed"].includes(h.status) || h.noCounterware) throw Error("Choose a hacker with eligible Counterware.");
    beginUnitAction(s,[h.id]);
    const r = pool(s, h, { adv: 1 + (u && programControl(s, h, u).control ? 1 : 0), label: "Counterware" });
    counter = r.successes;
    n = Math.max(0, n - counter);
    if (counter < 2) h.noCounterware = true;
    log(s, `Counterware cancels ${Math.min(p.n, counter)} program successes.`, "skill", r.kept);
  }
  s.programPending = null;
  if (u && n > 0 && (t||["static","wipe"].includes(p.program))) resolveProgram(s, u, t, p.program, n, p.to, p.extra);
  if(counter>=3&&s.active!==side){consumeCommandAction(s,{kind:'skill',actors:[u],scope:s.activeOrderScope});shift(s,'Counterware wins the response');}
  else if(u){const result={...p.result,sequenceSuccesses:n};finishSkillAttempt(s,u,'program',result,p.sequence,p.skillOptions||{target:p.target,program:p.program,to:p.to,extra:p.extra});}
  log(s, `${p.program}: ${n} uncancelled success(es).`);
  checkVictory(s);
}
function reveal(s, u) {
  if (!u) return;
  u.hidden = false;
  u.camouflaged = false;
  u.profileKnown = true;
  }
function camouflage(s, u, p, deployment = false) {
  if (!tableContains(s, p, 16) || !deployment && living(s).some((e) => e.side !== u.side && sight(s, e, { ...p, pointOnly: true }).clear)) throw Error("Place the decoy on the table outside enemy LOS.");
  s.decoys = s.decoys.filter((d) => d.ownerId !== u.id);
  u.camouflaged = true;
  s.decoys.push({ id: "contact-" + u.id + "-" + s.actions, ownerId: u.id, side: u.side, x: p.x, y: p.y, platoon:u.platoon,company:u.company,battalion:u.battalion,offTable:false,prone:false,noFire:false,dead:false,surrendered:false,type: "camouflage-marker", facing: u.facing, status: "ready", quality: u.quality, nation: u.nation, markers: [], label: "Camouflaged contact", camouflaged: true, decoy: true });
}
function discoverTarget(s, u, id) {
  const t = unit(s, id) || s.decoys.find((d) => d.id === id);
  return t && t.side !== u.side && (t.camouflaged || t.decoy) && sight(s, u, t).clear ? t : null;
}
function programControl(s, h, t) {
  if (sight(s, h, t).clear) return { control: true, enemyRepeater: false };
  if (s.repeaters.some((r) => r.side === h.side && sight(s, { ...r, pointOnly: true }, t).clear)) return { control: true, enemyRepeater: false };
  return { control: t.type === "hacker" && s.repeaters.some((r) => r.side !== h.side && sight(s, { ...r, pointOnly: true }, t).clear), enemyRepeater: t.type === "hacker" && s.repeaters.some((r) => r.side !== h.side && sight(s, { ...r, pointOnly: true }, t).clear) };
}
const modulePrograms = { standard: ["ice", "tracer", "possession", "static", "counterware"], hunter: ["ice", "tracer", "isolation", "counterware", "wipe"], support: ["assist", "firewall"] };
function validateProgram(s, u, t, program, to, extra) {
  if (u.type !== "hacker" || !modulePrograms[u.module]?.includes(program)) throw Error("This cyberware module does not provide that program.");
  if (program === "counterware") throw Error("Use Counterware in the hostile-program response window.");
  if (inStatic(s, u)) throw Error("Programs cannot be used inside Static.");
  if (program === "static") {
    if (!to || !tableContains(s, to)) throw Error("Choose a Static center on the battlefield.");
    return;
  }
  if (program === "wipe") {
    const choices = Array.isArray(extra) ? extra : [extra || t?.id];
    if (!choices.length || choices.length>2 || new Set(choices).size!==choices.length || choices.some((id) => {const [uid,kind]=id.split('--'),v=unit(s,uid);return !(kind?v?.markers.some(m=>m.kind===kind):v?.markers.length)&&!s.static.some(m=>m.id===id);})) throw Error("Choose a program marker or Static field to wipe.");
    return;
  }
  if (!t || t.dead || t.surrendered || t.offTable || inStatic(s, t) || t.hidden || t.camouflaged) throw Error("Choose a deployed revealed target outside Static.");
  if (["assist", "firewall"].includes(program) ? t.side !== u.side : t.side === u.side) throw Error("Choose the correct friendly or hostile program target.");
  if (program !== "tracer" && !["elite", "super"].includes(t.quality) && !armored(t)) throw Error("Programs target Elite/Super, powered armor, androids or vehicles.");
}
function mountContact(s,u,tr){return edgeDistance(u,tr)<=1||living(s).some(v=>v.id!==u.id&&v.id!==tr.id&&v.side===u.side&&edgeDistance(v,tr)<=1&&edgeDistance(u,v)<=1);}
function replaceCommanders(s) {
  const pending = s.commandLosses || [];
  s.commandLosses = [];
  for (const id of pending) {
    const lost = s.units.find((u) => u.id === id);
    if (!lost) continue;
    const role = lost.type, lower = { bc: "cc", cc: "pc" }[role], own = alive(s).filter((u) => u.side === lost.side && !u.crewOf && !u.offTable && (role === "bc" || u.company === lost.company) && (role !== "pc" || u.platoon === lost.platoon));
    let replacement = own.find((u) => u.type === lower) || own.find((u) => !commander(u) && !vehicle(u));
    if (!replacement) continue;
    const oldType = replacement.type, oldPlatoon = replacement.platoon, oldCompany = replacement.company;
    replacement.type = role;
    replacement.leadership = { pc: 2, cc: 3, bc: 4 }[role];
    replacement.feat = lost.feat;
    replacement.featUsed = lost.featUsed;
    replacement.label = "Replacement " + role.toUpperCase();
    replacement.company = lost.company;
    replacement.platoon = lost.platoon;
    log(s, replacement.id + " assumes " + role.toUpperCase() + " command.");
    if (["pc", "cc"].includes(oldType)) {
      const vacancy = { ...replacement, id: "vacancy-" + s.initiative + "-" + replacement.id, type: oldType, platoon: oldPlatoon, company: oldCompany, dead: true, offTable: true };
      s.units.push(vacancy);
      s.commandLosses.push(vacancy.id);
    }
  }
  if (s.commandLosses.length) replaceCommanders(s);
}
function activateFeat(s, u, extra) {
  beginUnitAction(s,[u.id]);
  u.featUsed = true;
  s.actions++;
  const f = u.feat;
  if (f === "Command Control") {
    const selected = Array.isArray(extra) ? extra : [];
    const cards = selected.length ? s.morale[u.side].cards.filter((c) => selected.includes(c.id)).slice(0, 2) : s.morale[u.side].cards.slice(-2);
    s.morale[u.side].cards = s.morale[u.side].cards.filter((c) => !cards.includes(c));
    s.deck = shuffle(s, s.deck.concat(cards));
  } else if (["Steelstorm", "Firestorm"].includes(f)) s.effects.push({ name: f, side: u.side, all: true, action: f === "Steelstorm" ? "melee" : "shoot", adv: 1, commandFire: f === "Firestorm" });
  else if (f === "Terrifying") {
    s.effects.push({ name: f, side: u.side, terrifying: true });
    drawMorale(s, u.side, "Terrifying feat");
  } else {
    const actions = { "Inspiring Maneuvering": "move", "Inspire Fire": "shoot", "Inspire Courage": "rally", "Inspire Charge": "melee", "Inspire Competency": "skill" };
    s.effects.push({ name: f, side: u.side, retain: true, action: actions[f] });
  }
  if (["Firestorm", "Inspire Heroism"].includes(f)) drawMorale(s, u.side, "Commander feat");
  log(s, u.id + " activates " + f + ".", "order");
}
function resolveMovementHazards(s, u, from, to, p) {
  for (const h of [...s.hazards]) {
    if (pointSegmentDistance(h, from, to) > h.radius + B / 2) continue;
    if (h.kind === "wire" && vehicle(u)) {
      s.hazards = s.hazards.filter((v) => v !== h);
      log(s, u.id + " clears barbed wire on contact.");
    }
    if (h.kind !== "mine" || dist(from, h) <= h.radius + B / 2) continue;
    let attacks = u.type !== "engineer";
    if (u.type === "engineer") {
      const detect = pool(s, u, { adv: 1, label: "Minefield detection" });
      h.hidden = false;
      attacks = !detect.successes && detect.kept.includes(1);
      log(s, "Engineer detects a minefield" + (attacks ? " but triggers a mine." : "."));
    }
    if (attacks) {
      h.hidden = false;
      const mine = { id: h.id, side: h.side, quality: h.quality || "veteran", markers: [] }, r = pool(s, mine, { count: vehicle(u) ? 2 : 3, label: "Minefield attack" }), outcome = applyHits(s, u, r.successes, { moving: true });
      log(s, "Minefield attacks " + u.id + ": " + outcome + ".", "fire", r.kept);
      if (r.successes >= 2) p.shift = true;
    }
  }
}
export {
  contact,boardAbilities,releaseCommand,activateCommandTrait,commandCount,reactionCandidates,
  ORDERS,
  activateOrder,
  alive,
  applyHits,
  armored,
  assaultDestination,
  assignOrder,
  available,
  beginBattle,
  beginMove,
  camouflage,
  canMove,
  canShoot,
  checkVictory,
  combatDefenders,
  commandBonus,
  commander,
  completeSmokeChoice,
  coordinatedRally,
  declareAction,
  declineReaction,
  deploymentMove,
  diceCount,
  directFire,
  discoverTarget,
  drawMorale,
  feature,
  finishProgram,
  finishRecon,
  fireEligibility,
  fireSet,
  firingProfile,
  hug,
  inStatic,
  isSquad,
  living,
  log,
  meleeParticipants,
  mountContact,
  moveRecon,
  near,
  nearestTargets,
  newGame,
  pass,
  passOrders,
  performAction,
  placeDeploymentMarker,
  playSpecial,
  pool,
  previewMovement,
  programControl,
  rally,
  rallyInfo,
  react,
  reactionOptions,
  reactiveAction,
  recon,
  resolveCombat,
  resolveFirefight,
  resolveMoraleEvent,
  resolveReconBid,
  resolveRout,
  resumeDeferred,
  reveal,
  setTabletopMarker,
  shift,
  sight,
  skill,
  smokeChoiceError,
  smokeMission,
  startInitiative,
  unit,
  validateSave,
  vehicle,
  visibleUnits,
  withDice
};

function contact(s,id){return unit(s,id)||s.decoys.find(d=>d.id===id&&!d.revealed);}
