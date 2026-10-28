import {validateHistory} from './history.js';
import {validateGameSave as validateLegacySave} from './legacy-save-validation.js';
import {commandState} from './command.js';
import {getCommandAbility, getCommandBoard, getCommandSubfaction, getBoardAbilities, COMMAND_ABILITIES} from './command-board.js';
import { VERSION, TYPES, QUALITIES, WEAPONS, ARMOR, NATIONS, FEATS, SCENARIOS, PROGRAMS, CATALOG } from "./data.js";
import { validateArmy } from "./army.js";
import { validateBattlefield } from "./battlefields.js";
import { boardOf, validateDeployment } from "./table.js";
function validateGameSave(s) {
  const fail = (part) => {
    throw Error(part ? "Invalid " + part + " in K-Dwarf save." : "Not a compatible K-Dwarf save.");
  };
  const obj = (v) => v !== null && typeof v === "object" && !Array.isArray(v) && (Object.getPrototypeOf(v) === Object.prototype || Object.getPrototypeOf(v) === null);
  const own = (v, k) => obj(v) && Object.hasOwn(v, k), has = (v, k) => Object.hasOwn(v, k), en = (v, vs) => vs.includes(v), int = (v, min = 0, max = 1e7) => Number.isInteger(v) && v >= min && v <= max, num = (v, min = -1e4, max = 1e4) => Number.isFinite(v) && v >= min && v <= max;
  const text = (v, max = 500) => typeof v === "string" && v.length <= max && !/[<>\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(v);
  const identifier = (v) => typeof v === "string" && /^[-a-zA-Z0-9_]{1,160}$/.test(v), side = (v) => v === 0 || v === 1, nullableSide = (v) => v === null || side(v), bool = (v) => typeof v === "boolean";
  const arr = (v, max = 1e3, min = 0) => Array.isArray(v) && v.length >= min && v.length <= max, opt = (v, test) => v === void 0 || test(v), nilopt = (v, test) => v == null || test(v);
  const all = (v, test, max = 1e3, min = 0) => arr(v, max, min) && v.every(test), uniq = (v) => new Set(v).size === v.length;
  let nodes = 0;
  const scan = (v, depth = 0) => {
    if (++nodes > 15e4 || depth > 24) fail("save size/depth");
    if (v === null || v === void 0 || typeof v === "boolean") return;
    if (typeof v === "number") {
      if (!Number.isFinite(v)) fail("numeric data");
      return;
    }
    if (typeof v === "string") {
      if (!text(v, 4e3)) fail("unsafe text");
      return;
    }
    if (Array.isArray(v)) {
      if (v.length > 5e3) fail("collection size");
      for (const x of v) scan(x, depth + 1);
      return;
    }
    if (!obj(v)) fail("JSON data");
    for (const [k, x] of Object.entries(v)) {
      if (!text(k, 200) || ["__proto__", "prototype", "constructor"].includes(k)) fail("unsafe object key");
      scan(x, depth + 1);
    }
  };
  scan(s);
  if(s?.format==='kdwarf-operations'&&s.version==='0.1.0'){
    validateLegacySave(s);
    if(s.pendingDice?.rolls.some(r=>r.label.startsWith('Command dice')))fail('legacy manual command transaction; finish or cancel it in v0.1 first');
    s=structuredClone(s);s.version=VERSION;s.commands=[commandState(),commandState()];
    s.effects=s.effects.filter(e=>!e.order);s.orderStack=[];
    if(s.orderWindow){s.deferredAction=s.orderWindow.action;s.orderWindow=null;}
    if(s.pending){s.pending.reactors=[];s.pending.progress=0;}
    if(s.smokeChoice){s.smokeChoice.untilSide=s.smokeChoice.side;delete s.smokeChoice.expires;}
    s.log.push({n:s.actions,initiative:s.initiative,side:s.active,kind:'event',text:'Imported v0.1 battle. Retired symbol-based command resources were cleared; roll the new mixed bowl. Battlefield and action dice are preserved.'});s.log=s.log.slice(-300);
  }
  if(s?.format==='kdwarf-operations'&&s.version==='0.2.0'){s=structuredClone(s);s.version=VERSION;}
  if(s?.format==='kdwarf-operations'&&s.version===VERSION){
    if(s.fireEvents===undefined)s.fireEvents=[];
    if(s.fireEventSerial===undefined)s.fireEventSerial=0;
  }
  if (!obj(s) || s.format !== "kdwarf-operations" || s.version !== VERSION || !own(SCENARIOS, s.scenario) || !int(s.seed, 0, 4294967295) || !side(s.active) || !nullableSide(s.winner) || !int(s.initiative) || !int(s.actions) || !en(s.phase, ["recon", "deployment-markers", "deployment", "battle"]) || !bool(s.deployment) || !obj(s.options) || !en(s.options.mode, ["solo", "hotseat"]) || !en(s.options.difficulty, ["easy", "normal", "hard"]) || !bool(s.options.autoRoll) || !all(s.units, obj, 240, 2)) fail();
  if (!all(s.options.armies, (a) => {
    try {
      validateArmy(a);
      return true;
    } catch {
      return false;
    }
  }, 2, 2)) fail("force lists");
  try {
    validateBattlefield(s.options.battlefield);
    validateDeployment(s);
  } catch {
    fail("battlefield/deployment");
  }
  const board = boardOf(s), point = (p) => obj(p) && num(p.x, 0, board.width) && num(p.y, 0, board.height), position = (p) => point(p) && opt(p.facing, (v) => num(v, -1e6, 1e6));
  const idSet = /* @__PURE__ */ new Set();
  for (const u of s.units) {
    if (!identifier(u.id) || idSet.has(u.id) || !own(TYPES, u.type) || !own(QUALITIES, u.quality) || !own(WEAPONS, u.weapon) || !own(ARMOR, u.armor) || !own(NATIONS, u.nation) || !side(u.side) || !en(u.status, ["ready", "pinned", "suppressed", "routed"]) || !num(u.x) || !num(u.y) || !num(u.facing, -1e6, 1e6) || !int(u.platoon, 0, 100) || !int(u.company, 0, 5) || !int(u.battalion, 0, 10) || !text(u.label, 200) || !obj(u.armorFaces) || !all(u.markers, obj, 30)) fail("unit");
    for (const key of ["prone", "hidden", "camouflaged", "reserve", "offTable", "noFire", "noRally", "noSkill", "dead", "surrendered", "featUsed"]) if (!bool(u[key])) fail("unit flags");
    for (const key of ["turret", "leadershipUpgrade", "specialOps", "abandoned", "limbered", "breakdown", "profileKnown", "noCounterware", "towed", "permanent"]) if (!opt(u[key], bool)) fail("unit flags");
    if (!opt(u.die, (v) => en(v, [4, 6, 8, 10, 12]))) fail("unit die");
    if (!u.offTable && !point(u)) fail("unit position");
    if (!opt(u.weaponType, (v) => en(v, ["ballistic", "laser", "microwave", "gauss", "plasma", "gamma", "missile", "antimatter", "explosive"])) || !opt(u.module, (v) => en(v, ["standard", "hunter", "support"])) || !opt(u.feat, (v) => FEATS.includes(v)) || !opt(u.originalSide, side) || !num(u.leadership, 0, 20) || !opt(u.bonus, (v) => num(v, -20, 20)) || !opt(u.transport, (v) => int(v, 0, 20))) fail("unit profile");
    if (Object.keys(u.armorFaces).some((k) => !en(k, ["front", "sides", "rear", "top"])) || Object.values(u.armorFaces).some((v) => !int(v, 0, 5))) fail("armor faces");
    if (!opt(u.extraWeapons, (v) => all(v, (w) => typeof w === "string" ? own(WEAPONS, w) : obj(w) && own(WEAPONS, w.weapon), 8))) fail("additional weapons");
    for (const key of ["pointsAdjust", "fmrAdjust"]) if (!opt(u[key], (v) => num(v, -1e3, 1e3))) fail("unit cost");
    idSet.add(u.id);
  }
  const ref = (v) => typeof v === "string" && idSet.has(v), refs = (v, min = 0) => all(v, ref, 240, min) && uniq(v), maybeRef = (v) => v == null || ref(v), until = (v) => opt(v.expires, (n) => int(n)) && opt(v.untilSide, side) && opt(v.placed, (n) => int(n));
  for (const u of s.units) {
    for (const k of ["transportId", "crewOf", "crew", "towId"]) if (!nilopt(u[k], ref)) fail("unit link");
    if (u.transportId === u.id || u.crewOf === u.id || u.crew === u.id) fail("self-referencing unit link");
    if (!all(u.markers, (m) => obj(m) && en(m.kind, ["assist", "firewall", "isolation", "tracer", "possession"]) && ref(m.caster) && until(m), 30)) fail("program marker");
    if (!nilopt(u.ranging, (r) => obj(r) && ref(r.target) && point(r) && int(r.bonus, 0, 1e4))) fail("ranging record");
  }
  if (!all(s.terrain, (t) => obj(t) && opt(t.cover, (v) => int(v, 0, 3)), 60)) fail("terrain");
  try {
    validateBattlefield({ ...s.options.battlefield, terrain: s.terrain, objectives: [] });
  } catch {
    fail("terrain geometry");
  }
  const terrainIds = new Set(s.terrain.map((t) => t.id));
  if (!all(s.knownFeatures, (v) => terrainIds.has(v), 60) || !uniq(s.knownFeatures)) fail("known terrain");
  const marker = (m, radius = false) => obj(m) && identifier(m.id) && side(m.side) && point(m) && until(m) && (!radius || num(m.radius, 0.1, 1e3));
  for (const k of ["smoke", "static"]) if (!all(s[k], (m) => marker(m, true) && opt(m.angle, (v) => num(v, -1e6, 1e6)) && opt(m.length, (v) => int(v, 1, 20)), 1e3)) fail(k);
  if (!all(s.repeaters, (m) => marker(m), 1e3) || !all(s.hazards, (m) => marker(m, true) && en(m.kind, ["wire", "barrier", "mine", "demolition"]) && bool(m.hidden), 1e3) || !all(s.decoys, (m) => marker(m) && en(m.type, ["recon", "recon-marker", "camouflage-marker"]) && opt(m.ownerId, ref) && opt(m.camouflaged, bool) && opt(m.decoy, bool) && opt(m.facing, (v) => num(v, -1e6, 1e6)) && opt(m.status, (v) => en(v, ["ready", "pinned", "suppressed", "routed"])) && opt(m.quality, (v) => own(QUALITIES, v)) && opt(m.nation, (v) => own(NATIONS, v)) && opt(m.label, (v) => text(v, 200)) && opt(m.markers, (v) => arr(v, 30)), 240)) fail("battlefield tokens");
  const objective = (o) => obj(o) && identifier(o.id) && point(o) && nullableSide(o.owner) && opt(o.side, side);
  if (!all(s.objectives, objective, 240) || !uniq(s.objectives.map((o) => o.id))) fail("objectives");
  if (!obj(s.recon) || !nullableSide(s.recon.supremacy) || !side(s.recon.turn) || !all(s.recon.bids, (v) => int(v, 0, 20), 2, 2) || !int(s.recon.passes) || !all(s.recon.markers, (m) => marker(m) && bool(m.locked), 240) || !uniq(s.recon.markers.map((m) => m.id)) || !all(s.recon.deployment, objective, 240) || !uniq(s.recon.deployment.map((m) => m.id)) || !nilopt(s.recon.wager, (w) => obj(w) && side(w.side) && int(w.count, 0, 20))) fail("reconnaissance");
  const specials = ["air", "mine", "heroism", "confusion", "ammunition", "breakdown"], card = (c) => obj(c) && identifier(c.id) && (en(c.value, [1, 2, 4, 5]) || specials.includes(c.value)) && opt(c.revealed, bool) && opt(c.due, (v) => int(v));
  if (!all(s.deck, card, 1e3) || !all(s.morale, (m) => obj(m) && num(m.fmr, 0, 1e5) && all(m.cards, (c) => card(c) && typeof c.value === "number", 1e3) && all(m.specials, (c) => card(c) && en(c.value, ["mine", "heroism"]), 1e3) && all(m.air, (c) => card(c) && c.value === "air" && int(c.due), 1e3), 2, 2) || !all(s.events, (e) => obj(e) && identifier(e.id) && e.kind === "morale" && side(e.side) && card(e.card), 1e3)) fail("morale state");
  const cardIds = new Set([...s.deck, ...s.morale.flatMap((m) => [...m.cards, ...m.specials, ...m.air]), ...s.events.map((e) => e.card)].map((c) => c.id)), cardRef = (v) => typeof v === "string" && cardIds.has(v), cardRefs = (v) => all(v, cardRef, 2) && uniq(v);
  const orderIds=new Set(Object.keys(COMMAND_ABILITIES));
  const die=d=>obj(d)&&identifier(d.id)&&ref(d.source)&&own(QUALITIES,d.quality)&&d.sides===QUALITIES[d.quality].die&&int(d.face,4,d.sides);
  if(!all(s.commands,c=>obj(c)&&all(c.dice,die,10000)&&obj(c.assigned)&&Object.entries(c.assigned).every(([k,v])=>orderIds.has(k)&&all(v,b=>all(b,die,12,1),1000))&&obj(c.held)&&int(c.cycle)&&bool(c.initialized)&&bool(c.discardAvailable)&&int(c.discarded)&&all(c.used,v=>orderIds.has(v),1000)&&uniq(c.used),2,2))fail('command dice');
  for(const [side,c] of s.commands.entries()){
    const ds=[...c.dice,...Object.values(c.assigned).flat(2)];if(!uniq(ds.map(d=>d.id)))fail('duplicate command dice');
    const army=s.options.armies[side],board=army.board||s.options.board||army.nation;
    if(!getCommandBoard(board)||army.subfaction&&!getCommandSubfaction(board,army.subfaction))fail('command board');
    const allowed=new Set(getBoardAbilities(board,army.subfaction).map(a=>a.id));
    for(const [k,baskets] of Object.entries(c.assigned)){
      const ability=getCommandAbility(k);if(!allowed.has(k)||baskets.some(b=>b.length!==ability.cost)||ability.ongoing&&baskets.length>1)fail('assigned command cost');
    }
    for(const [k,h]of Object.entries(c.held))if(!getCommandAbility(k)?.ongoing||!c.assigned[k]?.length||!obj(h)||!ref(h.target))fail('held command ability');
  }
  if (!all(s.orderStack, (o) => obj(o) && side(o.side) && orderIds.has(o.id) && (maybeRef(o.target) || cardRef(o.target) || cardRefs(o.target)) && opt(o.cardIds, cardRefs), 1e3)) fail("command response stack");
  const modes = ["single", "group", "crossfire", "command"], kinds = ["cancel-support", "interact", "feat", "limber", "unlimber", "mount", "dismount", "indirect", "reserve", "camouflage", "discover", "heal", "repair", "place-repeater", "place-hazard", "clear-hazard", "demolition", "program", "recrew"];
  const targetMap = (v) => obj(v) && Object.entries(v).length <= 240 && Object.entries(v).every(([a, b]) => ref(a) && ref(b));
  const decoyIds = new Set(s.decoys.map((d) => d.id)), targetRef = (v) => ref(v) || decoyIds.has(v);
  const opts = (o) => o === void 0 || obj(o) && o.sequence===undefined && opt(o.kind, (v) => en(v, ["move", "pivot", "stand", "prone", "retreat", "assault"])) && nilopt(o.target, targetRef) && nilopt(o.to, point) && nilopt(o.featureId, (v) => terrainIds.has(v)) && nilopt(o.program, (v) => own(PROGRAMS, v)) && nilopt(o.weapon, (v) => own(WEAPONS, v)) && opt(o.fireType, (v) => en(v, ["normal", "he", "penetrating", "incendiary"])) && opt(o.reactive, bool) && opt(o.automatic, bool) && opt(o.facing, (v) => num(v, -1e6, 1e6)) && opt(o.destinations, (v) => obj(v) && Object.entries(v).length <= 240 && Object.entries(v).every(([k, p]) => targetRef(k) && position(p))) && opt(o.extra, (v) => v === null || typeof v === "string" && identifier(v) || all(v, identifier, 10));
  const action = (a) => {
    if (!obj(a) || !en(a.type, ["move", "fire", "firefight", "react", "decline", "rally", "recon", "smoke", "smoke-place", "combat", "skill", "rout", "pass", "begin", "bid", "event", "program-resolve", "special", "order-pass", "reactive-action", "resume-action", "command-refresh", "command-discard", "command-assign", "command-release", "command-trait", "decoy-remove"]) || !opt(a.side, side) || !opt(a.mode, (v) => modes.includes(v)) || !opts(a.options)) return false;
    switch (a.type) {
      case "move":
        return all(a.ids,targetRef,240,1)&&uniq(a.ids) && position(a.to);
      case 'command-refresh':return side(a.side);
      case 'command-discard':return side(a.side)&&identifier(a.id);
      case 'command-assign':return side(a.side)&&orderIds.has(a.id)&&opt(a.dieIds,v=>all(v,identifier,12,1)&&uniq(v));
      case 'command-release':return side(a.side)&&orderIds.has(a.id);
      case 'command-trait':return side(a.side)&&!!getCommandAbility(a.id)?.ongoing&&ref(a.target);
      case 'decoy-remove':return decoyIds.has(a.id);
      case "fire":
        return refs(a.ids, 1) && ref(a.target);
      case "firefight":
        return opt(a.ids, (v) => refs(v)) && opt(a.decline, bool);
      case "react":
        return refs(a.ids, 1) && num(a.t, 0, 1);
      case "rally":
        return maybeRef(a.id) && opt(a.ids, (v) => refs(v)) && (ref(a.id) || a.ids?.length > 0);
      case "recon":
        return refs(a.ids, 1) && terrainIds.has(a.featureId);
      case "smoke":
        return ref(a.id) && point(a.to);
      case "smoke-place":
        return point(a.to);
      case "combat":
        return opt(a.targets, targetMap);
      case "skill":
        return ref(a.id) && kinds.includes(a.kind);
      case "rout":
        return ref(a.id);
      case "bid":
        return all(a.bids, (v) => int(v, 0, 20), 2, 2);
      case "event":
        return maybeRef(a.target);
      case "program-resolve":
        return maybeRef(a.id);
      case "special":
        return side(a.side) && identifier(a.card) && ref(a.target);
      case "reactive-action":
        return ref(a.id) && opt(a.t,v=>num(v,0,1)) && en(a.kind, ["move", "rally", "skill"]) && opt(a.to, (p) => p === null || point(p)) && opt(a.skill, (v) => kinds.includes(v));
      default:
        return true;
    }
  };
  if (!nilopt(s.orderWindow, (w) => obj(w) && action(w.action) && side(w.side) && side(w.priority) && int(w.passes, 0, 1) && nilopt(w.orderScope, identifier)) || !nilopt(s.deferredAction, action)) fail("pending command action");
  if (!all(s.effects, (e) => obj(e) && text(e.name, 200) && opt(e.side, side) && maybeRef(e.target) && opt(e.action, (v) => en(v, ["move", "shoot", "melee", "rally", "skill", "fire", "react", "recon", "smoke", "reactive-action"])) && opt(e.adv, (v) => int(v, -20, 20)) && opt(e.characteristic, (v) => int(v, -20, 20)) && opt(e.order, (v) => orderIds.has(v)) && opt(e.scope, (v) => text(v, 80)) && opt(e.initiative, (v) => int(v)) && opt(e.role, (v) => en(v, ["attacker", "defender"])) && opt(e.coverReduction, (v) => int(v, -20, 20)) && opt(e.defenseDisadvantage, (v) => int(v, -20, 20)) && opt(e.commandFire, bool) && opt(e.slot,v=>!!getCommandAbility(v)?.ongoing) && opt(e.ongoing,bool) && ["all", "retain", "terrifying", "double", "expired", "used"].every((k) => opt(e[k], bool)), 1e3)) fail("command effects");
  const movement = (p) => obj(p) && side(p.side) && all(p.moves, (m) => obj(m) && targetRef(m.id) && position(m.from) && position(m.to) && num(m.to.facing, -1e6, 1e6), 240, 1) && int(p.index, 0, p.moves.length - 1) && en(p.kind, ["move", "pivot", "stand", "prone", "retreat", "assault", "rout"]) && opt(p.reacted, bool) && opt(p.reactors,v=>refs(v)&&uniq(v)) && opt(p.progress,v=>num(v,0,1)) && opt(p.shift, bool) && maybeRef(p.target) && opt(p.routId, ref);
  if (!nilopt(s.pending, movement) || !opt(s.routQueue, (v) => refs(v)) || !opt(s.commandLosses, (v) => refs(v))) fail("pending movement");
  if (!nilopt(s.firefight, (p) => obj(p) && side(p.side) && refs(p.ids, 1) && ref(p.target) && opt(p.mode, (v) => modes.includes(v)) && opts(p.options) && int(p.round, 0, 150))) fail("pending firefight");
  if (!nilopt(s.combat, (c) => obj(c) && side(c.side) && ref(c.target) && refs(c.attackers, 1) && refs(c.defenders, 1) && !c.attackers.some((id) => c.defenders.includes(id)) && opt(c.origins, (v) => obj(v) && Object.entries(v).length <= 240 && Object.entries(v).every(([k, p]) => targetRef(k) && position(p))))) fail("pending melee");
  const dice = (v, sides, max = 512) => all(v, (n) => int(n, 1, sides), max), result = (r) => obj(r) && identifier(r.id) && text(r.label, 300) && en(r.sides, [4, 6, 8, 10, 12]) && int(r.base, 1, 3) && num(r.adv, 0, 1e3) && num(r.dis, 0, 1e3) && int(r.net, -20, 20) && dice(r.roots, r.sides) && dice(r.discarded, r.sides) && all(r.explosions, (v) => dice(v, r.sides), 100) && dice(r.kept, r.sides, 2e4) && int(r.successes, 0, r.kept.length) && opt(r.sequenceSuccesses,v=>int(v,0,20000)) && opt(r.recoverySuccesses,v=>all(v,n=>int(n,0,20000),2,2)) && num(r.target, -20, 100) && opt(r.modifier, (v) => num(v, -1e3, 1e3));
  if (!nilopt(s.programPending, (p) => obj(p) && ref(p.id) && side(p.side) && maybeRef(p.target) && own(PROGRAMS, p.program) && int(p.n, 0, 2e4) && result(p.result) && opt(p.sequence,v=>obj(v)&&int(v.total,1,2)&&int(v.completed,0,1)&&v.completed<v.total&&int(v.best,0,20000)&&side(v.side)) && opt(p.skillOptions,opts) && nilopt(p.to, point) && opt(p.extra, (v) => v === null || typeof v === "string" && identifier(v) || all(v, identifier, 10)))) fail("pending cyberware program");
  if (!nilopt(s.smokeChoice, (c) => obj(c) && side(c.side) && side(c.chooser) && c.chooser === 1 - c.side && ref(c.id) && point(c.target) && num(c.radius, 0.1, 1e3) && opt(c.untilSide,side) && opt(c.expires,v=>int(v)))) fail("pending smoke placement");
  if (!nilopt(s.pendingDice, (p) => obj(p) && action(p.action) && all(p.sides, side, 2, 1) && p.sides.join(",") === (s.options.mode === "hotseat" ? "0,1" : "0") && all(p.rolls, (r) => obj(r) && side(r.side) && p.sides.includes(r.side) && text(r.label, 500) && en(r.sides, [4, 6, 8, 10, 12]) && dice(r.dice, r.sides), 2e3))) fail("pending dice");
  if (!nilopt(s.lastRoll, (r) => result(r) && dice(r.dice, r.sides, 2e4) && text(r.text, 1e3))) fail("last dice result");
  if(!all(s.fireEvents,e=>obj(e)&&identifier(e.id)&&ref(e.firerId)&&maybeRef(e.targetId)&&nilopt(e.featureId,v=>terrainIds.has(v))&&(ref(e.targetId)||terrainIds.has(e.featureId))&&side(e.side)&&position(e.from)&&position(e.to)&&en(e.mode,['single','group','crossfire','recon','reactive','indirect'])&&text(e.result,300)&&int(e.action,0,s.actions)&&int(e.initiative,0,s.initiative)&&int(e.shotCount,1,100000)&&bool(e.concealed),2000)||!uniq(s.fireEvents.map(e=>e.id))||!int(s.fireEventSerial))fail('persistent firing markers');
  try{validateHistory(s.history,s.historyCursor??s.history?.length);}catch{fail('undo/redo history');}
  if (!nilopt(s.lastFire, (f) => obj(f) && int(f.action, 0, s.actions) && int(f.initiative, 0, s.initiative) && bool(f.reactive) && all(f.shots, (v) => obj(v) && ref(v.firerId) && ref(v.targetId) && side(v.side) && position(v.from) && position(v.to) && text(v.result, 200) && opt(v.concealed, bool) && opt(v.sides, (n) => en(n, [4, 6, 8, 10, 12])) && dice(v.dice, v.sides || 12, 2e4) && opt(v.pool, result), 2e3))) fail("last shot record");
  if (!all(s.lastMoves, (m) => obj(m) && targetRef(m.id) && position(m.from) && position(m.to) && int(m.initiative, 0, s.initiative), 16)) fail("movement trails");
  if (!all(s.log, (l) => obj(l) && int(l.n, 0, s.actions) && int(l.initiative, 0, s.initiative) && side(l.side) && text(l.text, 4e3) && en(l.kind, ["event", "move", "fire", "rally", "recon", "initiative", "combat", "victory", "skill", "morale", "order"]) && nilopt(l.dice, (v) => dice(v, 12, 2e4)), 300) || !all(s.history, obj, 1e3)) fail("event history");
  if (!nilopt(s.actionContext, (c) => obj(c) && text(c.kind, 40) && refs(c.ids) && nilopt(c.orderScope, identifier))) fail("action context");
  if (!opt(s.commandScopeSerial, (v) => int(v)) || !nilopt(s.activeOrderScope, identifier)) fail("command scope");
  return s;
}
export {
  validateGameSave
};
