/**
 * Continuous straight-ray visibility for convex unit-base polygons.
 *
 * This module knows nothing about units, terrain rules, or friendly bases. Pass
 * ONLY actual LOS blockers; omit source/target terrain as the game rules require.
 * Obstacles may be simple concave polygons. Coordinates are [x,y] pairs; an
 * obstacle can also be {points, id, name}. A point source/target can be supplied
 * as {x,y}, [x,y], or [[x,y]]; it is kept as an exact point, never inflated to a
 * surrogate square. Inputs are never mutated.
 *
 * A line is represented by its direction angle and normal offset. Its visibility
 * classification changes at a line through a polygon vertex (and at an
 * intersection of a base edge with an obstacle edge). The search visits the
 * arrangement cells adjacent to each such critical curve: angular events are
 * directions between critical points, and offsets are chosen between adjacent
 * vertex projections. Thus a negative result does not depend on a finite set of
 * hand-picked rays from corners, centers, or edge midpoints.
 *
 * This is floating-point computational geometry, NOT an exact-arithmetic proof.
 * Default absolute distance tolerance is 1e-9 coordinate units. Boundaries count
 * as blocked; openings at or below numerical tolerance can be indistinguishable
 * from contact. An explicit work budget returns clear:null, complete:false,
 * never a false negative. Worst-case search is cubic in relevant vertex count.
 */

export const VISIBILITY_EPSILON=1e-9;
const PI=Math.PI;
const cross=(a,b)=>a[0]*b[1]-a[1]*b[0];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]];
const dot=(a,b)=>a[0]*b[0]+a[1]*b[1];
const at=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const world=p=>({x:p[0],y:p[1]});
const pairs=p=>p.map((a,i)=>[a,p[(i+1)%p.length]]);
const length=a=>Math.hypot(...a);
const near=(a,b,e)=>Math.hypot(a[0]-b[0],a[1]-b[1])<=e;

