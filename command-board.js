import {CATALOG} from './catalog.js';

// Content asset only. Bowl generation, assignment, activation and payment belong
// to the rules engine. Provisional identity, traits and prices are reviewable
// proposals; they are never described here as approved rulebook material.
const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){for(const entry of Object.values(value))freeze(entry);Object.freeze(value);}return value;};
export const UNIVERSAL_BASIC_IDS=freeze(['fire','charge','regroup','do-it']);
export const ATHENIAN_SOURCE_ORDER_IDS=freeze([...UNIVERSAL_BASIC_IDS,'take-cover','bad-cover','command-control','try-again','fire-at-will','incoming-intelligence','misfire','keep-firing','morale-break']);

export const COMMAND_BOARD_RULES=freeze({
 id:'mixed-quality-success-bowl',
 authority:'Nathan Culver player rulings, rounds 6–7; supersedes old d12-symbol pricing.',
 qualityDice:{irregular:4,regular:6,veteran:8,elite:10,super:12},
 contribution:'one die per eligible deployed troop unit or commander, using its own quality; never count a commander twice',
 successAtLeast:4,
 maximumExplodes:true,
 failedRollHandling:'discard immediately',
 successfulRollHandling:'assign successful dice directly to ability slots; no Command Point conversion',
 refresh:'only after every die in that bowl is used or removed, including armed and ongoing-trait dice',
 fullInitiativeReset:false,
 optionalDiscardPerOwnInitiative:1,
 activationRequiredForEveryAbility:true,
 ongoingActivation:'commit the required success die; effect lasts only while that activated die remains assigned',
 ongoingRelease:'removing or spending its committed die ends the effect and counts that die as used',
 normalActivation:'spend/discard the required assigned success dice when activating the ability',
 pricingStatus:'PROVISIONAL individual success costs for review; effects of existing Orders remain defined by their source/rulings'
});

