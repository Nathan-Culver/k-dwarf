import {QUALITIES} from './data.js';
import {raw} from './rolls.js';
export const commandState=()=>({dice:[],assigned:{},held:{},used:[],cycle:0,initialized:false,discardAvailable:false,discarded:0});
export const commandCount=c=>c.dice.length+Object.values(c.assigned).reduce((n,groups)=>n+groups.reduce((m,g)=>m+g.length,0),0);
export function rollCommandBowl(s,side){if(s.phase!=='battle'||s.winner!==null)throw Error('Begin an active battle before rolling command resources.');const c=s.commands[side];if(commandCount(c))throw Error('Use or release every assigned die before resetting the bowl.');const contributors=s.units.filter(u=>u.side===side&&!u.dead&&!u.surrendered&&!u.offTable);c.cycle++;c.initialized=true;c.discarded=0;c.dice=[];let serial=0;for(const quality of Object.keys(QUALITIES)){const roots=contributors.filter(u=>u.quality===quality),sides=QUALITIES[quality].die;let batch=roots.map(u=>u.id),generation=0;while(batch.length){if(++generation>100||serial>4096)throw Error('Command explosion limit exceeded.');const faces=raw(s,batch.length,sides,{side,kind:"command",stage:generation===1?"roots":"explosion",target:4,label:`Command bowl · D${sides}${generation>1?' · explosion '+(generation-1):''}`}),next=[];faces.forEach((face,i)=>{const source=batch[i];if(face>=4)c.dice.push({id:`cd-${side}-${c.cycle}-${serial++}`,source,quality,sides,face});else c.discarded++;if(face===sides)next.push(source);});batch=next;}}return c;}
export function discardCommandDie(s,side,id){
 const c=s.commands[side];if(side!==s.active||!c.discardAvailable)throw Error('Discard at most one die at the start of your initiative.');
 let found=false;const i=c.dice.findIndex(d=>d.id===id);
 if(i>=0){c.dice.splice(i,1);found=true;}
 else for(const [slot,baskets]of Object.entries(c.assigned)){
  const k=baskets.findIndex(b=>b.some(d=>d.id===id));if(k<0)continue;
  const basket=baskets.splice(k,1)[0];c.dice.push(...basket.filter(d=>d.id!==id));
  delete c.held[slot];s.effects=s.effects.filter(e=>!(e.ongoing&&e.side===side&&e.slot===slot));found=true;break;
 }
 if(!found)throw Error('Choose a die in your bowl or an assigned slot.');
 c.discarded++;c.discardAvailable=false;
}
export function closeCommandDiscard(s){if(s.commands?.[s.active])s.commands[s.active].discardAvailable=false;}
