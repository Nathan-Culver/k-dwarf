import * as T from 'three';
import {fireEventAge} from './fire-visuals.js';
const SHOTS=6,INTERVAL=.045,SMOKE_LIFE=1.35;
export function sampleFireBurst(from,to,age,{indirect=false}={}){
 const dx=to.x-from.x,dy=to.y-from.y,dz=to.z-from.z,length=Math.hypot(dx,dy,dz)||1,travel=Math.max(.035,Math.min(.2,length/6500)),last=(SHOTS-1)*INTERVAL;
 const bullets=[],smoke=[];let flash=0,impact=0;
 for(let i=0;i<SHOTS;i++){
  const t=age-i*INTERVAL;
  if(t>=0&&t<.035)flash=Math.max(flash,1-t/.035);
  if(t>=0&&t<=travel){const p=t/travel,arc=indirect?Math.sin(p*Math.PI)*length*.15:0;bullets.push({index:i,x:from.x+dx*p,y:from.y+dy*p+arc,z:from.z+dz*p});}
  if(t>=0&&t<SMOKE_LIFE){const p=t/SMOKE_LIFE,wind=i%2?1:-1;smoke.push({index:i,x:from.x+dx/length*(3+p*6)+wind*p*5,y:from.y+3+p*18,z:from.z+dz/length*(3+p*6)+p*7,size:4+p*20,opacity:.25*Math.sin(Math.min(1,p*8)*Math.PI/2)*(1-p)**1.5});}
  const hit=t-travel;if(hit>=0&&hit<.09)impact=Math.max(impact,1-hit/.09);
 }
 return{bullets,smoke,flash,impact,active:age>=0&&age<last+SMOKE_LIFE};
}
function texture(smoke){const c=document.createElement('canvas');c.width=c.height=64;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(32,32,0,32,32,32);if(smoke){g.addColorStop(0,'rgba(225,224,214,.8)');g.addColorStop(.4,'rgba(180,184,180,.45)');g.addColorStop(1,'rgba(150,155,155,0)');}else{g.addColorStop(0,'rgba(255,255,235,1)');g.addColorStop(.12,'rgba(255,236,150,1)');g.addColorStop(.4,'rgba(255,143,40,.45)');g.addColorStop(1,'rgba(255,120,25,0)');}ctx.fillStyle=g;ctx.fillRect(0,0,64,64);return new T.CanvasTexture(c);}
export function createFireEffects(scene,events,{height=()=>12}={}){
 events=events.filter(e=>fireEventAge(e)<1.6).slice(-12);
 const root=new T.Group(),light=new T.PointLight('#ffc77f',0,90,2),glow=texture(false),cloud=texture(true),geometry=new T.SphereGeometry(1,6,4),projectileMaterial=new T.MeshBasicMaterial({color:'#fff2bf',toneMapped:false}),materials=[];scene.add(root);root.add(light);
 const sprite=(map,color,additive=false)=>{const material=new T.SpriteMaterial({map,color,transparent:true,depthWrite:false,blending:additive?T.AdditiveBlending:T.NormalBlending,toneMapped:false});materials.push(material);const s=new T.Sprite(material);root.add(s);return s;};
 const bursts=events.map(e=>{
  const from=new T.Vector3(e.from.x,height(e.from),e.from.y),to=new T.Vector3(e.to.x,height(e.to),e.to.y),flash=sprite(glow,'#fff4d1',true),impact=sprite(glow,'#ffbf6a',true),bullets=Array.from({length:SHOTS},()=>{const m=new T.Mesh(geometry,projectileMaterial);m.scale.set(.45,.45,5);m.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),to.clone().sub(from).normalize());root.add(m);return m;}),smoke=Array.from({length:SHOTS},()=>sprite(cloud,'#c0c1b8'));
  flash.position.copy(from);impact.position.copy(to);return{e,from,to,flash,impact,bullets,smoke};
 });
 return{update(){let active=false;light.intensity=0;for(const b of bursts){const state=sampleFireBurst(b.from,b.to,fireEventAge(b.e),{indirect:b.e.mode==='indirect'});active||=state.active;b.flash.visible=state.flash>0;b.flash.material.opacity=state.flash*.9;b.flash.scale.setScalar(8+state.flash*9);if(state.flash*5>light.intensity){light.intensity=state.flash*5;light.position.copy(b.from);}b.impact.visible=state.impact>0;b.impact.material.opacity=state.impact*.55;b.impact.scale.setScalar(3+state.impact*7);b.bullets.forEach(m=>m.visible=false);for(const p of state.bullets){const m=b.bullets[p.index];m.visible=true;m.position.set(p.x,p.y,p.z);}b.smoke.forEach(s=>s.visible=false);for(const p of state.smoke){const s=b.smoke[p.index];s.visible=true;s.position.set(p.x,p.y,p.z);s.scale.setScalar(p.size);s.material.opacity=p.opacity;}}return active;},destroy(){scene.remove(root);geometry.dispose();projectileMaterial.dispose();for(const m of materials)m.dispose();glow.dispose();cloud.dispose();root.clear();}};
}
