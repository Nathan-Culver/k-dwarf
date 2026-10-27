// Bounded reversible JSON patches; history never contains nested game snapshots.
const LIMIT=40,BUDGET=500000,forbidden=new Set(['__proto__','constructor','prototype']);
const copy=v=>v===undefined?undefined:JSON.parse(JSON.stringify(v));
export function gameCore(game){const{history,historyCursor,...core}=game;return copy(core);}
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function diffStates(before,after){const redo=[],undo=[];const add=(forward,back)=>{redo.push(forward);undo.unshift(back);};
 function walk(a,b,path=[]){if(equal(a,b))return;
  if(Array.isArray(a)&&Array.isArray(b)){
   if(path.length===1&&path[0]==='log'){
    const aa=a.map(JSON.stringify),bb=b.map(JSON.stringify);let overlap=Math.min(a.length,b.length);while(overlap&&aa.slice(-overlap).some((v,i)=>v!==bb[i]))overlap--;
    if(overlap>Math.max(a.length,b.length)/2){const removed=a.slice(0,a.length-overlap),added=b.slice(overlap);if(removed.length)add({op:'splice',path,index:0,remove:removed.length,items:[]},{op:'splice',path,index:0,remove:0,items:copy(removed)});if(added.length)add({op:'splice',path,index:overlap,remove:0,items:copy(added)},{op:'splice',path,index:overlap,remove:added.length,items:[]});return;}
   }
   const common=Math.min(a.length,b.length);for(let i=0;i<common;i++)walk(a[i],b[i],[...path,i]);
   if(a.length!==b.length)add({op:'splice',path,index:common,remove:a.length-common,items:copy(b.slice(common))},{op:'splice',path,index:common,remove:b.length-common,items:copy(a.slice(common))});return;
  }
  if(a&&b&&typeof a==='object'&&typeof b==='object'&&!Array.isArray(a)&&!Array.isArray(b)){
   for(const key of new Set([...Object.keys(a),...Object.keys(b)])){
    if(!Object.hasOwn(b,key))add({op:'delete',path:[...path,key]},{op:'set',path:[...path,key],value:copy(a[key])});
    else if(!Object.hasOwn(a,key))add({op:'set',path:[...path,key],value:copy(b[key])},{op:'delete',path:[...path,key]});
    else walk(a[key],b[key],[...path,key]);
   }return;
  }
  add({op:'set',path,value:copy(b)},{op:'set',path,value:copy(a)});
 }
 walk(before,after);return{undo,redo};
}
export function validateHistory(entries,cursor=entries?.length){
 const validPath=p=>Array.isArray(p)&&p.length>0&&p.length<=24&&!['history','historyCursor'].includes(p[0])&&p.every(k=>Number.isInteger(k)?k>=0&&k<=100000:typeof k==='string'&&/^[-\w]{1,160}$/.test(k)&&!forbidden.has(k));
 const op=o=>o&&typeof o==='object'&&validPath(o.path)&&(['set','delete'].includes(o.op)||o.op==='splice'&&Number.isInteger(o.index)&&o.index>=0&&Number.isInteger(o.remove)&&o.remove>=0&&Array.isArray(o.items))&&(o.op!=='set'||Object.hasOwn(o,'value'));
 if(!Array.isArray(entries)||entries.length>LIMIT||!Number.isInteger(cursor)||cursor<0||cursor>entries.length||entries.some(e=>!e||typeof e.label!=='string'||e.label.length>160||!Array.isArray(e.undo)||!Array.isArray(e.redo)||e.undo.length>20000||e.redo.length>20000||!e.undo.every(op)||!e.redo.every(op)))throw Error('Invalid undo/redo history in K-Dwarf save.');
 return true;
}
export function applyPatches(core,patches){const result=copy(core);for(const op of patches){validateHistory([{label:'Patch',undo:[op],redo:[op]}],1);let parent=result;const keys=op.op==='splice'?op.path:op.path.slice(0,-1);for(const key of keys){if(!parent||typeof parent!=='object'||!Object.hasOwn(parent,key))throw Error('History path no longer matches this game.');parent=parent[key];}if(op.op==='splice'){if(!Array.isArray(parent)||op.index>parent.length||op.index+op.remove>parent.length)throw Error('Invalid history array edit.');parent.splice(op.index,op.remove,...copy(op.items));}else{const key=op.path.at(-1);if(op.op==='delete'){if(Array.isArray(parent))throw Error('History cannot delete an array index directly.');delete parent[key];}else parent[key]=copy(op.value);}}
 return result;
}
export class GameHistory{
 constructor(game,validate=g=>g){this.validate=validate;this.entries=copy(game.history||[]);this.cursor=game.historyCursor??this.entries.length;validateHistory(this.entries,this.cursor);this.core=gameCore(game);this.message='';this.attach(game);}
 attach(game){game.history=copy(this.entries);game.historyCursor=this.cursor;}
 record(game,label=null){const next=gameCore(game);if(equal(this.core,next)){this.attach(game);return false;}const patch=diffStates(this.core,next);this.entries=this.entries.slice(0,this.cursor);const last=next.log?.at(-1)?.text;this.entries.push({label:String(label||last||'Game decision').slice(0,160),...patch});this.cursor=this.entries.length;
  while(this.entries.length>LIMIT||JSON.stringify(this.entries).length>BUDGET){this.entries.shift();this.cursor--;}
  this.message=this.entries.length?'':'This change exceeded the undo storage budget.';this.core=next;this.attach(game);return true;
 }
 get canUndo(){return this.cursor>0;}get canRedo(){return this.cursor<this.entries.length;}
 get undoLabel(){return this.entries[this.cursor-1]?.label||'';}get redoLabel(){return this.entries[this.cursor]?.label||'';}
 restore(game,direction){if(direction==='undo'?!this.canUndo:!this.canRedo)throw Error('Nothing to '+direction+'.');const index=direction==='undo'?this.cursor-1:this.cursor,entry=this.entries[index],nextCore=applyPatches(this.core,entry[direction]),next={...nextCore,history:copy(this.entries),historyCursor:this.cursor+(direction==='undo'?-1:1)};
  const checked=this.validate(next);this.cursor=next.historyCursor;this.core=gameCore(checked);this.attach(checked);return checked;
 }
 undo(game){return this.restore(game,'undo');}redo(game){return this.restore(game,'redo');}
}
