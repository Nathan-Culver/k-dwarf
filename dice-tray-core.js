export const DICE_TYPES=Object.freeze([2,4,6,8,10,12,20,100]);
export const TRAY_MODES=Object.freeze(['sum','target','highest','lowest','drop-highest','drop-lowest','keep-highest','keep-lowest']);
export function randomFace(sides,random=null){if(!DICE_TYPES.includes(sides))throw Error('Unsupported die.');if(random){const n=random();if(!Number.isFinite(n)||n<0||n>=1)throw Error('Invalid random source.');return 1+Math.floor(n*sides);}const max=2**32,limit=max-max%sides,a=new Uint32Array(1);do{crypto.getRandomValues(a);}while(a[0]>=limit);return 1+a[0]%sides;}
export function summarizeDice(records,{mode='sum',target=4,modifier=0,keep=1,base=null,net=0}={}){
 if(!TRAY_MODES.includes(mode)||!Number.isFinite(target)||!Number.isFinite(modifier))throw Error('Invalid result calculation.');
 const ranked=records.map((d,i)=>({i,value:d.value})).sort((a,b)=>b.value-a.value||a.i-b.i);let chosen=records.map((_,i)=>i);
 if(base!==null)chosen=(net>=0?ranked:[...ranked].reverse()).slice(0,base).map(d=>d.i);
 else if(mode==='drop-highest')chosen=ranked.slice(1).map(d=>d.i);
 else if(mode==='drop-lowest')chosen=ranked.slice(0,-1).map(d=>d.i);
 else if(mode==='keep-highest')chosen=ranked.slice(0,keep).map(d=>d.i);
 else if(mode==='keep-lowest')chosen=ranked.slice(-keep).map(d=>d.i);
 const selected=records.filter((_,i)=>chosen.includes(i)),sum=selected.reduce((n,d)=>n+d.value,0)+modifier,hits=selected.filter(d=>d.value+modifier>=target).length,highest=selected.length?Math.max(...selected.map(d=>d.value)):0,lowest=selected.length?Math.min(...selected.map(d=>d.value)):0;
 return{sum,hits,highest,lowest,chosen,dropped:records.map((_,i)=>i).filter(i=>!chosen.includes(i)),exploding:chosen.filter(i=>records[i].value===records[i].sides),result:mode==='target'?hits:mode==='highest'?highest+modifier:mode==='lowest'?lowest+modifier:sum};
}
const safeText=(v,n)=>typeof v==='string'&&v.trim().length>0&&v.length<=n&&!/[<>\u0000-\u001f]/.test(v);
export function validateDiceBag(b){
 if(!b||typeof b!=='object'||Array.isArray(b)||!safeText(b.name,60)||!Array.isArray(b.pool)||!b.pool.length||b.pool.length>40)throw Error('Choose a valid dice bag.');
 let count=0;for(const p of b.pool){if(!p||!DICE_TYPES.includes(p.sides)||!Number.isInteger(p.count)||p.count<1||p.count>120||p.color&&!/^#[0-9a-f]{6}$/i.test(p.color)||p.faces&&(!Array.isArray(p.faces)||p.faces.length!==p.sides||p.faces.some(f=>!safeText(f.label,20)||!Number.isFinite(f.value)||Math.abs(f.value)>100000)))throw Error('Invalid dice bag entry.');count+=p.count;}
 if(count>120)throw Error('A free-roll bag supports up to 120 dice. Game-required pools are prepared separately.');
 if(!TRAY_MODES.includes(b.mode)||!Number.isFinite(b.target)||b.target< -100000||b.target>100000||!Number.isFinite(b.modifier)||Math.abs(b.modifier)>100000||!Number.isInteger(b.keep)||b.keep<1||b.keep>120||typeof b.exploding!=='boolean')throw Error('Invalid dice bag calculation.');
 return structuredClone({name:b.name,pool:b.pool,mode:b.mode,target:b.target,modifier:b.modifier,keep:b.keep,exploding:b.exploding});
}
export function rollDiceBag(bag,{random=null,previous=[]}={}){
 const b=validateDiceBag(bag),rollId=Date.now().toString(36),records=[],held=previous.filter(d=>d.held),consumed=new Set();let serial=0;
 for(const p of b.pool)for(let i=0;i<p.count;i++){
  const old=held.find((d,j)=>!consumed.has(j)&&d.sides===p.sides&&d.customKey===JSON.stringify(p.faces||null));
  if(old){consumed.add(held.indexOf(old));records.push({...old});continue;}
  let generation=0,value;do{if(++generation>100||records.length>=2000)throw Error('Free-roll explosion limit exceeded.');value=randomFace(p.sides,random);const face=p.faces?.[value-1];records.push({id:'free-'+rollId+'-'+serial++,sides:p.sides,face:value,value:face?.value??value,label:face?.label??String(value),color:p.color,customKey:JSON.stringify(p.faces||null),faces:p.faces,explosion:generation>1,held:false});}while(b.exploding&&value===p.sides);
 }
 for(const [i,d]of held.entries())if(!consumed.has(i))records.push({...d});
 return{records,summary:summarizeDice(records,b)};
}
export const defaultBag=()=>({name:'Field dice',pool:[{sides:6,count:3}],mode:'target',target:4,modifier:0,keep:1,exploding:true});
