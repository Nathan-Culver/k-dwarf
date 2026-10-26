import test from 'node:test';
import assert from 'node:assert/strict';
import {polygonVisibility,wholeTargetVisibility,movingVisibility,movingWholeTargetVisibility,VISIBILITY_EPSILON} from '../visibility.js';

const rect=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
const shift=(poly,delta,t)=>poly.map(([x,y])=>[x+delta.x*t,y+delta.y*t]);
const points=poly=>poly.flatMap((a,i)=>[a,[(a[0]+poly[(i+1)%poly.length][0])/2,(a[1]+poly[(i+1)%poly.length][1])/2]]);
// Independent segment/rectangle slab clipping, used to check actual returned
// witnesses and demonstrate why the old corners/midpoints family is insufficient.
function touchesRectangle(a,b,r){
 let lo=0,hi=1;
 for(let axis=0;axis<2;axis++){
  const min=Math.min(...r.map(p=>p[axis])),max=Math.max(...r.map(p=>p[axis])),v=b[axis]-a[axis];
  if(!v){if(a[axis]<min||a[axis]>max)return false;continue;}
  const x=(min-a[axis])/v,y=(max-a[axis])/v;
  lo=Math.max(lo,Math.min(x,y));hi=Math.min(hi,Math.max(x,y));
  if(lo>hi)return false;
 }
 return true;
}

test('continuous base-edge visibility finds narrow openings missed by every old sample ray',()=>{
 const source=rect(0,0,1,1),target=rect(10,0,1,1),lower=.123456789;
 for(const gap of[1e-4,1e-6,1e-8]){
  const blockers=[rect(4,-10,2,10+lower),rect(4,lower+gap,2,10)];
  for(const a of points(source))for(const b of points(target))assert(blockers.some(r=>touchesRectangle(a,b,r)));
  const result=polygonVisibility(source,target,blockers);
  assert.equal(result.clear,true,`opening ${gap}`);assert.equal(result.complete,true);
  assert.equal(result.method,'critical-line cell');
  const a=[result.from.x,result.from.y],b=[result.to.x,result.to.y];
  assert(Math.abs(a[0]-1)<1e-8);assert(Math.abs(b[0]-10)<1e-8);
  assert(blockers.every(r=>!touchesRectangle(a,b,r)),`returned ray clears opening ${gap}`);
  const reverse=polygonVisibility(target,source,blockers);assert.equal(reverse.clear,true);
 }
});

test('closed apertures, boundary contact and containing blockers remain occluded',()=>{
 const source=rect(0,0,1,1),target=rect(10,0,1,1);
 assert.equal(polygonVisibility(source,target,[rect(4,-10,2,20)]).clear,false);
 assert.equal(polygonVisibility(source,target,[rect(4,-10,2,10.1234),rect(4,.1234,2,10)]).clear,false);
 assert.equal(polygonVisibility({x:0,y:0},{x:10,y:0},[rect(4,0,2,1)]).clear,false);
 assert.equal(polygonVisibility({x:0,y:0},target,[rect(-1,-1,2,2)]).clear,false);
});

test('point markers and structure-center origins remain exact rather than inflated bases',()=>{
 const source={x:0,y:0},target=rect(10,0,1,1),blockers=[rect(4,-10,.001,10.12345),rect(4,.12355,.001,10)];
 const result=polygonVisibility(source,target,blockers);
 assert.equal(result.clear,true);assert(Math.abs(result.from.x)<1e-12);assert(Math.abs(result.from.y)<1e-12);
 assert.equal(result.method,'point angular interval');
 assert.equal(polygonVisibility(target,source,blockers).clear,true);
 for(const form of[{x:0,y:0},[0,0],[[0,0]]]){
  assert.equal(polygonVisibility(form,{x:10,y:0}).clear,true);
  assert.equal(polygonVisibility(form,{x:10,y:0},[rect(4,-1,2,2)]).clear,false);
 }
});

test('whole-target visibility checks interior shadowing even when every target corner is visible',()=>{
 const source=rect(0,0,1,1),target=rect(10,-10,1,20),blockers=[rect(5,-.1,1,.2)];
 for(const point of target)assert.equal(polygonVisibility({x:.5,y:.5},point,blockers).clear,true);
 assert.equal(polygonVisibility(source,target,blockers).clear,true);
 assert.equal(wholeTargetVisibility(source,target,blockers).clear,false);
 assert.equal(wholeTargetVisibility(source,target,[]).clear,true);
 assert.equal(wholeTargetVisibility({x:0,y:0},rect(10,0,1,1),[]).clear,true);
 assert.equal(wholeTargetVisibility(source,{x:10,y:0},[]).clear,true);
});

test('off-beam terrain is filtered and source inputs are never mutated',()=>{
 const a=rect(0,0,32,32),b=rect(1000,0,32,32),blocks=[{id:'away',points:rect(400,100,100,100)}],before=JSON.stringify([a,b,blocks]);
 const result=polygonVisibility(a,b,blocks);
 assert.equal(result.clear,true);assert.equal(result.relevantObstacles,0);
 movingVisibility(a,b,{x:0,y:50},blocks);
 assert.equal(JSON.stringify([a,b,blocks]),before);
 assert.equal(result.epsilon,VISIBILITY_EPSILON);
});

