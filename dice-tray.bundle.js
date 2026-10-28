var te=class p{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){let t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){let t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){let e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new m);let e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new m);let n=this.elements,i=t.x,s=t.y,r=t.z;return e.x=n[0]*i+n[1]*s+n[2]*r,e.y=n[3]*i+n[4]*s+n[5]*r,e.z=n[6]*i+n[7]*s+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new p);let n=this.elements,i=t.elements,s=e.elements,r=n[0],a=n[1],o=n[2],l=n[3],c=n[4],d=n[5],h=n[6],u=n[7],f=n[8],g=i[0],_=i[1],v=i[2],x=i[3],y=i[4],b=i[5],S=i[6],M=i[7],w=i[8];return s[0]=r*g+a*x+o*S,s[1]=r*_+a*y+o*M,s[2]=r*v+a*b+o*w,s[3]=l*g+c*x+d*S,s[4]=l*_+c*y+d*M,s[5]=l*v+c*b+d*w,s[6]=h*g+u*x+f*S,s[7]=h*_+u*y+f*M,s[8]=h*v+u*b+f*w,e}scale(t,e){e===void 0&&(e=new p);let n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new m);let n=3,i=4,s=[],r,a;for(r=0;r<n*i;r++)s.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)s[r+i*a]=this.elements[r+3*a];s[3]=t.x,s[7]=t.y,s[11]=t.z;let o=3,l=o,c,d=4,h;do{if(r=l-o,s[r+i*r]===0){for(a=r+1;a<l;a++)if(s[r+i*a]!==0){c=d;do h=d-c,s[h+i*r]+=s[h+i*a];while(--c);break}}if(s[r+i*r]!==0)for(a=r+1;a<l;a++){let u=s[r+i*a]/s[r+i*r];c=d;do h=d-c,s[h+i*a]=h<=r?0:s[h+i*a]-s[h+i*r]*u;while(--c)}}while(--o);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let n=0;n<9;n++)t+=this.elements[n]+",";return t}reverse(t){t===void 0&&(t=new p);let e=3,n=6,i=Tr,s,r;for(s=0;s<3;s++)for(r=0;r<3;r++)i[s+n*r]=this.elements[s+3*r];i[3]=1,i[9]=0,i[15]=0,i[4]=0,i[10]=1,i[16]=0,i[5]=0,i[11]=0,i[17]=1;let a=3,o=a,l,c=n,d;do{if(s=o-a,i[s+n*s]===0){for(r=s+1;r<o;r++)if(i[s+n*r]!==0){l=c;do d=c-l,i[d+n*s]+=i[d+n*r];while(--l);break}}if(i[s+n*s]!==0)for(r=s+1;r<o;r++){let h=i[s+n*r]/i[s+n*s];l=c;do d=c-l,i[d+n*r]=d<=s?0:i[d+n*r]-i[d+n*s]*h;while(--l)}}while(--a);s=2;do{r=s-1;do{let h=i[s+n*r]/i[s+n*s];l=n;do d=n-l,i[d+n*r]=i[d+n*r]-i[d+n*s]*h;while(--l)}while(r--)}while(--s);s=2;do{let h=1/i[s+n*s];l=n;do d=n-l,i[d+n*s]=i[d+n*s]*h;while(--l)}while(s--);s=2;do{r=2;do{if(d=i[e+r+n*s],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,r,d)}while(r--)}while(s--);return t}setRotationFromQuaternion(t){let e=t.x,n=t.y,i=t.z,s=t.w,r=e+e,a=n+n,o=i+i,l=e*r,c=e*a,d=e*o,h=n*a,u=n*o,f=i*o,g=s*r,_=s*a,v=s*o,x=this.elements;return x[0]=1-(h+f),x[1]=c-v,x[2]=d+_,x[3]=c+v,x[4]=1-(l+f),x[5]=u-g,x[6]=d-_,x[7]=u+g,x[8]=1-(l+h),this}transpose(t){t===void 0&&(t=new p);let e=this.elements,n=t.elements,i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}},Tr=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],m=class p{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new p);let n=t.x,i=t.y,s=t.z,r=this.x,a=this.y,o=this.z;return e.x=a*s-o*i,e.y=o*n-r*s,e.z=r*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new p(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new p(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new te([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){let t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){let s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new p);let e=this.x,n=this.y,i=this.z,s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){let t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z;return Math.sqrt((s-e)*(s-e)+(r-n)*(r-n)+(a-i)*(a-i))}distanceSquared(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z;return(s-e)*(s-e)+(r-n)*(r-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new p);let n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new p),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new p),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new p),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){let n=this.length();if(n>0){let i=Cr,s=1/n;i.set(this.x*s,this.y*s,this.z*s);let r=Rr;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){let i=this.x,s=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(_s),_s.almostEquals(t,e)}clone(){return new p(this.x,this.y,this.z)}};m.ZERO=new m(0,0,0);m.UNIT_X=new m(1,0,0);m.UNIT_Y=new m(0,1,0);m.UNIT_Z=new m(0,0,1);var Cr=new m,Rr=new m,_s=new m,Mt=class p{constructor(t){t===void 0&&(t={}),this.lowerBound=new m,this.upperBound=new m,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){let s=this.lowerBound,r=this.upperBound,a=n;s.copy(t[0]),a&&a.vmult(s,s),r.copy(s);for(let o=1;o<t.length;o++){let l=t[o];a&&(a.vmult(l,vs),l=vs),l.x>r.x&&(r.x=l.x),l.x<s.x&&(s.x=l.x),l.y>r.y&&(r.y=l.y),l.y<s.y&&(s.y=l.y),l.z>r.z&&(r.z=l.z),l.z<s.z&&(s.z=l.z)}return e&&(e.vadd(s,s),e.vadd(r,r)),i&&(s.x-=i,s.y-=i,s.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new p().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,r=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,a=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,o=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return r&&a&&o}volume(){let t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,r,a,o){let l=this.lowerBound,c=this.upperBound;t.copy(l),e.set(c.x,l.y,l.z),n.set(c.x,c.y,l.z),i.set(l.x,c.y,c.z),s.set(c.x,l.y,c.z),r.set(l.x,c.y,l.z),a.set(l.x,l.y,c.z),o.copy(c)}toLocalFrame(t,e){let n=ys,i=n[0],s=n[1],r=n[2],a=n[3],o=n[4],l=n[5],c=n[6],d=n[7];this.getCorners(i,s,r,a,o,l,c,d);for(let h=0;h!==8;h++){let u=n[h];t.pointToLocal(u,u)}return e.setFromPoints(n)}toWorldFrame(t,e){let n=ys,i=n[0],s=n[1],r=n[2],a=n[3],o=n[4],l=n[5],c=n[6],d=n[7];this.getCorners(i,s,r,a,o,l,c,d);for(let h=0;h!==8;h++){let u=n[h];t.pointToWorld(u,u)}return e.setFromPoints(n)}overlapsRay(t){let{direction:e,from:n}=t,i=1/e.x,s=1/e.y,r=1/e.z,a=(this.lowerBound.x-n.x)*i,o=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*s,c=(this.upperBound.y-n.y)*s,d=(this.lowerBound.z-n.z)*r,h=(this.upperBound.z-n.z)*r,u=Math.max(Math.max(Math.min(a,o),Math.min(l,c)),Math.min(d,h)),f=Math.min(Math.min(Math.max(a,o),Math.max(l,c)),Math.max(d,h));return!(f<0||u>f)}},vs=new m,ys=[new m,new m,new m,new m,new m,new m,new m,new m],dn=class{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){let s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){let r=s;s=i,i=r}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}},fn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;let n=this._listeners;if(n[t]===void 0)return this;let i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;let n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}},vt=class p{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){let n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new m),this.normalize();let e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){let n=Ir,i=Pr;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{let n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new p);let n=this.x,i=this.y,s=this.z,r=this.w,a=t.x,o=t.y,l=t.z,c=t.w;return e.x=n*c+r*a+i*l-s*o,e.y=i*c+r*o+s*a-n*l,e.z=s*c+r*l+n*o-i*a,e.w=r*c-n*a-i*o-s*l,e}inverse(t){t===void 0&&(t=new p);let e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);let r=1/(e*e+n*n+i*i+s*s);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new p),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){let t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new m);let n=t.x,i=t.y,s=t.z,r=this.x,a=this.y,o=this.z,l=this.w,c=l*n+a*s-o*i,d=l*i+o*n-r*s,h=l*s+r*i-a*n,u=-r*n-a*i-o*s;return e.x=c*l+u*-r+d*-o-h*-a,e.y=d*l+u*-a+h*-r-c*-o,e.z=h*l+u*-o+c*-a-d*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s,r=this.x,a=this.y,o=this.z,l=this.w;switch(e){case"YZX":let c=r*a+o*l;if(c>.499&&(n=2*Math.atan2(r,l),i=Math.PI/2,s=0),c<-.499&&(n=-2*Math.atan2(r,l),i=-Math.PI/2,s=0),n===void 0){let d=r*r,h=a*a,u=o*o;n=Math.atan2(2*a*l-2*r*o,1-2*h-2*u),i=Math.asin(2*c),s=Math.atan2(2*r*l-2*a*o,1-2*d-2*u)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");let s=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(n/2),o=Math.sin(t/2),l=Math.sin(e/2),c=Math.sin(n/2);return i==="XYZ"?(this.x=o*r*a+s*l*c,this.y=s*l*a-o*r*c,this.z=s*r*c+o*l*a,this.w=s*r*a-o*l*c):i==="YXZ"?(this.x=o*r*a+s*l*c,this.y=s*l*a-o*r*c,this.z=s*r*c-o*l*a,this.w=s*r*a+o*l*c):i==="ZXY"?(this.x=o*r*a-s*l*c,this.y=s*l*a+o*r*c,this.z=s*r*c+o*l*a,this.w=s*r*a-o*l*c):i==="ZYX"?(this.x=o*r*a-s*l*c,this.y=s*l*a+o*r*c,this.z=s*r*c-o*l*a,this.w=s*r*a+o*l*c):i==="YZX"?(this.x=o*r*a+s*l*c,this.y=s*l*a+o*r*c,this.z=s*r*c-o*l*a,this.w=s*r*a-o*l*c):i==="XZY"&&(this.x=o*r*a-s*l*c,this.y=s*l*a-o*r*c,this.z=s*r*c+o*l*a,this.w=s*r*a+o*l*c),this}clone(){return new p(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new p);let i=this.x,s=this.y,r=this.z,a=this.w,o=t.x,l=t.y,c=t.z,d=t.w,h,u,f,g,_;return u=i*o+s*l+r*c+a*d,u<0&&(u=-u,o=-o,l=-l,c=-c,d=-d),1-u>1e-6?(h=Math.acos(u),f=Math.sin(h),g=Math.sin((1-e)*h)/f,_=Math.sin(e*h)/f):(g=1-e,_=e),n.x=g*i+_*o,n.y=g*s+_*l,n.z=g*r+_*c,n.w=g*a+_*d,n}integrate(t,e,n,i){i===void 0&&(i=new p);let s=t.x*n.x,r=t.y*n.y,a=t.z*n.z,o=this.x,l=this.y,c=this.z,d=this.w,h=e*.5;return i.x+=h*(s*d+r*c-a*l),i.y+=h*(r*d+a*o-s*c),i.z+=h*(a*d+s*l-r*o),i.w+=h*(-s*o-r*l-a*c),i}},Ir=new m,Pr=new m,Lr={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256},G=class p{constructor(t){t===void 0&&(t={}),this.id=p.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}};G.idCounter=0;G.types=Lr;var st=class p{constructor(t){t===void 0&&(t={}),this.position=new m,this.quaternion=new vt,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return p.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return p.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new m),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new m),n.vsub(t,i),e.conjugate(Ss),Ss.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new m),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new m),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new m),e.w*=-1,e.vmult(n,i),e.w*=-1,i}},Ss=new vt,Oe=class p extends G{constructor(t){t===void 0&&(t={});let{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:r}=t;super({type:G.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){let t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;let i=new m;for(let s=0;s!==t.length;s++){let r=t[s],a=r.length;for(let o=0;o!==a;o++){let l=(o+1)%a;e[r[o]].vsub(e[r[l]],i),i.normalize();let c=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){c=!0;break}c||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);let e=this.faceNormals[t]||new m;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;let n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){let n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],r=this.vertices[n[2]];p.computeNormal(i,s,r,e)}static computeNormal(t,e,n,i){let s=new m,r=new m;e.vsub(t,r),n.vsub(e,s),s.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,r,a,o,l){let c=new m,d=-1,h=-Number.MAX_VALUE;for(let f=0;f<n.faces.length;f++){c.copy(n.faceNormals[f]),s.vmult(c,c);let g=c.dot(r);g>h&&(h=g,d=f)}let u=[];for(let f=0;f<n.faces[d].length;f++){let g=n.vertices[n.faces[d][f]],_=new m;_.copy(g),s.vmult(_,_),i.vadd(_,_),u.push(_)}d>=0&&this.clipFaceAgainstHull(r,t,e,u,a,o,l)}findSeparatingAxis(t,e,n,i,s,r,a,o){let l=new m,c=new m,d=new m,h=new m,u=new m,f=new m,g=Number.MAX_VALUE,_=this;if(_.uniqueAxes)for(let v=0;v!==_.uniqueAxes.length;v++){n.vmult(_.uniqueAxes[v],l);let x=_.testSepAxis(l,t,e,n,i,s);if(x===!1)return!1;x<g&&(g=x,r.copy(l))}else{let v=a?a.length:_.faces.length;for(let x=0;x<v;x++){let y=a?a[x]:x;l.copy(_.faceNormals[y]),n.vmult(l,l);let b=_.testSepAxis(l,t,e,n,i,s);if(b===!1)return!1;b<g&&(g=b,r.copy(l))}}if(t.uniqueAxes)for(let v=0;v!==t.uniqueAxes.length;v++){s.vmult(t.uniqueAxes[v],c);let x=_.testSepAxis(c,t,e,n,i,s);if(x===!1)return!1;x<g&&(g=x,r.copy(c))}else{let v=o?o.length:t.faces.length;for(let x=0;x<v;x++){let y=o?o[x]:x;c.copy(t.faceNormals[y]),s.vmult(c,c);let b=_.testSepAxis(c,t,e,n,i,s);if(b===!1)return!1;b<g&&(g=b,r.copy(c))}}for(let v=0;v!==_.uniqueEdges.length;v++){n.vmult(_.uniqueEdges[v],h);for(let x=0;x!==t.uniqueEdges.length;x++)if(s.vmult(t.uniqueEdges[x],u),h.cross(u,f),!f.almostZero()){f.normalize();let y=_.testSepAxis(f,t,e,n,i,s);if(y===!1)return!1;y<g&&(g=y,r.copy(f))}}return i.vsub(e,d),d.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,s,r){let a=this;p.project(a,t,n,i,ni),p.project(e,t,s,r,ii);let o=ni[0],l=ni[1],c=ii[0],d=ii[1];if(o<d||c<l)return!1;let h=o-d,u=c-l;return h<u?h:u}calculateLocalInertia(t,e){let n=new m,i=new m;this.computeLocalAABB(i,n);let s=n.x-i.x,r=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*s*2*s+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*s*2*s)}getPlaneConstantOfFace(t){let e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,r,a){let o=new m,l=new m,c=new m,d=new m,h=new m,u=new m,f=new m,g=new m,_=this,v=[],x=i,y=v,b=-1,S=Number.MAX_VALUE;for(let C=0;C<_.faces.length;C++){o.copy(_.faceNormals[C]),n.vmult(o,o);let U=o.dot(t);U<S&&(S=U,b=C)}if(b<0)return;let M=_.faces[b];M.connectedFaces=[];for(let C=0;C<_.faces.length;C++)for(let U=0;U<_.faces[C].length;U++)M.indexOf(_.faces[C][U])!==-1&&C!==b&&M.connectedFaces.indexOf(C)===-1&&M.connectedFaces.push(C);let w=M.length;for(let C=0;C<w;C++){let U=_.vertices[M[C]],B=_.vertices[M[(C+1)%w]];U.vsub(B,l),c.copy(l),n.vmult(c,c),e.vadd(c,c),d.copy(this.faceNormals[b]),n.vmult(d,d),e.vadd(d,d),c.cross(d,h),h.negate(h),u.copy(U),n.vmult(u,u),e.vadd(u,u);let E=M.connectedFaces[C];f.copy(this.faceNormals[E]);let D=this.getPlaneConstantOfFace(E);g.copy(f),n.vmult(g,g);let R=D-g.dot(e);for(this.clipFaceAgainstPlane(x,y,g,R);x.length;)x.shift();for(;y.length;)x.push(y.shift())}f.copy(this.faceNormals[b]);let A=this.getPlaneConstantOfFace(b);g.copy(f),n.vmult(g,g);let P=A-g.dot(e);for(let C=0;C<x.length;C++){let U=g.dot(x[C])+P;if(U<=s&&(console.log(`clamped: depth=${U} to minDist=${s}`),U=s),U<=r){let B=x[C];if(U<=1e-6){let E={point:B,normal:g,depth:U};a.push(E)}}}}clipFaceAgainstPlane(t,e,n,i){let s,r,a=t.length;if(a<2)return e;let o=t[t.length-1],l=t[0];s=n.dot(o)+i;for(let c=0;c<a;c++){if(l=t[c],r=n.dot(l)+i,s<0)if(r<0){let d=new m;d.copy(l),e.push(d)}else{let d=new m;o.lerp(l,s/(s-r),d),e.push(d)}else if(r<0){let d=new m;o.lerp(l,s/(s-r),d),e.push(d),e.push(l)}o=l,s=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new m);let n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){let n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){let s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){let e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new m);let n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0,e=this.vertices;for(let n=0;n!==e.length;n++){let i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){let s=this.vertices,r,a,o,l,c,d,h=new m;for(let u=0;u<s.length;u++){h.copy(s[u]),e.vmult(h,h),t.vadd(h,h);let f=h;(r===void 0||f.x<r)&&(r=f.x),(l===void 0||f.x>l)&&(l=f.x),(a===void 0||f.y<a)&&(a=f.y),(c===void 0||f.y>c)&&(c=f.y),(o===void 0||f.z<o)&&(o=f.z),(d===void 0||f.z>d)&&(d=f.z)}n.set(r,a,o),i.set(l,c,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new m);let e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){let n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){let r=i[s];e.vmult(r,r)}for(let s=0;s<this.faceNormals.length;s++){let r=this.faceNormals[s];e.vmult(r,r)}}if(t)for(let s=0;s<n;s++){let r=i[s];r.vadd(t,r)}}pointIsInside(t){let e=this.vertices,n=this.faces,i=this.faceNormals,s=null,r=new m;this.getAveragePointLocal(r);for(let a=0;a<this.faces.length;a++){let o=i[a],l=e[n[a][0]],c=new m;t.vsub(l,c);let d=o.dot(c),h=new m;r.vsub(l,h);let u=o.dot(h);if(d<0&&u>0||d>0&&u<0)return!1}return s?1:-1}static project(t,e,n,i,s){let r=t.vertices.length,a=Dr,o=0,l=0,c=Fr,d=t.vertices;c.setZero(),st.vectorToLocalFrame(n,i,e,a),st.pointToLocalFrame(n,i,c,c);let h=c.dot(a);l=o=d[0].dot(a);for(let u=1;u<r;u++){let f=d[u].dot(a);f>o&&(o=f),f<l&&(l=f)}if(l-=h,o-=h,l>o){let u=l;l=o,o=u}s[0]=o,s[1]=l}},ni=[],ii=[],Nr=new m,Dr=new m,Fr=new m,ze=class p extends G{constructor(t){super({type:G.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){let t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=m,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],o=new Oe({vertices:s,faces:r,axes:a});this.convexPolyhedronRepresentation=o,o.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new m),p.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){let i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){let n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){let i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<s.length;r++)Qt.set(s[r][0],s[r][1],s[r][2]),e.vmult(Qt,Qt),t.vadd(Qt,Qt),n(Qt.x,Qt.y,Qt.z)}calculateWorldAABB(t,e,n,i){let s=this.halfExtents;Bt[0].set(s.x,s.y,s.z),Bt[1].set(-s.x,s.y,s.z),Bt[2].set(-s.x,-s.y,s.z),Bt[3].set(-s.x,-s.y,-s.z),Bt[4].set(s.x,-s.y,-s.z),Bt[5].set(s.x,s.y,-s.z),Bt[6].set(-s.x,s.y,-s.z),Bt[7].set(s.x,-s.y,s.z);let r=Bt[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let a=1;a<8;a++){let o=Bt[a];e.vmult(o,o),t.vadd(o,o);let l=o.x,c=o.y,d=o.z;l>i.x&&(i.x=l),c>i.y&&(i.y=c),d>i.z&&(i.z=d),l<n.x&&(n.x=l),c<n.y&&(n.y=c),d<n.z&&(n.z=d)}}},Qt=new m,Bt=[new m,new m,new m,new m,new m,new m,new m,new m],xi={DYNAMIC:1,STATIC:2,KINEMATIC:4},_i={AWAKE:0,SLEEPY:1,SLEEPING:2},j=class p extends fn{constructor(t){t===void 0&&(t={}),super(),this.id=p.idCounter++,this.index=-1,this.world=null,this.vlambda=new m,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new m,this.previousPosition=new m,this.interpolatedPosition=new m,this.initPosition=new m,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new m,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new m,this.force=new m;let e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?p.STATIC:p.DYNAMIC,typeof t.type==typeof p.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=p.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new m,this.quaternion=new vt,this.initQuaternion=new vt,this.previousQuaternion=new vt,this.interpolatedQuaternion=new vt,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new m,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new m,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new m,this.invInertia=new m,this.invInertiaWorld=new te,this.invMassSolve=0,this.invInertiaSolve=new m,this.invInertiaWorldSolve=new te,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new m(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new m(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new Mt,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new m,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){let t=this.sleepState;this.sleepState=p.AWAKE,this.wakeUpAfterNarrowphase=!1,t===p.SLEEPING&&this.dispatchEvent(p.wakeupEvent)}sleep(){this.sleepState=p.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){let e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===p.AWAKE&&n<i?(this.sleepState=p.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(p.sleepyEvent)):e===p.SLEEPY&&n>i?this.wakeUp():e===p.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(p.sleepEvent))}}updateSolveMassProperties(){this.sleepState===p.SLEEPING||this.type===p.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new m),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new m),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new m),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new m),this.quaternion.vmult(t,e),e}addShape(t,e,n){let i=new m,s=new vt;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){let e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){let t=this.shapes,e=this.shapeOffsets,n=t.length,i=0;for(let s=0;s!==n;s++){let r=t[s];r.updateBoundingSphereRadius();let a=e[s].length(),o=r.boundingSphereRadius;a+o>i&&(i=a+o)}this.boundingRadius=i}updateAABB(){let t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=Ur,r=Br,a=this.quaternion,o=this.aabb,l=Or;for(let c=0;c!==i;c++){let d=t[c];a.vmult(e[c],s),s.vadd(this.position,s),a.mult(n[c],r),d.calculateWorldAABB(s,r,l.lowerBound,l.upperBound),c===0?o.copy(l):o.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){let e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){let n=zr,i=Vr;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new m),this.type!==p.DYNAMIC)return;this.sleepState===p.SLEEPING&&this.wakeUp();let n=Gr;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new m),this.type!==p.DYNAMIC)return;let n=Hr,i=Wr;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===p.DYNAMIC&&(this.sleepState===p.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new m),this.type!==p.DYNAMIC)return;this.sleepState===p.SLEEPING&&this.wakeUp();let n=e,i=qr;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);let s=Xr;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new m),this.type!==p.DYNAMIC)return;let n=Yr,i=$r;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){let t=Zr;this.invMass=this.mass>0?1/this.mass:0;let e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),ze.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){let n=new m;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===p.DYNAMIC||this.type===p.KINEMATIC)||this.sleepState===p.SLEEPING)return;let i=this.velocity,s=this.angularVelocity,r=this.position,a=this.force,o=this.torque,l=this.quaternion,c=this.invMass,d=this.invInertiaWorld,h=this.linearFactor,u=c*t;i.x+=a.x*u*h.x,i.y+=a.y*u*h.y,i.z+=a.z*u*h.z;let f=d.elements,g=this.angularFactor,_=o.x*g.x,v=o.y*g.y,x=o.z*g.z;s.x+=t*(f[0]*_+f[1]*v+f[2]*x),s.y+=t*(f[3]*_+f[4]*v+f[5]*x),s.z+=t*(f[6]*_+f[7]*v+f[8]*x),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}};j.idCounter=0;j.COLLIDE_EVENT_NAME="collide";j.DYNAMIC=xi.DYNAMIC;j.STATIC=xi.STATIC;j.KINEMATIC=xi.KINEMATIC;j.AWAKE=_i.AWAKE;j.SLEEPY=_i.SLEEPY;j.SLEEPING=_i.SLEEPING;j.wakeupEvent={type:"wakeup"};j.sleepyEvent={type:"sleepy"};j.sleepEvent={type:"sleep"};var Ur=new m,Br=new vt,Or=new Mt,zr=new te,Vr=new te,kr=new te,Gr=new m,Hr=new m,Wr=new m,qr=new m,Xr=new m,Yr=new m,$r=new m,Zr=new m,pn=class{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&j.STATIC)!==0||t.sleepState===j.SLEEPING)&&((e.type&j.STATIC)!==0||e.sleepState===j.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){let s=Jr;e.position.vsub(t.position,s);let r=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){let n=jr,i=Kr,s=Qr,r=t.length;for(let a=0;a!==r;a++)i[a]=t[a],s[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){let o=i[a].id,l=s[a].id,c=o<l?`${o},${l}`:`${l},${o}`;n[c]=a,n.keys.push(c)}for(let a=0;a!==n.keys.length;a++){let o=n.keys.pop(),l=n[o];t.push(i[l]),e.push(s[l]),delete n[o]}}setWorld(t){}static boundingSphereCheck(t,e){let n=new m;t.position.vsub(e.position,n);let i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},Jr=new m;new m;new vt;new m;var jr={keys:[]},Kr=[],Qr=[];new m;var au=new m;new m;var li=class extends pn{constructor(){super()}collisionPairs(t,e,n){let i=t.bodies,s=i.length,r,a;for(let o=0;o!==s;o++)for(let l=0;l!==o;l++)r=i[o],a=i[l],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){let s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}},ye=class{constructor(){this.rayFromWorld=new m,this.rayToWorld=new m,this.hitNormalWorld=new m,this.hitPointWorld=new m,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=r,this.distance=a}},Ns,Ds,Fs,Us,Bs,Os,zs,vi={CLOSEST:1,ANY:2,ALL:4};Ns=G.types.SPHERE;Ds=G.types.PLANE;Fs=G.types.BOX;Us=G.types.CYLINDER;Bs=G.types.CONVEXPOLYHEDRON;Os=G.types.HEIGHTFIELD;zs=G.types.TRIMESH;var Rt=class p{get[Ns](){return this._intersectSphere}get[Ds](){return this._intersectPlane}get[Fs](){return this._intersectBox}get[Us](){return this._intersectConvex}get[Bs](){return this._intersectConvex}get[Os](){return this._intersectHeightfield}get[zs](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new m),e===void 0&&(e=new m),this.from=t.clone(),this.to=e.clone(),this.direction=new m,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=p.ANY,this.result=new ye,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||p.ANY,this.result=e.result||new ye,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(bs),si.length=0,t.broadphase.aabbQuery(t,bs,si),this.intersectBodies(si),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());let n=this.checkCollisionResponse;if(n&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;let i=to,s=eo;for(let r=0,a=t.shapes.length;r<a;r++){let o=t.shapes[r];if(!(n&&!o.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],s),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(o,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){let s=this.from;if(_o(s,this.direction,n)>t.boundingSphereRadius)return;let a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){let r=this.from,a=this.to,o=this.direction,l=new m(0,0,1);e.vmult(l,l);let c=new m;r.vsub(n,c);let d=c.dot(l);a.vsub(n,c);let h=c.dot(l);if(d*h>0||r.distanceTo(a)<d)return;let u=l.dot(o);if(Math.abs(u)<this.precision)return;let f=new m,g=new m,_=new m;r.vsub(n,f);let v=-l.dot(f)/u;o.scale(v,g),r.vadd(g,_),this.reportIntersection(l,_,s,i,-1)}getAABB(t){let{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;let r=no;r.from.copy(this.from),r.to.copy(this.to),st.pointToLocalFrame(n,e,r.from,r.from),st.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();let a=io,o,l,c,d;o=l=0,c=d=t.data.length-1;let h=new Mt;r.getAABB(h),t.getIndexOfPosition(h.lowerBound.x,h.lowerBound.y,a,!0),o=Math.max(o,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(h.upperBound.x,h.upperBound.y,a,!0),c=Math.min(c,a[0]+1),d=Math.min(d,a[1]+1);for(let u=o;u<c;u++)for(let f=l;f<d;f++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(u,f,h),!!h.overlapsRay(r)){if(t.getConvexTrianglePillar(u,f,!1),st.pointToWorldFrame(n,e,t.pillarOffset,an),this._intersectConvex(t.pillarConvex,e,an,i,s,Ms),this.result.shouldStop)return;t.getConvexTrianglePillar(u,f,!0),st.pointToWorldFrame(n,e,t.pillarOffset,an),this._intersectConvex(t.pillarConvex,e,an,i,s,Ms)}}}_intersectSphere(t,e,n,i,s){let r=this.from,a=this.to,o=t.radius,l=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,c=2*((a.x-r.x)*(r.x-n.x)+(a.y-r.y)*(r.y-n.y)+(a.z-r.z)*(r.z-n.z)),d=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-o**2,h=c**2-4*l*d,u=so,f=ro;if(!(h<0))if(h===0)r.lerp(a,h,u),u.vsub(n,f),f.normalize(),this.reportIntersection(f,u,s,i,-1);else{let g=(-c-Math.sqrt(h))/(2*l),_=(-c+Math.sqrt(h))/(2*l);if(g>=0&&g<=1&&(r.lerp(a,g,u),u.vsub(n,f),f.normalize(),this.reportIntersection(f,u,s,i,-1)),this.result.shouldStop)return;_>=0&&_<=1&&(r.lerp(a,_,u),u.vsub(n,f),f.normalize(),this.reportIntersection(f,u,s,i,-1))}}_intersectConvex(t,e,n,i,s,r){let a=oo,o=ws,l=r&&r.faceList||null,c=t.faces,d=t.vertices,h=t.faceNormals,u=this.direction,f=this.from,g=this.to,_=f.distanceTo(g),v=l?l.length:c.length,x=this.result;for(let y=0;!x.shouldStop&&y<v;y++){let b=l?l[y]:y,S=c[b],M=h[b],w=e,A=n;o.copy(d[S[0]]),w.vmult(o,o),o.vadd(A,o),o.vsub(f,o),w.vmult(M,a);let P=u.dot(a);if(Math.abs(P)<this.precision)continue;let C=a.dot(o)/P;if(!(C<0)){u.scale(C,St),St.vadd(f,St),Nt.copy(d[S[0]]),w.vmult(Nt,Nt),A.vadd(Nt,Nt);for(let U=1;!x.shouldStop&&U<S.length-1;U++){Ot.copy(d[S[U]]),zt.copy(d[S[U+1]]),w.vmult(Ot,Ot),w.vmult(zt,zt),A.vadd(Ot,Ot),A.vadd(zt,zt);let B=St.distanceTo(f);!(p.pointInTriangle(St,Nt,Ot,zt)||p.pointInTriangle(St,Ot,Nt,zt))||B>_||this.reportIntersection(a,St,s,i,b)}}}}_intersectTrimesh(t,e,n,i,s,r){let a=co,o=go,l=xo,c=ws,d=ho,h=uo,u=fo,f=mo,g=po,_=t.indices;t.vertices;let v=this.from,x=this.to,y=this.direction;l.position.copy(n),l.quaternion.copy(e),st.vectorToLocalFrame(n,e,y,d),st.pointToLocalFrame(n,e,v,h),st.pointToLocalFrame(n,e,x,u),u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,h.x*=t.scale.x,h.y*=t.scale.y,h.z*=t.scale.z,u.vsub(h,d),d.normalize();let b=h.distanceSquared(u);t.tree.rayQuery(this,l,o);for(let S=0,M=o.length;!this.result.shouldStop&&S!==M;S++){let w=o[S];t.getNormal(w,a),t.getVertex(_[w*3],Nt),Nt.vsub(h,c);let A=d.dot(a),P=a.dot(c)/A;if(P<0)continue;d.scale(P,St),St.vadd(h,St),t.getVertex(_[w*3+1],Ot),t.getVertex(_[w*3+2],zt);let C=St.distanceSquared(h);!(p.pointInTriangle(St,Ot,Nt,zt)||p.pointInTriangle(St,Nt,Ot,zt))||C>b||(st.vectorToWorldFrame(e,a,g),st.pointToWorldFrame(n,e,St,f),this.reportIntersection(g,f,s,i,w))}o.length=0}reportIntersection(t,e,n,i,s){let r=this.from,a=this.to,o=r.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case p.ALL:this.hasHit=!0,l.set(r,a,t,e,n,i,o),l.hasHit=!0,this.callback(l);break;case p.CLOSEST:(o<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,o));break;case p.ANY:this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,o),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,ue),n.vsub(e,De),t.vsub(e,ri);let s=ue.dot(ue),r=ue.dot(De),a=ue.dot(ri),o=De.dot(De),l=De.dot(ri),c,d;return(c=o*a-r*l)>=0&&(d=s*l-r*a)>=0&&c+d<s*o-r*r}};Rt.CLOSEST=vi.CLOSEST;Rt.ANY=vi.ANY;Rt.ALL=vi.ALL;var bs=new Mt,si=[],De=new m,ri=new m,to=new m,eo=new vt,St=new m,Nt=new m,Ot=new m,zt=new m;new m;new ye;var Ms={faceList:[0]},an=new m,no=new Rt,io=[],so=new m,ro=new m,oo=new m,ao=new m,lo=new m,ws=new m,co=new m,ho=new m,uo=new m,fo=new m,po=new m,mo=new m;new Mt;var go=[],xo=new st,ue=new m,ln=new m;function _o(p,t,e){e.vsub(p,ue);let n=ue.dot(t);return t.scale(n,ln),ln.vadd(p,ln),e.distanceTo(ln)}var mn=class p extends pn{static checkBounds(t,e,n){let i,s;n===0?(i=t.position.x,s=e.position.x):n===1?(i=t.position.y,s=e.position.y):n===2&&(i=t.position.z,s=e.position.z);let r=t.boundingRadius,a=e.boundingRadius,o=i+r;return s-a<o}static insertionSortX(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.x<=i.aabb.lowerBound.x);s--)t[s+1]=t[s];t[s+1]=i}return t}static insertionSortY(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.y<=i.aabb.lowerBound.y);s--)t[s+1]=t[s];t[s+1]=i}return t}static insertionSortZ(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.z<=i.aabb.lowerBound.z);s--)t[s+1]=t[s];t[s+1]=i}return t}constructor(t){super(),this.axisList=[],this.world=null,this.axisIndex=0;let e=this.axisList;this._addBodyHandler=n=>{e.push(n.body)},this._removeBodyHandler=n=>{let i=e.indexOf(n.body);i!==-1&&e.splice(i,1)},t&&this.setWorld(t)}setWorld(t){this.axisList.length=0;for(let e=0;e<t.bodies.length;e++)this.axisList.push(t.bodies[e]);t.removeEventListener("addBody",this._addBodyHandler),t.removeEventListener("removeBody",this._removeBodyHandler),t.addEventListener("addBody",this._addBodyHandler),t.addEventListener("removeBody",this._removeBodyHandler),this.world=t,this.dirty=!0}collisionPairs(t,e,n){let i=this.axisList,s=i.length,r=this.axisIndex,a,o;for(this.dirty&&(this.sortList(),this.dirty=!1),a=0;a!==s;a++){let l=i[a];for(o=a+1;o<s;o++){let c=i[o];if(this.needBroadphaseCollision(l,c)){if(!p.checkBounds(l,c,r))break;this.intersectionTest(l,c,e,n)}}}}sortList(){let t=this.axisList,e=this.axisIndex,n=t.length;for(let i=0;i!==n;i++){let s=t[i];s.aabbNeedsUpdate&&s.updateAABB()}e===0?p.insertionSortX(t):e===1?p.insertionSortY(t):e===2&&p.insertionSortZ(t)}autoDetectAxis(){let t=0,e=0,n=0,i=0,s=0,r=0,a=this.axisList,o=a.length,l=1/o;for(let u=0;u!==o;u++){let f=a[u],g=f.position.x;t+=g,e+=g*g;let _=f.position.y;n+=_,i+=_*_;let v=f.position.z;s+=v,r+=v*v}let c=e-t*t*l,d=i-n*n*l,h=r-s*s*l;c>d?c>h?this.axisIndex=0:this.axisIndex=2:d>h?this.axisIndex=1:this.axisIndex=2}aabbQuery(t,e,n){n===void 0&&(n=[]),this.dirty&&(this.sortList(),this.dirty=!1);let i=this.axisIndex,s="x";i===1&&(s="y"),i===2&&(s="z");let r=this.axisList;e.lowerBound[s],e.upperBound[s];for(let a=0;a<r.length;a++){let o=r[a];o.aabbNeedsUpdate&&o.updateAABB(),o.aabb.overlaps(e)&&n.push(o)}return n}},gn=class{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}},ci=class p{constructor(t,e,n){n===void 0&&(n={}),n=gn.defaults(n,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=t,this.bodyB=e,this.id=p.idCounter++,this.collideConnected=n.collideConnected,n.wakeUpBodies&&(t&&t.wakeUp(),e&&e.wakeUp())}update(){throw new Error("method update() not implmemented in this Constraint subclass!")}enable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!0}disable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!1}};ci.idCounter=0;var xn=class{constructor(){this.spatial=new m,this.rotational=new m}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}},Ve=class p{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=p.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new xn,this.jacobianElementB=new xn,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){let i=e,s=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*s*(1+4*i))}computeB(t,e,n){let i=this.computeGW(),s=this.computeGq(),r=this.computeGiMf();return-s*t-i*e-r*n}computeGq(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,r=i.position;return t.spatial.dot(s)+e.spatial.dot(r)}computeGW(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,r=i.velocity,a=n.angularVelocity,o=i.angularVelocity;return t.multiplyVectors(s,a)+e.multiplyVectors(r,o)}computeGWlambda(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,r=i.vlambda,a=n.wlambda,o=i.wlambda;return t.multiplyVectors(s,a)+e.multiplyVectors(r,o)}computeGiMf(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,r=n.torque,a=i.force,o=i.torque,l=n.invMassSolve,c=i.invMassSolve;return s.scale(l,As),a.scale(c,Es),n.invInertiaWorldSolve.vmult(r,Ts),i.invInertiaWorldSolve.vmult(o,Cs),t.multiplyVectors(As,Ts)+e.multiplyVectors(Es,Cs)}computeGiMGt(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,r=i.invMassSolve,a=n.invInertiaWorldSolve,o=i.invInertiaWorldSolve,l=s+r;return a.vmult(t.rotational,cn),l+=cn.dot(t.rotational),o.vmult(e.rotational,cn),l+=cn.dot(e.rotational),l}addToWlambda(t){let e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,r=vo;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,r),s.wlambda.addScaledVector(t,r,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}};Ve.idCounter=0;var As=new m,Es=new m,Ts=new m,Cs=new m,cn=new m,vo=new m,hi=class extends Ve{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new m,this.rj=new m,this.ni=new m}computeB(t){let e=this.a,n=this.b,i=this.bi,s=this.bj,r=this.ri,a=this.rj,o=yo,l=So,c=i.velocity,d=i.angularVelocity;i.force,i.torque;let h=s.velocity,u=s.angularVelocity;s.force,s.torque;let f=bo,g=this.jacobianElementA,_=this.jacobianElementB,v=this.ni;r.cross(v,o),a.cross(v,l),v.negate(g.spatial),o.negate(g.rotational),_.spatial.copy(v),_.rotational.copy(l),f.copy(s.position),f.vadd(a,f),f.vsub(i.position,f),f.vsub(r,f);let x=v.dot(f),y=this.restitution+1,b=y*h.dot(v)-y*c.dot(v)+u.dot(l)-d.dot(o),S=this.computeGiMf();return-x*e-b*n-t*S}getImpactVelocityAlongNormal(){let t=Mo,e=wo,n=Ao,i=Eo,s=To;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}},yo=new m,So=new m,bo=new m,Mo=new m,wo=new m,Ao=new m,Eo=new m,To=new m;var lu=new m,cu=new m;var hu=new m,uu=new m;new m;new m;var du=new m,fu=new m;var pu=new m,mu=new m,_n=class extends Ve{constructor(t,e,n){super(t,e,-n,n),this.ri=new m,this.rj=new m,this.t=new m}computeB(t){this.a;let e=this.b;this.bi,this.bj;let n=this.ri,i=this.rj,s=Co,r=Ro,a=this.t;n.cross(a,s),i.cross(a,r);let o=this.jacobianElementA,l=this.jacobianElementB;a.negate(o.spatial),s.negate(o.rotational),l.spatial.copy(a),l.rotational.copy(r);let c=this.computeGW(),d=this.computeGiMf();return-c*e-t*d}},Co=new m,Ro=new m,vn=class p{constructor(t,e,n){n=gn.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=p.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}};vn.idCounter=0;var yn=class p{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=p.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}};yn.idCounter=0;var gu=new m,xu=new m,_u=new m,vu=new m,yu=new m,Su=new m,bu=new m,Mu=new m,wu=new m,Au=new m,Eu=new m;var Tu=new m,Cu=new m;new m;new m;new m;var Ru=new m,Iu=new m,Pu=new m;new Rt;new m;var Lu=new m,Nu=new m,Du=[new m(1,0,0),new m(0,1,0),new m(0,0,1)],Fu=new m;var Uu=new m,Bu=new m,Ou=new m;var zu=new m,Vu=new m,ku=new m,Gu=new m;var Hu=new m,Wu=new m,qu=new m;var Xu=new m,Yu=new m;var $u=new m,Zu=new m,Ju=new m,ju=new m,Ku=new m,Qu=new m,td=new m;var Sn=class extends G{constructor(){super({type:G.types.PLANE}),this.worldNormal=new m,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(t){let e=this.worldNormal;e.set(0,0,1),t.vmult(e,e),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(t,e){return e===void 0&&(e=new m),e}volume(){return Number.MAX_VALUE}calculateWorldAABB(t,e,n,i){kt.set(0,0,1),e.vmult(kt,kt);let s=Number.MAX_VALUE;n.set(-s,-s,-s),i.set(s,s,s),kt.x===1?i.x=t.x:kt.x===-1&&(n.x=t.x),kt.y===1?i.y=t.y:kt.y===-1&&(n.y=t.y),kt.z===1?i.z=t.z:kt.z===-1&&(n.z=t.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}},kt=new m;var ed=new m,nd=new m,id=new m,sd=new m,rd=new m,od=new m,ad=new m,ld=new m,cd=new m;var hd=new m,ud=new Mt;var dd=new m,fd=new Mt,pd=new m,md=new m,gd=new m,xd=new m,_d=new m,vd=new m,yd=new m,Sd=new Mt,bd=new m,Md=new st,wd=new Mt,ui=class{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){let e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}},di=class extends ui{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0,i=this.iterations,s=this.tolerance*this.tolerance,r=this.equations,a=r.length,o=e.bodies,l=o.length,c=t,d,h,u,f,g,_;if(a!==0)for(let b=0;b!==l;b++)o[b].updateSolveMassProperties();let v=Po,x=Lo,y=Io;v.length=a,x.length=a,y.length=a;for(let b=0;b!==a;b++){let S=r[b];y[b]=0,x[b]=S.computeB(c),v[b]=1/S.computeC()}if(a!==0){for(let M=0;M!==l;M++){let w=o[M],A=w.vlambda,P=w.wlambda;A.set(0,0,0),P.set(0,0,0)}for(n=0;n!==i;n++){f=0;for(let M=0;M!==a;M++){let w=r[M];d=x[M],h=v[M],_=y[M],g=w.computeGWlambda(),u=h*(d-g-w.eps*_),_+u<w.minForce?u=w.minForce-_:_+u>w.maxForce&&(u=w.maxForce-_),y[M]+=u,f+=u>0?u:-u,w.addToWlambda(u)}if(f*f<s)break}for(let M=0;M!==l;M++){let w=o[M],A=w.velocity,P=w.angularVelocity;w.vlambda.vmul(w.linearFactor,w.vlambda),A.vadd(w.vlambda,A),w.wlambda.vmul(w.angularFactor,w.wlambda),P.vadd(w.wlambda,P)}let b=r.length,S=1/c;for(;b--;)r[b].multiplier=y[b]*S}return n}},Io=[],Po=[],Lo=[];var Ad=j.STATIC;var fi=class{constructor(){this.objects=[],this.type=Object}release(){let t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){let e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}},pi=class extends fi{constructor(){super(...arguments),this.type=m}constructObject(){return new m}},rt={sphereSphere:G.types.SPHERE,spherePlane:G.types.SPHERE|G.types.PLANE,boxBox:G.types.BOX|G.types.BOX,sphereBox:G.types.SPHERE|G.types.BOX,planeBox:G.types.PLANE|G.types.BOX,convexConvex:G.types.CONVEXPOLYHEDRON,sphereConvex:G.types.SPHERE|G.types.CONVEXPOLYHEDRON,planeConvex:G.types.PLANE|G.types.CONVEXPOLYHEDRON,boxConvex:G.types.BOX|G.types.CONVEXPOLYHEDRON,sphereHeightfield:G.types.SPHERE|G.types.HEIGHTFIELD,boxHeightfield:G.types.BOX|G.types.HEIGHTFIELD,convexHeightfield:G.types.CONVEXPOLYHEDRON|G.types.HEIGHTFIELD,sphereParticle:G.types.PARTICLE|G.types.SPHERE,planeParticle:G.types.PLANE|G.types.PARTICLE,boxParticle:G.types.BOX|G.types.PARTICLE,convexParticle:G.types.PARTICLE|G.types.CONVEXPOLYHEDRON,cylinderCylinder:G.types.CYLINDER,sphereCylinder:G.types.SPHERE|G.types.CYLINDER,planeCylinder:G.types.PLANE|G.types.CYLINDER,boxCylinder:G.types.BOX|G.types.CYLINDER,convexCylinder:G.types.CONVEXPOLYHEDRON|G.types.CYLINDER,heightfieldCylinder:G.types.HEIGHTFIELD|G.types.CYLINDER,particleCylinder:G.types.PARTICLE|G.types.CYLINDER,sphereTrimesh:G.types.SPHERE|G.types.TRIMESH,planeTrimesh:G.types.PLANE|G.types.TRIMESH},mi=class{get[rt.sphereSphere](){return this.sphereSphere}get[rt.spherePlane](){return this.spherePlane}get[rt.boxBox](){return this.boxBox}get[rt.sphereBox](){return this.sphereBox}get[rt.planeBox](){return this.planeBox}get[rt.convexConvex](){return this.convexConvex}get[rt.sphereConvex](){return this.sphereConvex}get[rt.planeConvex](){return this.planeConvex}get[rt.boxConvex](){return this.boxConvex}get[rt.sphereHeightfield](){return this.sphereHeightfield}get[rt.boxHeightfield](){return this.boxHeightfield}get[rt.convexHeightfield](){return this.convexHeightfield}get[rt.sphereParticle](){return this.sphereParticle}get[rt.planeParticle](){return this.planeParticle}get[rt.boxParticle](){return this.boxParticle}get[rt.convexParticle](){return this.convexParticle}get[rt.cylinderCylinder](){return this.convexConvex}get[rt.sphereCylinder](){return this.sphereConvex}get[rt.planeCylinder](){return this.planeConvex}get[rt.boxCylinder](){return this.boxConvex}get[rt.convexCylinder](){return this.convexConvex}get[rt.heightfieldCylinder](){return this.heightfieldCylinder}get[rt.particleCylinder](){return this.particleCylinder}get[rt.sphereTrimesh](){return this.sphereTrimesh}get[rt.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new pi,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new hi(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;let o=this.currentContactMaterial;a.restitution=o.restitution,a.setSpookParams(o.contactEquationStiffness,o.contactEquationRelaxation,this.world.dt);let l=n.material||t.material,c=i.material||e.material;return l&&c&&l.restitution>=0&&c.restitution>=0&&(a.restitution=l.restitution*c.restitution),a.si=s||n,a.sj=r||i,a}createFrictionEquationsFromContact(t,e){let n=t.bi,i=t.bj,s=t.si,r=t.sj,a=this.world,o=this.currentContactMaterial,l=o.friction,c=s.material||n.material,d=r.material||i.material;if(c&&d&&c.friction>=0&&d.friction>=0&&(l=c.friction*d.friction),l>0){let h=l*(a.frictionGravity||a.gravity).length(),u=n.invMass+i.invMass;u>0&&(u=1/u);let f=this.frictionEquationPool,g=f.length?f.pop():new _n(n,i,h*u),_=f.length?f.pop():new _n(n,i,h*u);return g.bi=_.bi=n,g.bj=_.bj=i,g.minForce=_.minForce=-h*u,g.maxForce=_.maxForce=h*u,g.ri.copy(t.ri),g.rj.copy(t.rj),_.ri.copy(t.ri),_.rj.copy(t.rj),t.ni.tangents(g.t,_.t),g.setSpookParams(o.frictionEquationStiffness,o.frictionEquationRelaxation,a.dt),_.setSpookParams(o.frictionEquationStiffness,o.frictionEquationRelaxation,a.dt),g.enabled=_.enabled=t.enabled,e.push(g,_),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;let n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];he.setZero(),_e.setZero(),ve.setZero();let s=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==s?(he.vadd(e.ni,he),_e.vadd(e.ri,_e),ve.vadd(e.rj,ve)):(he.vsub(e.ni,he),_e.vadd(e.rj,_e),ve.vadd(e.ri,ve));let r=1/t;_e.scale(r,n.ri),ve.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),he.normalize(),he.tangents(n.t,i.t)}getContacts(t,e,n,i,s,r,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=i,this.frictionResult=r;let o=Fo,l=Uo,c=No,d=Do;for(let h=0,u=t.length;h!==u;h++){let f=t[h],g=e[h],_=null;f.material&&g.material&&(_=n.getContactMaterial(f.material,g.material)||null);let v=f.type&j.KINEMATIC&&g.type&j.STATIC||f.type&j.STATIC&&g.type&j.KINEMATIC||f.type&j.KINEMATIC&&g.type&j.KINEMATIC;for(let x=0;x<f.shapes.length;x++){f.quaternion.mult(f.shapeOrientations[x],o),f.quaternion.vmult(f.shapeOffsets[x],c),c.vadd(f.position,c);let y=f.shapes[x];for(let b=0;b<g.shapes.length;b++){g.quaternion.mult(g.shapeOrientations[b],l),g.quaternion.vmult(g.shapeOffsets[b],d),d.vadd(g.position,d);let S=g.shapes[b];if(!(y.collisionFilterMask&S.collisionFilterGroup&&S.collisionFilterMask&y.collisionFilterGroup)||c.distanceTo(d)>y.boundingSphereRadius+S.boundingSphereRadius)continue;let M=null;y.material&&S.material&&(M=n.getContactMaterial(y.material,S.material)||null),this.currentContactMaterial=M||_||n.defaultContactMaterial;let w=y.type|S.type,A=this[w];if(A){let P=!1;y.type<S.type?P=A.call(this,y,S,c,d,o,l,f,g,y,S,v):P=A.call(this,S,y,d,c,l,o,g,f,y,S,v),P&&v&&(n.shapeOverlapKeeper.set(y.id,S.id),n.bodyOverlapKeeper.set(f.id,g.id))}}}}}sphereSphere(t,e,n,i,s,r,a,o,l,c,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;let h=this.createContactEquation(a,o,t,e,l,c);i.vsub(n,h.ni),h.ni.normalize(),h.ri.copy(h.ni),h.rj.copy(h.ni),h.ri.scale(t.radius,h.ri),h.rj.scale(-e.radius,h.rj),h.ri.vadd(n,h.ri),h.ri.vsub(a.position,h.ri),h.rj.vadd(i,h.rj),h.rj.vsub(o.position,h.rj),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}spherePlane(t,e,n,i,s,r,a,o,l,c,d){let h=this.createContactEquation(a,o,t,e,l,c);if(h.ni.set(0,0,1),r.vmult(h.ni,h.ni),h.ni.negate(h.ni),h.ni.normalize(),h.ni.scale(t.radius,h.ri),n.vsub(i,hn),h.ni.scale(h.ni.dot(hn),Rs),hn.vsub(Rs,h.rj),-hn.dot(h.ni)<=t.radius){if(d)return!0;let u=h.ri,f=h.rj;u.vadd(n,u),u.vsub(a.position,u),f.vadd(i,f),f.vsub(o.position,f),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}}boxBox(t,e,n,i,s,r,a,o,l,c,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,r,a,o,t,e,d)}sphereBox(t,e,n,i,s,r,a,o,l,c,d){let h=this.v3pool,u=la;n.vsub(i,un),e.getSideNormals(u,r);let f=t.radius,g=!1,_=ha,v=ua,x=da,y=null,b=0,S=0,M=0,w=null;for(let L=0,K=u.length;L!==K&&g===!1;L++){let q=ra;q.copy(u[L]);let W=q.length();q.normalize();let et=un.dot(q);if(et<W+f&&et>0){let Q=oa,T=aa;Q.copy(u[(L+1)%3]),T.copy(u[(L+2)%3]);let z=Q.length(),Y=T.length();Q.normalize(),T.normalize();let O=un.dot(Q),it=un.dot(T);if(O<z&&O>-z&&it<Y&&it>-Y){let F=Math.abs(et-W-f);if((w===null||F<w)&&(w=F,S=O,M=it,y=W,_.copy(q),v.copy(Q),x.copy(T),b++,d))return!0}}}if(b){g=!0;let L=this.createContactEquation(a,o,t,e,l,c);_.scale(-f,L.ri),L.ni.copy(_),L.ni.negate(L.ni),_.scale(y,_),v.scale(S,v),_.vadd(v,_),x.scale(M,x),_.vadd(x,L.rj),L.ri.vadd(n,L.ri),L.ri.vsub(a.position,L.ri),L.rj.vadd(i,L.rj),L.rj.vsub(o.position,L.rj),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult)}let A=h.get(),P=ca;for(let L=0;L!==2&&!g;L++)for(let K=0;K!==2&&!g;K++)for(let q=0;q!==2&&!g;q++)if(A.set(0,0,0),L?A.vadd(u[0],A):A.vsub(u[0],A),K?A.vadd(u[1],A):A.vsub(u[1],A),q?A.vadd(u[2],A):A.vsub(u[2],A),i.vadd(A,P),P.vsub(n,P),P.lengthSquared()<f*f){if(d)return!0;g=!0;let W=this.createContactEquation(a,o,t,e,l,c);W.ri.copy(P),W.ri.normalize(),W.ni.copy(W.ri),W.ri.scale(f,W.ri),W.rj.copy(A),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(o.position,W.rj),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}h.release(A),A=null;let C=h.get(),U=h.get(),B=h.get(),E=h.get(),D=h.get(),R=u.length;for(let L=0;L!==R&&!g;L++)for(let K=0;K!==R&&!g;K++)if(L%3!==K%3){u[K].cross(u[L],C),C.normalize(),u[L].vadd(u[K],U),B.copy(n),B.vsub(U,B),B.vsub(i,B);let q=B.dot(C);C.scale(q,E);let W=0;for(;W===L%3||W===K%3;)W++;D.copy(n),D.vsub(E,D),D.vsub(U,D),D.vsub(i,D);let et=Math.abs(q),Q=D.length();if(et<u[W].length()&&Q<f){if(d)return!0;g=!0;let T=this.createContactEquation(a,o,t,e,l,c);U.vadd(E,T.rj),T.rj.copy(T.rj),D.negate(T.ni),T.ni.normalize(),T.ri.copy(T.rj),T.ri.vadd(i,T.ri),T.ri.vsub(n,T.ri),T.ri.normalize(),T.ri.scale(f,T.ri),T.ri.vadd(n,T.ri),T.ri.vsub(a.position,T.ri),T.rj.vadd(i,T.rj),T.rj.vsub(o.position,T.rj),this.result.push(T),this.createFrictionEquationsFromContact(T,this.frictionResult)}}h.release(C,U,B,E,D)}planeBox(t,e,n,i,s,r,a,o,l,c,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,r,a,o,t,e,d)}convexConvex(t,e,n,i,s,r,a,o,l,c,d,h,u){let f=Ta;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,r,f,h,u)){let g=[],_=Ca;t.clipAgainstHull(n,s,e,i,r,f,-100,100,g);let v=0;for(let x=0;x!==g.length;x++){if(d)return!0;let y=this.createContactEquation(a,o,t,e,l,c),b=y.ri,S=y.rj;f.negate(y.ni),g[x].normal.negate(_),_.scale(g[x].depth,_),g[x].point.vadd(_,b),S.copy(g[x].point),b.vsub(n,b),S.vsub(i,S),b.vadd(n,b),b.vsub(a.position,b),S.vadd(i,S),S.vsub(o.position,S),this.result.push(y),v++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&v&&this.createFrictionFromAverage(v)}}sphereConvex(t,e,n,i,s,r,a,o,l,c,d){let h=this.v3pool;n.vsub(i,fa);let u=e.faceNormals,f=e.faces,g=e.vertices,_=t.radius,v=!1;for(let x=0;x!==g.length;x++){let y=g[x],b=xa;r.vmult(y,b),i.vadd(b,b);let S=ga;if(b.vsub(n,S),S.lengthSquared()<_*_){if(d)return!0;v=!0;let M=this.createContactEquation(a,o,t,e,l,c);M.ri.copy(S),M.ri.normalize(),M.ni.copy(M.ri),M.ri.scale(_,M.ri),b.vsub(i,M.rj),M.ri.vadd(n,M.ri),M.ri.vsub(a.position,M.ri),M.rj.vadd(i,M.rj),M.rj.vsub(o.position,M.rj),this.result.push(M),this.createFrictionEquationsFromContact(M,this.frictionResult);return}}for(let x=0,y=f.length;x!==y&&v===!1;x++){let b=u[x],S=f[x],M=_a;r.vmult(b,M);let w=va;r.vmult(g[S[0]],w),w.vadd(i,w);let A=ya;M.scale(-_,A),n.vadd(A,A);let P=Sa;A.vsub(w,P);let C=P.dot(M),U=ba;if(n.vsub(w,U),C<0&&U.dot(M)>0){let B=[];for(let E=0,D=S.length;E!==D;E++){let R=h.get();r.vmult(g[S[E]],R),i.vadd(R,R),B.push(R)}if(sa(B,M,n)){if(d)return!0;v=!0;let E=this.createContactEquation(a,o,t,e,l,c);M.scale(-_,E.ri),M.negate(E.ni);let D=h.get();M.scale(-C,D);let R=h.get();M.scale(-_,R),n.vsub(i,E.rj),E.rj.vadd(R,E.rj),E.rj.vadd(D,E.rj),E.rj.vadd(i,E.rj),E.rj.vsub(o.position,E.rj),E.ri.vadd(n,E.ri),E.ri.vsub(a.position,E.ri),h.release(D),h.release(R),this.result.push(E),this.createFrictionEquationsFromContact(E,this.frictionResult);for(let L=0,K=B.length;L!==K;L++)h.release(B[L]);return}else for(let E=0;E!==S.length;E++){let D=h.get(),R=h.get();r.vmult(g[S[(E+1)%S.length]],D),r.vmult(g[S[(E+2)%S.length]],R),i.vadd(D,D),i.vadd(R,R);let L=pa;R.vsub(D,L);let K=ma;L.unit(K);let q=h.get(),W=h.get();n.vsub(D,W);let et=W.dot(K);K.scale(et,q),q.vadd(D,q);let Q=h.get();if(q.vsub(n,Q),et>0&&et*et<L.lengthSquared()&&Q.lengthSquared()<_*_){if(d)return!0;let T=this.createContactEquation(a,o,t,e,l,c);q.vsub(i,T.rj),q.vsub(n,T.ni),T.ni.normalize(),T.ni.scale(_,T.ri),T.rj.vadd(i,T.rj),T.rj.vsub(o.position,T.rj),T.ri.vadd(n,T.ri),T.ri.vsub(a.position,T.ri),this.result.push(T),this.createFrictionEquationsFromContact(T,this.frictionResult);for(let z=0,Y=B.length;z!==Y;z++)h.release(B[z]);h.release(D),h.release(R),h.release(q),h.release(Q),h.release(W);return}h.release(D),h.release(R),h.release(q),h.release(Q),h.release(W)}for(let E=0,D=B.length;E!==D;E++)h.release(B[E])}}}planeConvex(t,e,n,i,s,r,a,o,l,c,d){let h=Ma,u=wa;u.set(0,0,1),s.vmult(u,u);let f=0,g=Aa;for(let _=0;_!==e.vertices.length;_++)if(h.copy(e.vertices[_]),r.vmult(h,h),i.vadd(h,h),h.vsub(n,g),u.dot(g)<=0){if(d)return!0;let x=this.createContactEquation(a,o,t,e,l,c),y=Ea;u.scale(u.dot(g),y),h.vsub(y,y),y.vsub(n,x.ri),x.ni.copy(u),h.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(o.position,x.rj),this.result.push(x),f++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&f&&this.createFrictionFromAverage(f)}boxConvex(t,e,n,i,s,r,a,o,l,c,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,r,a,o,t,e,d)}sphereHeightfield(t,e,n,i,s,r,a,o,l,c,d){let h=e.data,u=t.radius,f=e.elementSize,g=Va,_=za;st.pointToLocalFrame(i,r,n,_);let v=Math.floor((_.x-u)/f)-1,x=Math.ceil((_.x+u)/f)+1,y=Math.floor((_.y-u)/f)-1,b=Math.ceil((_.y+u)/f)+1;if(x<0||b<0||v>h.length||y>h[0].length)return;v<0&&(v=0),x<0&&(x=0),y<0&&(y=0),b<0&&(b=0),v>=h.length&&(v=h.length-1),x>=h.length&&(x=h.length-1),b>=h[0].length&&(b=h[0].length-1),y>=h[0].length&&(y=h[0].length-1);let S=[];e.getRectMinMax(v,y,x,b,S);let M=S[0],w=S[1];if(_.z-u>w||_.z+u<M)return;let A=this.result;for(let P=v;P<x;P++)for(let C=y;C<b;C++){let U=A.length,B=!1;if(e.getConvexTrianglePillar(P,C,!1),st.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(B=this.sphereConvex(t,e.pillarConvex,n,g,s,r,a,o,t,e,d)),d&&B||(e.getConvexTrianglePillar(P,C,!0),st.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(B=this.sphereConvex(t,e.pillarConvex,n,g,s,r,a,o,t,e,d)),d&&B))return!0;if(A.length-U>2)return}}boxHeightfield(t,e,n,i,s,r,a,o,l,c,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,r,a,o,t,e,d)}convexHeightfield(t,e,n,i,s,r,a,o,l,c,d){let h=e.data,u=e.elementSize,f=t.boundingSphereRadius,g=Ba,_=Oa,v=Ua;st.pointToLocalFrame(i,r,n,v);let x=Math.floor((v.x-f)/u)-1,y=Math.ceil((v.x+f)/u)+1,b=Math.floor((v.y-f)/u)-1,S=Math.ceil((v.y+f)/u)+1;if(y<0||S<0||x>h.length||b>h[0].length)return;x<0&&(x=0),y<0&&(y=0),b<0&&(b=0),S<0&&(S=0),x>=h.length&&(x=h.length-1),y>=h.length&&(y=h.length-1),S>=h[0].length&&(S=h[0].length-1),b>=h[0].length&&(b=h[0].length-1);let M=[];e.getRectMinMax(x,b,y,S,M);let w=M[0],A=M[1];if(!(v.z-f>A||v.z+f<w))for(let P=x;P<y;P++)for(let C=b;C<S;C++){let U=!1;if(e.getConvexTrianglePillar(P,C,!1),st.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.convexConvex(t,e.pillarConvex,n,g,s,r,a,o,null,null,d,_,null)),d&&U||(e.getConvexTrianglePillar(P,C,!0),st.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.convexConvex(t,e.pillarConvex,n,g,s,r,a,o,null,null,d,_,null)),d&&U))return!0}}sphereParticle(t,e,n,i,s,r,a,o,l,c,d){let h=La;if(h.set(0,0,1),i.vsub(n,h),h.lengthSquared()<=t.radius*t.radius){if(d)return!0;let f=this.createContactEquation(o,a,e,t,l,c);h.normalize(),f.rj.copy(h),f.rj.scale(t.radius,f.rj),f.ni.copy(h),f.ni.negate(f.ni),f.ri.set(0,0,0),this.result.push(f),this.createFrictionEquationsFromContact(f,this.frictionResult)}}planeParticle(t,e,n,i,s,r,a,o,l,c,d){let h=Ra;h.set(0,0,1),a.quaternion.vmult(h,h);let u=Ia;if(i.vsub(a.position,u),h.dot(u)<=0){if(d)return!0;let g=this.createContactEquation(o,a,e,t,l,c);g.ni.copy(h),g.ni.negate(g.ni),g.ri.set(0,0,0);let _=Pa;h.scale(h.dot(i),_),i.vsub(_,_),g.rj.copy(_),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}boxParticle(t,e,n,i,s,r,a,o,l,c,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,r,a,o,t,e,d)}convexParticle(t,e,n,i,s,r,a,o,l,c,d){let h=-1,u=Da,f=Fa,g=null,_=Na;if(_.copy(i),_.vsub(n,_),s.conjugate(Is),Is.vmult(_,_),t.pointIsInside(_)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let v=0,x=t.faces.length;v!==x;v++){let y=[t.worldVertices[t.faces[v][0]]],b=t.worldFaceNormals[v];i.vsub(y[0],Ps);let S=-b.dot(Ps);if(g===null||Math.abs(S)<Math.abs(g)){if(d)return!0;g=S,h=v,u.copy(b)}}if(h!==-1){let v=this.createContactEquation(o,a,e,t,l,c);u.scale(g,f),f.vadd(i,f),f.vsub(n,f),v.rj.copy(f),u.negate(v.ni),v.ri.set(0,0,0);let x=v.ri,y=v.rj;x.vadd(i,x),x.vsub(o.position,x),y.vadd(n,y),y.vsub(a.position,y),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,r,a,o,l,c,d){return this.convexHeightfield(e,t,i,n,r,s,o,a,l,c,d)}particleCylinder(t,e,n,i,s,r,a,o,l,c,d){return this.convexParticle(e,t,i,n,r,s,o,a,l,c,d)}sphereTrimesh(t,e,n,i,s,r,a,o,l,c,d){let h=Wo,u=qo,f=Xo,g=Yo,_=$o,v=Zo,x=Qo,y=Ho,b=ko,S=ta;st.pointToLocalFrame(i,r,n,_);let M=t.radius;x.lowerBound.set(_.x-M,_.y-M,_.z-M),x.upperBound.set(_.x+M,_.y+M,_.z+M),e.getTrianglesInAABB(x,S);let w=Go,A=t.radius*t.radius;for(let E=0;E<S.length;E++)for(let D=0;D<3;D++)if(e.getVertex(e.indices[S[E]*3+D],w),w.vsub(_,b),b.lengthSquared()<=A){if(y.copy(w),st.pointToWorldFrame(i,r,y,w),w.vsub(n,b),d)return!0;let R=this.createContactEquation(a,o,t,e,l,c);R.ni.copy(b),R.ni.normalize(),R.ri.copy(R.ni),R.ri.scale(t.radius,R.ri),R.ri.vadd(n,R.ri),R.ri.vsub(a.position,R.ri),R.rj.copy(w),R.rj.vsub(o.position,R.rj),this.result.push(R),this.createFrictionEquationsFromContact(R,this.frictionResult)}for(let E=0;E<S.length;E++)for(let D=0;D<3;D++){e.getVertex(e.indices[S[E]*3+D],h),e.getVertex(e.indices[S[E]*3+(D+1)%3],u),u.vsub(h,f),_.vsub(u,v);let R=v.dot(f);_.vsub(h,v);let L=v.dot(f);if(L>0&&R<0&&(_.vsub(h,v),g.copy(f),g.normalize(),L=v.dot(g),g.scale(L,v),v.vadd(h,v),v.distanceTo(_)<t.radius)){if(d)return!0;let q=this.createContactEquation(a,o,t,e,l,c);v.vsub(_,q.ni),q.ni.normalize(),q.ni.scale(t.radius,q.ri),q.ri.vadd(n,q.ri),q.ri.vsub(a.position,q.ri),st.pointToWorldFrame(i,r,v,v),v.vsub(o.position,q.rj),st.vectorToWorldFrame(r,q.ni,q.ni),st.vectorToWorldFrame(r,q.ri,q.ri),this.result.push(q),this.createFrictionEquationsFromContact(q,this.frictionResult)}}let P=Jo,C=jo,U=Ko,B=Vo;for(let E=0,D=S.length;E!==D;E++){e.getTriangleVertices(S[E],P,C,U),e.getNormal(S[E],B),_.vsub(P,v);let R=v.dot(B);if(B.scale(R,v),_.vsub(v,v),R=v.distanceTo(_),Rt.pointInTriangle(v,P,C,U)&&R<t.radius){if(d)return!0;let L=this.createContactEquation(a,o,t,e,l,c);v.vsub(_,L.ni),L.ni.normalize(),L.ni.scale(t.radius,L.ri),L.ri.vadd(n,L.ri),L.ri.vsub(a.position,L.ri),st.pointToWorldFrame(i,r,v,v),v.vsub(o.position,L.rj),st.vectorToWorldFrame(r,L.ni,L.ni),st.vectorToWorldFrame(r,L.ri,L.ri),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult)}}S.length=0}planeTrimesh(t,e,n,i,s,r,a,o,l,c,d){let h=new m,u=Bo;u.set(0,0,1),s.vmult(u,u);for(let f=0;f<e.vertices.length/3;f++){e.getVertex(f,h);let g=new m;g.copy(h),st.pointToWorldFrame(i,r,g,h);let _=Oo;if(h.vsub(n,_),u.dot(_)<=0){if(d)return!0;let x=this.createContactEquation(a,o,t,e,l,c);x.ni.copy(u);let y=zo;u.scale(_.dot(u),y),h.vsub(y,y),x.ri.copy(y),x.ri.vsub(a.position,x.ri),x.rj.copy(h),x.rj.vsub(o.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}},he=new m,_e=new m,ve=new m,No=new m,Do=new m,Fo=new vt,Uo=new vt,Bo=new m,Oo=new m,zo=new m,Vo=new m,ko=new m;new m;var Go=new m,Ho=new m,Wo=new m,qo=new m,Xo=new m,Yo=new m,$o=new m,Zo=new m,Jo=new m,jo=new m,Ko=new m,Qo=new Mt,ta=[],hn=new m,Rs=new m,ea=new m,na=new m,ia=new m;function sa(p,t,e){let n=null,i=p.length;for(let s=0;s!==i;s++){let r=p[s],a=ea;p[(s+1)%i].vsub(r,a);let o=na;a.cross(t,o);let l=ia;e.vsub(r,l);let c=o.dot(l);if(n===null||c>0&&n===!0||c<=0&&n===!1){n===null&&(n=c>0);continue}else return!1}return!0}var un=new m,ra=new m,oa=new m,aa=new m,la=[new m,new m,new m,new m,new m,new m],ca=new m,ha=new m,ua=new m,da=new m,fa=new m,pa=new m,ma=new m,ga=new m,xa=new m,_a=new m,va=new m,ya=new m,Sa=new m,ba=new m;new m;new m;var Ma=new m,wa=new m,Aa=new m,Ea=new m,Ta=new m,Ca=new m,Ra=new m,Ia=new m,Pa=new m,La=new m,Is=new vt,Na=new m;new m;var Da=new m,Ps=new m,Fa=new m,Ua=new m,Ba=new m,Oa=[0],za=new m,Va=new m,bn=class{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){let n=e;e=t,t=n}return t<<16|e}set(t,e){let n=this.getKey(t,e),i=this.current,s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let r=i.length-1;r>=s;r--)i[r+1]=i[r];i[s]=n}}tick(){let t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){let n=this.current,i=this.previous,s=n.length,r=i.length,a=0;for(let o=0;o<s;o++){let l=!1,c=n[o];for(;c>i[a];)a++;l=c===i[a],l||Ls(t,c)}a=0;for(let o=0;o<r;o++){let l=!1,c=i[o];for(;c>n[a];)a++;l=n[a]===c,l||Ls(e,c)}}};function Ls(p,t){p.push((t&4294901760)>>16,t&65535)}var oi=(p,t)=>p<t?`${p}-${t}`:`${t}-${p}`,gi=class{constructor(){this.data={keys:[]}}get(t,e){let n=oi(t,e);return this.data[n]}set(t,e,n){let i=oi(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){let n=oi(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){let t=this.data,e=t.keys;for(;e.length>0;){let n=e.pop();delete t[n]}}},Mn=class extends fn{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new m,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new m,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new li,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new di,this.constraints=[],this.narrowphase=new mi(this),this.collisionMatrix=new dn,this.collisionMatrixPrevious=new dn,this.bodyOverlapKeeper=new bn,this.shapeOverlapKeeper=new bn,this.contactmaterials=[],this.contactMaterialTable=new gi,this.defaultMaterial=new yn("default"),this.defaultContactMaterial=new vn(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){let t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){let e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof ye?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Rt.ALL,n.from=t,n.to=e,n.callback=i,ai.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Rt.ANY,n.from=t,n.to=e,n.result=i,ai.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Rt.CLOSEST,n.from=t,n.to=e,n.result=i,ai.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof j&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;let e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){let e=this.bodies;for(let n=0;n<e.length;n++){let i=e[n].shapes;for(let s=0;s<i.length;s++){let r=i[s];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){let e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);let n=ht.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{let i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;let i=ht.now(),s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(ht.now()-i>t*1e3)););this.accumulator=this.accumulator%t;let r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){let o=this.bodies[a];o.previousPosition.lerp(o.position,r,o.interpolatedPosition),o.previousQuaternion.slerp(o.quaternion,r,o.interpolatedQuaternion),o.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;let e=this.contacts,n=qa,i=Xa,s=this.bodies.length,r=this.bodies,a=this.solver,o=this.gravity,l=this.doProfiling,c=this.profile,d=j.DYNAMIC,h=-1/0,u=this.constraints,f=Wa;o.length();let g=o.x,_=o.y,v=o.z,x=0;for(l&&(h=ht.now()),x=0;x!==s;x++){let E=r[x];if(E.type===d){let D=E.force,R=E.mass;D.x+=R*g,D.y+=R*_,D.z+=R*v}}for(let E=0,D=this.subsystems.length;E!==D;E++)this.subsystems[E].update();l&&(h=ht.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(c.broadphase=ht.now()-h);let y=u.length;for(x=0;x!==y;x++){let E=u[x];if(!E.collideConnected)for(let D=n.length-1;D>=0;D-=1)(E.bodyA===n[D]&&E.bodyB===i[D]||E.bodyB===n[D]&&E.bodyA===i[D])&&(n.splice(D,1),i.splice(D,1))}this.collisionMatrixTick(),l&&(h=ht.now());let b=Ha,S=e.length;for(x=0;x!==S;x++)b.push(e[x]);e.length=0;let M=this.frictionEquations.length;for(x=0;x!==M;x++)f.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,b,this.frictionEquations,f),l&&(c.narrowphase=ht.now()-h),l&&(h=ht.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);let w=e.length;for(let E=0;E!==w;E++){let D=e[E],R=D.bi,L=D.bj,K=D.si,q=D.sj,W;if(R.material&&L.material?W=this.getContactMaterial(R.material,L.material)||this.defaultContactMaterial:W=this.defaultContactMaterial,W.friction,R.material&&L.material&&(R.material.friction>=0&&L.material.friction>=0&&R.material.friction*L.material.friction,R.material.restitution>=0&&L.material.restitution>=0&&(D.restitution=R.material.restitution*L.material.restitution)),a.addEquation(D),R.allowSleep&&R.type===j.DYNAMIC&&R.sleepState===j.SLEEPING&&L.sleepState===j.AWAKE&&L.type!==j.STATIC){let et=L.velocity.lengthSquared()+L.angularVelocity.lengthSquared(),Q=L.sleepSpeedLimit**2;et>=Q*2&&(R.wakeUpAfterNarrowphase=!0)}if(L.allowSleep&&L.type===j.DYNAMIC&&L.sleepState===j.SLEEPING&&R.sleepState===j.AWAKE&&R.type!==j.STATIC){let et=R.velocity.lengthSquared()+R.angularVelocity.lengthSquared(),Q=R.sleepSpeedLimit**2;et>=Q*2&&(L.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(R,L,!0),this.collisionMatrixPrevious.get(R,L)||(Fe.body=L,Fe.contact=D,R.dispatchEvent(Fe),Fe.body=R,L.dispatchEvent(Fe)),this.bodyOverlapKeeper.set(R.id,L.id),this.shapeOverlapKeeper.set(K.id,q.id)}for(this.emitContactEvents(),l&&(c.makeContactConstraints=ht.now()-h,h=ht.now()),x=0;x!==s;x++){let E=r[x];E.wakeUpAfterNarrowphase&&(E.wakeUp(),E.wakeUpAfterNarrowphase=!1)}for(y=u.length,x=0;x!==y;x++){let E=u[x];E.update();for(let D=0,R=E.equations.length;D!==R;D++){let L=E.equations[D];a.addEquation(L)}}a.solve(t,this),l&&(c.solve=ht.now()-h),a.removeAllEquations();let A=Math.pow;for(x=0;x!==s;x++){let E=r[x];if(E.type&d){let D=A(1-E.linearDamping,t),R=E.velocity;R.scale(D,R);let L=E.angularVelocity;if(L){let K=A(1-E.angularDamping,t);L.scale(K,L)}}}this.dispatchEvent(Ga),l&&(h=ht.now());let C=this.stepnumber%(this.quatNormalizeSkip+1)===0,U=this.quatNormalizeFast;for(x=0;x!==s;x++)r[x].integrate(t,C,U);this.clearForces(),this.broadphase.dirty=!0,l&&(c.integrate=ht.now()-h),this.stepnumber+=1,this.dispatchEvent(ka);let B=!0;if(this.allowSleep)for(B=!1,x=0;x!==s;x++){let E=r[x];E.sleepTick(this.time),E.sleepState!==j.SLEEPING&&(B=!0)}this.hasActiveBodies=B}emitContactEvents(){let t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Gt,Ht),t){for(let s=0,r=Gt.length;s<r;s+=2)Ue.bodyA=this.getBodyById(Gt[s]),Ue.bodyB=this.getBodyById(Gt[s+1]),this.dispatchEvent(Ue);Ue.bodyA=Ue.bodyB=null}if(e){for(let s=0,r=Ht.length;s<r;s+=2)Be.bodyA=this.getBodyById(Ht[s]),Be.bodyB=this.getBodyById(Ht[s+1]),this.dispatchEvent(Be);Be.bodyA=Be.bodyB=null}Gt.length=Ht.length=0;let n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Gt,Ht),n){for(let s=0,r=Gt.length;s<r;s+=2){let a=this.getShapeById(Gt[s]),o=this.getShapeById(Gt[s+1]);Wt.shapeA=a,Wt.shapeB=o,a&&(Wt.bodyA=a.body),o&&(Wt.bodyB=o.body),this.dispatchEvent(Wt)}Wt.bodyA=Wt.bodyB=Wt.shapeA=Wt.shapeB=null}if(i){for(let s=0,r=Ht.length;s<r;s+=2){let a=this.getShapeById(Ht[s]),o=this.getShapeById(Ht[s+1]);qt.shapeA=a,qt.shapeB=o,a&&(qt.bodyA=a.body),o&&(qt.bodyB=o.body),this.dispatchEvent(qt)}qt.bodyA=qt.bodyB=qt.shapeA=qt.shapeB=null}}clearForces(){let t=this.bodies,e=t.length;for(let n=0;n!==e;n++){let i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}};new Mt;var ai=new Rt,ht=globalThis.performance||{};if(!ht.now){let p=Date.now();ht.timing&&ht.timing.navigationStart&&(p=ht.timing.navigationStart),ht.now=()=>Date.now()-p}new m;var ka={type:"postStep"},Ga={type:"preStep"},Fe={type:j.COLLIDE_EVENT_NAME,body:null,contact:null},Ha=[],Wa=[],qa=[],Xa=[],Gt=[],Ht=[],Ue={type:"beginContact",bodyA:null,bodyB:null},Be={type:"endContact",bodyA:null,bodyB:null},Wt={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},qt={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};var Qs=1;var tr=3;var Pi=0,Li=1,Ni=2,Di=3,Fi=4,Ui=5,Bi=6,Oi=7,er=0,nr=1,ir=2;var Ki=1,Qi=2,ts=3,es=4,ns=5,is=6,ss=7;var rs=300,sr=301,os=302;var rr=306,zi=1e3,Xe=1001,Vi=1002;var or=1006;var ar=1008;var lr=1009;var cr=1015;var hr=1023;var $e=2300,Nn=2301,Pn=2302,ki=2303,Gi=2400,Hi=2401,Wi=2402;var as="",Lt="srgb",qi="srgb-linear",Xi="linear",Ln="srgb";var ur=35044;var Ye=2e3,Yi=2001;function Ya(p){for(let t=p.length-1;t>=0;--t)if(p[t]>=65535)return!0;return!1}function $a(p){return ArrayBuffer.isView(p)&&!(p instanceof DataView)}function $i(p){return document.createElementNS("http://www.w3.org/1999/xhtml",p)}var Vs={},Dn=null;function dr(p){let t=p[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=p[1];e&&e.isStackTrace?p[0]+=" "+e.getLocation():p[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return p}function ft(...p){p=dr(p);let t="THREE."+p.shift();if(Dn)Dn("warn",t,...p);else{let e=p[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...p)}}function at(...p){p=dr(p);let t="THREE."+p.shift();if(Dn)Dn("error",t,...p);else{let e=p[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...p)}}function Ie(...p){let t=p.join(" ");t in Vs||(Vs[t]=!0,ft(...p))}var Za={[Pi]:Li,[Ni]:Bi,[Fi]:Oi,[Di]:Ui,[Li]:Pi,[Bi]:Ni,[Oi]:Fi,[Ui]:Di},pe=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}},mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Td=Math.PI/180,Ja=180/Math.PI;function jn(){let p=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mt[p&255]+mt[p>>8&255]+mt[p>>16&255]+mt[p>>24&255]+"-"+mt[t&255]+mt[t>>8&255]+"-"+mt[t>>16&15|64]+mt[t>>24&255]+"-"+mt[e&63|128]+mt[e>>8&255]+"-"+mt[e>>16&255]+mt[e>>24&255]+mt[n&255]+mt[n>>8&255]+mt[n>>16&255]+mt[n>>24&255]).toLowerCase()}function nt(p,t,e){return Math.max(t,Math.min(e,p))}function ja(p,t){return(p%t+t)%t}function yi(p,t,e){return(1-e)*p+e*t}function ke(p,t){switch(t.constructor){case Float32Array:return p;case Uint32Array:return p/4294967295;case Uint16Array:return p/65535;case Uint8Array:case Uint8ClampedArray:return p/255;case Int32Array:return Math.max(p/2147483647,-1);case Int16Array:return Math.max(p/32767,-1);case Int8Array:return Math.max(p/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function bt(p,t){switch(t.constructor){case Float32Array:return p;case Uint32Array:return Math.round(p*4294967295);case Uint16Array:return Math.round(p*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(p*255);case Int32Array:return Math.round(p*2147483647);case Int16Array:return Math.round(p*32767);case Int8Array:return Math.round(p*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ut=class p{static{p.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=nt(this.x,t.x,e.x),this.y=nt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=nt(this.x,t,e),this.y=nt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(nt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xt=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,a){let o=n[i+0],l=n[i+1],c=n[i+2],d=n[i+3],h=s[r+0],u=s[r+1],f=s[r+2],g=s[r+3];if(d!==g||o!==h||l!==u||c!==f){let _=o*h+l*u+c*f+d*g;_<0&&(h=-h,u=-u,f=-f,g=-g,_=-_);let v=1-a;if(_<.9995){let x=Math.acos(_),y=Math.sin(x);v=Math.sin(v*x)/y,a=Math.sin(a*x)/y,o=o*v+h*a,l=l*v+u*a,c=c*v+f*a,d=d*v+g*a}else{o=o*v+h*a,l=l*v+u*a,c=c*v+f*a,d=d*v+g*a;let x=1/Math.sqrt(o*o+l*l+c*c+d*d);o*=x,l*=x,c*=x,d*=x}}t[e]=o,t[e+1]=l,t[e+2]=c,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,s,r){let a=n[i],o=n[i+1],l=n[i+2],c=n[i+3],d=s[r],h=s[r+1],u=s[r+2],f=s[r+3];return t[e]=a*f+c*d+o*u-l*h,t[e+1]=o*f+c*h+l*d-a*u,t[e+2]=l*f+c*u+a*h-o*d,t[e+3]=c*f-a*d-o*h-l*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,r=t._order,a=Math.cos,o=Math.sin,l=a(n/2),c=a(i/2),d=a(s/2),h=o(n/2),u=o(i/2),f=o(s/2);switch(r){case"XYZ":this._x=h*c*d+l*u*f,this._y=l*u*d-h*c*f,this._z=l*c*f+h*u*d,this._w=l*c*d-h*u*f;break;case"YXZ":this._x=h*c*d+l*u*f,this._y=l*u*d-h*c*f,this._z=l*c*f-h*u*d,this._w=l*c*d+h*u*f;break;case"ZXY":this._x=h*c*d-l*u*f,this._y=l*u*d+h*c*f,this._z=l*c*f+h*u*d,this._w=l*c*d-h*u*f;break;case"ZYX":this._x=h*c*d-l*u*f,this._y=l*u*d+h*c*f,this._z=l*c*f-h*u*d,this._w=l*c*d+h*u*f;break;case"YZX":this._x=h*c*d+l*u*f,this._y=l*u*d+h*c*f,this._z=l*c*f-h*u*d,this._w=l*c*d-h*u*f;break;case"XZY":this._x=h*c*d-l*u*f,this._y=l*u*d-h*c*f,this._z=l*c*f+h*u*d,this._w=l*c*d+h*u*f;break;default:ft("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10],h=n+a+d;if(h>0){let u=.5/Math.sqrt(h+1);this._w=.25/u,this._x=(c-o)*u,this._y=(s-l)*u,this._z=(r-i)*u}else if(n>a&&n>d){let u=2*Math.sqrt(1+n-a-d);this._w=(c-o)/u,this._x=.25*u,this._y=(i+r)/u,this._z=(s+l)/u}else if(a>d){let u=2*Math.sqrt(1+a-n-d);this._w=(s-l)/u,this._x=(i+r)/u,this._y=.25*u,this._z=(o+c)/u}else{let u=2*Math.sqrt(1+d-n-a);this._w=(r-i)/u,this._x=(s+l)/u,this._y=(o+c)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(nt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,r=t._w,a=e._x,o=e._y,l=e._z,c=e._w;return this._x=n*c+r*a+i*l-s*o,this._y=i*c+r*o+s*a-n*l,this._z=s*c+r*l+n*o-i*a,this._w=r*c-n*a-i*o-s*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,s=t._z,r=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,s=-s,r=-r,a=-a);let o=1-e;if(a<.9995){let l=Math.acos(a),c=Math.sin(l);o=Math.sin(o*l)/c,e=Math.sin(e*l)/c,this._x=this._x*o+n*e,this._y=this._y*o+i*e,this._z=this._z*o+s*e,this._w=this._w*o+r*e,this._onChangeCallback()}else this._x=this._x*o+n*e,this._y=this._y*o+i*e,this._z=this._z*o+s*e,this._w=this._w*o+r*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class p{static{p.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ks.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ks.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,a=t.z,o=t.w,l=2*(r*i-a*n),c=2*(a*e-s*i),d=2*(s*n-r*e);return this.x=e+o*l+r*d-a*c,this.y=n+o*c+a*l-s*d,this.z=i+o*d+s*c-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=nt(this.x,t.x,e.x),this.y=nt(this.y,t.y,e.y),this.z=nt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=nt(this.x,t,e),this.y=nt(this.y,t,e),this.z=nt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,r=e.x,a=e.y,o=e.z;return this.x=i*o-s*a,this.y=s*r-n*o,this.z=n*a-i*r,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Si.copy(this).projectOnVector(t),this.sub(Si)}reflect(t){return this.sub(Si.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(nt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Si=new N,ks=new xt,Z=class p{static{p.prototype.isMatrix3=!0}constructor(t,e,n,i,s,r,a,o,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,o,l)}set(t,e,n,i,s,r,a,o,l){let c=this.elements;return c[0]=t,c[1]=i,c[2]=a,c[3]=e,c[4]=s,c[5]=o,c[6]=n,c[7]=r,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[3],o=n[6],l=n[1],c=n[4],d=n[7],h=n[2],u=n[5],f=n[8],g=i[0],_=i[3],v=i[6],x=i[1],y=i[4],b=i[7],S=i[2],M=i[5],w=i[8];return s[0]=r*g+a*x+o*S,s[3]=r*_+a*y+o*M,s[6]=r*v+a*b+o*w,s[1]=l*g+c*x+d*S,s[4]=l*_+c*y+d*M,s[7]=l*v+c*b+d*w,s[2]=h*g+u*x+f*S,s[5]=h*_+u*y+f*M,s[8]=h*v+u*b+f*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],l=t[7],c=t[8];return e*r*c-e*a*l-n*s*c+n*a*o+i*s*l-i*r*o}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],l=t[7],c=t[8],d=c*r-a*l,h=a*o-c*s,u=l*s-r*o,f=e*d+n*h+i*u;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/f;return t[0]=d*g,t[1]=(i*l-c*n)*g,t[2]=(a*n-i*r)*g,t[3]=h*g,t[4]=(c*e-i*o)*g,t[5]=(i*s-a*e)*g,t[6]=u*g,t[7]=(n*o-l*e)*g,t[8]=(r*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,a){let o=Math.cos(s),l=Math.sin(s);return this.set(n*o,n*l,-n*(o*r+l*a)+r+t,-i*l,i*o,-i*(-l*r+o*a)+a+e,0,0,1),this}scale(t,e){return Ie("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(bi.makeScale(t,e)),this}rotate(t){return Ie("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(bi.makeRotation(-t)),this}translate(t,e){return Ie("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(bi.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},bi=new Z,Gs=new Z().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hs=new Z().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ka(){let p={enabled:!0,workingColorSpace:qi,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Ln&&(i.r=$t(i.r),i.g=$t(i.g),i.b=$t(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Ln&&(i.r=Pe(i.r),i.g=Pe(i.g),i.b=Pe(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===as?Xi:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Ie("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),p.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Ie("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),p.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return p.define({[qi]:{primaries:t,whitePoint:n,transfer:Xi,toXYZ:Gs,fromXYZ:Hs,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:t,whitePoint:n,transfer:Ln,toXYZ:Gs,fromXYZ:Hs,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}}),p}var Pt=Ka();function $t(p){return p<.04045?p*.0773993808:Math.pow(p*.9478672986+.0521327014,2.4)}function Pe(p){return p<.0031308?p*12.92:1.055*Math.pow(p,.41666)-.055}var Se,Fn=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Se===void 0&&(Se=$i("canvas")),Se.width=t.width,Se.height=t.height;let i=Se.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Se}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=$i("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=$t(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($t(e[n]/255)*255):e[n]=$t(e[n]);return{data:e,width:t.width,height:t.height}}else return ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Qa=0,Un=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Qa++}),this.uuid=jn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?s.push(Mi(i[r].image)):s.push(Mi(i[r]))}else s=Mi(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function Mi(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap?Fn.getDataURL(p):p.data?{data:Array.from(p.data),width:p.width,height:p.height,type:p.data.constructor.name}:(ft("Texture: Unable to serialize Texture."),{})}var tl=0,wi=new N,Le=class p extends pe{constructor(t=p.DEFAULT_IMAGE,e=p.DEFAULT_MAPPING,n=Xe,i=Xe,s=or,r=ar,a=hr,o=lr,l=p.DEFAULT_ANISOTROPY,c=as){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tl++}),this.uuid=jn(),this.name="",this.source=new Un(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=o,this.offset=new ut(0,0),this.repeat=new ut(1,1),this.center=new ut(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Z,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(wi).x}get height(){return this.source.getSize(wi).y}get depth(){return this.source.getSize(wi).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){ft(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){ft(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rs)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zi:t.x=t.x-Math.floor(t.x);break;case Xe:t.x=t.x<0?0:1;break;case Vi:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zi:t.y=t.y-Math.floor(t.y);break;case Xe:t.y=t.y<0?0:1;break;case Vi:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Le.DEFAULT_IMAGE=null;Le.DEFAULT_MAPPING=rs;Le.DEFAULT_ANISOTROPY=1;var Zi=class p{static{p.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,o=t.elements,l=o[0],c=o[4],d=o[8],h=o[1],u=o[5],f=o[9],g=o[2],_=o[6],v=o[10];if(Math.abs(c-h)<.01&&Math.abs(d-g)<.01&&Math.abs(f-_)<.01){if(Math.abs(c+h)<.1&&Math.abs(d+g)<.1&&Math.abs(f+_)<.1&&Math.abs(l+u+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,b=(u+1)/2,S=(v+1)/2,M=(c+h)/4,w=(d+g)/4,A=(f+_)/4;return y>b&&y>S?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=M/n,s=w/n):b>S?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=M/i,s=A/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=w/s,i=A/s),this.set(n,i,s,e),this}let x=Math.sqrt((_-f)*(_-f)+(d-g)*(d-g)+(h-c)*(h-c));return Math.abs(x)<.001&&(x=1),this.x=(_-f)/x,this.y=(d-g)/x,this.z=(h-c)/x,this.w=Math.acos((l+u+v-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=nt(this.x,t.x,e.x),this.y=nt(this.y,t.y,e.y),this.z=nt(this.z,t.z,e.z),this.w=nt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=nt(this.x,t,e),this.y=nt(this.y,t,e),this.z=nt(this.z,t,e),this.w=nt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var Vt=class p{static{p.prototype.isMatrix4=!0}constructor(t,e,n,i,s,r,a,o,l,c,d,h,u,f,g,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,a,o,l,c,d,h,u,f,g,_)}set(t,e,n,i,s,r,a,o,l,c,d,h,u,f,g,_){let v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=i,v[1]=s,v[5]=r,v[9]=a,v[13]=o,v[2]=l,v[6]=c,v[10]=d,v[14]=h,v[3]=u,v[7]=f,v[11]=g,v[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new p().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/be.setFromMatrixColumn(t,0).length(),s=1/be.setFromMatrixColumn(t,1).length(),r=1/be.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),a=Math.sin(n),o=Math.cos(i),l=Math.sin(i),c=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){let h=r*c,u=r*d,f=a*c,g=a*d;e[0]=o*c,e[4]=-o*d,e[8]=l,e[1]=u+f*l,e[5]=h-g*l,e[9]=-a*o,e[2]=g-h*l,e[6]=f+u*l,e[10]=r*o}else if(t.order==="YXZ"){let h=o*c,u=o*d,f=l*c,g=l*d;e[0]=h+g*a,e[4]=f*a-u,e[8]=r*l,e[1]=r*d,e[5]=r*c,e[9]=-a,e[2]=u*a-f,e[6]=g+h*a,e[10]=r*o}else if(t.order==="ZXY"){let h=o*c,u=o*d,f=l*c,g=l*d;e[0]=h-g*a,e[4]=-r*d,e[8]=f+u*a,e[1]=u+f*a,e[5]=r*c,e[9]=g-h*a,e[2]=-r*l,e[6]=a,e[10]=r*o}else if(t.order==="ZYX"){let h=r*c,u=r*d,f=a*c,g=a*d;e[0]=o*c,e[4]=f*l-u,e[8]=h*l+g,e[1]=o*d,e[5]=g*l+h,e[9]=u*l-f,e[2]=-l,e[6]=a*o,e[10]=r*o}else if(t.order==="YZX"){let h=r*o,u=r*l,f=a*o,g=a*l;e[0]=o*c,e[4]=g-h*d,e[8]=f*d+u,e[1]=d,e[5]=r*c,e[9]=-a*c,e[2]=-l*c,e[6]=u*d+f,e[10]=h-g*d}else if(t.order==="XZY"){let h=r*o,u=r*l,f=a*o,g=a*l;e[0]=o*c,e[4]=-d,e[8]=l*c,e[1]=h*d+g,e[5]=r*c,e[9]=u*d-f,e[2]=f*d-u,e[6]=a*c,e[10]=g*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(el,t,nl)}lookAt(t,e,n){let i=this.elements;return wt.subVectors(t,e),wt.lengthSq()===0&&(wt.z=1),wt.normalize(),ee.crossVectors(n,wt),ee.lengthSq()===0&&(Math.abs(n.z)===1?wt.x+=1e-4:wt.z+=1e-4,wt.normalize(),ee.crossVectors(n,wt)),ee.normalize(),wn.crossVectors(wt,ee),i[0]=ee.x,i[4]=wn.x,i[8]=wt.x,i[1]=ee.y,i[5]=wn.y,i[9]=wt.y,i[2]=ee.z,i[6]=wn.z,i[10]=wt.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],a=n[4],o=n[8],l=n[12],c=n[1],d=n[5],h=n[9],u=n[13],f=n[2],g=n[6],_=n[10],v=n[14],x=n[3],y=n[7],b=n[11],S=n[15],M=i[0],w=i[4],A=i[8],P=i[12],C=i[1],U=i[5],B=i[9],E=i[13],D=i[2],R=i[6],L=i[10],K=i[14],q=i[3],W=i[7],et=i[11],Q=i[15];return s[0]=r*M+a*C+o*D+l*q,s[4]=r*w+a*U+o*R+l*W,s[8]=r*A+a*B+o*L+l*et,s[12]=r*P+a*E+o*K+l*Q,s[1]=c*M+d*C+h*D+u*q,s[5]=c*w+d*U+h*R+u*W,s[9]=c*A+d*B+h*L+u*et,s[13]=c*P+d*E+h*K+u*Q,s[2]=f*M+g*C+_*D+v*q,s[6]=f*w+g*U+_*R+v*W,s[10]=f*A+g*B+_*L+v*et,s[14]=f*P+g*E+_*K+v*Q,s[3]=x*M+y*C+b*D+S*q,s[7]=x*w+y*U+b*R+S*W,s[11]=x*A+y*B+b*L+S*et,s[15]=x*P+y*E+b*K+S*Q,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],a=t[5],o=t[9],l=t[13],c=t[2],d=t[6],h=t[10],u=t[14],f=t[3],g=t[7],_=t[11],v=t[15],x=o*u-l*h,y=a*u-l*d,b=a*h-o*d,S=r*u-l*c,M=r*h-o*c,w=r*d-a*c;return e*(g*x-_*y+v*b)-n*(f*x-_*S+v*M)+i*(f*y-g*S+v*w)-s*(f*b-g*M+_*w)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[1],r=t[5],a=t[9],o=t[2],l=t[6],c=t[10];return e*(r*c-a*l)-n*(s*c-a*o)+i*(s*l-r*o)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],a=t[5],o=t[6],l=t[7],c=t[8],d=t[9],h=t[10],u=t[11],f=t[12],g=t[13],_=t[14],v=t[15],x=e*a-n*r,y=e*o-i*r,b=e*l-s*r,S=n*o-i*a,M=n*l-s*a,w=i*l-s*o,A=c*g-d*f,P=c*_-h*f,C=c*v-u*f,U=d*_-h*g,B=d*v-u*g,E=h*v-u*_,D=x*E-y*B+b*U+S*C-M*P+w*A;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/D;return t[0]=(a*E-o*B+l*U)*R,t[1]=(i*B-n*E-s*U)*R,t[2]=(g*w-_*M+v*S)*R,t[3]=(h*M-d*w-u*S)*R,t[4]=(o*C-r*E-l*P)*R,t[5]=(e*E-i*C+s*P)*R,t[6]=(_*b-f*w-v*y)*R,t[7]=(c*w-h*b+u*y)*R,t[8]=(r*B-a*C+l*A)*R,t[9]=(n*C-e*B-s*A)*R,t[10]=(f*M-g*b+v*x)*R,t[11]=(d*b-c*M-u*x)*R,t[12]=(a*P-r*U-o*A)*R,t[13]=(e*U-n*P+i*A)*R,t[14]=(g*y-f*S-_*x)*R,t[15]=(c*S-d*y+h*x)*R,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,a=t.y,o=t.z,l=s*r,c=s*a;return this.set(l*r+n,l*a-i*o,l*o+i*a,0,l*a+i*o,c*a+n,c*o-i*r,0,l*o-i*a,c*o+i*r,s*o*o+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,r=e._y,a=e._z,o=e._w,l=s+s,c=r+r,d=a+a,h=s*l,u=s*c,f=s*d,g=r*c,_=r*d,v=a*d,x=o*l,y=o*c,b=o*d,S=n.x,M=n.y,w=n.z;return i[0]=(1-(g+v))*S,i[1]=(u+b)*S,i[2]=(f-y)*S,i[3]=0,i[4]=(u-b)*M,i[5]=(1-(h+v))*M,i[6]=(_+x)*M,i[7]=0,i[8]=(f+y)*w,i[9]=(_-x)*w,i[10]=(1-(h+g))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let r=be.set(i[0],i[1],i[2]).length(),a=be.set(i[4],i[5],i[6]).length(),o=be.set(i[8],i[9],i[10]).length();s<0&&(r=-r),Dt.copy(this);let l=1/r,c=1/a,d=1/o;return Dt.elements[0]*=l,Dt.elements[1]*=l,Dt.elements[2]*=l,Dt.elements[4]*=c,Dt.elements[5]*=c,Dt.elements[6]*=c,Dt.elements[8]*=d,Dt.elements[9]*=d,Dt.elements[10]*=d,e.setFromRotationMatrix(Dt),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,s,r,a=Ye,o=!1){let l=this.elements,c=2*s/(e-t),d=2*s/(n-i),h=(e+t)/(e-t),u=(n+i)/(n-i),f,g;if(o)f=s/(r-s),g=r*s/(r-s);else if(a===Ye)f=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(a===Yi)f=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,r,a=Ye,o=!1){let l=this.elements,c=2/(e-t),d=2/(n-i),h=-(e+t)/(e-t),u=-(n+i)/(n-i),f,g;if(o)f=1/(r-s),g=r/(r-s);else if(a===Ye)f=-2/(r-s),g=-(r+s)/(r-s);else if(a===Yi)f=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=u,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},be=new N,Dt=new Vt,el=new N(0,0,0),nl=new N(1,1,1),ee=new N,wn=new N,wt=new N,Ws=new Vt,qs=new xt,Ze=class p{constructor(t=0,e=0,n=0,i=p.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],r=i[4],a=i[8],o=i[1],l=i[5],c=i[9],d=i[2],h=i[6],u=i[10];switch(e){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,u),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,u),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(o,s));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,u),this._z=Math.atan2(o,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-nt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-c,u),this._y=0);break;default:ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ws.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ws,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return qs.setFromEuler(this),this.setFromQuaternion(qs,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ze.DEFAULT_ORDER="XYZ";var Bn=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},il=0,Xs=new N,Me=new xt,Xt=new Vt,An=new N,Ge=new N,sl=new N,rl=new xt,Ys=new N(1,0,0),$s=new N(0,1,0),Zs=new N(0,0,1),Js={type:"added"},ol={type:"removed"},we={type:"childadded",child:null},Ai={type:"childremoved",child:null},me=class p extends pe{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:il++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=p.DEFAULT_UP.clone();let t=new N,e=new Ze,n=new xt,i=new N(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Vt},normalMatrix:{value:new Z}}),this.matrix=new Vt,this.matrixWorld=new Vt,this.matrixAutoUpdate=p.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=p.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Me.setFromAxisAngle(t,e),this.quaternion.multiply(Me),this}rotateOnWorldAxis(t,e){return Me.setFromAxisAngle(t,e),this.quaternion.premultiply(Me),this}rotateX(t){return this.rotateOnAxis(Ys,t)}rotateY(t){return this.rotateOnAxis($s,t)}rotateZ(t){return this.rotateOnAxis(Zs,t)}translateOnAxis(t,e){return Xs.copy(t).applyQuaternion(this.quaternion),this.position.add(Xs.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ys,t)}translateY(t){return this.translateOnAxis($s,t)}translateZ(t){return this.translateOnAxis(Zs,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xt.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?An.copy(t):An.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ge.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xt.lookAt(Ge,An,this.up):Xt.lookAt(An,Ge,this.up),this.quaternion.setFromRotationMatrix(Xt),i&&(Xt.extractRotation(i.matrixWorld),Me.setFromRotationMatrix(Xt),this.quaternion.premultiply(Me.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(at("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Js),we.child=t,this.dispatchEvent(we),we.child=null):at("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ol),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xt.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xt.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xt),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Js),we.child=t,this.dispatchEvent(we),we.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ge,t,sl),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ge,rl,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*i,s[13]+=n-s[1]*e-s[5]*n-s[9]*i,s[14]+=i-s[2]*e-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,o){return a[o.uuid]===void 0&&(a[o.uuid]=o.toJSON(t)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let o=a.shapes;if(Array.isArray(o))for(let l=0,c=o.length;l<c;l++){let d=o[l];s(t.shapes,d)}else s(t.shapes,o)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let o=0,l=this.material.length;o<l;o++)a.push(s(t.materials,this.material[o]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let o=this.animations[a];i.animations.push(s(t.animations,o))}}if(e){let a=r(t.geometries),o=r(t.materials),l=r(t.textures),c=r(t.images),d=r(t.shapes),h=r(t.skeletons),u=r(t.animations),f=r(t.nodes);a.length>0&&(n.geometries=a),o.length>0&&(n.materials=o),l.length>0&&(n.textures=l),c.length>0&&(n.images=c),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),u.length>0&&(n.animations=u),f.length>0&&(n.nodes=f)}return n.object=i,n;function r(a){let o=[];for(let l in a){let c=a[l];delete c.metadata,o.push(c)}return o}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};me.DEFAULT_UP=new N(0,1,0);me.DEFAULT_MATRIX_AUTO_UPDATE=!0;me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ne={h:0,s:0,l:0},En={h:0,s:0,l:0};function Ei(p,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?p+(t-p)*6*e:e<1/2?t:e<2/3?p+(t-p)*6*(2/3-e):p}var pt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Lt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Pt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Pt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Pt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Pt.workingColorSpace){if(t=ja(t,1),e=nt(e,0,1),n=nt(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=Ei(r,s,t+1/3),this.g=Ei(r,s,t),this.b=Ei(r,s,t-1/3)}return Pt.colorSpaceToWorking(this,i),this}setStyle(t,e=Lt){function n(s){s!==void 0&&parseFloat(s)<1&&ft("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:ft("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Lt){let n=fr[t.toLowerCase()];return n!==void 0?this.setHex(n,e):ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$t(t.r),this.g=$t(t.g),this.b=$t(t.b),this}copyLinearToSRGB(t){return this.r=Pe(t.r),this.g=Pe(t.g),this.b=Pe(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Lt){return Pt.workingToColorSpace(gt.copy(this),t),Math.round(nt(gt.r*255,0,255))*65536+Math.round(nt(gt.g*255,0,255))*256+Math.round(nt(gt.b*255,0,255))}getHexString(t=Lt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Pt.workingColorSpace){Pt.workingToColorSpace(gt.copy(this),e);let n=gt.r,i=gt.g,s=gt.b,r=Math.max(n,i,s),a=Math.min(n,i,s),o,l,c=(a+r)/2;if(a===r)o=0,l=0;else{let d=r-a;switch(l=c<=.5?d/(r+a):d/(2-r-a),r){case n:o=(i-s)/d+(i<s?6:0);break;case i:o=(s-n)/d+2;break;case s:o=(n-i)/d+4;break}o/=6}return t.h=o,t.s=l,t.l=c,t}getRGB(t,e=Pt.workingColorSpace){return Pt.workingToColorSpace(gt.copy(this),e),t.r=gt.r,t.g=gt.g,t.b=gt.b,t}getStyle(t=Lt){Pt.workingToColorSpace(gt.copy(this),t);let e=gt.r,n=gt.g,i=gt.b;return t!==Lt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ne),this.setHSL(ne.h+t,ne.s+e,ne.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ne),t.getHSL(En);let n=yi(ne.h,En.h,e),i=yi(ne.s,En.s,e),s=yi(ne.l,En.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gt=new pt;pt.NAMES=fr;var re=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ft.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ft.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ft.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=s.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,Ft):Ft.fromBufferAttribute(s,r),Ft.applyMatrix4(t.matrixWorld),this.expandByPoint(Ft);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Tn.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tn.copy(n.boundingBox)),Tn.applyMatrix4(t.matrixWorld),this.union(Tn)}let i=t.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ft),Ft.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(He),Cn.subVectors(this.max,He),Ae.subVectors(t.a,He),Ee.subVectors(t.b,He),Te.subVectors(t.c,He),ie.subVectors(Ee,Ae),se.subVectors(Te,Ee),de.subVectors(Ae,Te);let e=[0,-ie.z,ie.y,0,-se.z,se.y,0,-de.z,de.y,ie.z,0,-ie.x,se.z,0,-se.x,de.z,0,-de.x,-ie.y,ie.x,0,-se.y,se.x,0,-de.y,de.x,0];return!Ti(e,Ae,Ee,Te,Cn)||(e=[1,0,0,0,1,0,0,0,1],!Ti(e,Ae,Ee,Te,Cn))?!1:(Rn.crossVectors(ie,se),e=[Rn.x,Rn.y,Rn.z],Ti(e,Ae,Ee,Te,Cn))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ft).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ft).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yt),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Yt=[new N,new N,new N,new N,new N,new N,new N,new N],Ft=new N,Tn=new re,Ae=new N,Ee=new N,Te=new N,ie=new N,se=new N,de=new N,He=new N,Cn=new N,Rn=new N,fe=new N;function Ti(p,t,e,n,i){for(let s=0,r=p.length-3;s<=r;s+=3){fe.fromArray(p,s);let a=i.x*Math.abs(fe.x)+i.y*Math.abs(fe.y)+i.z*Math.abs(fe.z),o=t.dot(fe),l=e.dot(fe),c=n.dot(fe);if(Math.max(-Math.max(o,l,c),Math.min(o,l,c))>a)return!1}return!0}var ct=new N,In=new ut,al=0,Zt=class extends pe{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:al++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ur,this.updateRanges=[],this.gpuType=cr,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)In.fromBufferAttribute(this,e),In.applyMatrix3(t),this.setXY(e,In.x,In.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ct.fromBufferAttribute(this,e),ct.applyMatrix3(t),this.setXYZ(e,ct.x,ct.y,ct.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ct.fromBufferAttribute(this,e),ct.applyMatrix4(t),this.setXYZ(e,ct.x,ct.y,ct.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ct.fromBufferAttribute(this,e),ct.applyNormalMatrix(t),this.setXYZ(e,ct.x,ct.y,ct.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ct.fromBufferAttribute(this,e),ct.transformDirection(t),this.setXYZ(e,ct.x,ct.y,ct.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ke(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=bt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ke(e,this.array)),e}setX(t,e){return this.normalized&&(e=bt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ke(e,this.array)),e}setY(t,e){return this.normalized&&(e=bt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ke(e,this.array)),e}setZ(t,e){return this.normalized&&(e=bt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ke(e,this.array)),e}setW(t,e){return this.normalized&&(e=bt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=bt(e,this.array),n=bt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=bt(e,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=bt(e,this.array),n=bt(n,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var On=class extends Zt{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var zn=class extends Zt{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Et=class extends Zt{constructor(t,e,n){super(new Float32Array(t),e,n)}},ll=new re,We=new N,Ci=new N,Vn=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ll.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;We.subVectors(t,this.center);let e=We.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(We,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ci.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(We.copy(t.center).add(Ci)),this.expandByPoint(We.copy(t.center).sub(Ci))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},cl=0,It=new Vt,Ri=new me,Ce=new N,At=new re,qe=new re,dt=new N,Ne=class p extends pe{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cl++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ya(t)?zn:On)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Z().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return It.makeRotationFromQuaternion(t),this.applyMatrix4(It),this}rotateX(t){return It.makeRotationX(t),this.applyMatrix4(It),this}rotateY(t){return It.makeRotationY(t),this.applyMatrix4(It),this}rotateZ(t){return It.makeRotationZ(t),this.applyMatrix4(It),this}translate(t,e,n){return It.makeTranslation(t,e,n),this.applyMatrix4(It),this}scale(t,e,n){return It.makeScale(t,e,n),this.applyMatrix4(It),this}lookAt(t){return Ri.lookAt(t),Ri.updateMatrix(),this.applyMatrix4(Ri.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ce).negate(),this.translate(Ce.x,Ce.y,Ce.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Et(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new re);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){at("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];At.setFromBufferAttribute(s),this.morphTargetsRelative?(dt.addVectors(this.boundingBox.min,At.min),this.boundingBox.expandByPoint(dt),dt.addVectors(this.boundingBox.max,At.max),this.boundingBox.expandByPoint(dt)):(this.boundingBox.expandByPoint(At.min),this.boundingBox.expandByPoint(At.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&at('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Vn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){at("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(At.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){let a=e[s];qe.setFromBufferAttribute(a),this.morphTargetsRelative?(dt.addVectors(At.min,qe.min),At.expandByPoint(dt),dt.addVectors(At.max,qe.max),At.expandByPoint(dt)):(At.expandByPoint(qe.min),At.expandByPoint(qe.max))}At.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)dt.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(dt));if(e)for(let s=0,r=e.length;s<r;s++){let a=e[s],o=this.morphTargetsRelative;for(let l=0,c=a.count;l<c;l++)dt.fromBufferAttribute(a,l),o&&(Ce.fromBufferAttribute(t,l),dt.add(Ce)),i=Math.max(i,n.distanceToSquared(dt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&at('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){at("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==n.count)&&(r=new Zt(new Float32Array(4*n.count),4),this.setAttribute("tangent",r));let a=[],o=[];for(let A=0;A<n.count;A++)a[A]=new N,o[A]=new N;let l=new N,c=new N,d=new N,h=new ut,u=new ut,f=new ut,g=new N,_=new N;function v(A,P,C){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,P),d.fromBufferAttribute(n,C),h.fromBufferAttribute(s,A),u.fromBufferAttribute(s,P),f.fromBufferAttribute(s,C),c.sub(l),d.sub(l),u.sub(h),f.sub(h);let U=1/(u.x*f.y-f.x*u.y);isFinite(U)&&(g.copy(c).multiplyScalar(f.y).addScaledVector(d,-u.y).multiplyScalar(U),_.copy(d).multiplyScalar(u.x).addScaledVector(c,-f.x).multiplyScalar(U),a[A].add(g),a[P].add(g),a[C].add(g),o[A].add(_),o[P].add(_),o[C].add(_))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let A=0,P=x.length;A<P;++A){let C=x[A],U=C.start,B=C.count;for(let E=U,D=U+B;E<D;E+=3)v(t.getX(E+0),t.getX(E+1),t.getX(E+2))}let y=new N,b=new N,S=new N,M=new N;function w(A){S.fromBufferAttribute(i,A),M.copy(S);let P=a[A];y.copy(P),y.sub(S.multiplyScalar(S.dot(P))).normalize(),b.crossVectors(M,P);let U=b.dot(o[A])<0?-1:1;r.setXYZW(A,y.x,y.y,y.z,U)}for(let A=0,P=x.length;A<P;++A){let C=x[A],U=C.start,B=C.count;for(let E=U,D=U+B;E<D;E+=3)w(t.getX(E+0)),w(t.getX(E+1)),w(t.getX(E+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Zt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,u=n.count;h<u;h++)n.setXYZ(h,0,0,0);let i=new N,s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,d=new N;if(t)for(let h=0,u=t.count;h<u;h+=3){let f=t.getX(h+0),g=t.getX(h+1),_=t.getX(h+2);i.fromBufferAttribute(e,f),s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),c.subVectors(r,s),d.subVectors(i,s),c.cross(d),a.fromBufferAttribute(n,f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),a.add(c),o.add(c),l.add(c),n.setXYZ(f,a.x,a.y,a.z),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z)}else for(let h=0,u=e.count;h<u;h+=3)i.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),c.subVectors(r,s),d.subVectors(i,s),c.cross(d),n.setXYZ(h+0,c.x,c.y,c.z),n.setXYZ(h+1,c.x,c.y,c.z),n.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)dt.fromBufferAttribute(t,e),dt.normalize(),t.setXYZ(e,dt.x,dt.y,dt.z)}toNonIndexed(){function t(a,o){let l=a.array,c=a.itemSize,d=a.normalized,h=new l.constructor(o.length*c),u=0,f=0;for(let g=0,_=o.length;g<_;g++){a.isInterleavedBufferAttribute?u=o[g]*a.data.stride+a.offset:u=o[g]*c;for(let v=0;v<c;v++)h[f++]=l[u++]}return new Zt(h,c,d)}if(this.index===null)return ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new p,n=this.index.array,i=this.attributes;for(let a in i){let o=i[a],l=t(o,n);e.setAttribute(a,l)}let s=this.morphAttributes;for(let a in s){let o=[],l=s[a];for(let c=0,d=l.length;c<d;c++){let h=l[c],u=t(h,n);o.push(u)}e.morphAttributes[a]=o}e.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let a=0,o=r.length;a<o;a++){let l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let o=this.parameters;for(let l in o)o[l]!==void 0&&(t[l]=o[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let o in n){let l=n[o];t.data.attributes[o]=l.toJSON(t.data)}let i={},s=!1;for(let o in this.morphAttributes){let l=this.morphAttributes[o],c=[];for(let d=0,h=l.length;d<h;d++){let u=l[d];c.push(u.toJSON(t.data))}c.length>0&&(i[o]=c,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let l in i){let c=i[l];this.setAttribute(l,c.clone(e))}let s=t.morphAttributes;for(let l in s){let c=[],d=s[l];for(let h=0,u=d.length;h<u;h++)c.push(d[h].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let l=0,c=r.length;l<c;l++){let d=r[l];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let o=t.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Je=class p extends Ne{constructor(t=1,e=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let a=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let o=[],l=[],c=[],d=[],h=0,u=0;f("z","y","x",-1,-1,n,e,t,r,s,0),f("z","y","x",1,-1,n,e,-t,r,s,1),f("x","z","y",1,1,t,n,e,i,r,2),f("x","z","y",1,-1,t,n,-e,i,r,3),f("x","y","z",1,-1,t,e,n,i,s,4),f("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(o),this.setAttribute("position",new Et(l,3)),this.setAttribute("normal",new Et(c,3)),this.setAttribute("uv",new Et(d,2));function f(g,_,v,x,y,b,S,M,w,A,P){let C=b/w,U=S/A,B=b/2,E=S/2,D=M/2,R=w+1,L=A+1,K=0,q=0,W=new N;for(let et=0;et<L;et++){let Q=et*U-E;for(let T=0;T<R;T++){let z=T*C-B;W[g]=z*x,W[_]=Q*y,W[v]=D,l.push(W.x,W.y,W.z),W[g]=0,W[_]=0,W[v]=M>0?1:-1,c.push(W.x,W.y,W.z),d.push(T/w),d.push(1-et/A),K+=1}}for(let et=0;et<A;et++)for(let Q=0;Q<w;Q++){let T=h+Q+R*et,z=h+Q+R*(et+1),Y=h+(Q+1)+R*(et+1),O=h+(Q+1)+R*et;o.push(T,z,O),o.push(z,Y,O),q+=6}a.addGroup(u,q,P),u+=q,h+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new p(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var je=class p extends Ne{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o};let l=this;i=Math.floor(i),s=Math.floor(s);let c=[],d=[],h=[],u=[],f=0,g=[],_=n/2,v=0;x(),r===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(c),this.setAttribute("position",new Et(d,3)),this.setAttribute("normal",new Et(h,3)),this.setAttribute("uv",new Et(u,2));function x(){let b=new N,S=new N,M=0,w=(e-t)/n;for(let A=0;A<=s;A++){let P=[],C=A/s,U=C*(e-t)+t;for(let B=0;B<=i;B++){let E=B/i,D=E*o+a,R=Math.sin(D),L=Math.cos(D);S.x=U*R,S.y=-C*n+_,S.z=U*L,d.push(S.x,S.y,S.z),b.set(R,w,L).normalize(),h.push(b.x,b.y,b.z),u.push(E,1-C),P.push(f++)}g.push(P)}for(let A=0;A<i;A++)for(let P=0;P<s;P++){let C=g[P][A],U=g[P+1][A],B=g[P+1][A+1],E=g[P][A+1];(t>0||P!==0)&&(c.push(C,U,E),M+=3),(e>0||P!==s-1)&&(c.push(U,B,E),M+=3)}l.addGroup(v,M,0),v+=M}function y(b){let S=f,M=new ut,w=new N,A=0,P=b===!0?t:e,C=b===!0?1:-1;for(let B=1;B<=i;B++)d.push(0,_*C,0),h.push(0,C,0),u.push(.5,.5),f++;let U=f;for(let B=0;B<=i;B++){let D=B/i*o+a,R=Math.cos(D),L=Math.sin(D);w.x=P*L,w.y=_*C,w.z=P*R,d.push(w.x,w.y,w.z),h.push(0,C,0),M.x=R*.5+.5,M.y=L*.5*C+.5,u.push(M.x,M.y),f++}for(let B=0;B<i;B++){let E=S+B,D=U+B;b===!0?c.push(D,D+1,E):c.push(D+1,D,E),A+=3}l.addGroup(v,A,b===!0?1:2),v+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new p(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var ge=class p extends Ne{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let s=[],r=[];a(i),l(n),c(),this.setAttribute("position",new Et(s,3)),this.setAttribute("normal",new Et(s.slice(),3)),this.setAttribute("uv",new Et(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){let y=new N,b=new N,S=new N;for(let M=0;M<e.length;M+=3)u(e[M+0],y),u(e[M+1],b),u(e[M+2],S),o(y,b,S,x)}function o(x,y,b,S){let M=S+1,w=[];for(let A=0;A<=M;A++){w[A]=[];let P=x.clone().lerp(b,A/M),C=y.clone().lerp(b,A/M),U=M-A;for(let B=0;B<=U;B++)B===0&&A===M?w[A][B]=P:w[A][B]=P.clone().lerp(C,B/U)}for(let A=0;A<M;A++)for(let P=0;P<2*(M-A)-1;P++){let C=Math.floor(P/2);P%2===0?(h(w[A][C+1]),h(w[A+1][C]),h(w[A][C])):(h(w[A][C+1]),h(w[A+1][C+1]),h(w[A+1][C]))}}function l(x){let y=new N;for(let b=0;b<s.length;b+=3)y.x=s[b+0],y.y=s[b+1],y.z=s[b+2],y.normalize().multiplyScalar(x),s[b+0]=y.x,s[b+1]=y.y,s[b+2]=y.z}function c(){let x=new N;for(let y=0;y<s.length;y+=3){x.x=s[y+0],x.y=s[y+1],x.z=s[y+2];let b=_(x)/2/Math.PI+.5,S=v(x)/Math.PI+.5;r.push(b,1-S)}f(),d()}function d(){for(let x=0;x<r.length;x+=6){let y=r[x+0],b=r[x+2],S=r[x+4],M=Math.max(y,b,S),w=Math.min(y,b,S);M>.9&&w<.1&&(y<.2&&(r[x+0]+=1),b<.2&&(r[x+2]+=1),S<.2&&(r[x+4]+=1))}}function h(x){s.push(x.x,x.y,x.z)}function u(x,y){let b=x*3;y.x=t[b+0],y.y=t[b+1],y.z=t[b+2]}function f(){let x=new N,y=new N,b=new N,S=new N,M=new ut,w=new ut,A=new ut;for(let P=0,C=0;P<s.length;P+=9,C+=6){x.set(s[P+0],s[P+1],s[P+2]),y.set(s[P+3],s[P+4],s[P+5]),b.set(s[P+6],s[P+7],s[P+8]),M.set(r[C+0],r[C+1]),w.set(r[C+2],r[C+3]),A.set(r[C+4],r[C+5]),S.copy(x).add(y).add(b).divideScalar(3);let U=_(S);g(M,C+0,x,U),g(w,C+2,y,U),g(A,C+4,b,U)}}function g(x,y,b,S){S<0&&x.x===1&&(r[y]=x.x-1),b.x===0&&b.z===0&&(r[y]=S/2/Math.PI+.5)}function _(x){return Math.atan2(x.z,-x.x)}function v(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new p(t.vertices,t.indices,t.radius,t.detail)}},Ke=class p extends ge{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new p(t.radius,t.detail)}};var Qe=class p extends ge{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new p(t.radius,t.detail)}};var tn=class p extends ge{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new p(t.radius,t.detail)}};var en=class p extends ge{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new p(t.radius,t.detail)}};function pr(p){let t={};for(let e in p){t[e]={};for(let n in p[e]){let i=p[e][n];if(js(i))i.isRenderTargetTexture?(ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(js(i[0])){let s=[];for(let r=0,a=i.length;r<a;r++)s[r]=i[r].clone();t[e][n]=s}else t[e][n]=i.slice();else t[e][n]=i}}return t}function yt(p){let t={};for(let e=0;e<p.length;e++){let n=pr(p[e]);for(let i in n)t[i]=n[i]}return t}function js(p){return p&&(p.isColor||p.isMatrix3||p.isMatrix4||p.isVector2||p.isVector3||p.isVector4||p.isTexture||p.isQuaternion)}function Re(p,t){return!p||p.constructor===t?p:typeof t.BYTES_PER_ELEMENT=="number"?new t(p):Array.prototype.slice.call(p)}function Ii(p){return p!==void 0&&p.inTangents!==void 0&&p.outTangents!==void 0}var oe=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let r;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break t}r=e.length;break e}if(!(t>=s)){let a=e[1];t<a&&(n=2,s=a);for(let o=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===o)break;if(i=s,s=e[--n-1],t>=s)break t}r=n,n=0;break e}break n}for(;n<r;){let a=n+r>>>1;t<e[a]?r=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let r=0;r!==i;++r)e[r]=n[s+r];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},kn=class extends oe{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gi,endingEnd:Gi}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,r=t+1,a=i[s],o=i[r];if(a===void 0)switch(this.getSettings_().endingStart){case Hi:s=t,a=2*e-n;break;case Wi:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(o===void 0)switch(this.getSettings_().endingEnd){case Hi:r=t,o=2*n-e;break;case Wi:r=1,o=n+i[1]-i[0];break;default:r=t-1,o=e}let l=(n-e)*.5,c=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(o-n),this._offsetPrev=s*c,this._offsetNext=r*c}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=t*a,l=o-a,c=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,u=this._weightNext,f=(n-e)/(i-e),g=f*f,_=g*f,v=-h*_+2*h*g-h*f,x=(1+h)*_+(-1.5-2*h)*g+(-.5+h)*f+1,y=(-1-u)*_+(1.5+u)*g+.5*f,b=u*_-u*g;for(let S=0;S!==a;++S)s[S]=v*r[c+S]+x*r[l+S]+y*r[o+S]+b*r[d+S];return s}},Gn=class extends oe{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=t*a,l=o-a,c=(n-e)/(i-e),d=1-c;for(let h=0;h!==a;++h)s[h]=r[l+h]*d+r[o+h]*c;return s}},Hn=class extends oe{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Wn=class extends oe{interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=t*a,l=o-a,c=this.inTangents,d=this.outTangents;if(!c||!d){let f=(n-e)/(i-e),g=1-f;for(let _=0;_!==a;++_)s[_]=r[l+_]*g+r[o+_]*f;return s}let h=a*2,u=t-1;for(let f=0;f!==a;++f){let g=r[l+f],_=r[o+f],v=u*h+f*2,x=d[v],y=d[v+1],b=t*h+f*2,S=c[b],M=c[b+1],w=ul(n,e,x,S,i);s[f]=mr(w,g,y,M,_)}return s}};function mr(p,t,e,n,i){let s=1-p;return s*s*s*t+3*s*s*p*e+3*s*p*p*n+p*p*p*i}function hl(p,t,e,n,i){let s=1-p;return 3*s*s*(e-t)+6*s*p*(n-e)+3*p*p*(i-n)}function ul(p,t,e,n,i){let s=(p-t)/(i-t);for(let r=0;r<8;r++){let a=mr(s,t,e,n,i)-p;if(Math.abs(a)<1e-10)break;let o=hl(s,t,e,n,i);if(Math.abs(o)<1e-10)break;s=Math.max(0,Math.min(1,s-a/o))}return s}var Tt=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Re(e,this.TimeBufferType),this.values=Re(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Re(t.times,Array),values:Re(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Ii(t.settings)&&(n.settings={inTangents:Re(t.settings.inTangents,Array),outTangents:Re(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Hn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Gn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new kn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Wn(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case $e:e=this.InterpolantFactoryMethodDiscrete;break;case Nn:e=this.InterpolantFactoryMethodLinear;break;case Pn:e=this.InterpolantFactoryMethodSmooth;break;case ki:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ft("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $e;case this.InterpolantFactoryMethodLinear:return Nn;case this.InterpolantFactoryMethodSmooth:return Pn;case this.InterpolantFactoryMethodBezier:return ki}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Ii(this.settings)&&(Ks(this.settings.inTangents,t),Ks(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<t;)++s;for(;r!==-1&&n[r]>e;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let a=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*a,r*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(at("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(at("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let a=0;a!==s;a++){let o=n[a];if(typeof o=="number"&&isNaN(o)){at("KeyframeTrack: Time is not a valid number.",this,a,o),t=!1;break}if(r!==null&&r>o){at("KeyframeTrack: Out of order keys.",this,a,o,r),t=!1;break}r=o}if(i!==void 0&&$a(i))for(let a=0,o=i.length;a!==o;++a){let l=i[a];if(isNaN(l)){at("KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Pn,s=t.length-1,r=1;for(let a=1;a<s;++a){let o=!1,l=t[a],c=t[a+1];if(l!==c&&(a!==1||l!==t[0]))if(i)o=!0;else{let d=a*n,h=d-n,u=d+n;for(let f=0;f!==n;++f){let g=e[d+f];if(g!==e[h+f]||g!==e[u+f]){o=!0;break}}}if(o){if(a!==r){t[r]=t[a];let d=a*n,h=r*n;for(let u=0;u!==n;++u)e[h+u]=e[d+u]}++r}}if(s>0){t[r]=t[s];for(let a=s*n,o=r*n,l=0;l!==n;++l)e[o+l]=e[a+l];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=e.slice(0,r*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Ii(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Ks(p,t){for(let e=0,n=p.length;e!==n;e+=2)p[e]*=t}Tt.prototype.ValueTypeName="";Tt.prototype.TimeBufferType=Float32Array;Tt.prototype.ValueBufferType=Float32Array;Tt.prototype.DefaultInterpolation=Nn;var ae=class extends Tt{constructor(t,e,n){super(t,e,n)}};ae.prototype.ValueTypeName="bool";ae.prototype.ValueBufferType=Array;ae.prototype.DefaultInterpolation=$e;ae.prototype.InterpolantFactoryMethodLinear=void 0;ae.prototype.InterpolantFactoryMethodSmooth=void 0;var qn=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}};qn.prototype.ValueTypeName="color";var Xn=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}};Xn.prototype.ValueTypeName="number";var Yn=class extends oe{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,a=this.valueSize,o=(n-e)/(i-e),l=t*a;for(let c=l+a;l!==c;l+=4)xt.slerpFlat(s,0,r,l-a,r,l,o);return s}},nn=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Yn(this.times,this.values,this.getValueSize(),t)}};nn.prototype.ValueTypeName="quaternion";nn.prototype.InterpolantFactoryMethodSmooth=void 0;var le=class extends Tt{constructor(t,e,n){super(t,e,n)}};le.prototype.ValueTypeName="string";le.prototype.ValueBufferType=Array;le.prototype.DefaultInterpolation=$e;le.prototype.InterpolantFactoryMethodLinear=void 0;le.prototype.InterpolantFactoryMethodSmooth=void 0;var $n=class extends Tt{constructor(t,e,n,i){super(t,e,n,i)}};$n.prototype.ValueTypeName="vector";var Zn=class{constructor(t,e,n){let i=this,s=!1,r=0,a=0,o,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(c){a++,s===!1&&i.onStart!==void 0&&i.onStart(c,r,a),s=!0},this.itemEnd=function(c){r++,i.onProgress!==void 0&&i.onProgress(c,r,a),r===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(c){i.onError!==void 0&&i.onError(c)},this.resolveURL=function(c){return c=c.normalize("NFC"),o?o(c):c},this.setURLModifier=function(c){return o=c,this},this.addHandler=function(c,d){return l.push(c,d),this},this.removeHandler=function(c){let d=l.indexOf(c);return d!==-1&&l.splice(d,2),this},this.getHandler=function(c){for(let d=0,h=l.length;d<h;d+=2){let u=l[d],f=l[d+1];if(u.global&&(u.lastIndex=0),u.test(c))return f}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},gr=new Zn,Jn=class{constructor(t){this.manager=t!==void 0?t:gr,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Jn.DEFAULT_MATERIAL_NAME="__DEFAULT";var ls="\\[\\]\\.:\\/",dl=new RegExp("["+ls+"]","g"),cs="[^"+ls+"]",fl="[^"+ls.replace("\\.","")+"]",pl=/((?:WC+[\/:])*)/.source.replace("WC",cs),ml=/(WCOD+)?/.source.replace("WCOD",fl),gl=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cs),xl=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cs),_l=new RegExp("^"+pl+ml+gl+xl+"$"),vl=["material","materials","bones","map"],Ji=class{constructor(t,e,n){let i=n||ot.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ot=class p{constructor(t,e,n){this.path=e,this.parsedPath=n||p.parseTrackName(e),this.node=p.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new p.Composite(t,e,n):new p(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(dl,"")}static parseTrackName(t){let e=_l.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);vl.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let r=0;r<s.length;r++){let a=s[r];if(a.name===e||a.uuid===e)return a;let o=n(a.children);if(o)return o}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=p.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){ft("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){at("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){at("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){at("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let c=0;c<t.length;c++)if(t[c].name===l){l=c;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){at("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){at("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){at("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){at("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let r=t[i];if(r===void 0){let l=e.nodeName;at("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let o=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){at("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){at("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}o=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(o=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(o=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[o],this.setValue=this.SetterByBindingTypeAndVersioning[o][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ot.Composite=Ji;ot.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ot.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ot.prototype.GetterByBindingType=[ot.prototype._getValue_direct,ot.prototype._getValue_array,ot.prototype._getValue_arrayElement,ot.prototype._getValue_toArray];ot.prototype.SetterByBindingTypeAndVersioning=[[ot.prototype._setValue_direct,ot.prototype._setValue_direct_setNeedsUpdate,ot.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_array,ot.prototype._setValue_array_setNeedsUpdate,ot.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_arrayElement,ot.prototype._setValue_arrayElement_setNeedsUpdate,ot.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ot.prototype._setValue_fromArray,ot.prototype._setValue_fromArray_setNeedsUpdate,ot.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Cd=new Float32Array(1);var ji=class p{static{p.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");var yl=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sl=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,bl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ml=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Al=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,El=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Tl=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Cl=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Rl=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Il=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ll=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Nl=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dl=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Fl=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Ul=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Bl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ol=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Gl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Hl=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wl=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ql=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Xl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yl=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$l=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zl=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jl="gl_FragColor = linearToOutputTexel( gl_FragColor );",jl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Kl=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ql=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,tc=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ec=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ic=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,oc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ac=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hc=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,dc=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,fc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pc=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gc=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_c=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,vc=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,yc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sc=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bc=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Mc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,wc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ac=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ec=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tc=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cc=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Rc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ic=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lc=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Nc=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Dc=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uc=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bc=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Oc=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zc=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gc=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Hc=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wc=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qc=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Xc=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Yc=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$c=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zc=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Jc=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jc=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qc=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,th=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,eh=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ih=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,oh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ah=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ch=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ph=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_h=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,vh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sh=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mh=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ah=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Th=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ch=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Rh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ih=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ph=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Uh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bh=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vh=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xh=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$h=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Zh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jh=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kh=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:yl,alphahash_pars_fragment:Sl,alphamap_fragment:bl,alphamap_pars_fragment:Ml,alphatest_fragment:wl,alphatest_pars_fragment:Al,aomap_fragment:El,aomap_pars_fragment:Tl,batching_pars_vertex:Cl,batching_vertex:Rl,begin_vertex:Il,beginnormal_vertex:Pl,bsdfs:Ll,iridescence_fragment:Nl,bumpmap_pars_fragment:Dl,clipping_planes_fragment:Fl,clipping_planes_pars_fragment:Ul,clipping_planes_pars_vertex:Bl,clipping_planes_vertex:Ol,color_fragment:zl,color_pars_fragment:Vl,color_pars_vertex:kl,color_vertex:Gl,common:Hl,cube_uv_reflection_fragment:Wl,defaultnormal_vertex:ql,displacementmap_pars_vertex:Xl,displacementmap_vertex:Yl,emissivemap_fragment:$l,emissivemap_pars_fragment:Zl,colorspace_fragment:Jl,colorspace_pars_fragment:jl,envmap_fragment:Kl,envmap_common_pars_fragment:Ql,envmap_pars_fragment:tc,envmap_pars_vertex:ec,envmap_physical_pars_fragment:dc,envmap_vertex:nc,fog_vertex:ic,fog_pars_vertex:sc,fog_fragment:rc,fog_pars_fragment:oc,gradientmap_pars_fragment:ac,lightmap_pars_fragment:lc,lights_lambert_fragment:cc,lights_lambert_pars_fragment:hc,lights_pars_begin:uc,lights_toon_fragment:fc,lights_toon_pars_fragment:pc,lights_phong_fragment:mc,lights_phong_pars_fragment:gc,lights_physical_fragment:xc,lights_physical_pars_fragment:_c,lights_fragment_begin:vc,lights_fragment_maps:yc,lights_fragment_end:Sc,lightprobes_pars_fragment:bc,logdepthbuf_fragment:Mc,logdepthbuf_pars_fragment:wc,logdepthbuf_pars_vertex:Ac,logdepthbuf_vertex:Ec,map_fragment:Tc,map_pars_fragment:Cc,map_particle_fragment:Rc,map_particle_pars_fragment:Ic,metalnessmap_fragment:Pc,metalnessmap_pars_fragment:Lc,morphinstance_vertex:Nc,morphcolor_vertex:Dc,morphnormal_vertex:Fc,morphtarget_pars_vertex:Uc,morphtarget_vertex:Bc,normal_fragment_begin:Oc,normal_fragment_maps:zc,normal_pars_fragment:Vc,normal_pars_vertex:kc,normal_vertex:Gc,normalmap_pars_fragment:Hc,clearcoat_normal_fragment_begin:Wc,clearcoat_normal_fragment_maps:qc,clearcoat_pars_fragment:Xc,iridescence_pars_fragment:Yc,opaque_fragment:$c,packing:Zc,premultiplied_alpha_fragment:Jc,project_vertex:jc,dithering_fragment:Kc,dithering_pars_fragment:Qc,roughnessmap_fragment:th,roughnessmap_pars_fragment:eh,shadowmap_pars_fragment:nh,shadowmap_pars_vertex:ih,shadowmap_vertex:sh,shadowmask_pars_fragment:rh,skinbase_vertex:oh,skinning_pars_vertex:ah,skinning_vertex:lh,skinnormal_vertex:ch,specularmap_fragment:hh,specularmap_pars_fragment:uh,tonemapping_fragment:dh,tonemapping_pars_fragment:fh,transmission_fragment:ph,transmission_pars_fragment:mh,uv_pars_fragment:gh,uv_pars_vertex:xh,uv_vertex:_h,worldpos_vertex:vh,background_vert:yh,background_frag:Sh,backgroundCube_vert:bh,backgroundCube_frag:Mh,cube_vert:wh,cube_frag:Ah,depth_vert:Eh,depth_frag:Th,distance_vert:Ch,distance_frag:Rh,equirect_vert:Ih,equirect_frag:Ph,linedashed_vert:Lh,linedashed_frag:Nh,meshbasic_vert:Dh,meshbasic_frag:Fh,meshlambert_vert:Uh,meshlambert_frag:Bh,meshmatcap_vert:Oh,meshmatcap_frag:zh,meshnormal_vert:Vh,meshnormal_frag:kh,meshphong_vert:Gh,meshphong_frag:Hh,meshphysical_vert:Wh,meshphysical_frag:qh,meshtoon_vert:Xh,meshtoon_frag:Yh,points_vert:$h,points_frag:Zh,shadow_vert:Jh,shadow_frag:jh,sprite_vert:Kh,sprite_frag:Qh},V={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Z},alphaMap:{value:null},alphaMapTransform:{value:new Z},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Z}},envmap:{envMap:{value:null},envMapRotation:{value:new Z},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Z}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Z}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Z},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Z},normalScale:{value:new ut(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Z},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Z}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Z}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Z}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Z},alphaTest:{value:0},uvTransform:{value:new Z}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new ut(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Z},alphaMap:{value:null},alphaMapTransform:{value:new Z},alphaTest:{value:0}}},xr={basic:{uniforms:yt([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:yt([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new pt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:yt([V.common,V.specularmap,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.fog,V.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:yt([V.common,V.envmap,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.roughnessmap,V.metalnessmap,V.fog,V.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:yt([V.common,V.aomap,V.lightmap,V.emissivemap,V.bumpmap,V.normalmap,V.displacementmap,V.gradientmap,V.fog,V.lights,{emissive:{value:new pt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:yt([V.common,V.bumpmap,V.normalmap,V.displacementmap,V.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:yt([V.points,V.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:yt([V.common,V.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:yt([V.common,V.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:yt([V.common,V.bumpmap,V.normalmap,V.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:yt([V.sprite,V.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Z},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Z}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:yt([V.common,V.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:yt([V.lights,V.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};xr.physical={uniforms:yt([xr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Z},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Z},clearcoatNormalScale:{value:new ut(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Z},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Z},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Z},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Z},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Z},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Z},transmissionSamplerSize:{value:new ut},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Z},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Z},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Z},anisotropyVector:{value:new ut},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Z}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};var tu=new Z;tu.set(-1,0,0,0,1,0,0,0,1);var jx={[Ki]:"LINEAR_TONE_MAPPING",[Qi]:"REINHARD_TONE_MAPPING",[ts]:"CINEON_TONE_MAPPING",[es]:"ACES_FILMIC_TONE_MAPPING",[is]:"AGX_TONE_MAPPING",[ss]:"NEUTRAL_TONE_MAPPING",[ns]:"CUSTOM_TONE_MAPPING"};var Kx=new Float32Array(16),Qx=new Float32Array(9),t_=new Float32Array(4);var e_={[Ki]:"Linear",[Qi]:"Reinhard",[ts]:"Cineon",[es]:"ACESFilmic",[is]:"AgX",[ss]:"Neutral",[ns]:"Custom"};var n_={[Qs]:"SHADOWMAP_TYPE_PCF",[tr]:"SHADOWMAP_TYPE_VSM"};var i_={[sr]:"ENVMAP_TYPE_CUBE",[os]:"ENVMAP_TYPE_CUBE",[rr]:"ENVMAP_TYPE_CUBE_UV"};var s_={[os]:"ENVMAP_MODE_REFRACTION"};var r_={[er]:"ENVMAP_BLENDING_MULTIPLY",[nr]:"ENVMAP_BLENDING_MIX",[ir]:"ENVMAP_BLENDING_ADD"};var eu=new Z;eu.set(-1,0,0,0,1,0,0,0,1);var o_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var Kn=new Map;function Qn(p){if(Kn.has(p))return Kn.get(p);let t;if(p===4)t=new en(1);else if(p===6)t=new Je(1.25,1.25,1.25);else if(p===8)t=new tn(1);else if(p===12)t=new Ke(1);else if(p===20)t=new Qe(1);else if(p===2)t=new je(.85,.85,.22,20);else if(p===10||p===100)return nu(p);let e=t.getAttribute("position"),n=t.index,i=[];for(let a=0;a<(n?n.count:e.count);a+=3){let o=Array.from({length:3},(h,u)=>new N().fromBufferAttribute(e,n?n.getX(a+u):a+u)),l=new N().crossVectors(o[1].clone().sub(o[0]),o[2].clone().sub(o[0])).normalize(),c=l.dot(o[0]),d=i.find(h=>h.n.dot(l)>.9999&&Math.abs(h.plane-c)<.001);d||(d={n:l,plane:c,points:[]},i.push(d));for(let h of o)d.points.some(u=>u.distanceTo(h)<.001)||d.points.push(h)}let s=i.map((a,o)=>{let l=a.points.reduce((h,u)=>h.add(u),new N).multiplyScalar(1/a.points.length),c=a.points[0].clone().sub(l).normalize(),d=new N().crossVectors(a.n,c);return{normal:a.n,center:l,points:a.points.sort((h,u)=>Math.atan2(d.dot(h.clone().sub(l)),c.dot(h.clone().sub(l)))-Math.atan2(d.dot(u.clone().sub(l)),c.dot(u.clone().sub(l)))),value:o+1}}),r={faces:s,top:a=>new xt().setFromUnitVectors((p===2?s.find(o=>o.normal.y>.9):s[(a-1)%s.length]).normal,new N(0,0,1))};return Kn.set(p,r),t.dispose(),r}function nu(p){let n=[];for(let l=0;l<2;l++)for(let c=0;c<5;c++){let d=c*2*Math.PI/5+l*Math.PI/5;n.push(new N(Math.cos(d),Math.sin(d),l?-.48:.48))}let i=[Array.from({length:5},(l,c)=>c),Array.from({length:5},(l,c)=>5+c)];for(let l=0;l<5;l++){let c=(l+1)%5;i.push([l,c,5+l],[5+l,5+c,c])}let s=i.map(l=>{let c=n[l[0]],d=n[l[1]],h=n[l[2]],u=new N().crossVectors(d.clone().sub(c),h.clone().sub(c)).normalize();return u.dot(c)<0&&u.negate(),u.multiplyScalar(1/u.dot(c))}),r=1/Math.max(...s.map(l=>l.length()));s.forEach(l=>l.multiplyScalar(r));let a=n.map((l,c)=>{let d=l.clone().normalize(),h=i.flatMap((_,v)=>_.includes(c)?[s[v]]:[]),u=h.reduce((_,v)=>_.add(v),new N).multiplyScalar(1/h.length),f=h[0].clone().sub(u).normalize(),g=new N().crossVectors(d,f);return{normal:d,center:u,points:h.sort((_,v)=>Math.atan2(g.dot(_.clone().sub(u)),f.dot(_.clone().sub(u)))-Math.atan2(g.dot(v.clone().sub(u)),f.dot(v.clone().sub(u)))),value:c+1}}),o={faces:a,top:l=>new xt().setFromUnitVectors(a[(l-1)%10].normal,new N(0,0,1))};return Kn.set(p,o),o}var hs=new Map;function iu(p){let t=p===100?10:p;if(hs.has(t))return hs.get(t);let e=Qn(t),n=[],i=e.faces.map(r=>r.points.map(a=>{let o=n.findIndex(l=>Math.hypot(l.x-a.x,l.y-a.y,l.z-a.z)<1e-6);return o<0&&(o=n.length,n.push(new m(a.x,a.y,a.z))),o})),s=new Oe({vertices:n,faces:i});return hs.set(t,s),s}function _r(p,{width:t,height:e,radius:n,onImpact:i=()=>{}}){let s=new Mn({gravity:new m(0,0,-32),allowSleep:!0});s.broadphase=new mn(s),s.solver.iterations=12,s.defaultContactMaterial.friction=.38,s.defaultContactMaterial.restitution=.35;let r=new j({mass:0,shape:new Sn});s.addBody(r);let a=t/n,o=e/n;for(let[d,h,u,f]of[[0,o/2,1,o/2+2],[a,o/2,1,o/2+2],[a/2,0,a/2+2,1],[a/2,o,a/2+2,1]])s.addBody(new j({mass:0,shape:new ze(new m(u,f,10)),position:new m(d,h,8)}));let l=0,c=p.map(d=>{let h=new j({mass:1,shape:iu(d.record.sides),linearDamping:.3,angularDamping:.28,sleepTimeLimit:.25,sleepSpeedLimit:.15});return h.position.set(d.x/n,d.y/n,d.z?d.z/n/.48:1.05),h.quaternion.copy(d.q),h.fixedRotation=!0,h.updateMassProperties(),h.addEventListener("collide",u=>{let f=Math.abs(u.contact?.getImpactVelocityAlongNormal?.()||0);f>1&&Date.now()-l>45&&(l=Date.now(),i(Math.min(2,f/7)))}),s.addBody(h),h});return{world:s,bodies:c,toss(d=Math.random){for(let[h,u]of c.entries())p[h].record.held||(u.fixedRotation=!1,u.updateMassProperties(),u.wakeUp(),u.position.z=3+d()*3,u.velocity.set((d()-.5)*12,(d()-.5)*10,3+d()*5),u.angularVelocity.set((d()-.5)*25,(d()-.5)*25,(d()-.5)*25),u.quaternion.setFromEuler(d()*6,d()*6,d()*6))},step(d,h={x:0,y:0}){s.gravity.set((h.x||0)*12,(h.y||0)*12,-32),s.step(1/90,Math.min(.09,d),8)},sync(){for(let[d,h]of c.entries()){let u=p[d];u.x=h.position.x*n,u.y=h.position.y*n,u.z=h.position.z*n*.48,u.q.copy(h.quaternion)}},freeze(){for(let d of c)d.velocity.setZero(),d.angularVelocity.setZero(),d.fixedRotation=!0,d.updateMassProperties(),d.sleep()},drag(d,h,u,f=0,g=0){let _=c[d];_.position.x=Math.max(2,Math.min(a-2,h/n)),_.position.y=Math.max(2,Math.min(o-2,u/n)),_.velocity.set(f/n,g/n,0),_.wakeUp()},destroy(){for(let d of[...s.bodies])s.removeBody(d)}}}function vr(p,t,{random:e=Math.random,seconds:n=4,step:i=1/90}={}){let s=[],r=()=>s.push(t.map(o=>({x:o.x,y:o.y,z:o.z,q:o.q.clone()})));p.toss(e),p.sync(),r();for(let o=0;o<n;o+=i)p.step(i),p.sync(),r();p.freeze();let a=t.map(o=>{if(o.record.held)return o.faceOffset||0;let l=o.record.sides===100?10:o.record.sides;if(l===2)return 0;let c=o.shape.faces[0],d=-1/0;for(let u of o.shape.faces){let f=u.normal.clone().applyQuaternion(o.q).z;f>d&&(d=f,c=u)}return(((o.part==="tens"?Math.floor(o.record.face%100/10)+1:o.part==="ones"?o.record.face%10+1:o.record.face)-c.value)%l+l)%l});return{frames:s,offsets:a}}var sn=Object.freeze([2,4,6,8,10,12,20,100]),ti=Object.freeze(["sum","target","highest","lowest","drop-highest","drop-lowest","keep-highest","keep-lowest"]);function su(p,t=null){if(!sn.includes(p))throw Error("Unsupported die.");if(t){let s=t();if(!Number.isFinite(s)||s<0||s>=1)throw Error("Invalid random source.");return 1+Math.floor(s*p)}let e=2**32,n=e-e%p,i=new Uint32Array(1);do crypto.getRandomValues(i);while(i[0]>=n);return 1+i[0]%p}function ei(p,{mode:t="sum",target:e=4,modifier:n=0,keep:i=1,base:s=null,net:r=0}={}){if(!ti.includes(t)||!Number.isFinite(e)||!Number.isFinite(n))throw Error("Invalid result calculation.");let a=p.map((f,g)=>({i:g,value:f.value})).sort((f,g)=>g.value-f.value||f.i-g.i),o=p.map((f,g)=>g);s!==null?o=(r>=0?a:[...a].reverse()).slice(0,s).map(f=>f.i):t==="drop-highest"?o=a.slice(1).map(f=>f.i):t==="drop-lowest"?o=a.slice(0,-1).map(f=>f.i):t==="keep-highest"?o=a.slice(0,i).map(f=>f.i):t==="keep-lowest"&&(o=a.slice(-i).map(f=>f.i));let l=p.filter((f,g)=>o.includes(g)),c=l.reduce((f,g)=>f+g.value,0)+n,d=l.filter(f=>f.value+n>=e).length,h=l.length?Math.max(...l.map(f=>f.value)):0,u=l.length?Math.min(...l.map(f=>f.value)):0;return{sum:c,hits:d,highest:h,lowest:u,chosen:o,dropped:p.map((f,g)=>g).filter(f=>!o.includes(f)),exploding:o.filter(f=>p[f].value===p[f].sides),result:t==="target"?d:t==="highest"?h+n:t==="lowest"?u+n:c}}var yr=(p,t)=>typeof p=="string"&&p.trim().length>0&&p.length<=t&&!/[<>\u0000-\u001f]/.test(p);function Jt(p){if(!p||typeof p!="object"||Array.isArray(p)||!yr(p.name,60)||!Array.isArray(p.pool)||!p.pool.length||p.pool.length>40)throw Error("Choose a valid dice bag.");let t=0;for(let e of p.pool){if(!e||!sn.includes(e.sides)||!Number.isInteger(e.count)||e.count<1||e.count>120||e.color&&!/^#[0-9a-f]{6}$/i.test(e.color)||e.faces&&(!Array.isArray(e.faces)||e.faces.length!==e.sides||e.faces.some(n=>!yr(n.label,20)||!Number.isFinite(n.value)||Math.abs(n.value)>1e5)))throw Error("Invalid dice bag entry.");t+=e.count}if(t>120)throw Error("A free-roll bag supports up to 120 dice. Game-required pools are prepared separately.");if(!ti.includes(p.mode)||!Number.isFinite(p.target)||p.target<-1e5||p.target>1e5||!Number.isFinite(p.modifier)||Math.abs(p.modifier)>1e5||!Number.isInteger(p.keep)||p.keep<1||p.keep>120||typeof p.exploding!="boolean")throw Error("Invalid dice bag calculation.");return structuredClone({name:p.name,pool:p.pool,mode:p.mode,target:p.target,modifier:p.modifier,keep:p.keep,exploding:p.exploding})}function Sr(p,{random:t=null,previous:e=[]}={}){let n=Jt(p),i=Date.now().toString(36),s=[],r=e.filter(l=>l.held),a=new Set,o=0;for(let l of n.pool)for(let c=0;c<l.count;c++){let d=r.find((f,g)=>!a.has(g)&&f.sides===l.sides&&f.customKey===JSON.stringify(l.faces||null));if(d){a.add(r.indexOf(d)),s.push({...d});continue}let h=0,u;do{if(++h>100||s.length>=2e3)throw Error("Free-roll explosion limit exceeded.");u=su(l.sides,t);let f=l.faces?.[u-1];s.push({id:"free-"+i+"-"+o++,sides:l.sides,face:u,value:f?.value??u,label:f?.label??String(u),color:l.color,customKey:JSON.stringify(l.faces||null),faces:l.faces,explosion:h>1,held:!1})}while(n.exploding&&u===l.sides)}for(let[l,c]of r.entries())a.has(l)||s.push({...c});return{records:s,summary:ei(s,n)}}var us=()=>({name:"Field dice",pool:[{sides:6,count:3}],mode:"target",target:4,modifier:0,keep:1,exploding:!0});var br="kdwarf-dice-room-v1",ds="kdwarf-dice-bags-v1",fs="kdwarf-dice-history-v1",Ct=p=>String(p).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ps={board:"arcane",skin:"obsidian",color:"#283d52",ink:"#ffe1a4",sound:!0,volume:.35,voice:!1,voiceURI:"",music:!1,track:0,haptics:!1,shake:!1,tilt:!1,instant:!1,speed:"normal"},ms=(p,t)=>{try{return JSON.parse(localStorage.getItem(p))??t}catch{return t}},rn=(p,t)=>{try{localStorage.setItem(p,JSON.stringify(t))}catch{}},ce=(p,t,e)=>`<option value="${Ct(p)}" ${String(p)===String(e)?"selected":""}>${Ct(t)}</option>`,lt=(p,t,e="")=>`<button type="button" data-tray="${p}" ${e}>${t}</button>`,ru={sum:"Sum",target:"Hit target",highest:"Highest",lowest:"Lowest","drop-highest":"Drop highest","drop-lowest":"Drop lowest","keep-highest":"Keep highest","keep-lowest":"Keep lowest"};function S_(p,{battlefield:t=!1,canCancel:e=!1,request:n=null,onRecord:i=()=>{},onContinue:s=()=>{},onError:r=()=>{},onExport:a=()=>{},onClose:o=()=>{},resolved:l=null}={}){let c=new AbortController,{signal:d}=c,h=ms(br,{}),u={...ps,...h,battlefield:t};for(let F of["color","ink"])/^#[0-9a-f]{6}$/i.test(u[F])||(u[F]=ps[F]);let f=us(),g=ms(ds,[]),_=ms(fs,[]),v=[],x=null,y=!1,b=!1,S=0,M=null,w=null,A=null,P=!1,C=0,U={x:0,y:0},B=!0;try{g=g.map(Jt).slice(0,30)}catch{g=[]}Array.isArray(_)||(_=[]),_=_.filter(F=>F&&typeof F.label=="string"&&Array.isArray(F.pool)&&F.pool.length<=2e3&&typeof F.at=="string").slice(0,30);let E=!!n||!!l;l&&(v=l.records,x=ei(v,{mode:"target",target:l.target??4,modifier:l.modifier??0}),y=!0);function D(F=null){return Array.from({length:n.count},(H,k)=>({id:"action-"+k,sides:n.sides,face:F?.[k]??1,value:F?.[k]??1,label:F?String(F[k]):"?",held:!1}))}function R(){return v.length?ei(v,E?{mode:n?.kind==="roll-off"?"highest":"target",target:n?.target??4,modifier:n?.modifier??0,base:n?.stage==="roots"&&n?.base?n.base:null,net:n?.net??0}:f):null}function L(){if(!x)return;let F=(E||f.mode==="target"?`${x.hits} successes`:`Result ${x.result}`)+`. Total ${x.sum}.`;if(u.voice&&"speechSynthesis"in window){speechSynthesis.cancel();let H=new SpeechSynthesisUtterance(F);H.voice=speechSynthesis.getVoices().find(k=>k.voiceURI===u.voiceURI)||null,speechSynthesis.speak(H)}u.haptics&&navigator.vibrate?.([35,20,35])}function K(F=1){if(u.sound)try{w??=new(window.AudioContext||window.webkitAudioContext),w.resume();let H=w.createOscillator(),k=w.createGain();H.type="triangle",H.frequency.setValueAtTime(140+F*90,w.currentTime),H.frequency.exponentialRampToValueAtTime(55,w.currentTime+.075),k.gain.setValueAtTime(Math.min(.2,u.volume*.2),w.currentTime),k.gain.exponentialRampToValueAtTime(1e-4,w.currentTime+.08),H.connect(k).connect(w.destination),H.start(),H.stop(w.currentTime+.09)}catch{}}function q(){if(A){clearInterval(A.timer);for(let F of A.nodes)try{F.stop()}catch{}A=null}}function W(){if(q(),!!u.music)try{w??=new(window.AudioContext||window.webkitAudioContext),w.resume();let F=[],H=w.createGain();H.gain.value=u.volume*.035,H.connect(w.destination);let k=42*Math.pow(2,Number(u.track)%12/12+Math.floor(Number(u.track)/12)),X=Math.floor(Number(u.track)/8)%2;for(let J of[1,Math.pow(2,(X?3:4)/12),1.5]){let I=w.createOscillator();I.type=Number(u.track)%3?"sine":"triangle",I.frequency.value=k*J,I.connect(H),I.start(),F.push(I)}A={nodes:F,timer:setInterval(()=>{for(let J of F)J.detune.setTargetAtTime((Math.random()-.5)*14,w.currentTime,4)},4e3)}}catch{}}function et(){_=[{at:new Date().toISOString(),label:n?.label||f.name,pool:v.map(H=>({sides:H.sides,value:H.value,label:H.label})),summary:x},..._].slice(0,30),rn(fs,_)}function Q(){rn(br,u)}function T(){let F=[...p.querySelectorAll("details[open]")].map(I=>I.className||I.querySelector("summary")?.textContent),H=M?.poses();if(M?.destroy(),M=null,!B)return;!y&&!l&&(v=n?D():f.pool.flatMap((I,$)=>Array.from({length:I.count},(jt,Kt)=>({id:`ready-${$}-${Kt}`,sides:I.sides,value:1,face:1,label:"?",color:I.color,faces:I.faces,held:!1})))),p.className="dice-room"+(t?" battlefield-dice":""),p.dataset.board=u.board;let k=v.slice(S*64,S*64+64),X=E?n?`${n.count} \xD7 D${n.sides}${n.base?` \xB7 ${n.base} kept${n.net?` \xB7 ${Math.abs(n.net)} ${n.net>0?"ADV":"DIS"}`:""}`:""}`:"Resolved game roll":f.pool.map(I=>`${I.count}D${I.sides}${I.faces?" custom":""}`).join(" + ");p.innerHTML=`<div class="tray-result-header">${lt("settings","\u2699",'aria-label="Dice settings"')}<div class="tray-total"><small>${E?n?.stage==="explosion"?"EXPLOSION BATCH":"GAME POOL \xB7 AUTOMATIC SETUP":"DICE TABLE \xB7 FREE ROLL"}</small><strong aria-live="polite">${x?Ct(x.result):"READY"}</strong><span>${x?((E?n?.kind!=="roll-off":f.mode==="target")?`${x.hits} HITS \xB7 `:"")+`TOTAL ${x.sum} \xB7 HIGH ${x.highest} \xB7 LOW ${x.lowest}`:Ct(X)}</span></div>${lt("voice",u.voice?"VOICE ON":"VOICE OFF",'aria-label="Toggle result voice"')}</div><p class="tray-context">${Ct(n?.label||l?.label||f.name)}</p><div class="tray-board"><canvas aria-label="Interactive three-dimensional dice tray. Drag dice; tap free dice to hold them." role="img"></canvas><div class="tray-watermark">K\u2013D / ORBITAL DICE SYSTEM</div><div class="tray-batch">${y?`${x?.chosen.length??v.length} KEPT${x?.dropped.length?" \xB7 "+x.dropped.length+" DISCARDED":""}`:"DRAG TO THROW \xB7 SHAKE OPTIONAL"}</div></div><div class="tray-dice-list" aria-label="Individual dice">${k.map((I,$)=>`<button type="button" data-tray="hold" data-index="${S*64+$}" class="tray-die-chip ${I.held?"held":""} ${x?.dropped.includes(S*64+$)?"discarded":""}" ${E?"disabled":""} aria-label="${Ct(`D${I.sides}: ${I.label}${I.held?", held":""}`)}"><small>D${I.sides}</small>${Ct(I.label)}${I.explosion?" \u2726":""}${I.held?" \u25A3":""}</button>`).join("")}</div>${v.length>64?`<div class="tray-pagination">${lt("prev","\u2039")}<span>Dice ${S*64+1}\u2013${Math.min(v.length,S*64+64)} of ${v.length}</span>${lt("next","\u203A")}</div>`:""}<div class="tray-primary-actions">${y&&E?lt("continue","CONTINUE GAME",'class="primary"'):lt("roll",E?`ROLL ${n.count}D${n.sides}`:y?"ROLL UNHELD DICE":"ROLL DICE",'class="primary"')}${t&&e&&!y?lt("cancel","CANCEL ACTION"):""}${lt("details","DETAILS")}${E?"":lt("clear","CLEAR RESULT")}</div><p class="tray-rule">${E?n?.kind==="roll-off"?"Compare natural faces; ties reroll. Recon roll-offs do not use the 4+ target or exploding dice.":"Game sets the exact die types, count, target, modifiers, retained dice and explosion batches. Accepted results are saved before animation. A batch may be only part of the completed action; explosions belong to their original pool.":"Tap a die to hold it. Mix die types and colors, create custom faces, or save a bag. Free rolls do not change the battle."}</p>${E?`${n?.initiativeRule?'<p class="initiative-pass-note">Rally and Skill: a completed result of 0 or 1 successes passes initiative automatically. Resolve every required pool and explosion batch before judging the final outcome.</p>':""}<details class="tray-physical"><summary>Enter physical dice instead</summary><div class="tray-physical-grid">${Array.from({length:n?.count??0},(I,$)=>`<label>Die ${$+1}<input type="number" name="tray-physical-${$}" min="1" max="${n?.sides}" inputmode="numeric" required ${y?"disabled":""}></label>`).join("")}</div>${y?"":lt("physical","RECORD PHYSICAL DICE")}</details>`:`<div class="tray-type-picker">${sn.map(I=>`<div><span>D${I}</span><div>${lt("minus","\u2212",`data-sides="${I}" aria-label="Remove D${I}"`)}<b>${f.pool.filter($=>$.sides===I).reduce(($,jt)=>$+jt.count,0)}</b>${lt("plus","+",`data-sides="${I}" aria-label="Add D${I}"`)}</div></div>`).join("")}</div><div class="tray-calculation"><label>Calculation<select name="tray-mode">${ti.map(I=>ce(I,ru[I],f.mode)).join("")}</select></label><label>Target<input name="tray-target" type="number" value="${f.target}"></label><label>Modifier<input name="tray-modifier" type="number" value="${f.modifier}"></label><label>Keep<input name="tray-keep" type="number" min="1" max="120" value="${f.keep}"></label><label class="member"><input name="tray-exploding" type="checkbox" ${f.exploding?"checked":""}>Maximum explodes</label></div><details><summary>Dice bags, presets &amp; custom faces</summary><div class="tray-pool-edit">${f.pool.map((I,$)=>`<label>D${I.sides}${I.faces?" custom":""} \xB7 count<input type="number" name="tray-pool-count-${$}" min="1" max="120" value="${I.count}"></label><label>Die color<input type="color" name="tray-pool-color-${$}" value="${I.color||u.color}"></label>`).join("")}</div><label>Bag name<input name="tray-bag-name" maxlength="60" value="${Ct(f.name)}"></label><div class="tray-inline">${lt("save-bag","SAVE BAG")}${lt("export-bag","EXPORT BAG")}${lt("import-bag","IMPORT BAG")}</div><label>Saved bags<select name="tray-bag"><option value="">Choose a preset</option>${g.map((I,$)=>ce($,I.name,"")).join("")}</select></label><div class="tray-inline">${lt("load-bag","LOAD")}${lt("delete-bag","DELETE")}${lt("reset","RESET POOL")}</div><label>Custom die shape<select name="tray-custom-sides">${sn.filter(I=>I!==100).map(I=>ce(I,"D"+I,6)).join("")}</select></label><label>Faces, separated by commas (optional label=value)<textarea name="tray-custom-faces" maxlength="3000" placeholder="Miss=0, Pin=1, Pin=1, Suppress=2, Rout=3, Destroy=4"></textarea></label><label>Color<input name="tray-custom-color" type="color" value="${u.color}"></label>${lt("custom","ADD CUSTOM DIE")}<p>Standard dice, each custom face and its numeric value are saved in the bag. D100 uses a tens/ones percentile pair; 00 means 100.</p></details>`}<details class="tray-settings"><summary>Table, dice, sound &amp; motion</summary><div class="tray-calculation"><label>Game board<select name="tray-board">${["arcane","wood","velvet","starship"].map(I=>ce(I,I.toUpperCase(),u.board)).join("")}</select></label><label>Dice finish<select name="tray-skin">${["obsidian","bone","copper","crystal"].map(I=>ce(I,I.toUpperCase(),u.skin)).join("")}</select></label><label>Dice color<input type="color" name="tray-color" value="${u.color}"></label><label>Number color<input type="color" name="tray-ink" value="${u.ink}"></label><label>Roll speed<select name="tray-speed">${["fast","normal","slow"].map(I=>ce(I,I,u.speed)).join("")}</select></label><label>Volume<input type="range" name="tray-volume" min="0" max="1" step=".05" value="${u.volume}"></label>${["sound","voice","music","haptics","instant","shake","tilt"].map(I=>`<label class="member"><input type="checkbox" name="tray-${I}" ${u[I]?"checked":""}>${{sound:"Dice sounds",voice:"Speak results",music:"Ambient music",haptics:"Vibration",instant:"Instant roll newly added dice",shake:"Shake to roll",tilt:"Tilt gravity"}[I]}</label>`).join("")}<label>Voice<select name="tray-voiceURI"><option value="">Device default</option>${(window.speechSynthesis?.getVoices()||[]).map(I=>ce(I.voiceURI,I.name,u.voiceURI)).join("")}</select></label><label>Ambient score<select name="tray-track">${Array.from({length:32},(I,$)=>ce($,`${["Starlit chamber","Ancient vault","Orbital drift","Copper dusk"][Math.floor($/8)]} ${$%8+1}`,u.track)).join("")}</select></label></div><p>Motion controls require a supported secure browser and a deliberate tap to enable device sensors. Shake and tilt are separate controls. Reduced-motion device preferences shorten animations.</p>${lt("sensors",P?"DISABLE DEVICE MOTION":"ENABLE DEVICE MOTION")}</details><details class="tray-history"><summary>Roll history (${_.length})</summary>${_.map(I=>`<div class="tray-history-row"><b>${Ct(I.label)}</b><span>${Ct(I.pool?.map($=>`D${$.sides}:${$.label}`).join(" \xB7 ")||"")} \u2192 ${Ct(I.summary?.result??"")}</span><small>${Ct(I.at)}</small></div>`).join("")}${lt("clear-history","CLEAR LOCAL ROLL HISTORY")}</details>${E?lt("export-game",n?"EXPORT PENDING SAVE":"EXPORT GAME SAVE"):""}<input type="file" data-tray-import hidden accept="application/json,.json"><p class="tray-message" aria-live="polite"></p>`;for(let I of p.querySelectorAll("details"))F.includes(I.className||I.querySelector("summary")?.textContent)&&(I.open=!0);let J=k.map((I,$)=>({...I,index:S*64+$,dropped:x?.dropped.includes(S*64+$),explode:x?.exploding.includes(S*64+$)}));M=ou(p.querySelector("canvas"),J,u,{sound:K,onRoll:()=>O(),onHold:I=>Y(I),gravity:()=>u.tilt&&P?U:{x:0,y:0},poses:H})}function z(F){let H=p.querySelector(".tray-message");H&&(H.textContent=F),r(F)}function Y(F){if(E||b||!y)return;v[F].held=!v[F].held,M?.hold(F,v[F].held);let H=p.querySelector(`[data-index="${F}"]`);H?.classList.toggle("held",v[F].held),H&&(H.innerHTML=`<small>D${v[F].sides}</small>${Ct(v[F].label)}${v[F].held?" \u25A3":""}`)}async function O(F=null){if(!(b||E&&y))try{if(E)v=D(F||n.generated),x=R(),i(v.map(H=>H.value));else{let H=Sr(f,{previous:v});v=H.records,x=H.summary}if(y=!0,b=!0,S=0,T(),p.querySelector('[data-tray="continue"]')?.setAttribute("disabled",""),p.querySelector('[data-tray="roll"]')?.setAttribute("disabled",""),t||p.querySelector(".tray-total")?.scrollIntoView({block:"nearest"}),K(),await M.animate(),!B)return;b=!1,et(),L(),T()}catch(H){b=!1,z(H.message)}}async function it(){if(P){P=!1,z("Device motion disabled."),T();return}try{if(!("DeviceMotionEvent"in window))throw Error("Device motion is unavailable in this browser.");if(typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()!=="granted")throw Error("Motion permission was not granted.");P=!0,z("Device motion enabled. Shake rolls an unrolled game pool or unheld free dice."),T()}catch(F){z(F.message)}}return window.addEventListener("devicemotion",F=>{if(!P||!B)return;let H=F.accelerationIncludingGravity;if(!H)return;U={x:Math.max(-1,Math.min(1,(H.x||0)/8)),y:Math.max(-1,Math.min(1,-(H.y||0)/8))};let k=F.acceleration||H,X=Math.hypot(k.x||0,k.y||0,k.z||0);u.shake&&X>(F.acceleration?14:23)&&Date.now()-C>1600&&(C=Date.now(),O()),u.tilt&&M?.wake()},{signal:d}),p.addEventListener("click",async F=>{let H=F.target.closest("[data-tray]");if(!H)return;F.preventDefault(),F.stopPropagation();let k=H.dataset.tray;if(b){z("Dice are settling.");return}try{if(k==="cancel"&&e&&!y)return o();if(k==="roll")return O();if(k==="continue")return s();if(k==="physical"){let X=Array.from({length:n.count},(J,I)=>Number(p.querySelector(`[name="tray-physical-${I}"]`).value));if(X.some(J=>!Number.isInteger(J)||J<1||J>n.sides))throw Error(`Enter ${n.count} values from 1 to ${n.sides}.`);return O(X)}if(k==="hold")return Y(Number(H.dataset.index));if(k==="sensors")return it();if(k==="export-game")return a();if(k==="settings"){p.querySelector(".tray-settings").open=!p.querySelector(".tray-settings").open;return}if(k==="details"){p.querySelector(".tray-history").open=!p.querySelector(".tray-history").open;return}if(k==="voice"){u.voice=!u.voice,Q(),T(),u.voice&&x&&L();return}if(k==="next"||k==="prev"){S=Math.max(0,Math.min(Math.ceil(v.length/64)-1,S+(k==="next"?1:-1))),T();return}if(k==="clear-history"){_=[],rn(fs,_),T();return}if(k==="clear"){y=!1,x=null,v=[],T();return}if(k==="plus"||k==="minus"){let X=Number(H.dataset.sides),J=f.pool.find(I=>I.sides===X&&!I.faces);if(k==="plus"){if(f.pool.reduce((I,$)=>I+$.count,0)>=120)throw Error("Maximum 120 dice in a free pool.");J?J.count++:f.pool.push({sides:X,count:1})}else if(J)J.count--,f.pool=f.pool.filter(I=>I.count>0);else{let I=f.pool.find($=>$.sides===X);I&&(I.count--,f.pool=f.pool.filter($=>$.count>0))}y=!1,x=null,T(),u.instant&&f.pool.length&&O();return}if(k==="reset"){f=us(),y=!1,x=null,T();return}if(k==="save-bag"||k==="export-bag"){if(f.name=p.querySelector('[name="tray-bag-name"]').value.trim(),f=Jt(f),k==="save-bag"){if(g=g.filter(X=>X.name!==f.name),g.length>=30)throw Error("Maximum 30 bags; remove a bag first.");g.push(structuredClone(f)),rn(ds,g),T()}else{let X=URL.createObjectURL(new Blob([JSON.stringify({format:"kdwarf-dice-bag",version:1,bag:f},null,2)],{type:"application/json"})),J=document.createElement("a");J.href=X,J.download="kdwarf-dice-bag.json",J.click(),setTimeout(()=>URL.revokeObjectURL(X),1e3)}return}if(k==="load-bag"||k==="delete-bag"){let X=p.querySelector('[name="tray-bag"]').value;if(X==="")throw Error("Choose a saved bag.");let J=Number(X);k==="load-bag"?(f=Jt(g[J]),y=!1,x=null):(g.splice(J,1),rn(ds,g)),T();return}if(k==="import-bag"){p.querySelector("[data-tray-import]").click();return}if(k==="custom"){let X=Number(p.querySelector('[name="tray-custom-sides"]').value),J=p.querySelector('[name="tray-custom-faces"]').value,I=J.split(",").map((Kt,on)=>{let Ut=Kt.trim().split("=");return{label:Ut[0].trim(),value:Ut.length>1?Number(Ut[1]):Number.isFinite(Number(Ut[0]))?Number(Ut[0]):on+1}}),$={sides:X,count:1,faces:I,color:p.querySelector('[name="tray-custom-color"]').value},jt={...f,pool:[...f.pool,$]};f=Jt(jt),y=!1,x=null,T();return}}catch(X){z(X.message)}},{signal:d}),p.addEventListener("change",async F=>{let H=F.target.name;if(!b)try{if(F.target.matches("[data-tray-import]")){let X=F.target.files[0];if(!X)return;if(X.size>1e5)throw Error("Dice bag file is too large.");let J=JSON.parse(await X.text());if(J.format!=="kdwarf-dice-bag"||J.version!==1)throw Error("Choose a K-Dwarf dice bag file.");f=Jt(J.bag),y=!1,x=null,T();return}if(!H?.startsWith("tray-"))return;if(H.startsWith("tray-pool-")){let[,,X,J]=H.split("-"),I=structuredClone(f);I.pool[Number(J)][X==="count"?"count":"color"]=X==="count"?Number(F.target.value):F.target.value,f=Jt(I),y=!1,x=null,T();return}let k=H.slice(5);if(["mode","target","modifier","keep","exploding"].includes(k)&&!E){f[k]=F.target.type==="checkbox"?F.target.checked:["target","modifier","keep"].includes(k)?Number(F.target.value):F.target.value,Jt(f),y&&(x=R()),T();return}Object.hasOwn(ps,k)&&(u[k]=F.target.type==="checkbox"?F.target.checked:["volume","track"].includes(k)?Number(F.target.value):F.target.value,Q(),["music","track","volume"].includes(k)&&W(),T())}catch(k){z(k.message)}},{signal:d}),p.addEventListener("keydown",F=>{F.code==="Space"&&!/INPUT|SELECT|TEXTAREA/.test(F.target.tagName)&&(F.preventDefault(),O())},{signal:d}),T(),{destroy(){B=!1,c.abort(),M?.destroy(),q(),w?.close(),u.voice&&window.speechSynthesis?.cancel()}}}function ou(p,t,e,{sound:n,onRoll:i,onHold:s,gravity:r,poses:a}){let o=p.getContext("2d"),l=new AbortController,c=l.signal,d=new N(0,.48,.88),h=[],u=1,f=1,g=25,_=null,v=0,x=0,y=!1,b=null,S=null,M=!0,w=null,A=null,P=(T,z)=>T+Math.random()*(z-T),C=(T,z,Y=null)=>({record:T,index:z,part:Y,x:0,y:0,z:0,vx:0,vy:0,vz:0,q:new xt,target:new xt,angular:new N,shape:Qn(T.sides===100?10:T.sides)});for(let T of t)T.sides===100?h.push(C(T,T.index,"tens"),C(T,T.index,"ones")):h.push(C(T,T.index));let U=T=>T.part==="tens"?Math.floor(T.record.face%100/10)+1:T.part==="ones"?T.record.face%10+1:T.record.face;function B(){let T=p.getBoundingClientRect();if(A&&Math.abs(T.width-u)<.5&&Math.abs(T.height-f)<.5)return;u=Math.max(220,T.width),f=Math.max(e.battlefield?100:160,T.height);let z=Math.min(devicePixelRatio||1,1.75);p.width=u*z,p.height=f*z,o.setTransform(z,0,0,z,0,0);let Y=Math.ceil(Math.sqrt(Math.max(1,h.length)*u/f)),O=Math.ceil(Math.max(1,h.length)/Y);g=Math.max(9,Math.min(40,u/(Y+1)*.36,f/(O+1)*.36)),h.forEach((it,F)=>{it.x=u*(F%Y+1)/(Y+1)+Math.sin(F*13)*g*.12,it.y=f*(Math.floor(F/Y)+1)/(O+1),it.z=0,it.target=it.shape.top(U(it)).premultiply(new xt().setFromAxisAngle(new N(0,0,1),F*2.399)),it.q.copy(it.target),it.faceOffset=0;let H=a?.[it.record.id+":"+(it.part||"")];H&&it.record.label!=="?"&&(it.x=H.x,it.y=H.y,it.z=H.z,it.q.copy(H.q),it.faceOffset=H.faceOffset)}),A?.destroy(),A=_r(h,{width:u,height:f,radius:g,onImpact:n}),R()}function E(T,z){return{x:z.x+T.x*g,y:z.y+(T.y*.88-T.z*.48)*g-z.z}}function D(T,z){let Y=parseInt(T.replace("#",""),16);return`rgb(${[Y>>16&255,Y>>8&255,Y&255].map(O=>Math.max(0,Math.min(255,Math.round(O*z)))).join(",")})`}function R(){if(!M||!o)return;o.clearRect(0,0,u,f);let T={arcane:["#112d46","#081623"],wood:["#61442a","#261e18"],velvet:["#352842","#130f24"],starship:["#213c43","#0b1b23"]},z=T[e.board]||T.arcane,Y=o.createRadialGradient(u*.5,f*.4,10,u*.5,f*.5,u*.7);if(Y.addColorStop(0,z[0]),Y.addColorStop(1,z[1]),!e.battlefield){if(o.fillStyle=Y,o.fillRect(0,0,u,f),o.strokeStyle=e.board==="wood"?"#af85532b":"#69a6c526",o.lineWidth=1,e.board==="wood")for(let O=8;O<f;O+=29)o.beginPath(),o.moveTo(0,O),o.bezierCurveTo(u*.3,O-6,u*.7,O+5,u,O-2),o.stroke();else{for(let O=0;O<u;O+=45)o.beginPath(),o.moveTo(O,0),o.lineTo(O,f),o.stroke();for(let O=0;O<f;O+=45)o.beginPath(),o.moveTo(0,O),o.lineTo(u,O),o.stroke();o.beginPath(),o.arc(u*.5,f*.5,Math.min(u,f)*.36,0,Math.PI*2),o.stroke(),o.beginPath(),o.arc(u*.5,f*.5,Math.min(u,f)*.33,0,Math.PI*2),o.stroke()}o.strokeStyle="#d1b77f66",o.strokeRect(11,11,u-22,f-22),o.strokeStyle="#d1b77f22",o.strokeRect(16,16,u-32,f-32)}for(let O of[...h].sort((it,F)=>it.y-F.y||it.z-F.z)){o.save(),o.globalAlpha=O.record.dropped?.35:1,o.fillStyle="#0008",o.filter="blur(3px)",o.beginPath(),o.ellipse(O.x+5,O.y+g*.42,g*.8,g*.42,0,0,Math.PI*2),o.fill(),o.filter="none";let it={bone:"#d6c5a1",copper:"#986141",crystal:"#2c99ae",obsidian:e.color}[e.skin]||e.color,F=O.record.color||it,H=e.ink,k=O.shape.faces.map(X=>({f:X,n:X.normal.clone().applyQuaternion(O.q),p:X.points.map(J=>E(J.clone().applyQuaternion(O.q),O)),center:E(X.center.clone().applyQuaternion(O.q),O)})).filter(X=>X.n.dot(d)>0).sort((X,J)=>X.n.dot(d)-J.n.dot(d));for(let{f:X,n:J,p:I,center:$}of k){let jt=.48+.6*Math.max(0,J.dot(new N(-.3,-.4,.85).normalize()));o.beginPath(),I.forEach((_t,xe)=>xe?o.lineTo(_t.x,_t.y):o.moveTo(_t.x,_t.y)),o.closePath();let Kt=o.createLinearGradient($.x-g,$.y-g,$.x+g,$.y+g);Kt.addColorStop(0,D(F,jt*1.28)),Kt.addColorStop(.55,D(F,jt)),Kt.addColorStop(1,D(F,jt*.65)),o.fillStyle=Kt,o.fill(),o.strokeStyle=e.skin==="crystal"?"#b7f3ff99":"#c5b68a77",o.lineWidth=.8,o.stroke();let on=O.record.sides===2;if(on&&Math.abs(X.normal.y)<.9)continue;let Ut=(X.value-1+(O.faceOffset||0))%(O.record.sides===100?10:O.record.sides)+1,gs=O.record.label==="?"?"?":O.part==="tens"?String((Ut-1)*10).padStart(2,"0"):O.part==="ones"?String(Ut-1):on?O.record.face===1?"I":"II":O.record.faces?.[Ut-1]?.label??String(Ut),Mr=Math.abs(I.reduce((_t,xe,xs)=>_t+xe.x*I[(xs+1)%I.length].y-I[(xs+1)%I.length].x*xe.y,0))/2,wr=Math.max(...I.map(_t=>_t.x))-Math.min(...I.map(_t=>_t.x)),Ar=Math.max(3,Math.min(g*.65,Math.sqrt(Mr)*.57,wr/(Math.max(1,gs.length)*.72)));o.save(),o.beginPath(),I.forEach((_t,xe)=>xe?o.lineTo(_t.x,_t.y):o.moveTo(_t.x,_t.y)),o.closePath(),o.clip(),o.translate($.x,$.y);let Er=Math.abs(J.z);o.scale(1,.65+.35*Er),o.fillStyle=H,o.shadowColor=O.record.explode?"#ffbb54":"transparent",o.shadowBlur=O.record.explode?6:0,o.textAlign="center",o.textBaseline="middle",o.font=`600 ${Ar}px Georgia,serif`,o.fillText(gs,0,0,g*1.2),o.restore()}O.record.held&&(o.fillStyle="#efcf8e",o.font="13px sans-serif",o.fillText("\u25A3",O.x+g*.6,O.y-g*.8)),o.restore()}}function L(T){if(_=null,!M)return;let z=Math.min(.025,(T-v)/1e3||.016);v=T,y&&(x+=z),p.dataset.rollState=y?"rolling":"settled",p.dataset.elapsed=x.toFixed(2);let Y=r(),O=y||S||Math.abs(Y.x)+Math.abs(Y.y)>.08;if(O){if(y){let it=Math.min(1,x/K)*(b.length-1),F=Math.floor(it),H=Math.min(F+1,b.length-1),k=it-F;if(h.forEach((X,J)=>{let I=b[F][J],$=b[H][J];X.x=I.x+($.x-I.x)*k,X.y=I.y+($.y-I.y)*k,X.z=I.z+($.z-I.z)*k,X.q.slerpQuaternions(I.q,$.q,k)}),x>=K){y=!1,p.dataset.rollState="settled",b=null;let X=w;w=null,X?.(),O=!1}}else{if(S?.body){let it=h.indexOf(S.body);A.drag(it,S.body.x,S.body.y,S.body.vx,S.body.vy)}A.step(z,Y),A.sync()}R()}O&&(_=setTimeout(()=>L(performance.now()),16))}let K=matchMedia("(prefers-reduced-motion: reduce)").matches?.22:e.speed==="fast"?.65:e.speed==="slow"?2.6:1.65,q=()=>{!_&&M&&(v=performance.now(),_=setTimeout(()=>L(performance.now()),16))},W=T=>{let z=p.getBoundingClientRect();return{x:T.clientX-z.left,y:T.clientY-z.top}};p.addEventListener("pointerdown",T=>{if(y)return;let z=W(T);S={body:[...h].reverse().find(O=>Math.hypot(O.x-z.x,O.y-z.y)<g*1.3),start:z,last:z,moved:!1},p.setPointerCapture(T.pointerId)},{signal:c}),p.addEventListener("pointermove",T=>{if(!S)return;let z=W(T);if(Math.hypot(z.x-S.start.x,z.y-S.start.y)>6&&(S.moved=!0),S.body&&S.moved){let Y=S.body;Y.x=z.x,Y.y=z.y,Y.vx=(z.x-S.last.x)*20,Y.vy=(z.y-S.last.y)*20,A.drag(h.indexOf(Y),Y.x,Y.y,Y.vx,Y.vy),R()}S.last=z},{signal:c});let et=T=>{if(!S)return;let z=S;S=null,z.body&&!z.moved?s(z.body.index):z.moved&&!y&&t.every(Y=>Y.label==="?")?i():q()};p.addEventListener("pointerup",et,{signal:c}),p.addEventListener("pointercancel",()=>{S=null},{signal:c});let Q=new ResizeObserver(B);return Q.observe(p),B(),{wake:q,poses(){return Object.fromEntries(h.map(T=>[T.record.id+":"+(T.part||""),{x:T.x,y:T.y,z:T.z,q:T.q.clone(),faceOffset:T.faceOffset}]))},hold(T,z){for(let Y of h)Y.index===T&&(Y.record.held=z);R()},animate(){let T=vr(A,h);return b=T.frames,h.forEach((z,Y)=>{z.faceOffset=T.offsets[Y];let O=b[0][Y];z.x=O.x,z.y=O.y,z.z=O.z,z.q.copy(O.q)}),y=!0,x=0,new Promise(z=>{w=z,q()})},destroy(){M=!1,l.abort(),A?.destroy(),Q.disconnect(),_&&clearTimeout(_),w?.()}}}export{S_ as mountDiceTray};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
