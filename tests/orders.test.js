import test from 'node:test';
import assert from 'node:assert/strict';
import {COMMAND_ORDERS,ATHENIAN_ORDER_IDS,commandActionKind,commandOrderError,resolveCommandOrder,actionCommandBonus,commandDefenseBonus,consumeCommandAction,consumeRetainCommandEffect,expireCommandScope} from '../orders.js';
import {pool,withDice} from '../rolls.js';

function fixture(action={type:'fire',ids:['blue'],target:'red'}){
 const stand=(id,side,x,type='rifle')=>({id,side,x,y:100,type,quality:'regular',facing:side?180:0,markers:[],status:'ready',dead:false,surrendered:false,offTable:false});
 return{seed:123,actions:0,initiative:3,active:0,options:{board:'catalog'},units:[stand('blue',0,100),stand('red',1,500),stand('blue-v',0,100,'vehicle'),stand('red-v',1,500,'vehicle'),stand('blue-other',0,100)],terrain:[{id:'blue-woods',type:'woods',points:[[50,50],[150,50],[150,150],[50,150]]},{id:'red-woods',type:'woods',points:[[450,50],[550,50],[550,150],[450,150]]}],effects:[],morale:[{cards:[{id:'b1',value:1},{id:'b5',value:5},{id:'b2',value:2}],specials:[{id:'b-hero',value:'heroism'}]},{cards:[{id:'r1',value:1},{id:'r5',value:5}],specials:[{id:'r-mine',value:'mine'}]}],deck:[{id:'deck',value:2}],orderWindow:{action,side:0,priority:0,passes:0},orderStack:[],commands:[{assigned:{},used:[]},{assigned:{},used:[]}],log:[]};
}
const resolve=(s,id,target='blue',side=0,extra={})=>resolveCommandOrder(s,{side,id,target,...extra});

test('Athenian board has four exact basic Orders and nine advanced, independent of rarity',()=>{
 assert.equal(COMMAND_ORDERS.length,29);assert.equal(ATHENIAN_ORDER_IDS.length,13);
 assert.deepEqual(COMMAND_ORDERS.filter(o=>o.basic).map(o=>o.id),['fire','charge','regroup','do-it']);
 assert.equal(COMMAND_ORDERS.find(o=>o.id==='take-cover').basic,false);
 assert.equal(COMMAND_ORDERS.find(o=>o.id==='take-cover').requiredDice[0],'common');
 assert.equal(COMMAND_ORDERS.find(o=>o.id==='hell-s-fire').name,'Hell’s Fire!');
});

test('action kind normalization covers shooting responses and coordinated action types',()=>{
 for(const kind of ['fire','firefight','react','recon'])assert.equal(commandActionKind(kind),'shoot');
 assert.equal(commandActionKind('combat'),'melee');assert.equal(commandActionKind({type:'reactive-action',kind:'skill'}),'skill');
});

test('activation checks declared actors, friendly/enemy sides, unit classes and action timing',()=>{
 const s=fixture();assert.equal(commandOrderError(s,{side:0,id:'fire',target:'blue'}),null);
 assert.match(commandOrderError(s,{side:0,id:'fire',target:'red'}),/friendly/);
 assert.match(commandOrderError(s,{side:0,id:'misfire',target:'blue'}),/enemy/);
 assert.match(commandOrderError(s,{side:0,id:'fire',target:'blue-v'}),/Infantry/);
 assert.match(commandOrderError(s,{side:0,id:'fire',target:'blue-other'}),/performing/);
 assert.match(commandOrderError(s,{side:0,id:'regroup',target:'blue'}),/declared action/);
 s.options.board='athenian';assert.match(commandOrderError(s,{side:0,id:'hell-s-fire',target:'blue-v'}),/not on/);
 s.options.board='catalog';s.orderWindow.action.ids=['blue-v'];assert.equal(commandOrderError(s,{side:0,id:'hell-s-fire',target:'blue-v'}),null);
});

test('Fire and Misfire modify their targeted actor without benefiting the opponent or another action',()=>{
 const s=fixture();resolve(s,'fire');resolve(s,'misfire','red');
 assert.equal(actionCommandBonus(s,s.units[0],'shoot').adv,1);
 assert.equal(actionCommandBonus(s,s.units[1],'shoot').adv,-1);
 assert.equal(actionCommandBonus(s,s.units[0],'rally').adv,0);
 assert.equal(actionCommandBonus(s,s.units[4],'shoot').adv,0);
});

