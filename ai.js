import{QUALITIES}from'./data.js';
import * as E from './engine.js';import{boardOf}from'./table.js';import{center,dist,movementTerrain,edgeDistance}from'./geometry.js';
export function chooseReaction(s){const opts=E.reactionOptions(s);if(!opts.length){const p=s.pending,m=p.moves[p.index],u=E.contact(s,m.id);if(u?.camouflaged){const c=E.reactionCandidates(s).find(o=>!E.unit(s,o.id).noSkill);if(c)return{type:'reactive-action',id:c.id,kind:'skill',skill:'discover',t:(c.windows[0][0]+c.windows[0][1])/2,options:{target:u.id}};}return{type:'decline'};}const first=opts.sort((a,b)=>QUALITIES[E.unit(s,b.id).quality].die-QUALITIES[E.unit(s,a.id).quality].die)[0];return{type:'react',ids:[first.id],t:(first.windows[0][0]+first.windows[0][1])/2,mode:'single'};}
export function chooseAction(s){if(s.programPending){const h=E.living(s).find(u=>u.side!==s.programPending.side&&u.type==='hacker'&&u.status!=='suppressed'&&!u.noCounterware&&['standard','hunter'].includes(u.module));return{type:'program-resolve',id:h?.id};}if(s.events.length){const e=s.events[0],targets=E.living(s).filter(u=>u.side!==e.side&&(e.card.value!=='ammunition'||!E.vehicle(u))&&(e.card.value!=='breakdown'||E.armored(u)));return{type:'event',target:targets[0]?.id};}if(s.deferredAction)return{type:'resume-action'};if(s.smokeChoice){const c=s.smokeChoice,b=boardOf(s),points=[c.target];for(let y=24;y<b.height;y+=80)for(let x=24;x<b.width;x+=80)points.push({x,y});const legal=points.filter(p=>!E.smokeChoiceError(s,p));return{type:'smoke-place',to:legal.sort((a,b)=>dist(b,c.target)-dist(a,c.target))[0]};}if(s.orderWindow)return{type:'order-pass'};if(s.routQueue?.length&&!s.pending)return{type:'rout',id:s.routQueue[0]};if(s.pending)return chooseReaction(s);if(s.firefight){const p=s.firefight,fs=E.living(s).filter(u=>u.side!==p.side&&E.canShoot(u)&&!E.fireEligibility(s,u,E.unit(s,p.ids[0]),{reactive:true}));return{type:'firefight',ids:fs.length?[fs[0].id]:[],mode:'single',decline:!fs.length};}if(s.combat)return{type:'combat'};if(!E.commandCount(s.commands[s.active])&&E.living(s).some(u=>u.side===s.active))return{type:'command-refresh',side:s.active};const side=s.active,hard=s.options.difficulty==='hard',own=E.living(s).filter(u=>u.side===side),enemy=E.living(s).filter(u=>u.side!==side&&!u.hidden&&!u.camouflaged);if(hard){for(const u of own.filter(u=>['engineer','medic','hacker'].includes(u.type)&&u.status==='ready'&&!u.noSkill)){const t=own.find(t=>['pinned','suppressed'].includes(t.status)&&(u.type==='medic'?!E.armored(t):u.type==='engineer'?true:['android','drone'].includes(t.type))&&(u.type==='hacker'?E.programControl(s,u,t).control:dist(u,t)<=33));if(t)return{type:'skill',id:u.id,kind:u.type==='medic'?'heal':'repair',options:{target:t.id}};}const c=own.find(u=>E.commander(u)&&!u.featUsed&&u.feat==='Inspire Heroism'&&u.status==='ready'&&!u.noSkill);if(c)return{type:'skill',id:c.id,kind:'feat'};}for(const u of own.filter(u=>['pinned','suppressed'].includes(u.status)&&!['android','drone'].includes(u.type)&&!u.breakdown&&!u.noRally))return{type:'rally',id:u.id};const shots=[];for(const u of own.filter(E.canShoot))for(const t of enemy){const f=E.fireSet(s,[u.id],t.id);if(!f.error)shots.push({u,t,score:(t.status==='suppressed'?8:t.status==='pinned'?4:0)+3+(E.firingProfile(s,u,t).adv-E.firingProfile(s,u,t).dis)+(hard?(E.commander(t)?3:0)+(E.armored(t)?2:0)+(QUALITIES[u.quality].die-6)*.2:0)});}if(shots.length&&s.objectives.some(o=>o.owner!==side)){const advance=chooseMovement(s,{objectivesOnly:true});if(advance)return advance;}if(shots.length){shots.sort((a,b)=>b.score-a.score);const {u,t}=shots[0],ids=[u.id];if(s.options.difficulty!=='easy')for(const extra of own.filter(v=>v.platoon===u.platoon&&v.id!==u.id&&E.canShoot(v)))if(!E.fireSet(s,[...ids,extra.id],t.id,'crossfire').error)ids.push(extra.id);return{type:'fire',ids,target:t.id,mode:ids.length>1?'crossfire':'single'};}// Close infantry must be able to resolve protected positions by melee rather
// than alternate endless voluntary passes at the edge of a depression.
for(const u of own.filter(u=>u.status==='ready'&&!u.prone&&!E.commander(u)&&!E.vehicle(u)&&!['heavy','indirect','hmg'].includes(u.type)))for(const t of enemy.slice().sort((a,b)=>dist(u,a)-dist(u,b))){
 if(dist(u,t)>180)continue;
 const points=[E.assaultDestination(s,u,t),...Array.from({length:8},(_,i)=>({x:t.x+Math.cos(i*Math.PI/4)*30,y:t.y+Math.sin(i*Math.PI/4)*30}))];
 for(const to of points){const options={kind:'assault',target:t.id};const plan=E.previewMovement(s,[u.id],to,options);if(!plan.error&&(edgeDistance({...u,...plan.moves[0].to},t)<2||E.feature(s,t)?.type==='building'))return{type:'move',ids:[u.id],to,options};}
}
for(const u of E.alive(s).filter(u=>u.side===side&&u.offTable&&!u.crewOf&&!u.transportId&&u.reserve&&s.initiative>=3)){
 for(let y=24;y<boardOf(s).height;y+=48){const to={x:side?boardOf(s).width-24:24,y};try{const trial=structuredClone(s);E.withDice(trial,d=>d.map(()=>4),()=>E.skill(trial,u.id,'reserve',{to}));return{type:'skill',id:u.id,kind:'reserve',options:{to}};}catch{}}
}
const movement=chooseMovement(s);if(movement)return movement;const prone=own.find(u=>u.prone&&u.status==='ready');if(prone)return{type:'move',ids:[prone.id],to:prone,options:{kind:'stand'}};return{type:'pass'};}
export function applyAI(s,a){return E.performAction(s,a);}