test('moving exposure detects a sub-millionth time interval missed by fixed reaction steps',()=>{
 const source=rect(0,0,1,1),target=rect(10,-1000,1,.001),delta={x:0,y:2000},blocks=[rect(4,-2000,2,2000.12345),rect(4,.123451,2,2000)];
 for(let i=0;i<=100;i++)assert.equal(polygonVisibility(source,shift(target,delta,i/100),blocks).clear,false);
 const result=movingVisibility(source,target,delta,blocks);
 assert.equal(result.complete,true);assert.equal(result.anyExposure,true);assert.equal(result.windows.length,1);
 const window=result.windows[0];assert(window.start>.5);assert(window.end-window.start<1e-6);
 assert(result.criticalTimes.includes(window.start));assert(result.criticalTimes.includes(window.end));
 assert.equal(polygonVisibility(source,shift(target,delta,window.witnessAt),blocks).clear,true);
 assert.equal(polygonVisibility(source,shift(target,delta,window.start-1e-6),blocks).clear,false);
 assert.equal(polygonVisibility(source,shift(target,delta,window.end+1e-6),blocks).clear,false);
});

test('motion with no blocker exposes the entire path, while a solid screen exposes none',()=>{
 const source=rect(0,0,1,1),target=rect(10,0,1,1);
 const clear=movingVisibility(source,target,{x:0,y:5});
 assert.equal(clear.complete,true);assert.equal(clear.windows.length,1);
 assert.equal(clear.windows[0].start,0);assert.equal(clear.windows[0].end,1);
 assert.equal(clear.windows[0].includeStart,true);assert.equal(clear.windows[0].includeEnd,true);
 const blocked=movingVisibility(source,target,{x:0,y:5},[rect(4,-100,2,200)]);
 assert.equal(blocked.complete,true);assert.equal(blocked.anyExposure,false);
 const stationary=movingVisibility(source,target,{x:0,y:0});assert.equal(stationary.windows.length,1);
});

test('whole-base movement finds brief full visibility between sampled reaction times',t=>{
 const source=rect(0,0,1,1),target=rect(10,-1000,1,1e-7),delta={x:0,y:2000},blocks=[rect(4,-2000,2,2000.12345),rect(4,.123451,2,2000)];
 for(let i=0;i<=100;i++)assert.equal(wholeTargetVisibility(source,shift(target,delta,i/100),blocks).clear,false);
 const start=performance.now(),exposure=movingVisibility(source,target,delta,blocks),result=movingWholeTargetVisibility(source,target,delta,blocks,{criticalTimes:exposure.criticalTimes});
 assert.equal(result.complete,true);assert.equal(result.clear,true);
 assert(result.at>.50006&&result.at<.50007);
 assert.equal(wholeTargetVisibility(source,shift(target,delta,result.at),blocks).clear,true);
 t.diagnostic(`Narrow whole-base moving witness: ${(performance.now()-start).toFixed(2)} ms including exposure; ${result.testedTimes} critical-time queries; ${result.checkedPairs} tangency pairs.`);
});

test('fleeting classification distinguishes never-whole exposure from a partially visible selected point',()=>{
 const source=rect(0,0,1,1),target=rect(10,-1000,1,.001),delta={x:0,y:2000},slit=[rect(4,-2000,2,2000.12345),rect(4,.123451,2,2000)];
 const exposure=movingVisibility(source,target,delta,slit),partial=movingWholeTargetVisibility(source,target,delta,slit,{criticalTimes:exposure.criticalTimes});
 assert.equal(exposure.anyExposure,true);assert.equal(partial.complete,true);assert.equal(partial.clear,false);
 // At t=0 only part of this large target is visible, but later it clears the
 // finite wall. The route must not receive a NEVER-whole-visible penalty.
 const large=rect(10,-.5,1,2),wall=[rect(4,-2,2,2.25)];
 assert.equal(polygonVisibility(source,large,wall).clear,true);
 assert.equal(wholeTargetVisibility(source,large,wall).clear,false);
 assert.equal(movingWholeTargetVisibility(source,large,{x:0,y:20},wall).clear,true);
});

test('explicit work limits return indeterminate rather than silently reporting no LOS',()=>{
 const source=rect(0,0,1,1),target=rect(10,0,1,1),blocks=[rect(4,-10,2,10.12345),rect(4,.123451,2,10)];
 const result=polygonVisibility(source,target,blocks,{maxCells:1});
 assert.equal(result.clear,null);assert.equal(result.complete,false);assert.match(result.reason,/budget/);
 const movement=movingVisibility(source,rect(10,-10,1,1),{x:0,y:20},blocks,{maxEvents:2});
 assert.equal(movement.complete,false);assert.match(movement.reason,/budget/);
 const whole=movingWholeTargetVisibility(source,rect(10,-1000,1,.001),{x:0,y:2000},[rect(4,-2000,2,2000.12345),rect(4,.123451,2,2000)],{maxPairs:1});
 assert.equal(whole.clear,null);assert.equal(whole.complete,false);assert.match(whole.reason,/budget/);
});

test('typical thirty-feature fields have practical static runtime and relevant-beam filtering',t=>{
 const blockers=[];for(let row=0;row<5;row++)for(let col=0;col<6;col++)blockers.push(rect(75+col*190,90+row*184,90,70));
 const source=rect(15,25,32,32),target=rect(1140,900,32,32),start=performance.now();
 let result;for(let i=0;i<12;i++)result=polygonVisibility(source,target,blockers);
 const milliseconds=(performance.now()-start)/12;
 assert.equal(result.complete,true);assert(result.relevantObstacles<blockers.length);
 t.diagnostic(`30 terrain polygons: ${milliseconds.toFixed(2)} ms/static query; ${result.relevantObstacles} relevant blockers; ${result.testedCells} cells.`);
});