test('every one-action advantage and disadvantage Order has its specified action and sign',()=>{
 const cases=[['fire','shoot',1,'blue'],['charge','melee',1,'blue'],['regroup','rally',1,'blue'],['do-it','skill',1,'blue'],['the-cavalry-have-arrived','shoot',1,'blue-v'],['keep-it-together','rally',1,'blue-v'],['misfire','shoot',-1,'red'],['disordered-charge','melee',-1,'red'],['mistake','skill',-1,'red']];
 for(const [id,kind,adv,target]of cases){const s=fixture();resolve(s,id,target);const t=s.units.find(u=>u.id===target);assert.equal(actionCommandBonus(s,t,kind).adv,adv,id);assert.equal(actionCommandBonus(s,t,kind==='skill'?'rally':'skill').adv,0,id);}
});

test('+1 characteristic Orders change face success checks without adding advantage dice',()=>{
 for(const [id,kind]of [['take-aim','shoot'],['spill-blood','melee'],['esprit-de-corps','rally'],['best-of-the-best','skill']]){
  const s=fixture();resolve(s,id);const bonus=actionCommandBonus(s,s.units[0],kind);assert.equal(bonus.adv,0);assert.equal(bonus.modifier,1);
  const result=withDice(s,generated=>{assert.equal(generated.length,3);return[3,2,1];},()=>pool(s,s.units[0],{...bonus}));
  assert.equal(result.successes,1,id);assert.equal(result.roots.length,3,id);
 }
});

test('all double-action IDs return two separate pools and no unintended +1 advantage',()=>{
 for(const [id,kind,target]of [['fire-at-will','shoot','blue'],['bloodthirsty','melee','blue'],['try-again','skill','blue'],['hell-s-fire','shoot','blue-v']]){
  const s=fixture();resolve(s,id,target);const b=actionCommandBonus(s,s.units.find(u=>u.id===target),kind);assert.equal(b.repeats,2,id);assert.equal(b.adv,0,id);assert.equal(b.modifier,0,id);
  const pools=[];for(let i=0;i<b.repeats;i++)pools.push(withDice(s,()=>i?[5,2,1]:[4,3,1],()=>pool(s,s.units.find(u=>u.id===target),{...b})));
  assert.deepEqual(pools.map(p=>p.successes),[1,1]);assert.equal(s.effects[0].used,undefined);
  consumeCommandAction(s,{kind,actors:[target]});assert.equal(actionCommandBonus(s,s.units.find(u=>u.id===target),kind).repeats,1);
 }
});

test('Bad Cover targets an enemy defender in terrain and only reduces actual incoming cover',()=>{
 const s=fixture();assert.equal(commandOrderError(s,{side:0,id:'bad-cover',target:'red'}),null);
 assert.match(commandOrderError(s,{side:0,id:'bad-cover',target:'blue'}),/enemy/);
 resolve(s,'bad-cover','red');const r=s.units[1];
 assert.deepEqual({...commandDefenseBonus(s,r,{cover:2}),effects:[]},{dis:0,coverReduction:1,effects:[]});
 assert.equal(commandDefenseBonus(s,r,{cover:0}).coverReduction,0);
 assert.equal(actionCommandBonus(s,r,'shoot').adv,0);
 assert.equal(commandDefenseBonus(s,r,{cover:2,kind:'melee'}).coverReduction,0);
 assert.equal(commandDefenseBonus(s,s.units[0],{cover:2}).coverReduction,0);
 s.terrain=[];assert.match(commandOrderError(s,{side:0,id:'bad-cover',target:'red'}),/within terrain/);
});

test('Take Cover and Drive protect the correct friendly defender without buffing its attacks',()=>{
 for(const [id,target]of [['take-cover','blue'],['drive','blue-v']]){
  const s=fixture({type:'fire',ids:['red'],target});assert.equal(commandOrderError(s,{side:0,id,target}),null);resolve(s,id,target);const t=s.units.find(u=>u.id===target);
  assert.equal(commandDefenseBonus(s,t,{cover:1}).dis,1);assert.equal(actionCommandBonus(s,t,'shoot').adv,0);
 }
 const s=fixture({type:'rally',id:'blue'});assert.match(commandOrderError(s,{side:0,id:'take-cover',target:'blue'}),/incoming shooting/);
});