function polygon(input){
 if(input&&Number.isFinite(input.x)&&Number.isFinite(input.y))return[[input.x,input.y]];
 const p=input?.points??input;
 if(Array.isArray(p)&&p.length===2&&p.every(Number.isFinite))return[[...p]];
 if(!Array.isArray(p)||p.length!==1&&p.length<3||p.some(v=>!Array.isArray(v)||v.length!==2||v.some(n=>!Number.isFinite(n))))throw Error('Visibility needs finite polygon vertices or an exact point.');
 return p;
}
function convex(p,e){if(p.length===1)return true;let sign=0;for(let i=0;i<p.length;i++){const d=sub(p[(i+1)%p.length],p[i]),f=sub(p[(i+2)%p.length],p[(i+1)%p.length]),c=cross(d,f);if(Math.abs(c)<=e*Math.max(length(d),length(f),e))continue;if(sign&&Math.sign(c)!==sign)return false;sign=Math.sign(c);}return !!sign;}
function unique(values,e){return values.sort((a,b)=>a-b).filter((v,i,a)=>!i||v-a[i-1]>e);}
function uniquePoints(points,e){const out=[];for(const p of points)if(!out.some(q=>near(p,q,e)))out.push(p);return out;}
function onSegment(p,a,b,e){const d=sub(b,a),l=length(d);return l<=e?near(p,a,e):Math.abs(cross(sub(p,a),d))/l<=e&&dot(sub(p,a),d)>=-e*l&&dot(sub(p,b),d)<=e*l;}
function inside(p,poly,e){let yes=false;for(const [a,b]of pairs(poly)){if(onSegment(p,a,b,e))return true;if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
function intersection(a,b,c,d,e){const r=sub(b,a),s=sub(d,c),den=cross(r,s);if(Math.abs(den)<=e*Math.max(length(r),length(s),1))return null;const t=cross(sub(c,a),s)/den,u=cross(sub(c,a),r)/den,te=e/Math.max(length(r),1),ue=e/Math.max(length(s),1);return t>=-te&&t<=1+te&&u>=-ue&&u<=1+ue?at(a,b,Math.max(0,Math.min(1,t))):null;}
function overlap(a,b,e){if(a.some(p=>inside(p,b,e))||b.some(p=>inside(p,a,e)))return true;return pairs(a).some(([p,q])=>pairs(b).some(([r,s])=>intersection(p,q,r,s,e)));}
function hull(input,e){const p=uniquePoints(input,e).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);if(p.length<3)return p;const half=ps=>{const h=[];for(const v of ps){while(h.length>1&&cross(sub(h.at(-1),h.at(-2)),sub(v,h.at(-1)))<=0)h.pop();h.push(v);}return h;};return [...half(p).slice(0,-1),...half([...p].reverse()).slice(0,-1)];}
function baseRange(poly,d,n,offset,e){
 const cuts=[];
 for(const [a,b]of pairs(poly)){
  const va=dot(a,n)-offset,vb=dot(b,n)-offset;
  if(Math.abs(va)<=e)cuts.push(dot(a,d));
  if(va<-e&&vb>e||va>e&&vb<-e)cuts.push(dot(at(a,b,va/(va-vb)),d));
 }
 return cuts.length?[Math.min(...cuts),Math.max(...cuts)]:null;
}
function obstacleSlices(poly,d,n,offset,e){
 const cuts=[];
 for(const [a,b]of pairs(poly)){
  const va=dot(a,n)-offset,vb=dot(b,n)-offset;
  if(Math.abs(va)<=e)cuts.push(dot(a,d));
  if(va<-e&&vb>e||va>e&&vb<-e)cuts.push(dot(at(a,b,va/(va-vb)),d));
 }
 const sorted=unique(cuts,e),out=sorted.map(u=>[u,u]);
 for(let i=0;i<sorted.length-1;i++){const lo=sorted[i],hi=sorted[i+1],u=(lo+hi)/2;if(inside([d[0]*u+n[0]*offset,d[1]*u+n[1]*offset],poly,e))out.push([lo,hi]);}
 return out;
}
function lineWitness(a,b,obstacles,angle,offset,e){
 const d=[Math.cos(angle),Math.sin(angle)],n=[-d[1],d[0]],ar=baseRange(a,d,n,offset,e),br=baseRange(b,d,n,offset,e);
 if(!ar||!br)return null;
 let from,to;
 if(ar[1]<br[0]){from=ar[1];to=br[0];}else if(br[1]<ar[0]){from=ar[0];to=br[1];}else from=to=(Math.max(ar[0],br[0])+Math.min(ar[1],br[1]))/2;
 const lo=Math.min(from,to),hi=Math.max(from,to);
 for(const p of obstacles)if(obstacleSlices(p,d,n,offset,e).some(([u,v])=>v>=lo-e&&u<=hi+e))return null;
 const point=u=>world([d[0]*u+n[0]*offset,d[1]*u+n[1]*offset]);
 return{from:point(from),to:point(to),angle,offset};
}
function prepare(source,target,obstacles,options){
 const e=options.epsilon??VISIBILITY_EPSILON;
 if(!Number.isFinite(e)||e<=0)throw Error('Visibility tolerance must be positive.');
 const a=polygon(source),b=polygon(target);
 if(!convex(a,e)||!convex(b,e))throw Error('Unit-base visibility requires convex source and target polygons.');
 const beam=hull([...a,...b],e),blocks=obstacles.map(polygon).filter(p=>{if(p.length<3)throw Error('LOS blockers must be area polygons.');return overlap(beam,p,e);});
 return{a,b,blocks,e,beam};
}
function criticalPoints(a,b,blocks,e){
 const points=[...a,...b,...blocks.flat()];
 for(const base of[a,b])for(const [p,q]of pairs(base))for(const obstacle of blocks)for(const [r,s]of pairs(obstacle)){const v=intersection(p,q,r,s,e);if(v)points.push(v);}
 return uniquePoints(points,e);
}

export function polygonVisibility(source,target,obstacles=[],options={}){
 const {a,b,blocks,e}=prepare(source,target,obstacles,options),budget=options.maxCells??250000;
 let tested=0;
 const result=(clear,extra={})=>({clear,complete:clear!==null,epsilon:e,testedCells:tested,relevantObstacles:blocks.length,...extra});
 const tryLine=(angle,offset)=>{if(tested>=budget)return undefined;tested++;return lineWitness(a,b,blocks,angle,offset,e);};
 const ac=a.reduce((s,p)=>[s[0]+p[0]/a.length,s[1]+p[1]/a.length],[0,0]),bc=b.reduce((s,p)=>[s[0]+p[0]/b.length,s[1]+p[1]/b.length],[0,0]),angle=Math.atan2(bc[1]-ac[1],bc[0]-ac[0]),n=[-Math.sin(angle),Math.cos(angle)];
 const fast=tryLine(angle,dot(ac,n));
 if(fast)return result(true,{...fast,method:'center-line witness'});
 if(fast===undefined)return result(null,{reason:'Visibility work budget exceeded.'});
 const points=criticalPoints(a,b,blocks,e),scale=Math.max(1,...points.flat().map(Math.abs)),angleEpsilon=e/scale;
 if(a.length===1||b.length===1){
  // With one exact point, valid lines form a one-dimensional angular family;
  // there is no normal-offset interval to enumerate.
  if(a.length===1&&b.length===1)return result(false,{method:'exact point-to-point line'});
  const pivot=a.length===1?a[0]:b[0],angles=unique([0,...points.filter(p=>!near(p,pivot,e)).map(p=>(Math.atan2(p[1]-pivot[1],p[0]-pivot[0])+PI)%PI)],angleEpsilon);
  for(let i=0;i<angles.length;i++)for(const theta of[angles[i],(angles[i]+((i+1<angles.length?angles[i+1]:angles[0]+PI)-angles[i])/2)%PI]){
   const witness=tryLine(theta,dot(pivot,[-Math.sin(theta),Math.cos(theta)]));
   if(witness)return result(true,{...witness,method:'point angular interval'});
   if(witness===undefined)return result(null,{reason:'Visibility work budget exceeded.'});
  }
  return result(false,{method:'point angular intervals exhausted'});
 }
 for(const pivot of points){
  const angles=unique([0,...points.filter(p=>!near(p,pivot,e)).map(p=>(Math.atan2(p[1]-pivot[1],p[0]-pivot[0])+PI)%PI)],angleEpsilon);
  for(let i=0;i<angles.length;i++){
   const theta=(angles[i]+((i+1<angles.length?angles[i+1]:angles[0]+PI)-angles[i])/2)%PI,d=[Math.cos(theta),Math.sin(theta)],normal=[-d[1],d[0]],projection=dot(pivot,normal),values=points.map(p=>dot(p,normal)),av=a.map(p=>dot(p,normal)),bv=b.map(p=>dot(p,normal)),lo=Math.max(Math.min(...av),Math.min(...bv)),hi=Math.min(Math.max(...av),Math.max(...bv));
   if(hi-lo<=e)continue;
   let below=-Infinity,above=Infinity;
   for(const value of values){if(value<projection-e)below=Math.max(below,value);if(value>projection+e)above=Math.min(above,value);}
   for(const [lower,upper]of [[Math.max(below,lo),Math.min(projection,hi)],[Math.max(projection,lo),Math.min(above,hi)]]){
    if(upper-lower<=e)continue;
    const witness=tryLine(theta,(lower+upper)/2);
    if(witness)return result(true,{...witness,method:'critical-line cell'});
    if(witness===undefined)return result(null,{reason:'Visibility work budget exceeded.'});
   }
  }
 }
 return result(false,{method:'critical-line cells exhausted'});
}

/** Is there a point on the source perimeter that sees the ENTIRE convex target?
 * This is stronger than polygonVisibility. It tests continuous source-edge
 * intervals separated by target-vertex/obstacle-vertex tangencies, rather than
 * accepting four visible target corners as proof that the interior is visible.
 */
export function wholeTargetVisibility(source,target,obstacles=[],options={}){
 const {a,b,blocks,e}=prepare(source,target,obstacles,options),budget=options.maxCells??250000;
 if(b.length===1)return polygonVisibility(a,b,blocks,options);
 let tested=0;
 const check=p=>{if(tested++>=budget)return null;const fan=hull([p,...b],e);return !blocks.some(o=>overlap(fan,o,e));};
 for(const [start,end]of pairs(a)){
  const events=[0,1],edge=sub(end,start),denom=dot(edge,edge);
  for(const targetVertex of b)for(const obstacle of blocks)for(const v of obstacle){
   const ray=sub(v,targetVertex),den=cross(edge,ray);
   if(Math.abs(den)<=e*Math.max(length(edge),length(ray),1))continue;
   const t=cross(sub(targetVertex,start),ray)/den;if(t>0&&t<1)events.push(t);
  }
  for(const o of blocks)for(const [p,q]of pairs(o)){const v=intersection(start,end,p,q,e);if(v)events.push(dot(sub(v,start),edge)/denom);}
  const times=unique(events,e/Math.max(length(edge),1)),candidates=[...times,...times.slice(0,-1).map((t,i)=>(t+times[i+1])/2)];
  for(const t of candidates){const p=at(start,end,t),clear=check(p);if(clear===null)return{clear:null,complete:false,epsilon:e,testedCells:tested,reason:'Whole-target visibility work budget exceeded.'};if(clear)return{clear:true,complete:true,epsilon:e,testedCells:tested,from:world(p)};}
 }
 return{clear:false,complete:true,epsilon:e,testedCells:tested};
}

const translated=(poly,delta,t)=>poly.map(([x,y])=>[x+delta.x*t,y+delta.y*t]);
function eventLineRelevant(source,target,p,q,e){
 const angle=Math.atan2(q[1]-p[1],q[0]-p[0]),d=[Math.cos(angle),Math.sin(angle)],n=[-d[1],d[0]],offset=dot(p,n),ar=baseRange(source,d,n,offset,e),br=baseRange(target,d,n,offset,e);
 if(!ar||!br)return false;
 const lo=Math.min(ar[0],br[0])-e,hi=Math.max(ar[1],br[1])+e;
 return [p,q].every(v=>dot(v,d)>=lo&&dot(v,d)<=hi);
}

/** Continuous exposure of a rigid target translated along one straight segment.
 * Source and obstacles are stationary; target orientation/shape must not change.
 * Critical times are vertex-collinearity and polygon-contact events. Every open
 * interval is classified with polygonVisibility; time steps are NOT sampled.
 * At arbitrary work limits, complete:false is explicit. Whole-target visibility
 * over a movement is deliberately not inferred from these exposure intervals.
 */
export function movingVisibility(source,target,delta,obstacles=[],options={}){
 if(!delta||![delta.x,delta.y].every(Number.isFinite))throw Error('Supply a finite target translation.');
 const a=polygon(source),b=polygon(target),e=options.epsilon??VISIBILITY_EPSILON,end=translated(b,delta,1),swept=hull([...a,...b,...end],e),blocks=obstacles.map(polygon).filter(p=>overlap(swept,p,e)),fixed=criticalPoints(a,a,blocks,e),velocity=[delta.x,delta.y],speed=length(velocity),timeEpsilon=e/Math.max(speed,1),events=[0,1],maxEvents=options.maxEvents??20000;
 const add=t=>{if(Number.isFinite(t)&&t>timeEpsilon&&t<1-timeEpsilon)events.push(t);};
 const limited=()=>({complete:false,epsilon:e,windows:[],criticalTimes:[],reason:'Moving visibility event budget exceeded; no negative visibility conclusion is available.'});
 for(const v of b)for(let i=0;i<fixed.length;i++)for(let j=i+1;j<fixed.length;j++){
  const p=fixed[i],q=fixed[j],den=cross(velocity,sub(q,p));if(Math.abs(den)<=e)continue;
  const t=cross(sub(p,v),sub(q,v))/den;
  if(t>0&&t<1&&eventLineRelevant(a,translated(b,delta,t),p,q,e))add(t);
 }
 // A fixed vertex entering a moving edge, or vice versa, can change occupancy
 // even if the contact line itself does not cross the source polygon.
 for(const v of fixed)for(const [p,q]of pairs(b)){
  const edge=sub(q,p),den=cross(edge,velocity);if(Math.abs(den)<=e)continue;
  const t=cross(edge,sub(v,p))/den;
  if(t>0&&t<1&&onSegment(v,[p[0]+velocity[0]*t,p[1]+velocity[1]*t],[q[0]+velocity[0]*t,q[1]+velocity[1]*t],e))add(t);
  else if(t>0&&t<1&&eventLineRelevant(a,translated(b,delta,t),v,[p[0]+velocity[0]*t,p[1]+velocity[1]*t],e))add(t);
 }
 for(const p of b)for(const poly of[a,...blocks])for(const [v,w]of pairs(poly)){
  const q=[p[0]+velocity[0],p[1]+velocity[1]],hit=intersection(p,q,v,w,e);if(hit&&speed>e)add(dot(sub(hit,p),velocity)/(speed*speed));
 }
 const times=unique(events,timeEpsilon);
 if(times.length>maxEvents)return limited();
 const states=[],points=[];
 for(const t of times){const visibility=polygonVisibility(a,translated(b,delta,t),blocks,options);if(!visibility.complete)return{...limited(),criticalTimes:times,reason:visibility.reason};points.push(visibility);}
 for(let i=0;i<times.length-1;i++){
  const t=(times[i]+times[i+1])/2,visibility=polygonVisibility(a,translated(b,delta,t),blocks,options);
  if(!visibility.complete)return{...limited(),criticalTimes:times,reason:visibility.reason};
  states.push(visibility);
 }
 const windows=[];
 for(let i=0;i<states.length;i++)if(states[i].clear){const previous=windows.at(-1);if(previous&&previous.end===times[i]&&points[i].clear){previous.end=times[i+1];previous.includeEnd=points[i+1].clear;}else windows.push({start:times[i],end:times[i+1],includeStart:points[i].clear,includeEnd:points[i+1].clear,witnessAt:(times[i]+times[i+1])/2,witness:states[i]});}
 for(let i=0;i<times.length;i++)if(points[i].clear&&!states[i-1]?.clear&&!states[i]?.clear)windows.push({start:times[i],end:times[i],includeStart:true,includeEnd:true,witnessAt:times[i],witness:points[i]});
 return{complete:true,epsilon:e,criticalTimes:times,windows:windows.sort((x,y)=>x.start-y.start),anyExposure:windows.length>0};
}

function quadraticRoots(a,b,c,e){
 const scale=Math.max(Math.abs(a),Math.abs(b),Math.abs(c),1);
 if(Math.abs(a)<=e*scale){if(Math.abs(b)<=e*scale)return[];return[-c/b];}
 const disc=b*b-4*a*c,rounding=e*Math.max(b*b,Math.abs(4*a*c),1);
 if(disc<-rounding)return[];
 const root=Math.sqrt(Math.max(0,disc)),q=-.5*(b+(b<0?-root:root));
 return q?[q/a,c/q]:[-b/(2*a)];
}

/** Was the WHOLE target visible from some source-perimeter point at ANY time?
 * Useful for a 'fleeting gap' modifier: clear:false is stronger than testing the
 * currently selected reaction point. As with the other APIs, clear:null means
 * the budget was exceeded and must not be interpreted as never visible.
 *
 * Along a fixed source edge, a tangency through obstacle vertex v and translating
 * target vertex q(t) cuts that edge at s(t)=(A+B*t)/(C+D*t). Feasible full-view
 * source intervals change when these cuts meet each other (quadratic roots),
 * meet an edge endpoint, or a base contacts a blocker. These events supplement
 * movingVisibility's critical times. Every remaining open time interval is
 * checked with the continuous wholeTargetVisibility solver.
 *
 * Supply options.criticalTimes from a previous movingVisibility call to reuse
 * its partition. Otherwise it is generated here. This is a numerical arrangement
 * algorithm with the same tolerance/degeneracy qualifications as the static API;
 * no claim of arbitrary-precision or formally verified geometry is made.
 */
export function movingWholeTargetVisibility(source,target,delta,obstacles=[],options={}){
 if(!delta||![delta.x,delta.y].every(Number.isFinite))throw Error('Supply a finite target translation.');
 const a=polygon(source),b=polygon(target),e=options.epsilon??VISIBILITY_EPSILON,speed=Math.hypot(delta.x,delta.y),timeEpsilon=e/Math.max(speed,1),swept=hull([...a,...b,...translated(b,delta,1)],e),blocks=obstacles.map(polygon).filter(p=>overlap(swept,p,e)),velocity=[delta.x,delta.y],events=[0,1],maxEvents=options.maxEvents??20000,maxPairs=options.maxPairs??1000000;
 let testedTimes=0,checkedPairs=0;
 const classify=t=>{testedTimes++;const result=wholeTargetVisibility(a,translated(b,delta,t),blocks,options);return{...result,at:t,testedTimes,checkedPairs};};
 // These are positive-witness shortcuts only. A negative decision always goes
 // through the complete event partition below.
 for(const t of[0,.5,1]){const result=classify(t);if(result.clear||!result.complete)return result;}
 const base=options.criticalTimes?{complete:true,criticalTimes:options.criticalTimes}:movingVisibility(a,b,delta,blocks,options);
 if(!base.complete)return{clear:null,complete:false,reason:base.reason,testedTimes,checkedPairs};
 if(!Array.isArray(base.criticalTimes)||base.criticalTimes.some(t=>!Number.isFinite(t)||t<0||t>1))throw Error('Critical times must lie between zero and one.');
 events.push(...base.criticalTimes);
 const add=t=>{if(Number.isFinite(t)&&t>timeEpsilon&&t<1-timeEpsilon)events.push(t);};
 for(const [start,end]of pairs(a)){
  const edge=sub(end,start),D=-cross(edge,velocity),curves=[];
  if(length(edge)<=e)continue;
  for(const targetVertex of b)for(const obstacle of blocks)for(const v of obstacle){const q=sub(targetVertex,start),r=sub(v,start);curves.push({A:cross(q,r),B:cross(velocity,r),C:cross(edge,sub(v,targetVertex)),q:targetVertex,v});}
  for(let i=0;i<curves.length;i++)for(let j=i+1;j<curves.length;j++){
   if(++checkedPairs>maxPairs)return{clear:null,complete:false,reason:'Whole-movement visibility pair budget exceeded.',testedTimes,checkedPairs};
   const p=curves[i],q=curves[j],roots=quadraticRoots(D*(p.B-q.B),D*(p.A-q.A)+p.B*q.C-q.B*p.C,p.A*q.C-q.A*p.C,Number.EPSILON*32);
   for(const t of roots){
    if(t<=0||t>=1)continue;
    const denominator=p.C+D*t;if(Math.abs(denominator)<=e)continue;
    const s=(p.A+p.B*t)/denominator;if(s<0||s>1)continue;
    const origin=at(start,end,s),targetA=[p.q[0]+delta.x*t,p.q[1]+delta.y*t],targetB=[q.q[0]+delta.x*t,q.q[1]+delta.y*t];
    if(onSegment(p.v,origin,targetA,e*4)&&onSegment(q.v,origin,targetB,e*4))add(t);
   }
  }
 }
 const times=unique(events,timeEpsilon);
 if(times.length>maxEvents)return{clear:null,complete:false,reason:'Whole-movement visibility event budget exceeded.',testedTimes,checkedPairs};
 for(let i=0;i<times.length;i++)for(const t of[i?((times[i-1]+times[i])/2):0,times[i]]){
  const result=classify(t);if(result.clear||!result.complete)return{...result,criticalTimes:times};
 }
 return{clear:false,complete:true,epsilon:e,testedTimes,checkedPairs,criticalTimes:times};
}
