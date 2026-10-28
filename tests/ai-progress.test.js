import test from'node:test';import assert from'node:assert/strict';import*as E from'../engine.js';import{armyTemplate}from'../army.js';import{chooseAction}from'../ai.js';
test('AI assaults close protected infantry rather than passing indefinitely',()=>{const s=E.newGame({seed:3,mode:'solo',autoRoll:true,armies:[armyTemplate('athenian','patrol'),armyTemplate('dominion','patrol')]});s.phase='battle';s.initiative=5;s.objectives=[];s.events=[];s.units=[s.units[0],s.units[4]];Object.assign(s.units[0],{x:300,y:300,prone:false,status:'ready'});Object.assign(s.units[1],{x:350,y:300,prone:false,status:'ready'});s.terrain=[{id:'pit',name:'Pit',type:'depression',capacity:8,points:[[200,200],[450,200],[450,450],[200,450]]}];s.commands[0].dice=[{id:'die',source:s.units[0].id,quality:'regular',sides:6,face:4}];assert(E.fireEligibility(s,s.units[0],s.units[1]));const a=chooseAction(s);assert.equal(a.type,'move');assert.equal(a.options.kind,'assault');assert.equal(a.options.target,s.units[1].id);});
test('assault destinations account for smaller commander bases and the charger final facing',async()=>{const{edgeDistance}=await import('../geometry.js');const s={terrain:[]},a={id:'a',type:'rifle',x:160,y:350,facing:0},t={id:'t',type:'pc',x:100,y:300,facing:180};const p=E.assaultDestination(s,a,t);const end={...a,...p,facing:Math.atan2(p.y-a.y,p.x-a.x)*180/Math.PI};assert(edgeDistance(end,t)<2);assert(edgeDistance(end,t)>.1);});

function movementFixture(){
 const s=E.newGame({seed:31,mode:'solo',autoRoll:true,armies:[armyTemplate('athenian','patrol'),armyTemplate('dominion','patrol')]});
 s.phase='battle';s.deployment=false;s.initiative=5;s.active=1;s.events=[];s.terrain=[];
 s.units=[s.units[0],s.units[4]];
 Object.assign(s.units[0],{x:100,y:300,facing:0,status:'ready',prone:false});
 Object.assign(s.units[1],{x:1000,y:300,facing:180,status:'ready',prone:false});
 s.objectives=[{id:'relay',x:650,y:500,owner:null}];
 s.commands[1].dice=[{id:'available',source:s.units[1].id,quality:'regular',sides:6,face:4}];
 return s;
}
test('AI advances toward an uncaptured objective instead of always taking distant shots',()=>{
 for(const difficulty of ['easy','normal','hard']){
  const s=movementFixture();s.options.difficulty=difficulty;const red=s.units[1];
  assert.equal(E.fireSet(s,[red.id],s.units[0].id).error,undefined);
  const a=chooseAction(s);assert.equal(a.type,'move');assert.equal(a.ids[0],red.id);
  assert.equal(E.previewMovement(s,a.ids,a.to).error,undefined);
  const initial={x:red.x,y:red.y};E.performAction(s,a);while(s.pending)E.declineReaction(s);
  assert(Math.hypot(red.x-initial.x,red.y-initial.y)>8);
  assert.equal(s.objectives[0].owner,1);
 }
});
test('AI still fires at a close threat before an objective advance',()=>{
 const s=movementFixture();s.units[0].x=850;
 assert.equal(chooseAction(s).type,'fire');
});
test('AI skips a rally that is already unavailable instead of pausing on an illegal action',()=>{
 const s=movementFixture();s.units[1].status='pinned';s.units[1].noRally=true;
 const a=chooseAction(s);assert.notEqual(a.type,'rally');assert.doesNotThrow(()=>E.performAction(s,a));
});
test('AI uses a legal intermediate destination when all objective endpoints are occupied',async()=>{
 const {chooseMovement}=await import('../ai.js');const s=movementFixture(),red=s.units[1];
 s.units=s.units.filter(u=>u.side===1);s.objectives=[{id:'relay',x:600,y:300,owner:null}];
 for(const [i,dx,dy]of [[0,0,0],[1,32,0],[2,-32,0],[3,0,32],[4,0,-32]])s.units.push({...structuredClone(red),id:'block-'+i,x:600+dx,y:300+dy,status:'suppressed'});
 const a=chooseMovement(s,{objectivesOnly:true});assert(a);assert.equal(a.ids[0],red.id);
 assert(a.to.x<red.x);assert(a.to.x>650);assert.equal(E.previewMovement(s,a.ids,a.to).error,undefined);
});