test('Bad Cover can cancel protective Order cover but never produces an attack bonus from zero cover',()=>{
 const s=fixture({type:'fire',ids:['blue'],target:'red'});resolve(s,'take-cover','red',1);resolve(s,'bad-cover','red',0);
 const b=commandDefenseBonus(s,s.units[1],{cover:0});assert.equal(b.dis,1);assert.equal(b.coverReduction,1);assert.equal(b.dis-b.coverReduction,0);
});

test('activation targets a declared incoming shot rather than an unrelated unit in terrain',()=>{
 const s=fixture();assert.match(commandOrderError(s,{side:0,id:'bad-cover',target:'red-v'}),/Infantry/);
 s.units.push({...s.units[1],id:'red-other'});assert.match(commandOrderError(s,{side:0,id:'bad-cover',target:'red-other'}),/declared incoming/);
 s.pending={moves:[{id:'blue'}],index:0};s.orderWindow.action={type:'react',ids:['red']};assert.equal(commandOrderError(s,{side:0,id:'take-cover',target:'blue'}),null);
});

test('completed shooting consumes actor and defender effects but leaves retain initiative protection for shift',()=>{
 const s=fixture();resolve(s,'fire');resolve(s,'bad-cover','red');resolve(s,'keep-firing',null);
 consumeCommandAction(s,{kind:'shoot',actors:['blue'],targets:['red']});
 assert.equal(actionCommandBonus(s,s.units[0],'shoot').adv,0);assert.equal(commandDefenseBonus(s,s.units[1],{cover:2}).coverReduction,0);
 assert.equal(s.effects.find(e=>e.retain).used,undefined);
 assert.equal(consumeRetainCommandEffect(s,{side:0,kind:'shoot',ids:['blue']}).name,'Keep Firing!');
 assert.equal(consumeRetainCommandEffect(s,{side:0,kind:'shoot',ids:['blue']}),null);
});

test('rally and skill Order effects are consumed once instead of leaking to future actions',()=>{
 for(const [id,kind]of [['regroup','rally'],['do-it','skill'],['esprit-de-corps','rally'],['best-of-the-best','skill'],['try-again','skill']]){
  const s=fixture();resolve(s,id);consumeCommandAction(s,{kind:'shoot',actors:['blue']});assert.equal(s.effects[0].used,undefined);
  consumeCommandAction(s,{kind,actors:['blue']});assert.equal(s.effects[0].used,true,id);
  const b=actionCommandBonus(s,s.units[0],kind);assert.equal(b.adv,0);assert.equal(b.modifier,0);assert.equal(b.repeats,1);
 }
});

test('retain initiative Orders only protect the activating player and their own action kind',()=>{
 for(const [id,kind]of [['keep-firing','shoot'],['keep-fighting','melee'],['keep-it-up','skill']]){
  const s=fixture();resolve(s,id,null);assert.equal(consumeRetainCommandEffect(s,{side:1,kind,ids:['red']}),null);
  assert.equal(consumeRetainCommandEffect(s,{side:0,kind:'rally',ids:['blue']}),null);
  assert(consumeRetainCommandEffect(s,{side:0,kind,ids:['blue']}));
 }
 const s=fixture();resolve(s,'seize-the-initiative',null);assert(consumeRetainCommandEffect(s,{side:0,kind:'rally',ids:['blue']}));
});

test('order scopes survive save serialization and prevent modifiers or unused retain effects leaking',()=>{
 const s=fixture();resolve(s,'fire');resolve(s,'keep-firing',null);const scope=s.orderWindow.orderScope,copy=JSON.parse(JSON.stringify(s));
 assert.equal(copy.effects[0].scope,scope);assert.equal(actionCommandBonus(copy,copy.units[0],'shoot',{scope}).adv,1);
 assert.equal(actionCommandBonus(copy,copy.units[0],'shoot',{scope:'other-action'}).adv,0);
 expireCommandScope(copy,scope);assert.equal(actionCommandBonus(copy,copy.units[0],'shoot').adv,0);
 assert.equal(consumeRetainCommandEffect(copy,{side:0,kind:'shoot',ids:['blue']}),null);
});

