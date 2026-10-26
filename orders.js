import {CATALOG} from './catalog.js';
import {feature as geometryFeature} from './geometry.js';

// Basic/advanced classification comes from the recovered Athenian board image,
// rather than guessing that every Common-cost Order is basic.
export const BASIC_ORDER_IDS=Object.freeze(['fire','charge','regroup','do-it']);
export const ATHENIAN_ORDER_IDS=Object.freeze([...BASIC_ORDER_IDS,'take-cover','bad-cover','command-control','try-again','fire-at-will','incoming-intelligence','misfire','keep-firing','morale-break']);
export const COMMAND_ORDERS=Object.freeze(CATALOG.command.orders.map(o=>Object.freeze({...o,basic:BASIC_ORDER_IDS.includes(o.id),athenian:ATHENIAN_ORDER_IDS.includes(o.id)})));
const byId=new Map(COMMAND_ORDERS.map(o=>[o.id,o]));
export const canonicalOrderId=id=>id==='hells-fire'?'hell-s-fire':id;
const isVehicle=u=>['vehicle','drone'].includes(u?.type);
const ownSideOrders=new Set(['fire','charge','regroup','do-it','take-cover','the-cavalry-have-arrived','keep-it-together','drive','bloodthirsty','try-again','fire-at-will','hell-s-fire','take-aim','spill-blood','esprit-de-corps','best-of-the-best']);
const enemySideOrders=new Set(['misfire','disordered-charge','mistake','bad-cover']);
const playerOrders=new Set(['keep-firing','keep-fighting','keep-it-up','seize-the-initiative','command-control','command-supremacy','incoming-intelligence','incoming-intelligence-dump','morale-break']);
const actionById={fire:'shoot',charge:'melee',regroup:'rally','do-it':'skill','the-cavalry-have-arrived':'shoot','keep-it-together':'rally',bloodthirsty:'melee','try-again':'skill',misfire:'shoot','disordered-charge':'melee',mistake:'skill','fire-at-will':'shoot','hell-s-fire':'shoot','take-aim':'shoot','spill-blood':'melee','esprit-de-corps':'rally','best-of-the-best':'skill','keep-firing':'shoot','keep-fighting':'melee','keep-it-up':'skill'};
const negativeIds=new Set(['misfire','disordered-charge','mistake']);
const characteristicIds=new Set(['take-aim','spill-blood','esprit-de-corps','best-of-the-best']);
const doubleIds=new Set(['fire-at-will','bloodthirsty','try-again','hell-s-fire']);
const retainIds=new Set(['keep-firing','keep-fighting','keep-it-up','seize-the-initiative']);
const hiddenCards=m=>[...(m?.cards||[]),...(m?.specials||[])];
const unitById=(s,id)=>s.units?.find(u=>u.id===id);
const unitPresent=u=>u&&!u.dead&&!u.surrendered&&!u.offTable;
const effectLive=(s,e)=>!e.used&&!e.expired&&(!e.order||e.initiative===undefined||e.initiative===s.initiative);
const normalizeIds=ids=>(ids||[]).map(u=>typeof u==='string'?u:u?.id).filter(Boolean);

export function commandActionKind(action){
 const kind=typeof action==='string'?action:action?.type;
 if(['fire','firefight','react','recon','shoot','shooting'].includes(kind))return'shoot';
 if(['combat','melee'].includes(kind))return'melee';
 if(kind==='reactive-action')return commandActionKind(action.kind==='skill'?'skill':action.kind==='rally'?'rally':action.kind);
 return kind;
}

function participants(s,action){
 const kind=commandActionKind(action),ids=new Set([...(action?.ids||[]),...(action?.id?[action.id]:[])]);
 if(kind==='melee')for(const id of [...(s.combat?.attackers||[]),...(s.combat?.defenders||[])])ids.add(id);
 if(action?.type==='firefight')for(const id of s.firefight?.ids||[])ids.add(id);
 return ids;
}
function incomingTargets(s,action){
 const ids=new Set();
 if(action?.target)ids.add(action.target);
 if(action?.type==='firefight'){
  if(s.firefight?.target)ids.add(s.firefight.target);
  for(const id of s.firefight?.ids||[])ids.add(id);
 }
 if(action?.type==='react'&&s.pending){const m=s.pending.moves[s.pending.index];if(m)ids.add(m.id);}
 return ids;
}

