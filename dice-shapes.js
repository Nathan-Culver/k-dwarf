import {Vector3,Quaternion,BoxGeometry,TetrahedronGeometry,OctahedronGeometry,DodecahedronGeometry,IcosahedronGeometry,CylinderGeometry}from'three';
const cache=new Map();
export function diceShape(sides){
 if(cache.has(sides))return cache.get(sides);
 let g;if(sides===4)g=new TetrahedronGeometry(1);else if(sides===6)g=new BoxGeometry(1.25,1.25,1.25);else if(sides===8)g=new OctahedronGeometry(1);else if(sides===12)g=new DodecahedronGeometry(1);else if(sides===20)g=new IcosahedronGeometry(1);else if(sides===2)g=new CylinderGeometry(.85,.85,.22,20);else if(sides===10||sides===100)return trapezohedron(sides);
 const positions=g.getAttribute('position'),index=g.index,groups=[];
 for(let i=0;i<(index?index.count:positions.count);i+=3){const vertices=Array.from({length:3},(_,j)=>new Vector3().fromBufferAttribute(positions,index?index.getX(i+j):i+j)),n=new Vector3().crossVectors(vertices[1].clone().sub(vertices[0]),vertices[2].clone().sub(vertices[0])).normalize(),plane=n.dot(vertices[0]);let group=groups.find(f=>f.n.dot(n)>.9999&&Math.abs(f.plane-plane)<.001);if(!group){group={n,plane,points:[]};groups.push(group);}for(const v of vertices)if(!group.points.some(w=>w.distanceTo(v)<.001))group.points.push(v);}
 const faces=groups.map((f,i)=>{const center=f.points.reduce((a,v)=>a.add(v),new Vector3()).multiplyScalar(1/f.points.length),x=f.points[0].clone().sub(center).normalize(),y=new Vector3().crossVectors(f.n,x);return{normal:f.n,center,points:f.points.sort((a,b)=>Math.atan2(y.dot(a.clone().sub(center)),x.dot(a.clone().sub(center)))-Math.atan2(y.dot(b.clone().sub(center)),x.dot(b.clone().sub(center)))),value:i+1};});
 const answer={faces,top:(value)=>new Quaternion().setFromUnitVectors((sides===2?faces.find(f=>f.normal.y>.9):faces[(value-1)%faces.length]).normal,new Vector3(0,0,1))};cache.set(sides,answer);g.dispose();return answer;
}
function trapezohedron(sides){
 // The dual of a regular pentagonal antiprism has ten congruent kite faces.
 const n=5,h=.48,vertices=[];for(let j=0;j<2;j++)for(let i=0;i<n;i++){const a=i*2*Math.PI/n+j*Math.PI/n;vertices.push(new Vector3(Math.cos(a),Math.sin(a),j?-h:h));}
 const polygons=[Array.from({length:n},(_,i)=>i),Array.from({length:n},(_,i)=>n+i)];for(let i=0;i<n;i++){const k=(i+1)%n;polygons.push([i,k,n+i],[n+i,n+k,k]);}
 const dual=polygons.map(poly=>{const a=vertices[poly[0]],b=vertices[poly[1]],c=vertices[poly[2]],normal=new Vector3().crossVectors(b.clone().sub(a),c.clone().sub(a)).normalize();if(normal.dot(a)<0)normal.negate();return normal.multiplyScalar(1/normal.dot(a));});const scale=1/Math.max(...dual.map(v=>v.length()));dual.forEach(v=>v.multiplyScalar(scale));
 const faces=vertices.map((v,i)=>{const normal=v.clone().normalize(),points=polygons.flatMap((p,k)=>p.includes(i)?[dual[k]]:[]),center=points.reduce((a,p)=>a.add(p),new Vector3()).multiplyScalar(1/points.length),x=points[0].clone().sub(center).normalize(),y=new Vector3().crossVectors(normal,x);return{normal,center,points:points.sort((a,b)=>Math.atan2(y.dot(a.clone().sub(center)),x.dot(a.clone().sub(center)))-Math.atan2(y.dot(b.clone().sub(center)),x.dot(b.clone().sub(center)))),value:i+1};});
 const answer={faces,top:value=>new Quaternion().setFromUnitVectors(faces[(value-1)%10].normal,new Vector3(0,0,1))};cache.set(sides,answer);return answer;
}
