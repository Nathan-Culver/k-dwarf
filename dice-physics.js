import{World,Body,Plane,Box,Vec3,ConvexPolyhedron,SAPBroadphase}from'./vendor/cannon-es.js';
import{diceShape}from'./dice-shapes.js';
const hulls=new Map();
export function physicsHull(sides){
 const key=sides===100?10:sides;if(hulls.has(key))return hulls.get(key);
 const mesh=diceShape(key),vertices=[],faces=mesh.faces.map(f=>f.points.map(p=>{let i=vertices.findIndex(v=>Math.hypot(v.x-p.x,v.y-p.y,v.z-p.z)<1e-6);if(i<0){i=vertices.length;vertices.push(new Vec3(p.x,p.y,p.z));}return i;}));
 const hull=new ConvexPolyhedron({vertices,faces});hulls.set(key,hull);return hull;
}
export function createDicePhysics(descriptors,{width,height,radius,onImpact=()=>{}}){
 const world=new World({gravity:new Vec3(0,0,-32),allowSleep:true});world.broadphase=new SAPBroadphase(world);world.solver.iterations=12;world.defaultContactMaterial.friction=.38;world.defaultContactMaterial.restitution=.35;
 const floor=new Body({mass:0,shape:new Plane()});world.addBody(floor);
 const W=width/radius,H=height/radius;
 for(const[x,y,hx,hy]of[[0,H/2,1,H/2+2],[W,H/2,1,H/2+2],[W/2,0,W/2+2,1],[W/2,H,W/2+2,1]])world.addBody(new Body({mass:0,shape:new Box(new Vec3(hx,hy,10)),position:new Vec3(x,y,8)}));
 let lastImpact=0;const bodies=descriptors.map(d=>{const body=new Body({mass:1,shape:physicsHull(d.record.sides),linearDamping:.3,angularDamping:.28,sleepTimeLimit:.25,sleepSpeedLimit:.15});body.position.set(d.x/radius,d.y/radius,d.z?d.z/radius/.48:1.05);body.quaternion.copy(d.q);body.fixedRotation=true;body.updateMassProperties();body.addEventListener('collide',e=>{const speed=Math.abs(e.contact?.getImpactVelocityAlongNormal?.()||0);if(speed>1&&Date.now()-lastImpact>45){lastImpact=Date.now();onImpact(Math.min(2,speed/7));}});world.addBody(body);return body;});
 return{world,bodies,toss(random=Math.random){for(const[i,b]of bodies.entries()){if(descriptors[i].record.held)continue;b.fixedRotation=false;b.updateMassProperties();b.wakeUp();b.position.z=3+random()*3;b.velocity.set((random()-.5)*12,(random()-.5)*10,3+random()*5);b.angularVelocity.set((random()-.5)*25,(random()-.5)*25,(random()-.5)*25);b.quaternion.setFromEuler(random()*6,random()*6,random()*6);}},step(dt,tilt={x:0,y:0}){world.gravity.set((tilt.x||0)*12,(tilt.y||0)*12,-32);world.step(1/90,Math.min(.09,dt),8);},sync(){for(const[i,b]of bodies.entries()){const d=descriptors[i];d.x=b.position.x*radius;d.y=b.position.y*radius;d.z=b.position.z*radius*.48;d.q.copy(b.quaternion);}},freeze(){for(const b of bodies){b.velocity.setZero();b.angularVelocity.setZero();b.fixedRotation=true;b.updateMassProperties();b.sleep();}},drag(index,x,y,vx=0,vy=0){const b=bodies[index];b.position.x=Math.max(2,Math.min(W-2,x/radius));b.position.y=Math.max(2,Math.min(H-2,y/radius));b.velocity.set(vx/radius,vy/radius,0);b.wakeUp();},destroy(){for(const b of [...world.bodies])world.removeBody(b);}};
}

// Plan the visual throw before displaying it. Face labels are assigned once,
// before the first animation frame, and never rewritten when motion stops.
function* diceRollSteps(physics,descriptors,{random=Math.random,seconds=4,step=1/90}={}){
 const frames=[],capture=()=>frames.push(descriptors.map(d=>({x:d.x,y:d.y,z:d.z,q:d.q.clone()})));
 physics.toss(random);physics.sync();capture();
 for(let t=0;t<seconds;t+=step){physics.step(step);physics.sync();capture();yield;}
 physics.freeze();
 const offsets=descriptors.map(d=>{
  if(d.record.held)return d.faceOffset||0;
  const sides=d.record.sides===100?10:d.record.sides;if(sides===2)return 0;
  let top=d.shape.faces[0],up=-Infinity;
  for(const f of d.shape.faces){const z=f.normal.clone().applyQuaternion(d.q).z;if(z>up){up=z;top=f;}}
  const face=d.part==='tens'?Math.floor((d.record.face%100)/10)+1:d.part==='ones'?d.record.face%10+1:d.record.face;
  return((face-top.value)%sides+sides)%sides;
 });
 return{frames,offsets};
}

// Share the deterministic throw planner, yielding between physics steps in the UI.
export function planDiceRoll(physics,descriptors,options){const steps=diceRollSteps(physics,descriptors,options);let result;do{result=steps.next();}while(!result.done);return result.value;}
export async function planDiceRollAsync(physics,descriptors,{signal,...options}={}){
 const steps=diceRollSteps(physics,descriptors,options);
 // Let the browser paint the rolling state before planning the trajectory.
 await new Promise(resolve=>setTimeout(resolve,0));
 for(;;){if(signal?.aborted)throw new DOMException('Dice tray closed','AbortError');const start=performance.now();let result;do{result=steps.next();if(result.done)return result.value;}while(performance.now()-start<4);await new Promise(resolve=>setTimeout(resolve,0));}
}