// These are new prices for the revised bowl, not conversions of the obsolete
// Common/Uncommon/Rare/Unique symbols. Stronger repeated/characteristic/morale
// abilities deliberately cost two or more successes.
const prices=freeze({
 fire:1,charge:1,regroup:1,'do-it':1,
 'take-cover':1,'the-cavalry-have-arrived':1,'keep-it-together':1,drive:1,
 bloodthirsty:2,'try-again':2,misfire:1,'disordered-charge':1,mistake:1,'bad-cover':1,
 'fire-at-will':2,'keep-firing':2,'keep-fighting':2,'keep-it-up':2,'hell-s-fire':3,
 'take-aim':2,'spill-blood':2,'esprit-de-corps':2,'best-of-the-best':2,
 'incoming-intelligence':1,'command-control':2,'seize-the-initiative':3,
 'incoming-intelligence-dump':2,'command-supremacy':3,'morale-break':2
});
const fx=(kind,fields)=>({kind,...fields});
const target=(side,unitClass='infantry',role='actor')=>({side,unitClass,role});
const specifications={
 fire:{action:'shoot',targeting:target('friendly'),effects:[fx('action-bonus',{action:'shoot',adv:1})]},
 charge:{action:'melee',targeting:target('friendly'),effects:[fx('action-bonus',{action:'melee',adv:1})]},
 regroup:{action:'rally',targeting:target('friendly'),effects:[fx('action-bonus',{action:'rally',adv:1})]},
 'do-it':{action:'skill',targeting:target('friendly'),effects:[fx('action-bonus',{action:'skill',adv:1})]},
 'take-cover':{action:'shoot',targeting:{...target('friendly','infantry','defender'),requiresTerrain:true},effects:[fx('defense',{action:'shoot',defenseDisadvantage:1,requiresTerrain:true})],ruling:'Player ruling round 1: incoming shooting suffers one extra Disadvantage.'},
 'the-cavalry-have-arrived':{action:'shoot',targeting:target('friendly','vehicle'),effects:[fx('action-bonus',{action:'shoot',adv:1})]},
 'keep-it-together':{action:'rally',targeting:target('friendly','vehicle'),effects:[fx('action-bonus',{action:'rally',adv:1})]},
 drive:{action:'shoot',targeting:{...target('friendly','vehicle','defender'),requiresTerrain:true},effects:[fx('defense',{action:'shoot',defenseDisadvantage:1,requiresTerrain:true})],ruling:'Player ruling round 1: incoming shooting suffers one extra Disadvantage.'},
 bloodthirsty:{action:'melee',targeting:target('friendly'),effects:[fx('repeat-action',{action:'melee',repeats:2,sequential:true})]},
 'try-again':{action:'skill',targeting:target('friendly'),effects:[fx('repeat-action',{action:'skill',repeats:2,sequential:true,sameSkill:true,sameTarget:true})],ruling:'Player ruling round 1: both attempts use the same Skill and target.'},
 misfire:{action:'shoot',targeting:target('enemy'),effects:[fx('action-bonus',{action:'shoot',adv:-1})]},
 'disordered-charge':{action:'melee',targeting:target('enemy'),effects:[fx('action-bonus',{action:'melee',adv:-1})]},
 mistake:{action:'skill',targeting:target('enemy'),effects:[fx('action-bonus',{action:'skill',adv:-1})]},
 'bad-cover':{action:'shoot',targeting:{...target('enemy','infantry','defender'),requiresTerrain:true},effects:[fx('cover-reduction',{action:'shoot',coverReduction:1,requiresTerrain:true,clampToExistingCover:true})],ruling:'Main-text effect overrides conflicting recovered board artwork: remove one target cover Disadvantage against incoming shooting.'},
 'fire-at-will':{action:'shoot',targeting:target('friendly'),effects:[fx('repeat-action',{action:'shoot',repeats:2,sequential:true})]},
 'keep-firing':{action:'shoot',targeting:target('self','player','player'),effects:[fx('retain-initiative',{action:'shoot',retain:true,on:'would-lose-initiative',uses:1})]},
 'keep-fighting':{action:'melee',targeting:target('self','player','player'),effects:[fx('retain-initiative',{action:'melee',retain:true,on:'would-lose-initiative',uses:1})]},
 'keep-it-up':{action:'skill',targeting:target('self','player','player'),effects:[fx('retain-initiative',{action:'skill',retain:true,on:'would-lose-initiative',uses:1})]},
 'hell-s-fire':{action:'shoot',targeting:target('friendly','vehicle'),effects:[fx('repeat-action',{action:'shoot',repeats:2,sequential:true,perMountedWeapon:true})]},
 'take-aim':{action:'shoot',targeting:target('friendly'),effects:[fx('action-bonus',{action:'shoot',characteristic:1})]},
 'spill-blood':{action:'melee',targeting:target('friendly'),effects:[fx('action-bonus',{action:'melee',characteristic:1})]},
 'esprit-de-corps':{action:'rally',targeting:target('friendly'),effects:[fx('action-bonus',{action:'rally',characteristic:1})]},
 'best-of-the-best':{action:'skill',targeting:target('friendly'),effects:[fx('action-bonus',{action:'skill',characteristic:1})]},
 'incoming-intelligence':{action:'morale',targeting:target('enemy','player','player'),effects:[fx('morale-reveal',{count:2,random:true})],duration:'instant'},
 'command-control':{action:'morale',targeting:target('self','player','player'),effects:[fx('morale-return',{count:1,choose:true,destination:'shared-deck'})],duration:'instant'},
 'seize-the-initiative':{action:'any',targeting:target('self','player','player'),effects:[fx('retain-initiative',{action:'any',retain:true,on:'would-lose-initiative',uses:1})]},
 'incoming-intelligence-dump':{action:'morale',targeting:target('enemy','player','player'),effects:[fx('morale-reveal',{count:4,random:true})],duration:'instant'},
 'command-supremacy':{action:'morale',targeting:target('self','player','player'),effects:[fx('morale-return',{count:2,choose:true,destination:'shared-deck'})],duration:'instant'},
 'morale-break':{action:'morale',targeting:target('enemy','player','player'),effects:[fx('morale-draw',{count:1})],duration:'instant'}
};

const sourceAbilities=Object.fromEntries(CATALOG.command.orders.map(order=>{
 const spec=specifications[order.id];
 if(!spec||!prices[order.id])throw Error('Missing command-board content for source Order '+order.id);
 return[order.id,{
  id:order.id,name:order.name,description:['take-cover','drive'].includes(order.id)?'Incoming shooting against the selected friendly '+(order.id==='drive'?'Vehicle':'Infantry unit')+' in terrain suffers 1 additional Disadvantage.':order.id==='try-again'?'Resolve two attempts of the same Skill against the same target, one at a time.':order.effect,sourceEffect:order.effect,
  sourceKeywords:[...order.keywords],sourceLines:[...order.sourceLines],
  sourceKind:'defined-order',basic:UNIVERSAL_BASIC_IDS.includes(order.id),
  cost:prices[order.id],ongoing:false,provisional:false,provisionalPricing:true,
  requiresActivation:true,automatic:false,payment:'spend',
  activationLimit:UNIVERSAL_BASIC_IDS.includes(order.id)?'repeatable':'once-per-initiative',
  maxInstances:UNIVERSAL_BASIC_IDS.includes(order.id)?null:1,
  duration:spec.duration||'declared-action',...spec,
  reviewLabel:'Defined effect · provisional success cost',
  // Historical metadata only. The engine must not use these retired symbols
  // to pay for a success-bowl ability.
  legacyRequiredDice:[...order.requiredDice]
 }];
}));