// Call before spending the armed dice. Resolution itself intentionally does not
// recheck battlefield conditions: previously activated Orders survive removal
// of their source and fix their effects at activation, as the source specifies.
export function commandOrderError(s,{side,id,target,cardIds},helpers={}){
 id=canonicalOrderId(id);const o=byId.get(id);
 if(!o)return'Unknown Command Board Order.';
 if(![0,1].includes(side))return'Choose a command side.';

 const w=s.orderWindow,action=w?.action,kind=commandActionKind(action),expected=actionById[id];
 if(expected&&kind&&kind!==expected)return'This Order does not apply to the declared action.';
 if(['take-cover','drive','bad-cover'].includes(id)&&kind&&kind!=='shoot')return'Terrain protection Orders apply to incoming shooting.';
 if(playerOrders.has(id)){
  if(['command-control','command-supremacy'].includes(id)){
   const cards=hiddenCards(s.morale?.[side]);const limit=id==='command-control'?1:2;
   const chosen=cardIds??(Array.isArray(target)?target:typeof target==='string'&&cards.some(c=>c.id===target)?[target]:null);
   if(chosen!==null&&(!Array.isArray(chosen)||chosen.length!==Math.min(limit,cards.length)||new Set(chosen).size!==chosen.length||chosen.some(id=>!cards.some(c=>c.id===id))))return`Choose ${Math.min(limit,cards.length)} of your held Force Morale cards.`;
  }
  return null;
 }
 const t=(helpers.unit||unitById)(s,target);
 if(!unitPresent(t))return'Choose a deployed target unit.';
 if(ownSideOrders.has(id)&&t.side!==side)return'This Order requires a friendly unit.';
 if(enemySideOrders.has(id)&&t.side===side)return'This Order requires an enemy unit.';
 if(o.keywords.includes('Infantry')&&isVehicle(t))return'This Order requires an Infantry unit.';
 if(o.keywords.includes('Vehicle')&&!isVehicle(t))return'This Order requires a Vehicle unit.';
 if(['take-cover','drive','bad-cover'].includes(id)){
  if(!(helpers.feature||geometryFeature)(s,t))return'The target must be within terrain.';
  const incoming=incomingTargets(s,action);if(action&&incoming.size&&!incoming.has(t.id))return'Choose a target of the declared incoming shooting.';
 }else if(action){const actors=participants(s,action);if(actors.size&&!actors.has(t.id))return'The target must be performing the declared action.';}
 return null;
}

