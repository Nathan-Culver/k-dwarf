import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../engine.js';
import {chooseReconMove} from '../ai.js';
import {encode,decode} from '../storage.js';
function fixture(){
 const s=E.newGame({seed:11,mode:'hotseat'});
 s.recon.supremacy=0;s.recon.turn=0;s.phase='recon';
 s.recon.markers=[{id:'recon-0-0',side:0,x:40,y:250,locked:false},{id:'recon-1-0',side:1,x:1260,y:250,locked:false}];
 s.terrain=[{id:'screen',name:'Screen',type:'woods',capacity:8,points:[[600,0],[700,0],[700,1000],[600,1000]]}];
 s.options.battlefield.terrain=structuredClone(s.terrain);return s;
}
test('patrol markers can make repeated alternating moves before enemy contact',()=>{
 const s=fixture();
 for(let i=0;i<3;i++){
  E.moveRecon(s,'recon-0-0',{x:100+i*40,y:250});assert.equal(s.recon.turn,1);
  E.moveRecon(s,'recon-1-0',{x:1200-i*40,y:250});assert.equal(s.recon.turn,0);
  assert.equal(s.phase,'recon');assert(s.recon.markers.every(m=>!m.locked));
 }
});
test('locking one side does not end the other side patrol or consume its next move',()=>{
 const s=fixture();E.moveRecon(s,'recon-0-0',{x:100,y:250},true);
 assert.equal(s.phase,'recon');assert.equal(s.recon.turn,1);
 E.moveRecon(s,'recon-1-0',{x:1200,y:250});assert.equal(s.recon.turn,1);
 E.moveRecon(s,'recon-1-0',{x:1150,y:250});assert.equal(s.phase,'recon');
 E.finishRecon(s);assert.equal(s.phase,'deployment-markers');assert.equal(s.recon.turn,0);
});
test('lock remaining applies only to the current side and rejects use after patrol',()=>{
 const s=fixture();E.finishRecon(s);
 assert.equal(s.phase,'recon');assert.equal(s.recon.turn,1);
 assert(s.recon.markers[0].locked);assert(!s.recon.markers[1].locked);
 E.finishRecon(s);assert.equal(s.phase,'deployment-markers');
 assert.throws(()=>E.finishRecon(s),/Not in reconnaissance/);
});
test('AI advances unlocked markers repeatedly without a forced first-move lock',()=>{
 const s=fixture();s.recon.markers[0].locked=true;s.recon.turn=1;
 for(let i=0;i<3;i++){
  const move=chooseReconMove(s);assert(move);E.moveRecon(s,move.id,move.to);
  assert.equal(s.phase,'recon');assert.equal(s.recon.turn,1);assert(!s.recon.markers[1].locked);
 }
 assert(s.recon.markers[1].x<1260);
});
test('enemy LOS still locks markers and completes patrol when all are locked',()=>{
 const s=fixture();s.terrain=[];
 E.moveRecon(s,'recon-0-0',{x:100,y:250});
 assert(s.recon.markers.every(m=>m.locked));assert.equal(s.phase,'deployment-markers');
});
test('a side with no markers is skipped while the remaining markers continue',()=>{
 const s=fixture();s.recon.markers.pop();
 E.moveRecon(s,'recon-0-0',{x:100,y:250});assert.equal(s.phase,'recon');assert.equal(s.recon.turn,0);
 E.moveRecon(s,'recon-0-0',{x:140,y:250});assert.equal(s.phase,'recon');
});
test('an unfinished patrol with one side locked survives save and reload',()=>{
 const s=E.newGame({seed:11,mode:'hotseat'});E.resolveReconBid(s,[1,0]);E.finishRecon(s);const loaded=decode(encode(s));
 assert.equal(loaded.phase,'recon');assert.equal(loaded.recon.turn,1);
 assert(loaded.recon.markers.some(m=>m.side===1&&!m.locked));
});

test('either side can move a recon marker out of friendly LOS while enemy contact still controls locking',()=>{
 for(const side of [0,1])for(const peerLocked of [false,true]){
  const s=fixture();s.recon.turn=side;
  const mover=s.recon.markers.find(m=>m.side===side),peer={...mover,id:`recon-${side}-1`,y:800,locked:peerLocked};s.recon.markers.push(peer);
  const left=side?720:100,right=side?1200:580;
  s.terrain.push({id:'friendly-screen',name:'Friendly screen',type:'woods',capacity:8,points:[[left,500],[right,500],[right,550],[left,550]]});
  const to={x:side?1000:300,y:250};
  assert(E.sight(s,{...mover,pointOnly:true},{...peer,pointOnly:true}).clear);
  assert(!E.sight(s,{...to,pointOnly:true},{...peer,pointOnly:true}).clear);
  E.moveRecon(s,mover.id,to);
  assert.equal(mover.x,to.x);assert.equal(mover.y,to.y);assert.equal(mover.locked,false);assert.equal(s.phase,'recon');
 }
});