test('one-shot effects expire across initiative while non-Order Heroism remains a next-failure effect',()=>{
 const s=fixture();resolve(s,'keep-firing',null);s.effects.push({name:'Heroism',side:0,target:'blue',retain:true});s.initiative++;
 assert.equal(consumeRetainCommandEffect(s,{side:0,kind:'shoot',ids:['blue-other']}),null);
 assert.equal(consumeRetainCommandEffect(s,{side:0,kind:'skill',ids:['blue']}).name,'Heroism');
});

test('Command Control returns a specifically chosen card, not an arbitrary last card',()=>{
 const s=fixture();const r=resolve(s,'command-control',null,0,{cardIds:['b5']});assert.deepEqual(r.cards,['b5']);
 assert.deepEqual(s.morale[0].cards.map(c=>c.id),['b1','b2']);assert(s.deck.some(c=>c.id==='b5'));
 assert.equal(s.effects.length,0);
});

test('Command Supremacy can return two chosen numeric or held-special cards to the shared deck',()=>{
 const s=fixture();const r=resolve(s,'command-supremacy',['b2','b-hero']);assert.deepEqual(new Set(r.cards),new Set(['b2','b-hero']));
 assert.deepEqual(s.morale[0].cards.map(c=>c.id),['b1','b5']);assert.deepEqual(s.morale[0].specials,[]);
 assert.equal(s.deck.length,3);assert(s.deck.some(c=>c.id==='b-hero'));
});

test('chosen morale card return rejects enemy, duplicate or absent choices without removing cards',()=>{
 for(const ids of [['r5'],['missing'],['b5','b5']]){
  const s=fixture(),before=structuredClone(s.morale);assert.throws(()=>resolve(s,ids.length===2?'command-supremacy':'command-control',ids),/Choose/);assert.deepEqual(s.morale,before);
 }
 const s=fixture();assert.throws(()=>resolve(s,'command-control',null),/Choose/);
});

test('card choice can be supplied by an AI helper and no impossible choices are required for a short hand',()=>{
 const s=fixture();resolveCommandOrder(s,{side:0,id:'command-control'},{selectMoraleCards:(_s,_side,cards,count)=>cards.slice().sort((a,b)=>(b.value||0)-(a.value||0)).slice(0,count).map(c=>c.id)});
 assert(!s.morale[0].cards.some(c=>c.id==='b5'));
 const t=fixture();t.morale[0].cards=[];t.morale[0].specials=[{id:'only',value:'heroism'}];resolve(t,'command-supremacy',null);assert.equal(t.morale[0].specials.length,0);assert(t.deck.some(c=>c.id==='only'));
});

test('Incoming Intelligence reveals seeded random opposing numeric or held cards without moving them',()=>{
 const s=fixture(),copy=structuredClone(s),before=s.morale[1].cards.map(c=>c.id);
 const r=resolve(s,'incoming-intelligence',null),r2=resolve(copy,'incoming-intelligence',null);assert.deepEqual(r.cards,r2.cards);assert.equal(r.cards.length,2);
 assert.equal([...s.morale[1].cards,...s.morale[1].specials].filter(c=>c.revealed).length,2);assert.deepEqual(s.morale[1].cards.map(c=>c.id),before);
 resolve(s,'incoming-intelligence-dump',null);assert([...s.morale[1].cards,...s.morale[1].specials].every(c=>c.revealed));assert.equal(s.effects.length,0);
});

test('Morale Break draws exactly one card for the opponent and does not create a unit modifier',()=>{
 const s=fixture(),calls=[];resolveCommandOrder(s,{side:0,id:'morale-break'},{drawMorale:(_s,side,why)=>{calls.push({side,why});return{id:'new'};}});
 assert.deepEqual(calls,[{side:1,why:'Morale Break Order'}]);assert.equal(s.effects.length,0);
});

test('activated effects resolve even if their source/target was removed before stack resolution',()=>{
 const s=fixture();s.units[0].dead=true;resolve(s,'fire');assert.equal(s.effects[0].target,'blue');
 assert.match(commandOrderError(s,{side:0,id:'fire',target:'blue'}),/deployed/);
});
