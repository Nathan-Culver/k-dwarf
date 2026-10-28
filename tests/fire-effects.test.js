import test from 'node:test';import assert from 'node:assert/strict';import {sampleFireBurst} from '../fire-effects.js';
const from={x:100,y:14,z:100},to={x:750,y:14,z:100};
test('projectiles travel rapidly along the same straight ray used by direct fire',()=>{
 const early=sampleFireBurst(from,to,.02),later=sampleFireBurst(from,to,.04);
 const a=early.bullets.find(p=>p.index===0),b=later.bullets.find(p=>p.index===0);assert(a&&b);assert(b.x>a.x);assert.equal(a.y,14);assert.equal(b.z,100);assert(a.x>100&&b.x<750);
});
test('muzzle flash is brief, smoke expands and drifts, and the burst stops',()=>{
 assert(sampleFireBurst(from,to,.01).flash>0);assert.equal(sampleFireBurst(from,to,.04).flash,0);
 const a=sampleFireBurst(from,to,.1).smoke.find(p=>p.index===0),b=sampleFireBurst(from,to,.8).smoke.find(p=>p.index===0);assert(b.size>a.size);assert(b.y>a.y);assert(b.opacity<a.opacity);
 const done=sampleFireBurst(from,to,2);assert.equal(done.active,false);assert.equal(done.bullets.length,0);assert.equal(done.smoke.length,0);assert.equal(done.flash,0);
});
test('indirect projectiles arc while direct fire stays straight',()=>{
 const direct=sampleFireBurst(from,to,.05).bullets[0],indirect=sampleFireBurst(from,to,.05,{indirect:true}).bullets[0];assert.equal(direct.y,14);assert(indirect.y>14);
});
