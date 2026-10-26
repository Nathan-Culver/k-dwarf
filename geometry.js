import {polygonVisibility,wholeTargetVisibility,movingVisibility,movingWholeTargetVisibility} from './visibility.js';
import {B,W,H} from './data.js';
import {TERRAIN_RULES} from './battlefields.js';
import {tableContains} from './table.js';
export const EPS=1e-7;
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
const cross=(a,b)=>a.x*b.y-a.y*b.x;
export function segmentT(a,b,c,d){const r={x:b.x-a.x,y:b.y-a.y},s={x:d.x-c.x,y:d.y-c.y},den=cross(r,s),q={x:c.x-a.x,y:c.y-a.y};if(Math.abs(den)<EPS)return null;const t=cross(q,s)/den,u=cross(q,r)/den;return t>=-EPS&&t<=1+EPS&&u>=-EPS&&u<=1+EPS?Math.max(0,Math.min(1,t)):null;}
export function inside(p,poly){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a={x:poly[i][0],y:poly[i][1]},b={x:poly[j][0],y:poly[j][1]};if(pointSegmentDistance(p,a,b)<EPS)return true;if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)yes=!yes;}return yes;}
export function pointSegmentDistance(p,a,b){const dd=(b.x-a.x)**2+(b.y-a.y)**2,t=dd?Math.max(0,Math.min(1,((p.x-a.x)*(b.x-a.x)+(p.y-a.y)*(b.y-a.y))/dd)):0;return dist(p,mix(a,b,t));}
export function crosses(a,b,poly){if(inside(mix(a,b,.5),poly))return true;return poly.some((v,i)=>segmentT(a,b,{x:v[0],y:v[1]},{x:poly[(i+1)%poly.length][0],y:poly[(i+1)%poly.length][1]})!==null);}
export function feature(s,p){return s.terrain.find(t=>inside(p,t.points))||null;}
export function center(t){return{x:t.points.reduce((n,p)=>n+p[0],0)/t.points.length,y:t.points.reduce((n,p)=>n+p[1],0)/t.points.length};}
export function firePoint(s,u){const f=feature(s,u);return ['building','fortification','ruins'].includes(f?.type)?center(f):u;}
export function footprint(u){const size=['pc','cc','bc'].includes(u.type)?B*.55:B,r=(u.facing||0)*Math.PI/180,c=Math.cos(r),sn=Math.sin(r);return[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>[u.x+(x*c-y*sn)*size/2,u.y+(x*sn+y*c)*size/2]);}
export function edgeDistance(a,b){const ap=footprint(a),bp=footprint(b);if(inside(a,bp)||inside(b,ap)||ap.some((v,i)=>crosses({x:v[0],y:v[1]},{x:ap[(i+1)%ap.length][0],y:ap[(i+1)%ap.length][1]},bp)))return 0;let d=Infinity;for(const [p,q]of [[ap,bp],[bp,ap]])for(const v of p)for(let i=0;i<q.length;i++)d=Math.min(d,pointSegmentDistance({x:v[0],y:v[1]},{x:q[i][0],y:q[i][1]},{x:q[(i+1)%q.length][0],y:q[(i+1)%q.length][1]}));return d;}
export const near=(a,b)=>edgeDistance(a,b)<B-EPS;
export function inArc(s,a,b,half=45){const p=firePoint(s,a),q=firePoint(s,b),angle=Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI,delta=((angle-a.facing+540)%360)-180;return Math.abs(delta)<=half+EPS;}
function sampledSight(s,a,b,{direct=false,ignoreSmoke=false}={}){if(!a||!b)return{clear:false,reason:'No target.'};const af=feature(s,a),bf=feature(s,b),point=u=>!u.type||u.pointOnly,edges=u=>{if(point(u)||['building','fortification','ruins'].includes(feature(s,u)?.type))return[firePoint(s,u)];const p=footprint(u);return p.flatMap((v,i)=>[{x:v[0],y:v[1]},mix({x:v[0],y:v[1]},{x:p[(i+1)%4][0],y:p[(i+1)%4][1]},.5)]);},sources=edges(a),targets=edges(b),blockers=[...(!ignoreSmoke?(s.smoke||[]).map(m=>({id:m.id,name:'smoke screen',points:smokePolygon(m)})):[]),...s.terrain.filter(t=>t!==af&&t!==bf&&TERRAIN_RULES[t.type]?.blocksSight!==false)];let blocked=null;for(const p of sources)for(const q of targets){const hit=blockers.find(t=>crosses(p,q,t.points));if(!hit)return{clear:true,reason:direct?'Clear base-edge line of fire':'Clear base-edge line of sight',from:p,to:q};blocked=hit;}return{clear:false,reason:'Blocked by '+(blocked?.name||'terrain'),blocker:blocked?.id};}
const sightCache=new WeakMap();
function losPolygon(s,u){
 if(!u.type||u.pointOnly||['building','fortification','ruins'].includes(feature(s,u)?.type)){
  const p=firePoint(s,u);return [[p.x,p.y]];
 }
 return footprint(u);
}
function losBlockers(s,a,b,ignoreSmoke=false){const af=feature(s,a),bf=feature(s,b);return[...(!ignoreSmoke?(s.smoke||[]).map(m=>({id:m.id,name:'smoke screen',points:smokePolygon(m)})):[]),...s.terrain.filter(t=>t!==af&&t!==bf&&TERRAIN_RULES[t.type]?.blocksSight!==false)];}
function geometryCache(s){const signature=JSON.stringify([s.terrain.map(t=>[t.id,t.type,t.points]),s.smoke]);let c=sightCache.get(s);if(c?.signature!==signature){c={signature,values:new Map()};sightCache.set(s,c);}if(c.values.size>4000)c.values.clear();return c.values;}
export function sight(s,a,b,{direct=false,ignoreSmoke=false}={}){
 if(!a||!b)return{clear:false,reason:'No target.'};
 const cache=geometryCache(s),key=JSON.stringify([a.x,a.y,a.facing,a.type,a.pointOnly,b.x,b.y,b.facing,b.type,b.pointOnly,ignoreSmoke]);let answer=cache.get(key);
 if(!answer){
  answer=sampledSight(s,a,b,{ignoreSmoke});
  if(!answer.clear){const exact=polygonVisibility(losPolygon(s,a),losPolygon(s,b),losBlockers(s,a,b,ignoreSmoke));if(!exact.complete)throw Error('LOS geometry exceeds the calculation budget; adjust or adjudicate this complex battlefield.');if(exact.clear)answer={clear:true,from:exact.from,to:exact.to,reason:'Clear base-edge line of sight'};}
  cache.set(key,answer);
 }
 return{...answer,...answer.clear?{reason:direct?'Clear base-edge line of fire':'Clear base-edge line of sight'}:{}};
}
export function wholeBaseVisible(s,a,b){const result=wholeTargetVisibility(losPolygon(s,a),losPolygon(s,b),losBlockers(s,a,b));if(!result.complete)throw Error('Full-base visibility exceeds the calculation budget.');return result.clear;}
// Fleeting exposure is route-wide: partial visibility at the chosen shot point
// alone is insufficient if the whole base could be seen elsewhere on this move.
export function wholeBaseVisibleDuringMove(s,firer,mover,from,to){
 const cache=geometryCache(s),key=JSON.stringify(['whole-move',firer.id,firer.x,firer.y,firer.facing,mover.type,from,to]);if(cache.has(key))return cache.get(key);
 const start={...mover,...from,facing:to.facing},cuts=pathCuts(s,start,to);
 for(let i=0;i<cuts.length-1;i++){
  const lo=cuts[i],hi=cuts[i+1],a={...start,...mix(start,to,lo)},b={...start,...mix(start,to,hi)},mid={...start,...mix(start,to,(lo+hi)/2)};
  const result=movingWholeTargetVisibility(losPolygon(s,firer),losPolygon(s,a),{x:b.x-a.x,y:b.y-a.y},losBlockers(s,firer,mid));
  if(!result.complete)throw Error('Whole-base movement visibility exceeds the calculation budget; shorten or adjudicate the route.');
  if(result.clear){cache.set(key,true);return true;}
 }
 for(const t of cuts)if(wholeBaseVisible(s,firer,{...start,...mix(start,to,t)})){cache.set(key,true);return true;}
 cache.set(key,false);return false;
}
export function pathCuts(s,a,b){const cuts=[0,1];for(const t of [...s.terrain,...(s.smoke||[]).map(m=>({points:smokePolygon(m)}))])for(let i=0;i<t.points.length;i++){const v=t.points[i],w=t.points[(i+1)%t.points.length],x=segmentT(a,b,{x:v[0],y:v[1]},{x:w[0],y:w[1]});if(x!==null)cuts.push(x);}return[...new Set(cuts.map(x=>+x.toFixed(10)))].sort((a,b)=>a-b);}
export function movementTerrain(s,a,b){const start=feature(s,a)?.id,cuts=pathCuts(s,a,b);let entered=null,leftNew=false;for(let i=0;i<cuts.length-1;i++){const f=feature(s,mix(a,b,(cuts[i]+cuts[i+1])/2));if(f&&f.id!==start){if(entered&&entered!==f.id)return{ok:false,reason:'Stop inside the first new terrain feature.'};if(leftNew)return{ok:false,reason:'A move cannot pass out of the first new terrain feature.'};entered=f.id;}else if(entered)leftNew=true;}
 if(entered&&feature(s,b)?.id!==entered)return{ok:false,reason:'End this move inside the first terrain feature entered.'};return{ok:true};}
