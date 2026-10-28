import test from 'node:test';import assert from 'node:assert/strict';
import * as E from '../engine.js';import {armyTemplate} from '../army.js';import {sightlinePreview} from '../sightlines.js';import {renderFireOverlays} from '../fire-visuals.js';import {renderMap} from '../map.js';import {clipMeshToPolygon} from '../meshclip.js';import {pointInPolygon} from '../table.js';import {BoxGeometry} from 'three';
function fixture(){const s=E.newGame({seed:731,mode:'hotseat',autoRoll:true,armies:[armyTemplate('athenian','patrol'),armyTemplate('dominion','patrol')]});s.phase='battle';s.deployment=false;s.active=0;s.initiative=5;s.terrain=[];s.smoke=[];s.objectives=[];s.events=[];s.units=[s.units[0],s.units[4]];Object.assign(s.units[0],{x:150,y:300,facing:0,weapon:'rifle'});Object.assign(s.units[1],{x:950,y:300,facing:180,weapon:'rifle'});return s;}
test('intervening blocking terrain prevents direct fire in both directions with both units outside',()=>{
 for(const type of ['building','woods','hill','field','ruins','fortification','highbarrier','bocage','hedge']){
  const s=fixture(),a=s.units[0],b=s.units[1];s.terrain=[{id:'block',name:'Blocking '+type,type,capacity:8,points:[[450,100],[650,100],[650,500],[450,500]]}];
  assert.equal(E.feature(s,a),null);assert.equal(E.feature(s,b),null);
  for(const [f,t]of [[a,b],[b,a]]){assert.equal(E.sight(s,f,t).clear,false,type);assert.match(E.fireEligibility(s,f,t),/Blocked by/);assert(E.fireSet(s,[f.id],t.id).error);}
  assert.throws(()=>E.directFire(s,[a.id],b.id),/Blocked by/);
  const state={selected:[a.id],target:{unitId:b.id},mode:'fire'},preview=sightlinePreview(s,state)[0];assert.equal(preview.clear,false);assert.equal(preview.blocker,'block');assert(renderMap(s,state).includes('data-los-blocker="block"'));
 }
});
test('smoke blocks direct fire and a genuinely open base-edge ray remains legal',()=>{
 const s=fixture(),a=s.units[0],b=s.units[1];s.smoke=[{id:'smoke',x:550,y:300,radius:100}];assert.equal(E.sight(s,a,b).clear,false);assert(E.fireSet(s,[a.id],b.id).error);s.smoke=[];s.terrain=[{id:'corner',name:'Corner',type:'building',points:[[450,290],[650,290],[650,500],[450,500]]}];assert(E.sight(s,a,b).clear);assert.equal(E.fireSet(s,[a.id],b.id).error,undefined);
});
test('persistent direct fire indicators follow the exact straight LOS ray instead of bending into terrain',()=>{
 const s=fixture(),a=s.units[0],b=s.units[1];s.terrain=[{id:'corner',name:'Corner',type:'building',points:[[450,290],[650,290],[650,500],[450,500]]}];const ray=E.sight(s,a,b);assert(ray.clear);
 s.fireEvents=[{id:'test',action:1,shotCount:1,firerId:a.id,targetId:b.id,side:0,mode:'single',from:ray.from,to:ray.to}];
 const svg=renderFireOverlays(s),d=/class="fire-path" d="([^"]+)"/.exec(svg)[1];assert.equal(d,`M${ray.from.x} ${ray.from.y}L${ray.to.x} ${ray.to.y}`);assert(svg.includes('Historical shot, not current visibility'));
});
test('visible terrain meshes are clipped to convex and concave rules footprints',()=>{
 for(const outline of [[[0,0],[100,0],[0,100]],[[0,0],[100,0],[100,35],[35,35],[35,100],[0,100]]]){
  const mesh=new BoxGeometry(120,30,120);mesh.translate(50,15,50);const clipped=clipMeshToPolygon(mesh,outline),p=clipped.getAttribute('position');assert(p.count>0);
  for(let i=0;i<p.count;i++)assert(pointInPolygon({x:p.getX(i),y:p.getZ(i)},outline));
  clipped.dispose();mesh.dispose();
 }
});