function trait(id,name,description,targeting,effects){
 return{id,name,description,sourceKind:'authored-provisional',basic:false,cost:1,
  ongoing:true,provisional:true,provisionalPricing:true,requiresActivation:true,
  automatic:false,payment:'commit',activationLimit:'one-committed-instance',maxInstances:1,
  duration:'while-assigned',targeting,effects,
  selection:'Choose the target unit at activation. It remains the same until released and reactivated.',
  release:'Removing or spending the assigned success die immediately ends the trait.',
  refillBlocker:true,reviewLabel:'PROVISIONAL faction/subfaction trait · review required'};
}
const traits=[
 trait('trait-athenian-cohesion','Cohesion Protocol',
  'Activate on one friendly Infantry unit. That unit gains one Advantage on Rally actions while this success die remains committed.',
  target('friendly'),[fx('action-bonus',{action:'rally',adv:1})]),
 trait('trait-athenian-logicians','Calculated Execution',
  'Activate on one friendly Infantry unit. That unit gains one Advantage on Skill actions while this success die remains committed.',
  target('friendly'),[fx('action-bonus',{action:'skill',adv:1})]),
 trait('trait-athenian-wardens','Citadel Discipline',
  'Activate on one friendly Infantry unit. While that unit is in terrain, incoming shooting against it suffers one additional Disadvantage while this success die remains committed.',
  {...target('friendly','infantry','defender'),requiresTerrain:true},[fx('defense',{action:'shoot',defenseDisadvantage:1,requiresTerrain:true})]),
 trait('trait-expedition-autonomy','Field Autonomy',
  'Activate on one friendly Infantry unit. That unit gains one Advantage on Skill actions while this success die remains committed.',
  target('friendly'),[fx('action-bonus',{action:'skill',adv:1})]),
 trait('trait-expedition-surveyors','Surveyed Fire Lane',
  'Activate against one enemy Infantry unit in terrain. Reduce that target’s terrain-cover Disadvantage against your incoming shooting by one while this success die remains committed. Never reduce cover below zero.',
  {...target('enemy','infantry','defender'),requiresTerrain:true},[fx('cover-reduction',{action:'shoot',coverReduction:1,requiresTerrain:true,clampToExistingCover:true})]),
 trait('trait-expedition-relief','Recovery Drill',
  'Activate on one friendly Infantry unit. That unit gains one Advantage on Rally actions while this success die remains committed.',
  target('friendly'),[fx('action-bonus',{action:'rally',adv:1})]),
 trait('trait-dominion-drive','Conquest Imperative',
  'Activate on one friendly Infantry unit. That unit gains one Advantage on Melee actions while this success die remains committed.',
  target('friendly'),[fx('action-bonus',{action:'melee',adv:1})]),
 trait('trait-dominion-forgeborn','Bastion Link',
  'Activate on one friendly Vehicle unit. While that vehicle is in terrain, incoming shooting against it suffers one additional Disadvantage while this success die remains committed.',
  {...target('friendly','vehicle','defender'),requiresTerrain:true},[fx('defense',{action:'shoot',defenseDisadvantage:1,requiresTerrain:true})]),
 trait('trait-dominion-vanguard','Predator Focus',
  'Activate on one friendly Infantry unit. That unit gains one Advantage on Shooting actions while this success die remains committed.',
  target('friendly'),[fx('action-bonus',{action:'shoot',adv:1})])
];

export const COMMAND_ABILITIES=freeze({...sourceAbilities,...Object.fromEntries(traits.map(t=>[t.id,t]))});
export const COMMAND_ABILITY_LIST=freeze(Object.values(COMMAND_ABILITIES));