// Visibility changes only at feature edges, rays through blocking vertices, arc edges,
// and friendly footprint vertices. Partition those exact events, then test each interval.
export function exposureWindows(s,firer,mover,end,eligible){
 const cuts=pathCuts(s,mover,end),result=[];
 for(let i=0;i<cuts.length-1;i++){
  const lo=cuts[i],hi=cuts[i+1],a={...mover,...mix(mover,end,lo)},b={...mover,...mix(mover,end,hi)},mid={...mover,...mix(mover,end,(lo+hi)/2)},blocks=losBlockers(s,firer,mid);
  const visibility=movingVisibility(losPolygon(s,firer),losPolygon(s,a),{x:b.x-a.x,y:b.y-a.y},blocks);
  if(!visibility.complete)throw Error('Movement visibility exceeds the calculation budget; shorten this route or adjudicate the battlefield.');
  // Keep all topology events, including zero-width endpoint opportunities.
  for(const w of visibility.windows){const left=lo+(hi-lo)*w.start,right=lo+(hi-lo)*w.end,t=(left+right)/2;if(eligible({...mover,...mix(mover,end,t)}))result.push([left,right]);}
 }
 for(const t of cuts)if(eligible({...mover,...mix(mover,end,t)}))result.push([t,t]);
 return result.sort((a,b)=>a[0]-b[0]);
}
export const onBoard=(p,s=null)=>tableContains(s,p,B/2);

export function smokePolygon(m){if(m.radius)return Array.from({length:32},(_,i)=>[m.x+Math.cos(i*Math.PI/16)*m.radius,m.y+Math.sin(i*Math.PI/16)*m.radius]);const a=(m.angle||0)*Math.PI/180,L=(m.length||3)*B/2,D=B*.6;return[[-L,-D],[L,-D],[L,D],[-L,D]].map(([x,y])=>[m.x+x*Math.cos(a)-y*Math.sin(a),m.y+x*Math.sin(a)+y*Math.cos(a)]);}