function seededShuffle(s,values){
 const result=[...values];for(let i=result.length-1;i>0;i--){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;const j=Math.floor(s.seed/4294967296*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;
}
function scopeFor(s){
 const w=s.orderWindow;
 if(!w)return s.activeOrderScope??s.actionContext?.orderScope??null;
 // The scope is saved with the window, so suspended dice and saved games use
 // the same effect lifetime and do not accidentally reroll or reapply Orders.
 return w.orderScope??= `order-${s.initiative}-${s.actions}-${s.commandScopeSerial=(s.commandScopeSerial||0)+1}`;
}

export function resolveCommandOrder(s,{side,id,target,cardIds},helpers={}){
 id=canonicalOrderId(id);const o=byId.get(id);
 if(!o)throw Error('Unknown Command Board Order.');
 if(![0,1].includes(side))throw Error('Choose a command side.');
 const shuffle=helpers.shuffle||seededShuffle,emit=text=>helpers.log?.(s,text,'order');
 if(['command-control','command-supremacy'].includes(id)){
  const m=s.morale[side],available=hiddenCards(m),count=Math.min(id==='command-control'?1:2,available.length);
  let chosen=cardIds??(Array.isArray(target)?target:typeof target==='string'&&available.some(c=>c.id===target)?[target]:null);
  if(chosen===null&&helpers.selectMoraleCards)chosen=helpers.selectMoraleCards(s,side,available,count);
  if(chosen===null&&available.length<=count)chosen=available.map(c=>c.id);
  if(!Array.isArray(chosen)||chosen.length!==count||new Set(chosen).size!==chosen.length||chosen.some(id=>!available.some(c=>c.id===id)))throw Error(`Choose ${count} of your held Force Morale cards for ${o.name}`);
  const selected=available.filter(c=>chosen.includes(c.id));
  m.cards=m.cards.filter(c=>!chosen.includes(c.id));m.specials=(m.specials||[]).filter(c=>!chosen.includes(c.id));
  s.deck=shuffle(s,[...(s.deck||[]),...selected.map(c=>{const next={...c};delete next.revealed;return next;})]);
  emit(`${o.name} returns ${selected.length} chosen Force Morale card(s) to the shared deck.`);return{kind:'morale-return',cards:selected.map(c=>c.id)};
 }
 if(['incoming-intelligence','incoming-intelligence-dump'].includes(id)){
  const selected=shuffle(s,hiddenCards(s.morale[1-side])).slice(0,id==='incoming-intelligence'?2:4);
  for(const c of selected)c.revealed=true;
  emit(`${o.name} reveals ${selected.length} random opposing Force Morale card(s).`);return{kind:'morale-reveal',cards:selected.map(c=>c.id)};
 }
 if(id==='morale-break'){
  if(!helpers.drawMorale)throw Error('Morale Break requires the morale drawing helper.');
  const card=helpers.drawMorale(s,1-side,'Morale Break Order');return{kind:'morale-draw',side:1-side,card};
 }
 const kind=actionById[id]||commandActionKind(s.orderWindow?.action)||s.actionContext?.kind;
 const effect={name:o.name,order:id,side,action:kind,initiative:s.initiative,scope:scopeFor(s)};
 if(retainIds.has(id)){
  effect.retain=true;if(id==='seize-the-initiative')delete effect.action;
 }else{
  const t=(helpers.unit||unitById)(s,target);if(!t)throw Error('Choose a target unit for this Order.');
  // Ownership/class are immutable activation facts for this Order. Do not
  // require a still-alive source or re-evaluate terrain at stack resolution.
  if(ownSideOrders.has(id)&&t.side!==side||enemySideOrders.has(id)&&t.side===side)throw Error('The Order has the wrong target side.');
  if(o.keywords.includes('Infantry')&&isVehicle(t)||o.keywords.includes('Vehicle')&&!isVehicle(t))throw Error('The Order has the wrong target type.');
  effect.target=t.id;
  if(id==='bad-cover'){effect.action='shoot';effect.role='defender';effect.coverReduction=1;}
  else if(id==='take-cover'||id==='drive'){effect.action='shoot';effect.role='defender';effect.defenseDisadvantage=1;}
  else if(characteristicIds.has(id))effect.characteristic=1;
  else if(doubleIds.has(id))effect.double=true;
  else effect.adv=negativeIds.has(id)?-1:1;
 }
 (s.effects??=[]).push(effect);emit(`${o.name} resolves${effect.target?' for '+effect.target:''}.`);return{kind:'effect',effect};
}

function inScope(e,scope){return scope==null||e.scope==null||e.scope===scope;}
function actorEffects(s,u,kind,{scope=s.activeOrderScope??s.actionContext?.orderScope??null}={}){
 kind=commandActionKind(kind);return(s.effects||[]).filter(e=>effectLive(s,e)&&inScope(e,scope)&&e.role!=='defender'&&!e.retain&&(e.target===u.id||e.all&&e.side===u.side)&&(!e.action||commandActionKind(e.action)===kind));
}

export function actionCommandBonus(s,u,kind,options={}){
 const effects=actorEffects(s,u,kind,options),double=effects.some(e=>e.double);
 return{adv:effects.reduce((n,e)=>n+(e.adv||0),0),modifier:effects.reduce((n,e)=>n+(e.characteristic||0),0),double,repeats:double?2:1,effects};
}

// Apply this ONLY to the incoming target's terrain-cover component. Bad Cover
// does not improve the enemy's own shooting, remove armor, or grant a net bonus
// when that target has no cover penalty. Take Cover/Drive are defensive Orders.
export function commandDefenseBonus(s,target,{kind='shoot',cover=0,scope=s.activeOrderScope??s.actionContext?.orderScope??null}={}){
 if(commandActionKind(kind)!=='shoot')return{dis:0,coverReduction:0,effects:[]};
 const effects=(s.effects||[]).filter(e=>effectLive(s,e)&&(!e.requiresTerrain||geometryFeature(s,target))&&inScope(e,scope)&&e.role==='defender'&&e.target===target.id&&(!e.action||commandActionKind(e.action)==='shoot'));
 const dis=effects.reduce((n,e)=>n+(e.defenseDisadvantage||0),0),coverReduction=Math.min(Math.max(0,cover)+dis,effects.reduce((n,e)=>n+(e.coverReduction||0),0));
 return{dis,coverReduction,effects};
}

// Call after every completed unit action (after both pools of a double action,
// or every mounted weapon). Retain effects must survive until shift() tests the
// action outcome; never consume them together with a unit's shooting buffs.
export function consumeCommandAction(s,{kind,actors=[],targets=[],scope=s.activeOrderScope??s.actionContext?.orderScope??null}={}){
 kind=commandActionKind(kind);const actorIds=normalizeIds(actors),targetIds=normalizeIds(targets),used=[];
 for(const e of s.effects||[]){
  if(!effectLive(s,e)||!inScope(e,scope)||e.retain||e.ongoing||e.action&&commandActionKind(e.action)!==kind)continue;
  if(e.role!=='defender'&&!Number.isFinite(e.adv)&&!Number.isFinite(e.characteristic)&&!e.double)continue;
  const match=e.role==='defender'?targetIds.includes(e.target):actorIds.includes(e.target)||e.all&&(s.units||[]).some(u=>actorIds.includes(u.id)&&u.side===e.side);
  if(match){e.used=true;used.push(e);}
 }
 return used;
}

export function consumeRetainCommandEffect(s,{side=s.active,kind=s.actionContext?.kind,ids=s.actionContext?.ids||[],scope=s.activeOrderScope??s.actionContext?.orderScope??null}={}){
 kind=commandActionKind(kind);const actorIds=normalizeIds(ids);
 const effect=(s.effects||[]).find(e=>effectLive(s,e)&&inScope(e,scope)&&e.retain&&e.side===side&&(!e.action||commandActionKind(e.action)===kind)&&(!e.target||actorIds.includes(e.target)));
 if(effect)effect.used=true;return effect||null;
}

// Call once the entire declared action has ended, including any suspended
// shooting/Counterware response, to prevent unused Order modifiers from leaking.
// Non-Order Heroism/commander feats are deliberately retained for their specified
// next-failure timing; only effects created by resolveCommandOrder are expired.
export function expireCommandScope(s,scope){
 if(scope==null)return;for(const e of s.effects||[])if(e.order&&e.scope===scope)e.expired=true;
}

export const ORDER_INTERPRETATIONS=Object.freeze([
 'Take Cover! and Drive! have an ambiguous main-text “gains Advantage within Terrain” effect. This implementation treats that as one additional defensive Disadvantage on incoming shooting, consistent with their protection role and recovered board shooting timing.',
 'Bad Cover! removes one existing terrain-cover Disadvantage against incoming shooting; main text overrides the recovered board image, which has a conflicting enemy-Disadvantage sentence.',
 'Command Control!/Supremacy return the player’s chosen held morale cards to the common deck; the source describes one shared deck but says “your deck” in these Orders.',
 'The four Athenian basic Orders are Fire!, Charge!, Regroup! and Do it!; all other named generic Orders are advanced unless a future faction board explicitly marks them basic.'
]);