const subfaction=(id,name,theme,abilityId)=>({id,name,theme,provisional:true,reviewLabel:'PROVISIONAL authored subfaction',abilityIds:[abilityId]});
function board({id,name,theme,advancedAbilityIds=[],traitIds=[],subfactions=[],provisional=false,sourceOrderIds=null}){
 return{id,name,theme,provisional,reviewLabel:provisional?'PROVISIONAL authored board':'Recovered faction board · draft extensions/prices marked separately',
  basicAbilityIds:[...UNIVERSAL_BASIC_IDS],advancedAbilityIds:[...advancedAbilityIds],traitIds:[...traitIds],
  abilityIds:[...UNIVERSAL_BASIC_IDS,...advancedAbilityIds,...traitIds],subfactions,
  ...(sourceOrderIds?{sourceOrderIds:[...sourceOrderIds]}:{}),
  pricingProvisional:true,subfactionSelection:'Choose at most one; its trait is optional and still requires activation.'};
}
export const COMMAND_BOARDS=freeze({
 athenian:board({id:'athenian',name:'The Athenian Order',
  theme:'Disciplined combined action, controlled fire lanes and command intelligence.',
  advancedAbilityIds:ATHENIAN_SOURCE_ORDER_IDS.filter(id=>!UNIVERSAL_BASIC_IDS.includes(id)),
  sourceOrderIds:ATHENIAN_SOURCE_ORDER_IDS,traitIds:['trait-athenian-cohesion'],
  subfactions:[
   subfaction('athenian-logicians','Logician Cohorts','Analysts, task precision and coordinated execution.','trait-athenian-logicians'),
   subfaction('athenian-wardens','Citadel Wardens','Defensive doctrine and prepared positions.','trait-athenian-wardens')
  ]}),
 expedition:board({id:'expedition',name:'Expeditionary Accord',provisional:true,
  theme:'Independent frontier forces, practical skills, recovery and mobile support.',
  advancedAbilityIds:['the-cavalry-have-arrived','keep-it-together','drive','try-again','best-of-the-best'],
  traitIds:['trait-expedition-autonomy'],subfactions:[
   subfaction('expedition-surveyors','Frontier Surveyors','Observers survey a lane before the advance.','trait-expedition-surveyors'),
   subfaction('expedition-relief','Relief Columns','Recovery teams keep isolated forces operational.','trait-expedition-relief')
  ]}),
 dominion:board({id:'dominion',name:'Obsidian Dominion',provisional:true,
  theme:'Deliberate pressure, close assault, armored firepower and refusal to yield.',
  advancedAbilityIds:['bloodthirsty','disordered-charge','hell-s-fire','spill-blood','keep-fighting'],
  traitIds:['trait-dominion-drive'],subfactions:[
   subfaction('dominion-forgeborn','Forgeborn Legions','Armored cohorts establish an unbroken firing position.','trait-dominion-forgeborn'),
   subfaction('dominion-vanguard','Vanguard Clades','Predatory assault teams maintain focused fire.','trait-dominion-vanguard')
  ]}),
 all:board({id:'all',name:'Complete Order catalog',
  theme:'Utility/custom selection containing every defined Order. This is not an additional canonical faction.',
  advancedAbilityIds:CATALOG.command.orders.map(o=>o.id).filter(id=>!UNIVERSAL_BASIC_IDS.includes(id))})
});
export const BOARD_LIST=freeze(Object.values(COMMAND_BOARDS));

export function getCommandAbility(id){return COMMAND_ABILITIES[id==='hells-fire'?'hell-s-fire':id]||null;}
export function getCommandBoard(id='athenian'){return COMMAND_BOARDS[id]||null;}
export function getCommandSubfaction(boardId,subfactionId){return getCommandBoard(boardId)?.subfactions.find(s=>s.id===subfactionId)||null;}
export function getBoardAbilities(boardId='athenian',subfactionId=null,{includeTraits=true}={}){
 const selected=getCommandBoard(boardId);if(!selected)return[];
 const sub=subfactionId?getCommandSubfaction(boardId,subfactionId):null;
 const ids=[...selected.abilityIds,...(sub?.abilityIds||[])];
 return[...new Set(ids)].map(getCommandAbility).filter(a=>a&&(includeTraits||!a.ongoing));
}
export function boardHasAbility(boardId,subfactionId,abilityId){return getBoardAbilities(boardId,subfactionId).some(a=>a.id===getCommandAbility(abilityId)?.id);}

// Pure consistency audit for the engine's tests/build. No game-state mutation.
export function validateCommandBoardContent(){
 const errors=[];
 for(const o of CATALOG.command.orders){const a=getCommandAbility(o.id);if(!a)errors.push('Missing source Order '+o.id);else if(a.sourceEffect!==o.effect)errors.push('Source effect changed for '+o.id);}
 for(const a of COMMAND_ABILITY_LIST){
  if(!Number.isInteger(a.cost)||a.cost<1)errors.push('Invalid success cost '+a.id);
  if(a.ongoing&&(a.cost!==1||!a.id.startsWith('trait-')||a.payment!=='commit'))errors.push('Invalid ongoing trait '+a.id);
  if(!a.ongoing&&!sourceAbilities[a.id])errors.push('Undefined new active Order '+a.id);
  if(!a.requiresActivation||a.automatic)errors.push('Free passive not allowed '+a.id);
 }
 for(const b of BOARD_LIST){
  if(new Set(b.abilityIds).size!==b.abilityIds.length)errors.push('Duplicate ability on '+b.id);
  for(const id of b.abilityIds)if(!getCommandAbility(id))errors.push('Unknown ability '+id+' on '+b.id);
  for(const id of UNIVERSAL_BASIC_IDS)if(!b.basicAbilityIds.includes(id))errors.push('Missing universal basic '+id+' on '+b.id);
  for(const sub of b.subfactions)for(const id of sub.abilityIds)if(!getCommandAbility(id))errors.push('Unknown subfaction ability '+id);
 }
 return errors;
}