// Advance an unlocked patrol marker without voluntarily ending reconnaissance.
export function chooseReconMove(s, side=s.recon.turn){
 const b=boardOf(s),direction=side?-1:1;
 for(const m of s.recon.markers.filter(m=>m.side===side&&!m.locked)){
  const points=[...s.terrain.map(center),...[120,60,30].map(step=>({x:Math.max(32,Math.min(b.width-32,m.x+direction*step)),y:m.y}))]
   .filter(p=>direction*(p.x-m.x)>1).sort((a,b)=>dist(m,a)-dist(m,b));
  for(const to of points){
   try{const trial=structuredClone(s);E.moveRecon(trial,m.id,to);return{id:m.id,to};}catch{}
  }
 }
 return null;
}

// Consider short advances as well as feature centers, so a blocked final
// destination does not prevent progress along an otherwise legal route.
export function chooseMovement(s,{objectivesOnly=false}={}){
 const side=s.active,hard=s.options.difficulty==='hard',own=E.living(s).filter(u=>u.side===side&&u.status==='ready'&&!u.prone),enemy=E.living(s).filter(u=>u.side!==side&&!u.hidden&&!u.camouflaged);
 const objectives=s.objectives.filter(o=>o.owner!==side),b=boardOf(s),moves=[];
 if(objectivesOnly&&!objectives.length)return null;
 for(const u of own){
  // Resolve immediate enemy threats before crossing open ground for an objective.
  if(objectivesOnly&&enemy.some(e=>dist(u,e)<=240))continue;
  const objective=objectives.slice().sort((a,b)=>dist(u,a)-dist(u,b))[0]||{x:b.width/2,y:b.height/2};
  const goal=objectivesOnly||!enemy.length||E.commander(u)?objective:enemy.reduce((a,b)=>dist(u,a)<dist(u,b)?a:b),old=dist(u,goal);
  if(old<8)continue;
  const dx=(goal.x-u.x)/old,dy=(goal.y-u.y)/old;
  const points=[goal,...s.terrain.map(center),...[64,128,240].map(step=>({x:u.x+dx*Math.min(step,old),y:u.y+dy*Math.min(step,old)})),...Array.from({length:8},(_,i)=>({x:u.x+Math.cos(i*Math.PI/4)*96,y:u.y+Math.sin(i*Math.PI/4)*96}))];
  const seen=new Set();
  for(const c of points)for(const [ox,oy]of [[0,0],[32,0],[-32,0],[0,32],[0,-32]]){
   const to={x:c.x+ox,y:c.y+oy},key=to.x.toFixed(2)+','+to.y.toFixed(2);if(seen.has(key))continue;seen.add(key);
   const gain=old-dist(to,goal);if(gain<8)continue;
   const plan=E.previewMovement(s,[u.id],to);if(plan.error)continue;
   const capture=objectives.some(o=>dist(to,o)<32),score=gain+(capture?80:0)+(E.feature(s,to)?.cover||0)*25-(E.commander(u)?20:0)+(hard?Math.max(0,500-dist(to,objective))*.3-enemy.filter(e=>E.canShoot(e)&&E.sight(s,e,{...u,...to}).clear).length*45:0);
   moves.push({type:'move',ids:[u.id],to,score});
  }
 }
 moves.sort((a,b)=>b.score-a.score);return moves[0]||null;
}
