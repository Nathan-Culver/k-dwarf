import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../engine.js';
import {movementSelection} from '../selection.js';
import {armyTemplate} from '../army.js';
function fixture(){
 const s=E.newGame({seed:731,mode:'hotseat',autoRoll:true,armies:[armyTemplate('athenian','patrol'),armyTemplate('dominion','patrol')]});
 s.phase='battle';s.initiative=1;s.deployment=false;s.objectives=[];s.terrain=[];s.events=[];
 s.units.forEach((u,i)=>Object.assign(u,{x:u.side?850:200,y:150+i%4*150,facing:u.side?180:0}));
 s.morale.forEach(m=>m.fmr=10000);return s;
}
test('ready stands can be picked up from an overlapping position and moved to a legal endpoint',()=>{
 const s=fixture(),u=s.units[0],v=s.units[1];v.x=u.x;v.y=u.y;
 assert.match(E.canMove(s,u,u),/overlap/);assert.equal(E.movementStartError(u),null);
 assert.equal(E.previewMovement(s,[u.id],{x:300,y:150}).error,undefined);
});
test('pickup still rejects prone, pinned, reserve and permanent battery stands',()=>{
 for(const flags of [{prone:true},{status:'pinned'},{offTable:true},{type:'indirect',permanent:true}]){
  const s=fixture(),u=s.units[0];Object.assign(u,flags);assert(E.movementStartError(u));
 }
});
test('selections from opposing decisions cannot poison the next movement group',()=>{
 const s=fixture(),a=s.units[0],b=s.units[1],enemy=s.units[4];
 assert.deepEqual(movementSelection(s,[enemy.id,a.id,b.id],a.id),[a.id,b.id]);
 assert.deepEqual(movementSelection(s,[enemy.id],a.id),[a.id]);
 b.offTable=true;assert.deepEqual(movementSelection(s,[a.id,b.id],a.id),[a.id]);
});
test('passing away and back repeatedly resets restrictions and permits movement',()=>{
 const s=fixture(),u=s.units[0];
 for(let i=0;i<5;i++){
  u.noFire=u.noRally=u.noSkill=true;
  E.performAction(s,{type:'pass'});assert.equal(s.active,1);
  E.performAction(s,{type:'pass'});assert.equal(s.active,0);
  assert.equal(u.noFire,false);assert.equal(E.movementStartError(u),null);
  E.beginMove(s,[u.id],{x:270+i*15,y:150});
  while(s.pending)E.declineReaction(s);
  assert.equal(u.x,270+i*15);assert.equal(s.active,0);
 }
});

test('firing overlays contain smoke, light, and straight ballistic tracers',async()=>{
 const {renderFireOverlays}=await import('../fire-visuals.js');const s=fixture();
 s.fireEvents=[{id:'burst',action:1,shotCount:1,firerId:s.units[0].id,targetId:s.units[4].id,side:0,from:{x:100,y:200},to:{x:800,y:200},mode:'single'}];
 const svg=renderFireOverlays(s);
 assert.match(svg,/class="fire-smoke"/);assert.match(svg,/class="fire-glow"/);
 assert.match(svg,/class="fire-tracer" pathLength="100" d="M100 200L800 200"/);
 assert.match(svg,/data-fired-unit/);assert.match(svg,/data-attacked-unit/);
});
