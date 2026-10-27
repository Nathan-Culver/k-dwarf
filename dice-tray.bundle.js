var jt=class f{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){let t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){let t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){let e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new m);let e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new m);let n=this.elements,i=t.x,s=t.y,r=t.z;return e.x=n[0]*i+n[1]*s+n[2]*r,e.y=n[3]*i+n[4]*s+n[5]*r,e.z=n[6]*i+n[7]*s+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new f);let n=this.elements,i=t.elements,s=e.elements,r=n[0],o=n[1],a=n[2],l=n[3],c=n[4],u=n[5],h=n[6],d=n[7],p=n[8],g=i[0],x=i[1],v=i[2],_=i[3],S=i[4],y=i[5],b=i[6],M=i[7],w=i[8];return s[0]=r*g+o*_+a*b,s[1]=r*x+o*S+a*M,s[2]=r*v+o*y+a*w,s[3]=l*g+c*_+u*b,s[4]=l*x+c*S+u*M,s[5]=l*v+c*y+u*w,s[6]=h*g+d*_+p*b,s[7]=h*x+d*S+p*M,s[8]=h*v+d*y+p*w,e}scale(t,e){e===void 0&&(e=new f);let n=this.elements,i=e.elements;for(let s=0;s!==3;s++)i[3*s+0]=t.x*n[3*s+0],i[3*s+1]=t.y*n[3*s+1],i[3*s+2]=t.z*n[3*s+2];return e}solve(t,e){e===void 0&&(e=new m);let n=3,i=4,s=[],r,o;for(r=0;r<n*i;r++)s.push(0);for(r=0;r<3;r++)for(o=0;o<3;o++)s[r+i*o]=this.elements[r+3*o];s[3]=t.x,s[7]=t.y,s[11]=t.z;let a=3,l=a,c,u=4,h;do{if(r=l-a,s[r+i*r]===0){for(o=r+1;o<l;o++)if(s[r+i*o]!==0){c=u;do h=u-c,s[h+i*r]+=s[h+i*o];while(--c);break}}if(s[r+i*r]!==0)for(o=r+1;o<l;o++){let d=s[r+i*o]/s[r+i*r];c=u;do h=u-c,s[h+i*o]=h<=r?0:s[h+i*o]-s[h+i*r]*d;while(--c)}}while(--a);if(e.z=s[2*i+3]/s[2*i+2],e.y=(s[1*i+3]-s[1*i+2]*e.z)/s[1*i+1],e.x=(s[0*i+3]-s[0*i+2]*e.z-s[0*i+1]*e.y)/s[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";for(let n=0;n<9;n++)t+=this.elements[n]+",";return t}reverse(t){t===void 0&&(t=new f);let e=3,n=6,i=Ar,s,r;for(s=0;s<3;s++)for(r=0;r<3;r++)i[s+n*r]=this.elements[s+3*r];i[3]=1,i[9]=0,i[15]=0,i[4]=0,i[10]=1,i[16]=0,i[5]=0,i[11]=0,i[17]=1;let o=3,a=o,l,c=n,u;do{if(s=a-o,i[s+n*s]===0){for(r=s+1;r<a;r++)if(i[s+n*r]!==0){l=c;do u=c-l,i[u+n*s]+=i[u+n*r];while(--l);break}}if(i[s+n*s]!==0)for(r=s+1;r<a;r++){let h=i[s+n*r]/i[s+n*s];l=c;do u=c-l,i[u+n*r]=u<=s?0:i[u+n*r]-i[u+n*s]*h;while(--l)}}while(--o);s=2;do{r=s-1;do{let h=i[s+n*r]/i[s+n*s];l=n;do u=n-l,i[u+n*r]=i[u+n*r]-i[u+n*s]*h;while(--l)}while(r--)}while(--s);s=2;do{let h=1/i[s+n*s];l=n;do u=n-l,i[u+n*s]=i[u+n*s]*h;while(--l)}while(s--);s=2;do{r=2;do{if(u=i[e+r+n*s],isNaN(u)||u===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(s,r,u)}while(r--)}while(s--);return t}setRotationFromQuaternion(t){let e=t.x,n=t.y,i=t.z,s=t.w,r=e+e,o=n+n,a=i+i,l=e*r,c=e*o,u=e*a,h=n*o,d=n*a,p=i*a,g=s*r,x=s*o,v=s*a,_=this.elements;return _[0]=1-(h+p),_[1]=c-v,_[2]=u+x,_[3]=c+v,_[4]=1-(l+p),_[5]=d-g,_[6]=u-x,_[7]=d+g,_[8]=1-(l+h),this}transpose(t){t===void 0&&(t=new f);let e=this.elements,n=t.elements,i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}},Ar=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],m=class f{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new f);let n=t.x,i=t.y,s=t.z,r=this.x,o=this.y,a=this.z;return e.x=o*s-a*i,e.y=a*n-r*s,e.z=r*i-o*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new f(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new f(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new jt([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){let t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){let s=1/i;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new f);let e=this.x,n=this.y,i=this.z,s=Math.sqrt(e*e+n*n+i*i);return s>0?(s=1/s,t.x=e*s,t.y=n*s,t.z=i*s):(t.x=1,t.y=0,t.z=0),t}length(){let t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,o=t.z;return Math.sqrt((s-e)*(s-e)+(r-n)*(r-n)+(o-i)*(o-i))}distanceSquared(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,o=t.z;return(s-e)*(s-e)+(r-n)*(r-n)+(o-i)*(o-i)}scale(t,e){e===void 0&&(e=new f);let n=this.x,i=this.y,s=this.z;return e.x=t*n,e.y=t*i,e.z=t*s,e}vmul(t,e){return e===void 0&&(e=new f),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new f),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new f),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){let n=this.length();if(n>0){let i=Er,s=1/n;i.set(this.x*s,this.y*s,this.z*s);let r=Tr;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){let i=this.x,s=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=s+(t.y-s)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(xs),xs.almostEquals(t,e)}clone(){return new f(this.x,this.y,this.z)}};m.ZERO=new m(0,0,0);m.UNIT_X=new m(1,0,0);m.UNIT_Y=new m(0,1,0);m.UNIT_Z=new m(0,0,1);var Er=new m,Tr=new m,xs=new m,St=class f{constructor(t){t===void 0&&(t={}),this.lowerBound=new m,this.upperBound=new m,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){let s=this.lowerBound,r=this.upperBound,o=n;s.copy(t[0]),o&&o.vmult(s,s),r.copy(s);for(let a=1;a<t.length;a++){let l=t[a];o&&(o.vmult(l,_s),l=_s),l.x>r.x&&(r.x=l.x),l.x<s.x&&(s.x=l.x),l.y>r.y&&(r.y=l.y),l.y<s.y&&(s.y=l.y),l.z>r.z&&(r.z=l.z),l.z<s.z&&(s.z=l.z)}return e&&(e.vadd(s,s),e.vadd(r,r)),i&&(s.x-=i,s.y-=i,s.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new f().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound,r=i.x<=n.x&&n.x<=s.x||e.x<=s.x&&s.x<=n.x,o=i.y<=n.y&&n.y<=s.y||e.y<=s.y&&s.y<=n.y,a=i.z<=n.z&&n.z<=s.z||e.z<=s.z&&s.z<=n.z;return r&&o&&a}volume(){let t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){let e=this.lowerBound,n=this.upperBound,i=t.lowerBound,s=t.upperBound;return e.x<=i.x&&n.x>=s.x&&e.y<=i.y&&n.y>=s.y&&e.z<=i.z&&n.z>=s.z}getCorners(t,e,n,i,s,r,o,a){let l=this.lowerBound,c=this.upperBound;t.copy(l),e.set(c.x,l.y,l.z),n.set(c.x,c.y,l.z),i.set(l.x,c.y,c.z),s.set(c.x,l.y,c.z),r.set(l.x,c.y,l.z),o.set(l.x,l.y,c.z),a.copy(c)}toLocalFrame(t,e){let n=vs,i=n[0],s=n[1],r=n[2],o=n[3],a=n[4],l=n[5],c=n[6],u=n[7];this.getCorners(i,s,r,o,a,l,c,u);for(let h=0;h!==8;h++){let d=n[h];t.pointToLocal(d,d)}return e.setFromPoints(n)}toWorldFrame(t,e){let n=vs,i=n[0],s=n[1],r=n[2],o=n[3],a=n[4],l=n[5],c=n[6],u=n[7];this.getCorners(i,s,r,o,a,l,c,u);for(let h=0;h!==8;h++){let d=n[h];t.pointToWorld(d,d)}return e.setFromPoints(n)}overlapsRay(t){let{direction:e,from:n}=t,i=1/e.x,s=1/e.y,r=1/e.z,o=(this.lowerBound.x-n.x)*i,a=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*s,c=(this.upperBound.y-n.y)*s,u=(this.lowerBound.z-n.z)*r,h=(this.upperBound.z-n.z)*r,d=Math.max(Math.max(Math.min(o,a),Math.min(l,c)),Math.min(u,h)),p=Math.min(Math.min(Math.max(o,a),Math.max(l,c)),Math.max(u,h));return!(p<0||d>p)}},_s=new m,vs=[new m,new m,new m,new m,new m,new m,new m,new m],un=class{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){let s=i;i=n,n=s}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:s}=e;if(s>i){let r=s;s=i,i=r}this.matrix[(i*(i+1)>>1)+s-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}},dn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;let n=this._listeners;if(n[t]===void 0)return this;let i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;let n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,s=n.length;i<s;i++)n[i].call(this,t)}return this}},xt=class f{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){let n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new m),this.normalize();let e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){let n=Cr,i=Rr;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{let n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new f);let n=this.x,i=this.y,s=this.z,r=this.w,o=t.x,a=t.y,l=t.z,c=t.w;return e.x=n*c+r*o+i*l-s*a,e.y=i*c+r*a+s*o-n*l,e.z=s*c+r*l+n*a-i*o,e.w=r*c-n*o-i*a-s*l,e}inverse(t){t===void 0&&(t=new f);let e=this.x,n=this.y,i=this.z,s=this.w;this.conjugate(t);let r=1/(e*e+n*n+i*i+s*s);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new f),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){let t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new m);let n=t.x,i=t.y,s=t.z,r=this.x,o=this.y,a=this.z,l=this.w,c=l*n+o*s-a*i,u=l*i+a*n-r*s,h=l*s+r*i-o*n,d=-r*n-o*i-a*s;return e.x=c*l+d*-r+u*-a-h*-o,e.y=u*l+d*-o+h*-r-c*-a,e.z=h*l+d*-a+c*-o-u*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,s,r=this.x,o=this.y,a=this.z,l=this.w;switch(e){case"YZX":let c=r*o+a*l;if(c>.499&&(n=2*Math.atan2(r,l),i=Math.PI/2,s=0),c<-.499&&(n=-2*Math.atan2(r,l),i=-Math.PI/2,s=0),n===void 0){let u=r*r,h=o*o,d=a*a;n=Math.atan2(2*o*l-2*r*a,1-2*h-2*d),i=Math.asin(2*c),s=Math.atan2(2*r*l-2*o*a,1-2*u-2*d)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=s}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");let s=Math.cos(t/2),r=Math.cos(e/2),o=Math.cos(n/2),a=Math.sin(t/2),l=Math.sin(e/2),c=Math.sin(n/2);return i==="XYZ"?(this.x=a*r*o+s*l*c,this.y=s*l*o-a*r*c,this.z=s*r*c+a*l*o,this.w=s*r*o-a*l*c):i==="YXZ"?(this.x=a*r*o+s*l*c,this.y=s*l*o-a*r*c,this.z=s*r*c-a*l*o,this.w=s*r*o+a*l*c):i==="ZXY"?(this.x=a*r*o-s*l*c,this.y=s*l*o+a*r*c,this.z=s*r*c+a*l*o,this.w=s*r*o-a*l*c):i==="ZYX"?(this.x=a*r*o-s*l*c,this.y=s*l*o+a*r*c,this.z=s*r*c-a*l*o,this.w=s*r*o+a*l*c):i==="YZX"?(this.x=a*r*o+s*l*c,this.y=s*l*o+a*r*c,this.z=s*r*c-a*l*o,this.w=s*r*o-a*l*c):i==="XZY"&&(this.x=a*r*o-s*l*c,this.y=s*l*o-a*r*c,this.z=s*r*c+a*l*o,this.w=s*r*o+a*l*c),this}clone(){return new f(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new f);let i=this.x,s=this.y,r=this.z,o=this.w,a=t.x,l=t.y,c=t.z,u=t.w,h,d,p,g,x;return d=i*a+s*l+r*c+o*u,d<0&&(d=-d,a=-a,l=-l,c=-c,u=-u),1-d>1e-6?(h=Math.acos(d),p=Math.sin(h),g=Math.sin((1-e)*h)/p,x=Math.sin(e*h)/p):(g=1-e,x=e),n.x=g*i+x*a,n.y=g*s+x*l,n.z=g*r+x*c,n.w=g*o+x*u,n}integrate(t,e,n,i){i===void 0&&(i=new f);let s=t.x*n.x,r=t.y*n.y,o=t.z*n.z,a=this.x,l=this.y,c=this.z,u=this.w,h=e*.5;return i.x+=h*(s*u+r*c-o*l),i.y+=h*(r*u+o*a-s*c),i.z+=h*(o*u+s*l-r*a),i.w+=h*(-s*a-r*l-o*c),i}},Cr=new m,Rr=new m,Ir={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256},G=class f{constructor(t){t===void 0&&(t={}),this.id=f.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}};G.idCounter=0;G.types=Ir;var nt=class f{constructor(t){t===void 0&&(t={}),this.position=new m,this.quaternion=new xt,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return f.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return f.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new m),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new m),n.vsub(t,i),e.conjugate(ys),ys.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new m),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new m),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new m),e.w*=-1,e.vmult(n,i),e.w*=-1,i}},ys=new xt,Be=class f extends G{constructor(t){t===void 0&&(t={});let{vertices:e=[],faces:n=[],normals:i=[],axes:s,boundingSphereRadius:r}=t;super({type:G.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){let t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;let i=new m;for(let s=0;s!==t.length;s++){let r=t[s],o=r.length;for(let a=0;a!==o;a++){let l=(a+1)%o;e[r[a]].vsub(e[r[l]],i),i.normalize();let c=!1;for(let u=0;u!==n.length;u++)if(n[u].almostEquals(i)||n[u].almostEquals(i)){c=!0;break}c||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);let e=this.faceNormals[t]||new m;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;let n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){let n=this.faces[t],i=this.vertices[n[0]],s=this.vertices[n[1]],r=this.vertices[n[2]];f.computeNormal(i,s,r,e)}static computeNormal(t,e,n,i){let s=new m,r=new m;e.vsub(t,r),n.vsub(e,s),s.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,s,r,o,a,l){let c=new m,u=-1,h=-Number.MAX_VALUE;for(let p=0;p<n.faces.length;p++){c.copy(n.faceNormals[p]),s.vmult(c,c);let g=c.dot(r);g>h&&(h=g,u=p)}let d=[];for(let p=0;p<n.faces[u].length;p++){let g=n.vertices[n.faces[u][p]],x=new m;x.copy(g),s.vmult(x,x),i.vadd(x,x),d.push(x)}u>=0&&this.clipFaceAgainstHull(r,t,e,d,o,a,l)}findSeparatingAxis(t,e,n,i,s,r,o,a){let l=new m,c=new m,u=new m,h=new m,d=new m,p=new m,g=Number.MAX_VALUE,x=this;if(x.uniqueAxes)for(let v=0;v!==x.uniqueAxes.length;v++){n.vmult(x.uniqueAxes[v],l);let _=x.testSepAxis(l,t,e,n,i,s);if(_===!1)return!1;_<g&&(g=_,r.copy(l))}else{let v=o?o.length:x.faces.length;for(let _=0;_<v;_++){let S=o?o[_]:_;l.copy(x.faceNormals[S]),n.vmult(l,l);let y=x.testSepAxis(l,t,e,n,i,s);if(y===!1)return!1;y<g&&(g=y,r.copy(l))}}if(t.uniqueAxes)for(let v=0;v!==t.uniqueAxes.length;v++){s.vmult(t.uniqueAxes[v],c);let _=x.testSepAxis(c,t,e,n,i,s);if(_===!1)return!1;_<g&&(g=_,r.copy(c))}else{let v=a?a.length:t.faces.length;for(let _=0;_<v;_++){let S=a?a[_]:_;c.copy(t.faceNormals[S]),s.vmult(c,c);let y=x.testSepAxis(c,t,e,n,i,s);if(y===!1)return!1;y<g&&(g=y,r.copy(c))}}for(let v=0;v!==x.uniqueEdges.length;v++){n.vmult(x.uniqueEdges[v],h);for(let _=0;_!==t.uniqueEdges.length;_++)if(s.vmult(t.uniqueEdges[_],d),h.cross(d,p),!p.almostZero()){p.normalize();let S=x.testSepAxis(p,t,e,n,i,s);if(S===!1)return!1;S<g&&(g=S,r.copy(p))}}return i.vsub(e,u),u.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,s,r){let o=this;f.project(o,t,n,i,ei),f.project(e,t,s,r,ni);let a=ei[0],l=ei[1],c=ni[0],u=ni[1];if(a<u||c<l)return!1;let h=a-u,d=c-l;return h<d?h:d}calculateLocalInertia(t,e){let n=new m,i=new m;this.computeLocalAABB(i,n);let s=n.x-i.x,r=n.y-i.y,o=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*o*2*o),e.y=1/12*t*(2*s*2*s+2*o*2*o),e.z=1/12*t*(2*r*2*r+2*s*2*s)}getPlaneConstantOfFace(t){let e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,s,r,o){let a=new m,l=new m,c=new m,u=new m,h=new m,d=new m,p=new m,g=new m,x=this,v=[],_=i,S=v,y=-1,b=Number.MAX_VALUE;for(let T=0;T<x.faces.length;T++){a.copy(x.faceNormals[T]),n.vmult(a,a);let D=a.dot(t);D<b&&(b=D,y=T)}if(y<0)return;let M=x.faces[y];M.connectedFaces=[];for(let T=0;T<x.faces.length;T++)for(let D=0;D<x.faces[T].length;D++)M.indexOf(x.faces[T][D])!==-1&&T!==y&&M.connectedFaces.indexOf(T)===-1&&M.connectedFaces.push(T);let w=M.length;for(let T=0;T<w;T++){let D=x.vertices[M[T]],O=x.vertices[M[(T+1)%w]];D.vsub(O,l),c.copy(l),n.vmult(c,c),e.vadd(c,c),u.copy(this.faceNormals[y]),n.vmult(u,u),e.vadd(u,u),c.cross(u,h),h.negate(h),d.copy(D),n.vmult(d,d),e.vadd(d,d);let E=M.connectedFaces[T];p.copy(this.faceNormals[E]);let F=this.getPlaneConstantOfFace(E);g.copy(p),n.vmult(g,g);let C=F-g.dot(e);for(this.clipFaceAgainstPlane(_,S,g,C);_.length;)_.shift();for(;S.length;)_.push(S.shift())}p.copy(this.faceNormals[y]);let A=this.getPlaneConstantOfFace(y);g.copy(p),n.vmult(g,g);let R=A-g.dot(e);for(let T=0;T<_.length;T++){let D=g.dot(_[T])+R;if(D<=s&&(console.log(`clamped: depth=${D} to minDist=${s}`),D=s),D<=r){let O=_[T];if(D<=1e-6){let E={point:O,normal:g,depth:D};o.push(E)}}}}clipFaceAgainstPlane(t,e,n,i){let s,r,o=t.length;if(o<2)return e;let a=t[t.length-1],l=t[0];s=n.dot(a)+i;for(let c=0;c<o;c++){if(l=t[c],r=n.dot(l)+i,s<0)if(r<0){let u=new m;u.copy(l),e.push(u)}else{let u=new m;a.lerp(l,s/(s-r),u),e.push(u)}else if(r<0){let u=new m;a.lerp(l,s/(s-r),u),e.push(u),e.push(l)}a=l,s=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new m);let n=this.vertices,i=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)e.vmult(n[s],i[s]),t.vadd(i[s],i[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){let n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){let s=n[i];s.x<t.x?t.x=s.x:s.x>e.x&&(e.x=s.x),s.y<t.y?t.y=s.y:s.y>e.y&&(e.y=s.y),s.z<t.z?t.z=s.z:s.z>e.z&&(e.z=s.z)}}computeWorldFaceNormals(t){let e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new m);let n=this.faceNormals,i=this.worldFaceNormals;for(let s=0;s!==e;s++)t.vmult(n[s],i[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0,e=this.vertices;for(let n=0;n!==e.length;n++){let i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){let s=this.vertices,r,o,a,l,c,u,h=new m;for(let d=0;d<s.length;d++){h.copy(s[d]),e.vmult(h,h),t.vadd(h,h);let p=h;(r===void 0||p.x<r)&&(r=p.x),(l===void 0||p.x>l)&&(l=p.x),(o===void 0||p.y<o)&&(o=p.y),(c===void 0||p.y>c)&&(c=p.y),(a===void 0||p.z<a)&&(a=p.z),(u===void 0||p.z>u)&&(u=p.z)}n.set(r,o,a),i.set(l,c,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new m);let e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){let n=this.vertices.length,i=this.vertices;if(e){for(let s=0;s<n;s++){let r=i[s];e.vmult(r,r)}for(let s=0;s<this.faceNormals.length;s++){let r=this.faceNormals[s];e.vmult(r,r)}}if(t)for(let s=0;s<n;s++){let r=i[s];r.vadd(t,r)}}pointIsInside(t){let e=this.vertices,n=this.faces,i=this.faceNormals,s=null,r=new m;this.getAveragePointLocal(r);for(let o=0;o<this.faces.length;o++){let a=i[o],l=e[n[o][0]],c=new m;t.vsub(l,c);let u=a.dot(c),h=new m;r.vsub(l,h);let d=a.dot(h);if(u<0&&d>0||u>0&&d<0)return!1}return s?1:-1}static project(t,e,n,i,s){let r=t.vertices.length,o=Lr,a=0,l=0,c=Nr,u=t.vertices;c.setZero(),nt.vectorToLocalFrame(n,i,e,o),nt.pointToLocalFrame(n,i,c,c);let h=c.dot(o);l=a=u[0].dot(o);for(let d=1;d<r;d++){let p=u[d].dot(o);p>a&&(a=p),p<l&&(l=p)}if(l-=h,a-=h,l>a){let d=l;l=a,a=d}s[0]=a,s[1]=l}},ei=[],ni=[],Pr=new m,Lr=new m,Nr=new m,Oe=class f extends G{constructor(t){super({type:G.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){let t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=m,s=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],o=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],a=new Be({vertices:s,faces:r,axes:o});this.convexPolyhedronRepresentation=a,a.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new m),f.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){let i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){let n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let s=0;s!==n.length;s++)e.vmult(n[s],n[s]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){let i=this.halfExtents,s=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<s.length;r++)Jt.set(s[r][0],s[r][1],s[r][2]),e.vmult(Jt,Jt),t.vadd(Jt,Jt),n(Jt.x,Jt.y,Jt.z)}calculateWorldAABB(t,e,n,i){let s=this.halfExtents;Ft[0].set(s.x,s.y,s.z),Ft[1].set(-s.x,s.y,s.z),Ft[2].set(-s.x,-s.y,s.z),Ft[3].set(-s.x,-s.y,-s.z),Ft[4].set(s.x,-s.y,-s.z),Ft[5].set(s.x,s.y,-s.z),Ft[6].set(-s.x,s.y,-s.z),Ft[7].set(s.x,-s.y,s.z);let r=Ft[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let o=1;o<8;o++){let a=Ft[o];e.vmult(a,a),t.vadd(a,a);let l=a.x,c=a.y,u=a.z;l>i.x&&(i.x=l),c>i.y&&(i.y=c),u>i.z&&(i.z=u),l<n.x&&(n.x=l),c<n.y&&(n.y=c),u<n.z&&(n.z=u)}}},Jt=new m,Ft=[new m,new m,new m,new m,new m,new m,new m,new m],gi={DYNAMIC:1,STATIC:2,KINEMATIC:4},xi={AWAKE:0,SLEEPY:1,SLEEPING:2},j=class f extends dn{constructor(t){t===void 0&&(t={}),super(),this.id=f.idCounter++,this.index=-1,this.world=null,this.vlambda=new m,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new m,this.previousPosition=new m,this.interpolatedPosition=new m,this.initPosition=new m,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new m,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new m,this.force=new m;let e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?f.STATIC:f.DYNAMIC,typeof t.type==typeof f.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=f.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new m,this.quaternion=new xt,this.initQuaternion=new xt,this.previousQuaternion=new xt,this.interpolatedQuaternion=new xt,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new m,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new m,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new m,this.invInertia=new m,this.invInertiaWorld=new jt,this.invMassSolve=0,this.invInertiaSolve=new m,this.invInertiaWorldSolve=new jt,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new m(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new m(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new St,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new m,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){let t=this.sleepState;this.sleepState=f.AWAKE,this.wakeUpAfterNarrowphase=!1,t===f.SLEEPING&&this.dispatchEvent(f.wakeupEvent)}sleep(){this.sleepState=f.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){let e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===f.AWAKE&&n<i?(this.sleepState=f.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(f.sleepyEvent)):e===f.SLEEPY&&n>i?this.wakeUp():e===f.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(f.sleepEvent))}}updateSolveMassProperties(){this.sleepState===f.SLEEPING||this.type===f.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new m),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new m),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new m),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new m),this.quaternion.vmult(t,e),e}addShape(t,e,n){let i=new m,s=new xt;return e&&i.copy(e),n&&s.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){let e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){let t=this.shapes,e=this.shapeOffsets,n=t.length,i=0;for(let s=0;s!==n;s++){let r=t[s];r.updateBoundingSphereRadius();let o=e[s].length(),a=r.boundingSphereRadius;o+a>i&&(i=o+a)}this.boundingRadius=i}updateAABB(){let t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,s=Dr,r=Fr,o=this.quaternion,a=this.aabb,l=Ur;for(let c=0;c!==i;c++){let u=t[c];o.vmult(e[c],s),s.vadd(this.position,s),o.mult(n[c],r),u.calculateWorldAABB(s,r,l.lowerBound,l.upperBound),c===0?a.copy(l):a.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){let e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){let n=Br,i=Or;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new m),this.type!==f.DYNAMIC)return;this.sleepState===f.SLEEPING&&this.wakeUp();let n=Vr;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new m),this.type!==f.DYNAMIC)return;let n=kr,i=Gr;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===f.DYNAMIC&&(this.sleepState===f.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new m),this.type!==f.DYNAMIC)return;this.sleepState===f.SLEEPING&&this.wakeUp();let n=e,i=Hr;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);let s=Wr;n.cross(t,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new m),this.type!==f.DYNAMIC)return;let n=qr,i=Xr;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){let t=Yr;this.invMass=this.mass>0?1/this.mass:0;let e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),Oe.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){let n=new m;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===f.DYNAMIC||this.type===f.KINEMATIC)||this.sleepState===f.SLEEPING)return;let i=this.velocity,s=this.angularVelocity,r=this.position,o=this.force,a=this.torque,l=this.quaternion,c=this.invMass,u=this.invInertiaWorld,h=this.linearFactor,d=c*t;i.x+=o.x*d*h.x,i.y+=o.y*d*h.y,i.z+=o.z*d*h.z;let p=u.elements,g=this.angularFactor,x=a.x*g.x,v=a.y*g.y,_=a.z*g.z;s.x+=t*(p[0]*x+p[1]*v+p[2]*_),s.y+=t*(p[3]*x+p[4]*v+p[5]*_),s.z+=t*(p[6]*x+p[7]*v+p[8]*_),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}};j.idCounter=0;j.COLLIDE_EVENT_NAME="collide";j.DYNAMIC=gi.DYNAMIC;j.STATIC=gi.STATIC;j.KINEMATIC=gi.KINEMATIC;j.AWAKE=xi.AWAKE;j.SLEEPY=xi.SLEEPY;j.SLEEPING=xi.SLEEPING;j.wakeupEvent={type:"wakeup"};j.sleepyEvent={type:"sleepy"};j.sleepEvent={type:"sleep"};var Dr=new m,Fr=new xt,Ur=new St,Br=new jt,Or=new jt,zr=new jt,Vr=new m,kr=new m,Gr=new m,Hr=new m,Wr=new m,qr=new m,Xr=new m,Yr=new m,fn=class{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!((t.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&t.collisionFilterMask)===0||((t.type&j.STATIC)!==0||t.sleepState===j.SLEEPING)&&((e.type&j.STATIC)!==0||e.sleepState===j.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){let s=$r;e.position.vsub(t.position,s);let r=(t.boundingRadius+e.boundingRadius)**2;s.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){let n=Zr,i=Jr,s=jr,r=t.length;for(let o=0;o!==r;o++)i[o]=t[o],s[o]=e[o];t.length=0,e.length=0;for(let o=0;o!==r;o++){let a=i[o].id,l=s[o].id,c=a<l?`${a},${l}`:`${l},${a}`;n[c]=o,n.keys.push(c)}for(let o=0;o!==n.keys.length;o++){let a=n.keys.pop(),l=n[a];t.push(i[l]),e.push(s[l]),delete n[a]}}setWorld(t){}static boundingSphereCheck(t,e){let n=new m;t.position.vsub(e.position,n);let i=t.shapes[0],s=e.shapes[0];return Math.pow(i.boundingSphereRadius+s.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}},$r=new m;new m;new xt;new m;var Zr={keys:[]},Jr=[],jr=[];new m;var ru=new m;new m;var ai=class extends fn{constructor(){super()}collisionPairs(t,e,n){let i=t.bodies,s=i.length,r,o;for(let a=0;a!==s;a++)for(let l=0;l!==a;l++)r=i[a],o=i[l],this.needBroadphaseCollision(r,o)&&this.intersectionTest(r,o,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){let s=t.bodies[i];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(e)&&n.push(s)}return n}},ve=class{constructor(){this.rayFromWorld=new m,this.rayToWorld=new m,this.hitNormalWorld=new m,this.hitPointWorld=new m,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,s,r,o){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=s,this.body=r,this.distance=o}},Ls,Ns,Ds,Fs,Us,Bs,Os,_i={CLOSEST:1,ANY:2,ALL:4};Ls=G.types.SPHERE;Ns=G.types.PLANE;Ds=G.types.BOX;Fs=G.types.CYLINDER;Us=G.types.CONVEXPOLYHEDRON;Bs=G.types.HEIGHTFIELD;Os=G.types.TRIMESH;var Tt=class f{get[Ls](){return this._intersectSphere}get[Ns](){return this._intersectPlane}get[Ds](){return this._intersectBox}get[Fs](){return this._intersectConvex}get[Us](){return this._intersectConvex}get[Bs](){return this._intersectHeightfield}get[Os](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new m),e===void 0&&(e=new m),this.from=t.clone(),this.to=e.clone(),this.direction=new m,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=f.ANY,this.result=new ve,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||f.ANY,this.result=e.result||new ve,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Ss),ii.length=0,t.broadphase.aabbQuery(t,Ss,ii),this.intersectBodies(ii),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());let n=this.checkCollisionResponse;if(n&&!t.collisionResponse||(this.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&this.collisionFilterMask)===0)return;let i=Kr,s=Qr;for(let r=0,o=t.shapes.length;r<o;r++){let a=t.shapes[r];if(!(n&&!a.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],s),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(a,s,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){let s=this.from;if(go(s,this.direction,n)>t.boundingSphereRadius)return;let o=this[t.type];o&&o.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,s){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,s)}_intersectPlane(t,e,n,i,s){let r=this.from,o=this.to,a=this.direction,l=new m(0,0,1);e.vmult(l,l);let c=new m;r.vsub(n,c);let u=c.dot(l);o.vsub(n,c);let h=c.dot(l);if(u*h>0||r.distanceTo(o)<u)return;let d=l.dot(a);if(Math.abs(d)<this.precision)return;let p=new m,g=new m,x=new m;r.vsub(n,p);let v=-l.dot(p)/d;a.scale(v,g),r.vadd(g,x),this.reportIntersection(l,x,s,i,-1)}getAABB(t){let{lowerBound:e,upperBound:n}=t,i=this.to,s=this.from;e.x=Math.min(i.x,s.x),e.y=Math.min(i.y,s.y),e.z=Math.min(i.z,s.z),n.x=Math.max(i.x,s.x),n.y=Math.max(i.y,s.y),n.z=Math.max(i.z,s.z)}_intersectHeightfield(t,e,n,i,s){t.data,t.elementSize;let r=to;r.from.copy(this.from),r.to.copy(this.to),nt.pointToLocalFrame(n,e,r.from,r.from),nt.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();let o=eo,a,l,c,u;a=l=0,c=u=t.data.length-1;let h=new St;r.getAABB(h),t.getIndexOfPosition(h.lowerBound.x,h.lowerBound.y,o,!0),a=Math.max(a,o[0]),l=Math.max(l,o[1]),t.getIndexOfPosition(h.upperBound.x,h.upperBound.y,o,!0),c=Math.min(c,o[0]+1),u=Math.min(u,o[1]+1);for(let d=a;d<c;d++)for(let p=l;p<u;p++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(d,p,h),!!h.overlapsRay(r)){if(t.getConvexTrianglePillar(d,p,!1),nt.pointToWorldFrame(n,e,t.pillarOffset,on),this._intersectConvex(t.pillarConvex,e,on,i,s,bs),this.result.shouldStop)return;t.getConvexTrianglePillar(d,p,!0),nt.pointToWorldFrame(n,e,t.pillarOffset,on),this._intersectConvex(t.pillarConvex,e,on,i,s,bs)}}}_intersectSphere(t,e,n,i,s){let r=this.from,o=this.to,a=t.radius,l=(o.x-r.x)**2+(o.y-r.y)**2+(o.z-r.z)**2,c=2*((o.x-r.x)*(r.x-n.x)+(o.y-r.y)*(r.y-n.y)+(o.z-r.z)*(r.z-n.z)),u=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-a**2,h=c**2-4*l*u,d=no,p=io;if(!(h<0))if(h===0)r.lerp(o,h,d),d.vsub(n,p),p.normalize(),this.reportIntersection(p,d,s,i,-1);else{let g=(-c-Math.sqrt(h))/(2*l),x=(-c+Math.sqrt(h))/(2*l);if(g>=0&&g<=1&&(r.lerp(o,g,d),d.vsub(n,p),p.normalize(),this.reportIntersection(p,d,s,i,-1)),this.result.shouldStop)return;x>=0&&x<=1&&(r.lerp(o,x,d),d.vsub(n,p),p.normalize(),this.reportIntersection(p,d,s,i,-1))}}_intersectConvex(t,e,n,i,s,r){let o=so,a=Ms,l=r&&r.faceList||null,c=t.faces,u=t.vertices,h=t.faceNormals,d=this.direction,p=this.from,g=this.to,x=p.distanceTo(g),v=l?l.length:c.length,_=this.result;for(let S=0;!_.shouldStop&&S<v;S++){let y=l?l[S]:S,b=c[y],M=h[y],w=e,A=n;a.copy(u[b[0]]),w.vmult(a,a),a.vadd(A,a),a.vsub(p,a),w.vmult(M,o);let R=d.dot(o);if(Math.abs(R)<this.precision)continue;let T=o.dot(a)/R;if(!(T<0)){d.scale(T,vt),vt.vadd(p,vt),Lt.copy(u[b[0]]),w.vmult(Lt,Lt),A.vadd(Lt,Lt);for(let D=1;!_.shouldStop&&D<b.length-1;D++){Ut.copy(u[b[D]]),Bt.copy(u[b[D+1]]),w.vmult(Ut,Ut),w.vmult(Bt,Bt),A.vadd(Ut,Ut),A.vadd(Bt,Bt);let O=vt.distanceTo(p);!(f.pointInTriangle(vt,Lt,Ut,Bt)||f.pointInTriangle(vt,Ut,Lt,Bt))||O>x||this.reportIntersection(o,vt,s,i,y)}}}}_intersectTrimesh(t,e,n,i,s,r){let o=ao,a=po,l=mo,c=Ms,u=lo,h=co,d=ho,p=fo,g=uo,x=t.indices;t.vertices;let v=this.from,_=this.to,S=this.direction;l.position.copy(n),l.quaternion.copy(e),nt.vectorToLocalFrame(n,e,S,u),nt.pointToLocalFrame(n,e,v,h),nt.pointToLocalFrame(n,e,_,d),d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,h.x*=t.scale.x,h.y*=t.scale.y,h.z*=t.scale.z,d.vsub(h,u),u.normalize();let y=h.distanceSquared(d);t.tree.rayQuery(this,l,a);for(let b=0,M=a.length;!this.result.shouldStop&&b!==M;b++){let w=a[b];t.getNormal(w,o),t.getVertex(x[w*3],Lt),Lt.vsub(h,c);let A=u.dot(o),R=o.dot(c)/A;if(R<0)continue;u.scale(R,vt),vt.vadd(h,vt),t.getVertex(x[w*3+1],Ut),t.getVertex(x[w*3+2],Bt);let T=vt.distanceSquared(h);!(f.pointInTriangle(vt,Ut,Lt,Bt)||f.pointInTriangle(vt,Lt,Ut,Bt))||T>y||(nt.vectorToWorldFrame(e,o,g),nt.pointToWorldFrame(n,e,vt,p),this.reportIntersection(g,p,s,i,w))}a.length=0}reportIntersection(t,e,n,i,s){let r=this.from,o=this.to,a=r.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case f.ALL:this.hasHit=!0,l.set(r,o,t,e,n,i,a),l.hasHit=!0,this.callback(l);break;case f.CLOSEST:(a<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(r,o,t,e,n,i,a));break;case f.ANY:this.hasHit=!0,l.hasHit=!0,l.set(r,o,t,e,n,i,a),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,ce),n.vsub(e,Ne),t.vsub(e,si);let s=ce.dot(ce),r=ce.dot(Ne),o=ce.dot(si),a=Ne.dot(Ne),l=Ne.dot(si),c,u;return(c=a*o-r*l)>=0&&(u=s*l-r*o)>=0&&c+u<s*a-r*r}};Tt.CLOSEST=_i.CLOSEST;Tt.ANY=_i.ANY;Tt.ALL=_i.ALL;var Ss=new St,ii=[],Ne=new m,si=new m,Kr=new m,Qr=new xt,vt=new m,Lt=new m,Ut=new m,Bt=new m;new m;new ve;var bs={faceList:[0]},on=new m,to=new Tt,eo=[],no=new m,io=new m,so=new m,ro=new m,oo=new m,Ms=new m,ao=new m,lo=new m,co=new m,ho=new m,uo=new m,fo=new m;new St;var po=[],mo=new nt,ce=new m,an=new m;function go(f,t,e){e.vsub(f,ce);let n=ce.dot(t);return t.scale(n,an),an.vadd(f,an),e.distanceTo(an)}var pn=class f extends fn{static checkBounds(t,e,n){let i,s;n===0?(i=t.position.x,s=e.position.x):n===1?(i=t.position.y,s=e.position.y):n===2&&(i=t.position.z,s=e.position.z);let r=t.boundingRadius,o=e.boundingRadius,a=i+r;return s-o<a}static insertionSortX(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.x<=i.aabb.lowerBound.x);s--)t[s+1]=t[s];t[s+1]=i}return t}static insertionSortY(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.y<=i.aabb.lowerBound.y);s--)t[s+1]=t[s];t[s+1]=i}return t}static insertionSortZ(t){for(let e=1,n=t.length;e<n;e++){let i=t[e],s;for(s=e-1;s>=0&&!(t[s].aabb.lowerBound.z<=i.aabb.lowerBound.z);s--)t[s+1]=t[s];t[s+1]=i}return t}constructor(t){super(),this.axisList=[],this.world=null,this.axisIndex=0;let e=this.axisList;this._addBodyHandler=n=>{e.push(n.body)},this._removeBodyHandler=n=>{let i=e.indexOf(n.body);i!==-1&&e.splice(i,1)},t&&this.setWorld(t)}setWorld(t){this.axisList.length=0;for(let e=0;e<t.bodies.length;e++)this.axisList.push(t.bodies[e]);t.removeEventListener("addBody",this._addBodyHandler),t.removeEventListener("removeBody",this._removeBodyHandler),t.addEventListener("addBody",this._addBodyHandler),t.addEventListener("removeBody",this._removeBodyHandler),this.world=t,this.dirty=!0}collisionPairs(t,e,n){let i=this.axisList,s=i.length,r=this.axisIndex,o,a;for(this.dirty&&(this.sortList(),this.dirty=!1),o=0;o!==s;o++){let l=i[o];for(a=o+1;a<s;a++){let c=i[a];if(this.needBroadphaseCollision(l,c)){if(!f.checkBounds(l,c,r))break;this.intersectionTest(l,c,e,n)}}}}sortList(){let t=this.axisList,e=this.axisIndex,n=t.length;for(let i=0;i!==n;i++){let s=t[i];s.aabbNeedsUpdate&&s.updateAABB()}e===0?f.insertionSortX(t):e===1?f.insertionSortY(t):e===2&&f.insertionSortZ(t)}autoDetectAxis(){let t=0,e=0,n=0,i=0,s=0,r=0,o=this.axisList,a=o.length,l=1/a;for(let d=0;d!==a;d++){let p=o[d],g=p.position.x;t+=g,e+=g*g;let x=p.position.y;n+=x,i+=x*x;let v=p.position.z;s+=v,r+=v*v}let c=e-t*t*l,u=i-n*n*l,h=r-s*s*l;c>u?c>h?this.axisIndex=0:this.axisIndex=2:u>h?this.axisIndex=1:this.axisIndex=2}aabbQuery(t,e,n){n===void 0&&(n=[]),this.dirty&&(this.sortList(),this.dirty=!1);let i=this.axisIndex,s="x";i===1&&(s="y"),i===2&&(s="z");let r=this.axisList;e.lowerBound[s],e.upperBound[s];for(let o=0;o<r.length;o++){let a=r[o];a.aabbNeedsUpdate&&a.updateAABB(),a.aabb.overlaps(e)&&n.push(a)}return n}},mn=class{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}},li=class f{constructor(t,e,n){n===void 0&&(n={}),n=mn.defaults(n,{collideConnected:!0,wakeUpBodies:!0}),this.equations=[],this.bodyA=t,this.bodyB=e,this.id=f.idCounter++,this.collideConnected=n.collideConnected,n.wakeUpBodies&&(t&&t.wakeUp(),e&&e.wakeUp())}update(){throw new Error("method update() not implmemented in this Constraint subclass!")}enable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!0}disable(){let t=this.equations;for(let e=0;e<t.length;e++)t[e].enabled=!1}};li.idCounter=0;var gn=class{constructor(){this.spatial=new m,this.rotational=new m}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}},ze=class f{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=f.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new gn,this.jacobianElementB=new gn,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){let i=e,s=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*s*(1+4*i))}computeB(t,e,n){let i=this.computeGW(),s=this.computeGq(),r=this.computeGiMf();return-s*t-i*e-r*n}computeGq(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.position,r=i.position;return t.spatial.dot(s)+e.spatial.dot(r)}computeGW(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.velocity,r=i.velocity,o=n.angularVelocity,a=i.angularVelocity;return t.multiplyVectors(s,o)+e.multiplyVectors(r,a)}computeGWlambda(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.vlambda,r=i.vlambda,o=n.wlambda,a=i.wlambda;return t.multiplyVectors(s,o)+e.multiplyVectors(r,a)}computeGiMf(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.force,r=n.torque,o=i.force,a=i.torque,l=n.invMassSolve,c=i.invMassSolve;return s.scale(l,ws),o.scale(c,As),n.invInertiaWorldSolve.vmult(r,Es),i.invInertiaWorldSolve.vmult(a,Ts),t.multiplyVectors(ws,Es)+e.multiplyVectors(As,Ts)}computeGiMGt(){let t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,s=n.invMassSolve,r=i.invMassSolve,o=n.invInertiaWorldSolve,a=i.invInertiaWorldSolve,l=s+r;return o.vmult(t.rotational,ln),l+=ln.dot(t.rotational),a.vmult(e.rotational,ln),l+=ln.dot(e.rotational),l}addToWlambda(t){let e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,s=this.bj,r=xo;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),s.vlambda.addScaledVector(s.invMassSolve*t,n.spatial,s.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),s.invInertiaWorldSolve.vmult(n.rotational,r),s.wlambda.addScaledVector(t,r,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}};ze.idCounter=0;var ws=new m,As=new m,Es=new m,Ts=new m,ln=new m,xo=new m,ci=class extends ze{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new m,this.rj=new m,this.ni=new m}computeB(t){let e=this.a,n=this.b,i=this.bi,s=this.bj,r=this.ri,o=this.rj,a=_o,l=vo,c=i.velocity,u=i.angularVelocity;i.force,i.torque;let h=s.velocity,d=s.angularVelocity;s.force,s.torque;let p=yo,g=this.jacobianElementA,x=this.jacobianElementB,v=this.ni;r.cross(v,a),o.cross(v,l),v.negate(g.spatial),a.negate(g.rotational),x.spatial.copy(v),x.rotational.copy(l),p.copy(s.position),p.vadd(o,p),p.vsub(i.position,p),p.vsub(r,p);let _=v.dot(p),S=this.restitution+1,y=S*h.dot(v)-S*c.dot(v)+d.dot(l)-u.dot(a),b=this.computeGiMf();return-_*e-y*n-t*b}getImpactVelocityAlongNormal(){let t=So,e=bo,n=Mo,i=wo,s=Ao;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,s),this.ni.dot(s)}},_o=new m,vo=new m,yo=new m,So=new m,bo=new m,Mo=new m,wo=new m,Ao=new m;var ou=new m,au=new m;var lu=new m,cu=new m;new m;new m;var hu=new m,uu=new m;var du=new m,fu=new m,xn=class extends ze{constructor(t,e,n){super(t,e,-n,n),this.ri=new m,this.rj=new m,this.t=new m}computeB(t){this.a;let e=this.b;this.bi,this.bj;let n=this.ri,i=this.rj,s=Eo,r=To,o=this.t;n.cross(o,s),i.cross(o,r);let a=this.jacobianElementA,l=this.jacobianElementB;o.negate(a.spatial),s.negate(a.rotational),l.spatial.copy(o),l.rotational.copy(r);let c=this.computeGW(),u=this.computeGiMf();return-c*e-t*u}},Eo=new m,To=new m,_n=class f{constructor(t,e,n){n=mn.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=f.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}};_n.idCounter=0;var vn=class f{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=f.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}};vn.idCounter=0;var pu=new m,mu=new m,gu=new m,xu=new m,_u=new m,vu=new m,yu=new m,Su=new m,bu=new m,Mu=new m,wu=new m;var Au=new m,Eu=new m;new m;new m;new m;var Tu=new m,Cu=new m,Ru=new m;new Tt;new m;var Iu=new m,Pu=new m,Lu=[new m(1,0,0),new m(0,1,0),new m(0,0,1)],Nu=new m;var Du=new m,Fu=new m,Uu=new m;var Bu=new m,Ou=new m,zu=new m,Vu=new m;var ku=new m,Gu=new m,Hu=new m;var Wu=new m,qu=new m;var Xu=new m,Yu=new m,$u=new m,Zu=new m,Ju=new m,ju=new m,Ku=new m;var yn=class extends G{constructor(){super({type:G.types.PLANE}),this.worldNormal=new m,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(t){let e=this.worldNormal;e.set(0,0,1),t.vmult(e,e),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(t,e){return e===void 0&&(e=new m),e}volume(){return Number.MAX_VALUE}calculateWorldAABB(t,e,n,i){zt.set(0,0,1),e.vmult(zt,zt);let s=Number.MAX_VALUE;n.set(-s,-s,-s),i.set(s,s,s),zt.x===1?i.x=t.x:zt.x===-1&&(n.x=t.x),zt.y===1?i.y=t.y:zt.y===-1&&(n.y=t.y),zt.z===1?i.z=t.z:zt.z===-1&&(n.z=t.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}},zt=new m;var Qu=new m,td=new m,ed=new m,nd=new m,id=new m,sd=new m,rd=new m,od=new m,ad=new m;var ld=new m,cd=new St;var hd=new m,ud=new St,dd=new m,fd=new m,pd=new m,md=new m,gd=new m,xd=new m,_d=new m,vd=new St,yd=new m,Sd=new nt,bd=new St,hi=class{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){let e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}},ui=class extends hi{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0,i=this.iterations,s=this.tolerance*this.tolerance,r=this.equations,o=r.length,a=e.bodies,l=a.length,c=t,u,h,d,p,g,x;if(o!==0)for(let y=0;y!==l;y++)a[y].updateSolveMassProperties();let v=Ro,_=Io,S=Co;v.length=o,_.length=o,S.length=o;for(let y=0;y!==o;y++){let b=r[y];S[y]=0,_[y]=b.computeB(c),v[y]=1/b.computeC()}if(o!==0){for(let M=0;M!==l;M++){let w=a[M],A=w.vlambda,R=w.wlambda;A.set(0,0,0),R.set(0,0,0)}for(n=0;n!==i;n++){p=0;for(let M=0;M!==o;M++){let w=r[M];u=_[M],h=v[M],x=S[M],g=w.computeGWlambda(),d=h*(u-g-w.eps*x),x+d<w.minForce?d=w.minForce-x:x+d>w.maxForce&&(d=w.maxForce-x),S[M]+=d,p+=d>0?d:-d,w.addToWlambda(d)}if(p*p<s)break}for(let M=0;M!==l;M++){let w=a[M],A=w.velocity,R=w.angularVelocity;w.vlambda.vmul(w.linearFactor,w.vlambda),A.vadd(w.vlambda,A),w.wlambda.vmul(w.angularFactor,w.wlambda),R.vadd(w.wlambda,R)}let y=r.length,b=1/c;for(;y--;)r[y].multiplier=S[y]*b}return n}},Co=[],Ro=[],Io=[];var Md=j.STATIC;var di=class{constructor(){this.objects=[],this.type=Object}release(){let t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){let e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}},fi=class extends di{constructor(){super(...arguments),this.type=m}constructObject(){return new m}},it={sphereSphere:G.types.SPHERE,spherePlane:G.types.SPHERE|G.types.PLANE,boxBox:G.types.BOX|G.types.BOX,sphereBox:G.types.SPHERE|G.types.BOX,planeBox:G.types.PLANE|G.types.BOX,convexConvex:G.types.CONVEXPOLYHEDRON,sphereConvex:G.types.SPHERE|G.types.CONVEXPOLYHEDRON,planeConvex:G.types.PLANE|G.types.CONVEXPOLYHEDRON,boxConvex:G.types.BOX|G.types.CONVEXPOLYHEDRON,sphereHeightfield:G.types.SPHERE|G.types.HEIGHTFIELD,boxHeightfield:G.types.BOX|G.types.HEIGHTFIELD,convexHeightfield:G.types.CONVEXPOLYHEDRON|G.types.HEIGHTFIELD,sphereParticle:G.types.PARTICLE|G.types.SPHERE,planeParticle:G.types.PLANE|G.types.PARTICLE,boxParticle:G.types.BOX|G.types.PARTICLE,convexParticle:G.types.PARTICLE|G.types.CONVEXPOLYHEDRON,cylinderCylinder:G.types.CYLINDER,sphereCylinder:G.types.SPHERE|G.types.CYLINDER,planeCylinder:G.types.PLANE|G.types.CYLINDER,boxCylinder:G.types.BOX|G.types.CYLINDER,convexCylinder:G.types.CONVEXPOLYHEDRON|G.types.CYLINDER,heightfieldCylinder:G.types.HEIGHTFIELD|G.types.CYLINDER,particleCylinder:G.types.PARTICLE|G.types.CYLINDER,sphereTrimesh:G.types.SPHERE|G.types.TRIMESH,planeTrimesh:G.types.PLANE|G.types.TRIMESH},pi=class{get[it.sphereSphere](){return this.sphereSphere}get[it.spherePlane](){return this.spherePlane}get[it.boxBox](){return this.boxBox}get[it.sphereBox](){return this.sphereBox}get[it.planeBox](){return this.planeBox}get[it.convexConvex](){return this.convexConvex}get[it.sphereConvex](){return this.sphereConvex}get[it.planeConvex](){return this.planeConvex}get[it.boxConvex](){return this.boxConvex}get[it.sphereHeightfield](){return this.sphereHeightfield}get[it.boxHeightfield](){return this.boxHeightfield}get[it.convexHeightfield](){return this.convexHeightfield}get[it.sphereParticle](){return this.sphereParticle}get[it.planeParticle](){return this.planeParticle}get[it.boxParticle](){return this.boxParticle}get[it.convexParticle](){return this.convexParticle}get[it.cylinderCylinder](){return this.convexConvex}get[it.sphereCylinder](){return this.sphereConvex}get[it.planeCylinder](){return this.planeConvex}get[it.boxCylinder](){return this.boxConvex}get[it.convexCylinder](){return this.convexConvex}get[it.heightfieldCylinder](){return this.heightfieldCylinder}get[it.particleCylinder](){return this.particleCylinder}get[it.sphereTrimesh](){return this.sphereTrimesh}get[it.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new fi,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,s,r){let o;this.contactPointPool.length?(o=this.contactPointPool.pop(),o.bi=t,o.bj=e):o=new ci(t,e),o.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;let a=this.currentContactMaterial;o.restitution=a.restitution,o.setSpookParams(a.contactEquationStiffness,a.contactEquationRelaxation,this.world.dt);let l=n.material||t.material,c=i.material||e.material;return l&&c&&l.restitution>=0&&c.restitution>=0&&(o.restitution=l.restitution*c.restitution),o.si=s||n,o.sj=r||i,o}createFrictionEquationsFromContact(t,e){let n=t.bi,i=t.bj,s=t.si,r=t.sj,o=this.world,a=this.currentContactMaterial,l=a.friction,c=s.material||n.material,u=r.material||i.material;if(c&&u&&c.friction>=0&&u.friction>=0&&(l=c.friction*u.friction),l>0){let h=l*(o.frictionGravity||o.gravity).length(),d=n.invMass+i.invMass;d>0&&(d=1/d);let p=this.frictionEquationPool,g=p.length?p.pop():new xn(n,i,h*d),x=p.length?p.pop():new xn(n,i,h*d);return g.bi=x.bi=n,g.bj=x.bj=i,g.minForce=x.minForce=-h*d,g.maxForce=x.maxForce=h*d,g.ri.copy(t.ri),g.rj.copy(t.rj),x.ri.copy(t.ri),x.rj.copy(t.rj),t.ni.tangents(g.t,x.t),g.setSpookParams(a.frictionEquationStiffness,a.frictionEquationRelaxation,o.dt),x.setSpookParams(a.frictionEquationStiffness,a.frictionEquationRelaxation,o.dt),g.enabled=x.enabled=t.enabled,e.push(g,x),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;let n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];le.setZero(),xe.setZero(),_e.setZero();let s=e.bi;e.bj;for(let o=0;o!==t;o++)e=this.result[this.result.length-1-o],e.bi!==s?(le.vadd(e.ni,le),xe.vadd(e.ri,xe),_e.vadd(e.rj,_e)):(le.vsub(e.ni,le),xe.vadd(e.rj,xe),_e.vadd(e.ri,_e));let r=1/t;xe.scale(r,n.ri),_e.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),le.normalize(),le.tangents(n.t,i.t)}getContacts(t,e,n,i,s,r,o){this.contactPointPool=s,this.frictionEquationPool=o,this.result=i,this.frictionResult=r;let a=No,l=Do,c=Po,u=Lo;for(let h=0,d=t.length;h!==d;h++){let p=t[h],g=e[h],x=null;p.material&&g.material&&(x=n.getContactMaterial(p.material,g.material)||null);let v=p.type&j.KINEMATIC&&g.type&j.STATIC||p.type&j.STATIC&&g.type&j.KINEMATIC||p.type&j.KINEMATIC&&g.type&j.KINEMATIC;for(let _=0;_<p.shapes.length;_++){p.quaternion.mult(p.shapeOrientations[_],a),p.quaternion.vmult(p.shapeOffsets[_],c),c.vadd(p.position,c);let S=p.shapes[_];for(let y=0;y<g.shapes.length;y++){g.quaternion.mult(g.shapeOrientations[y],l),g.quaternion.vmult(g.shapeOffsets[y],u),u.vadd(g.position,u);let b=g.shapes[y];if(!(S.collisionFilterMask&b.collisionFilterGroup&&b.collisionFilterMask&S.collisionFilterGroup)||c.distanceTo(u)>S.boundingSphereRadius+b.boundingSphereRadius)continue;let M=null;S.material&&b.material&&(M=n.getContactMaterial(S.material,b.material)||null),this.currentContactMaterial=M||x||n.defaultContactMaterial;let w=S.type|b.type,A=this[w];if(A){let R=!1;S.type<b.type?R=A.call(this,S,b,c,u,a,l,p,g,S,b,v):R=A.call(this,b,S,u,c,l,a,g,p,S,b,v),R&&v&&(n.shapeOverlapKeeper.set(S.id,b.id),n.bodyOverlapKeeper.set(p.id,g.id))}}}}}sphereSphere(t,e,n,i,s,r,o,a,l,c,u){if(u)return n.distanceSquared(i)<(t.radius+e.radius)**2;let h=this.createContactEquation(o,a,t,e,l,c);i.vsub(n,h.ni),h.ni.normalize(),h.ri.copy(h.ni),h.rj.copy(h.ni),h.ri.scale(t.radius,h.ri),h.rj.scale(-e.radius,h.rj),h.ri.vadd(n,h.ri),h.ri.vsub(o.position,h.ri),h.rj.vadd(i,h.rj),h.rj.vsub(a.position,h.rj),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}spherePlane(t,e,n,i,s,r,o,a,l,c,u){let h=this.createContactEquation(o,a,t,e,l,c);if(h.ni.set(0,0,1),r.vmult(h.ni,h.ni),h.ni.negate(h.ni),h.ni.normalize(),h.ni.scale(t.radius,h.ri),n.vsub(i,cn),h.ni.scale(h.ni.dot(cn),Cs),cn.vsub(Cs,h.rj),-cn.dot(h.ni)<=t.radius){if(u)return!0;let d=h.ri,p=h.rj;d.vadd(n,d),d.vsub(o.position,d),p.vadd(i,p),p.vsub(a.position,p),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}}boxBox(t,e,n,i,s,r,o,a,l,c,u){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,s,r,o,a,t,e,u)}sphereBox(t,e,n,i,s,r,o,a,l,c,u){let h=this.v3pool,d=oa;n.vsub(i,hn),e.getSideNormals(d,r);let p=t.radius,g=!1,x=la,v=ca,_=ha,S=null,y=0,b=0,M=0,w=null;for(let I=0,K=d.length;I!==K&&g===!1;I++){let X=ia;X.copy(d[I]);let W=X.length();X.normalize();let Y=hn.dot(X);if(Y<W+p&&Y>0){let B=sa,U=ra;B.copy(d[(I+1)%3]),U.copy(d[(I+2)%3]);let q=B.length(),H=U.length();B.normalize(),U.normalize();let P=hn.dot(B),z=hn.dot(U);if(P<q&&P>-q&&z<H&&z>-H){let V=Math.abs(Y-W-p);if((w===null||V<w)&&(w=V,b=P,M=z,S=W,x.copy(X),v.copy(B),_.copy(U),y++,u))return!0}}}if(y){g=!0;let I=this.createContactEquation(o,a,t,e,l,c);x.scale(-p,I.ri),I.ni.copy(x),I.ni.negate(I.ni),x.scale(S,x),v.scale(b,v),x.vadd(v,x),_.scale(M,_),x.vadd(_,I.rj),I.ri.vadd(n,I.ri),I.ri.vsub(o.position,I.ri),I.rj.vadd(i,I.rj),I.rj.vsub(a.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}let A=h.get(),R=aa;for(let I=0;I!==2&&!g;I++)for(let K=0;K!==2&&!g;K++)for(let X=0;X!==2&&!g;X++)if(A.set(0,0,0),I?A.vadd(d[0],A):A.vsub(d[0],A),K?A.vadd(d[1],A):A.vsub(d[1],A),X?A.vadd(d[2],A):A.vsub(d[2],A),i.vadd(A,R),R.vsub(n,R),R.lengthSquared()<p*p){if(u)return!0;g=!0;let W=this.createContactEquation(o,a,t,e,l,c);W.ri.copy(R),W.ri.normalize(),W.ni.copy(W.ri),W.ri.scale(p,W.ri),W.rj.copy(A),W.ri.vadd(n,W.ri),W.ri.vsub(o.position,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(a.position,W.rj),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}h.release(A),A=null;let T=h.get(),D=h.get(),O=h.get(),E=h.get(),F=h.get(),C=d.length;for(let I=0;I!==C&&!g;I++)for(let K=0;K!==C&&!g;K++)if(I%3!==K%3){d[K].cross(d[I],T),T.normalize(),d[I].vadd(d[K],D),O.copy(n),O.vsub(D,O),O.vsub(i,O);let X=O.dot(T);T.scale(X,E);let W=0;for(;W===I%3||W===K%3;)W++;F.copy(n),F.vsub(E,F),F.vsub(D,F),F.vsub(i,F);let Y=Math.abs(X),B=F.length();if(Y<d[W].length()&&B<p){if(u)return!0;g=!0;let U=this.createContactEquation(o,a,t,e,l,c);D.vadd(E,U.rj),U.rj.copy(U.rj),F.negate(U.ni),U.ni.normalize(),U.ri.copy(U.rj),U.ri.vadd(i,U.ri),U.ri.vsub(n,U.ri),U.ri.normalize(),U.ri.scale(p,U.ri),U.ri.vadd(n,U.ri),U.ri.vsub(o.position,U.ri),U.rj.vadd(i,U.rj),U.rj.vsub(a.position,U.rj),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}}h.release(T,D,O,E,F)}planeBox(t,e,n,i,s,r,o,a,l,c,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,s,r,o,a,t,e,u)}convexConvex(t,e,n,i,s,r,o,a,l,c,u,h,d){let p=Aa;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,s,i,r,p,h,d)){let g=[],x=Ea;t.clipAgainstHull(n,s,e,i,r,p,-100,100,g);let v=0;for(let _=0;_!==g.length;_++){if(u)return!0;let S=this.createContactEquation(o,a,t,e,l,c),y=S.ri,b=S.rj;p.negate(S.ni),g[_].normal.negate(x),x.scale(g[_].depth,x),g[_].point.vadd(x,y),b.copy(g[_].point),y.vsub(n,y),b.vsub(i,b),y.vadd(n,y),y.vsub(o.position,y),b.vadd(i,b),b.vsub(a.position,b),this.result.push(S),v++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(S,this.frictionResult)}this.enableFrictionReduction&&v&&this.createFrictionFromAverage(v)}}sphereConvex(t,e,n,i,s,r,o,a,l,c,u){let h=this.v3pool;n.vsub(i,ua);let d=e.faceNormals,p=e.faces,g=e.vertices,x=t.radius,v=!1;for(let _=0;_!==g.length;_++){let S=g[_],y=ma;r.vmult(S,y),i.vadd(y,y);let b=pa;if(y.vsub(n,b),b.lengthSquared()<x*x){if(u)return!0;v=!0;let M=this.createContactEquation(o,a,t,e,l,c);M.ri.copy(b),M.ri.normalize(),M.ni.copy(M.ri),M.ri.scale(x,M.ri),y.vsub(i,M.rj),M.ri.vadd(n,M.ri),M.ri.vsub(o.position,M.ri),M.rj.vadd(i,M.rj),M.rj.vsub(a.position,M.rj),this.result.push(M),this.createFrictionEquationsFromContact(M,this.frictionResult);return}}for(let _=0,S=p.length;_!==S&&v===!1;_++){let y=d[_],b=p[_],M=ga;r.vmult(y,M);let w=xa;r.vmult(g[b[0]],w),w.vadd(i,w);let A=_a;M.scale(-x,A),n.vadd(A,A);let R=va;A.vsub(w,R);let T=R.dot(M),D=ya;if(n.vsub(w,D),T<0&&D.dot(M)>0){let O=[];for(let E=0,F=b.length;E!==F;E++){let C=h.get();r.vmult(g[b[E]],C),i.vadd(C,C),O.push(C)}if(na(O,M,n)){if(u)return!0;v=!0;let E=this.createContactEquation(o,a,t,e,l,c);M.scale(-x,E.ri),M.negate(E.ni);let F=h.get();M.scale(-T,F);let C=h.get();M.scale(-x,C),n.vsub(i,E.rj),E.rj.vadd(C,E.rj),E.rj.vadd(F,E.rj),E.rj.vadd(i,E.rj),E.rj.vsub(a.position,E.rj),E.ri.vadd(n,E.ri),E.ri.vsub(o.position,E.ri),h.release(F),h.release(C),this.result.push(E),this.createFrictionEquationsFromContact(E,this.frictionResult);for(let I=0,K=O.length;I!==K;I++)h.release(O[I]);return}else for(let E=0;E!==b.length;E++){let F=h.get(),C=h.get();r.vmult(g[b[(E+1)%b.length]],F),r.vmult(g[b[(E+2)%b.length]],C),i.vadd(F,F),i.vadd(C,C);let I=da;C.vsub(F,I);let K=fa;I.unit(K);let X=h.get(),W=h.get();n.vsub(F,W);let Y=W.dot(K);K.scale(Y,X),X.vadd(F,X);let B=h.get();if(X.vsub(n,B),Y>0&&Y*Y<I.lengthSquared()&&B.lengthSquared()<x*x){if(u)return!0;let U=this.createContactEquation(o,a,t,e,l,c);X.vsub(i,U.rj),X.vsub(n,U.ni),U.ni.normalize(),U.ni.scale(x,U.ri),U.rj.vadd(i,U.rj),U.rj.vsub(a.position,U.rj),U.ri.vadd(n,U.ri),U.ri.vsub(o.position,U.ri),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult);for(let q=0,H=O.length;q!==H;q++)h.release(O[q]);h.release(F),h.release(C),h.release(X),h.release(B),h.release(W);return}h.release(F),h.release(C),h.release(X),h.release(B),h.release(W)}for(let E=0,F=O.length;E!==F;E++)h.release(O[E])}}}planeConvex(t,e,n,i,s,r,o,a,l,c,u){let h=Sa,d=ba;d.set(0,0,1),s.vmult(d,d);let p=0,g=Ma;for(let x=0;x!==e.vertices.length;x++)if(h.copy(e.vertices[x]),r.vmult(h,h),i.vadd(h,h),h.vsub(n,g),d.dot(g)<=0){if(u)return!0;let _=this.createContactEquation(o,a,t,e,l,c),S=wa;d.scale(d.dot(g),S),h.vsub(S,S),S.vsub(n,_.ri),_.ni.copy(d),h.vsub(i,_.rj),_.ri.vadd(n,_.ri),_.ri.vsub(o.position,_.ri),_.rj.vadd(i,_.rj),_.rj.vsub(a.position,_.rj),this.result.push(_),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(_,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}boxConvex(t,e,n,i,s,r,o,a,l,c,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,s,r,o,a,t,e,u)}sphereHeightfield(t,e,n,i,s,r,o,a,l,c,u){let h=e.data,d=t.radius,p=e.elementSize,g=Oa,x=Ba;nt.pointToLocalFrame(i,r,n,x);let v=Math.floor((x.x-d)/p)-1,_=Math.ceil((x.x+d)/p)+1,S=Math.floor((x.y-d)/p)-1,y=Math.ceil((x.y+d)/p)+1;if(_<0||y<0||v>h.length||S>h[0].length)return;v<0&&(v=0),_<0&&(_=0),S<0&&(S=0),y<0&&(y=0),v>=h.length&&(v=h.length-1),_>=h.length&&(_=h.length-1),y>=h[0].length&&(y=h[0].length-1),S>=h[0].length&&(S=h[0].length-1);let b=[];e.getRectMinMax(v,S,_,y,b);let M=b[0],w=b[1];if(x.z-d>w||x.z+d<M)return;let A=this.result;for(let R=v;R<_;R++)for(let T=S;T<y;T++){let D=A.length,O=!1;if(e.getConvexTrianglePillar(R,T,!1),nt.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(O=this.sphereConvex(t,e.pillarConvex,n,g,s,r,o,a,t,e,u)),u&&O||(e.getConvexTrianglePillar(R,T,!0),nt.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(O=this.sphereConvex(t,e.pillarConvex,n,g,s,r,o,a,t,e,u)),u&&O))return!0;if(A.length-D>2)return}}boxHeightfield(t,e,n,i,s,r,o,a,l,c,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,s,r,o,a,t,e,u)}convexHeightfield(t,e,n,i,s,r,o,a,l,c,u){let h=e.data,d=e.elementSize,p=t.boundingSphereRadius,g=Fa,x=Ua,v=Da;nt.pointToLocalFrame(i,r,n,v);let _=Math.floor((v.x-p)/d)-1,S=Math.ceil((v.x+p)/d)+1,y=Math.floor((v.y-p)/d)-1,b=Math.ceil((v.y+p)/d)+1;if(S<0||b<0||_>h.length||y>h[0].length)return;_<0&&(_=0),S<0&&(S=0),y<0&&(y=0),b<0&&(b=0),_>=h.length&&(_=h.length-1),S>=h.length&&(S=h.length-1),b>=h[0].length&&(b=h[0].length-1),y>=h[0].length&&(y=h[0].length-1);let M=[];e.getRectMinMax(_,y,S,b,M);let w=M[0],A=M[1];if(!(v.z-p>A||v.z+p<w))for(let R=_;R<S;R++)for(let T=y;T<b;T++){let D=!1;if(e.getConvexTrianglePillar(R,T,!1),nt.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(D=this.convexConvex(t,e.pillarConvex,n,g,s,r,o,a,null,null,u,x,null)),u&&D||(e.getConvexTrianglePillar(R,T,!0),nt.pointToWorldFrame(i,r,e.pillarOffset,g),n.distanceTo(g)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(D=this.convexConvex(t,e.pillarConvex,n,g,s,r,o,a,null,null,u,x,null)),u&&D))return!0}}sphereParticle(t,e,n,i,s,r,o,a,l,c,u){let h=Ia;if(h.set(0,0,1),i.vsub(n,h),h.lengthSquared()<=t.radius*t.radius){if(u)return!0;let p=this.createContactEquation(a,o,e,t,l,c);h.normalize(),p.rj.copy(h),p.rj.scale(t.radius,p.rj),p.ni.copy(h),p.ni.negate(p.ni),p.ri.set(0,0,0),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}}planeParticle(t,e,n,i,s,r,o,a,l,c,u){let h=Ta;h.set(0,0,1),o.quaternion.vmult(h,h);let d=Ca;if(i.vsub(o.position,d),h.dot(d)<=0){if(u)return!0;let g=this.createContactEquation(a,o,e,t,l,c);g.ni.copy(h),g.ni.negate(g.ni),g.ri.set(0,0,0);let x=Ra;h.scale(h.dot(i),x),i.vsub(x,x),g.rj.copy(x),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}boxParticle(t,e,n,i,s,r,o,a,l,c,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,s,r,o,a,t,e,u)}convexParticle(t,e,n,i,s,r,o,a,l,c,u){let h=-1,d=La,p=Na,g=null,x=Pa;if(x.copy(i),x.vsub(n,x),s.conjugate(Rs),Rs.vmult(x,x),t.pointIsInside(x)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,s),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(s);for(let v=0,_=t.faces.length;v!==_;v++){let S=[t.worldVertices[t.faces[v][0]]],y=t.worldFaceNormals[v];i.vsub(S[0],Is);let b=-y.dot(Is);if(g===null||Math.abs(b)<Math.abs(g)){if(u)return!0;g=b,h=v,d.copy(y)}}if(h!==-1){let v=this.createContactEquation(a,o,e,t,l,c);d.scale(g,p),p.vadd(i,p),p.vsub(n,p),v.rj.copy(p),d.negate(v.ni),v.ri.set(0,0,0);let _=v.ri,S=v.rj;_.vadd(i,_),_.vsub(a.position,_),S.vadd(n,S),S.vsub(o.position,S),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,s,r,o,a,l,c,u){return this.convexHeightfield(e,t,i,n,r,s,a,o,l,c,u)}particleCylinder(t,e,n,i,s,r,o,a,l,c,u){return this.convexParticle(e,t,i,n,r,s,a,o,l,c,u)}sphereTrimesh(t,e,n,i,s,r,o,a,l,c,u){let h=Go,d=Ho,p=Wo,g=qo,x=Xo,v=Yo,_=jo,S=ko,y=zo,b=Ko;nt.pointToLocalFrame(i,r,n,x);let M=t.radius;_.lowerBound.set(x.x-M,x.y-M,x.z-M),_.upperBound.set(x.x+M,x.y+M,x.z+M),e.getTrianglesInAABB(_,b);let w=Vo,A=t.radius*t.radius;for(let E=0;E<b.length;E++)for(let F=0;F<3;F++)if(e.getVertex(e.indices[b[E]*3+F],w),w.vsub(x,y),y.lengthSquared()<=A){if(S.copy(w),nt.pointToWorldFrame(i,r,S,w),w.vsub(n,y),u)return!0;let C=this.createContactEquation(o,a,t,e,l,c);C.ni.copy(y),C.ni.normalize(),C.ri.copy(C.ni),C.ri.scale(t.radius,C.ri),C.ri.vadd(n,C.ri),C.ri.vsub(o.position,C.ri),C.rj.copy(w),C.rj.vsub(a.position,C.rj),this.result.push(C),this.createFrictionEquationsFromContact(C,this.frictionResult)}for(let E=0;E<b.length;E++)for(let F=0;F<3;F++){e.getVertex(e.indices[b[E]*3+F],h),e.getVertex(e.indices[b[E]*3+(F+1)%3],d),d.vsub(h,p),x.vsub(d,v);let C=v.dot(p);x.vsub(h,v);let I=v.dot(p);if(I>0&&C<0&&(x.vsub(h,v),g.copy(p),g.normalize(),I=v.dot(g),g.scale(I,v),v.vadd(h,v),v.distanceTo(x)<t.radius)){if(u)return!0;let X=this.createContactEquation(o,a,t,e,l,c);v.vsub(x,X.ni),X.ni.normalize(),X.ni.scale(t.radius,X.ri),X.ri.vadd(n,X.ri),X.ri.vsub(o.position,X.ri),nt.pointToWorldFrame(i,r,v,v),v.vsub(a.position,X.rj),nt.vectorToWorldFrame(r,X.ni,X.ni),nt.vectorToWorldFrame(r,X.ri,X.ri),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult)}}let R=$o,T=Zo,D=Jo,O=Oo;for(let E=0,F=b.length;E!==F;E++){e.getTriangleVertices(b[E],R,T,D),e.getNormal(b[E],O),x.vsub(R,v);let C=v.dot(O);if(O.scale(C,v),x.vsub(v,v),C=v.distanceTo(x),Tt.pointInTriangle(v,R,T,D)&&C<t.radius){if(u)return!0;let I=this.createContactEquation(o,a,t,e,l,c);v.vsub(x,I.ni),I.ni.normalize(),I.ni.scale(t.radius,I.ri),I.ri.vadd(n,I.ri),I.ri.vsub(o.position,I.ri),nt.pointToWorldFrame(i,r,v,v),v.vsub(a.position,I.rj),nt.vectorToWorldFrame(r,I.ni,I.ni),nt.vectorToWorldFrame(r,I.ri,I.ri),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}}b.length=0}planeTrimesh(t,e,n,i,s,r,o,a,l,c,u){let h=new m,d=Fo;d.set(0,0,1),s.vmult(d,d);for(let p=0;p<e.vertices.length/3;p++){e.getVertex(p,h);let g=new m;g.copy(h),nt.pointToWorldFrame(i,r,g,h);let x=Uo;if(h.vsub(n,x),d.dot(x)<=0){if(u)return!0;let _=this.createContactEquation(o,a,t,e,l,c);_.ni.copy(d);let S=Bo;d.scale(x.dot(d),S),h.vsub(S,S),_.ri.copy(S),_.ri.vsub(o.position,_.ri),_.rj.copy(h),_.rj.vsub(a.position,_.rj),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}}},le=new m,xe=new m,_e=new m,Po=new m,Lo=new m,No=new xt,Do=new xt,Fo=new m,Uo=new m,Bo=new m,Oo=new m,zo=new m;new m;var Vo=new m,ko=new m,Go=new m,Ho=new m,Wo=new m,qo=new m,Xo=new m,Yo=new m,$o=new m,Zo=new m,Jo=new m,jo=new St,Ko=[],cn=new m,Cs=new m,Qo=new m,ta=new m,ea=new m;function na(f,t,e){let n=null,i=f.length;for(let s=0;s!==i;s++){let r=f[s],o=Qo;f[(s+1)%i].vsub(r,o);let a=ta;o.cross(t,a);let l=ea;e.vsub(r,l);let c=a.dot(l);if(n===null||c>0&&n===!0||c<=0&&n===!1){n===null&&(n=c>0);continue}else return!1}return!0}var hn=new m,ia=new m,sa=new m,ra=new m,oa=[new m,new m,new m,new m,new m,new m],aa=new m,la=new m,ca=new m,ha=new m,ua=new m,da=new m,fa=new m,pa=new m,ma=new m,ga=new m,xa=new m,_a=new m,va=new m,ya=new m;new m;new m;var Sa=new m,ba=new m,Ma=new m,wa=new m,Aa=new m,Ea=new m,Ta=new m,Ca=new m,Ra=new m,Ia=new m,Rs=new xt,Pa=new m;new m;var La=new m,Is=new m,Na=new m,Da=new m,Fa=new m,Ua=[0],Ba=new m,Oa=new m,Sn=class{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){let n=e;e=t,t=n}return t<<16|e}set(t,e){let n=this.getKey(t,e),i=this.current,s=0;for(;n>i[s];)s++;if(n!==i[s]){for(let r=i.length-1;r>=s;r--)i[r+1]=i[r];i[s]=n}}tick(){let t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){let n=this.current,i=this.previous,s=n.length,r=i.length,o=0;for(let a=0;a<s;a++){let l=!1,c=n[a];for(;c>i[o];)o++;l=c===i[o],l||Ps(t,c)}o=0;for(let a=0;a<r;a++){let l=!1,c=i[a];for(;c>n[o];)o++;l=n[o]===c,l||Ps(e,c)}}};function Ps(f,t){f.push((t&4294901760)>>16,t&65535)}var ri=(f,t)=>f<t?`${f}-${t}`:`${t}-${f}`,mi=class{constructor(){this.data={keys:[]}}get(t,e){let n=ri(t,e);return this.data[n]}set(t,e,n){let i=ri(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){let n=ri(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){let t=this.data,e=t.keys;for(;e.length>0;){let n=e.pop();delete t[n]}}},bn=class extends dn{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new m,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new m,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new ai,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new ui,this.constraints=[],this.narrowphase=new pi(this),this.collisionMatrix=new un,this.collisionMatrixPrevious=new un,this.bodyOverlapKeeper=new Sn,this.shapeOverlapKeeper=new Sn,this.contactmaterials=[],this.contactMaterialTable=new mi,this.defaultMaterial=new vn("default"),this.defaultContactMaterial=new _n(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){let t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){let e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof ve?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Tt.ALL,n.from=t,n.to=e,n.callback=i,oi.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Tt.ANY,n.from=t,n.to=e,n.result=i,oi.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Tt.CLOSEST,n.from=t,n.to=e,n.result=i,oi.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof j&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;let e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let s=0;s!==n.length;s++)n[s].index=s;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){let e=this.bodies;for(let n=0;n<e.length;n++){let i=e[n].shapes;for(let s=0;s<i.length;s++){let r=i[s];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){let e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);let n=lt.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{let i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;let i=lt.now(),s=0;for(;this.accumulator>=t&&s<n&&(this.internalStep(t),this.accumulator-=t,s++,!(lt.now()-i>t*1e3)););this.accumulator=this.accumulator%t;let r=this.accumulator/t;for(let o=0;o!==this.bodies.length;o++){let a=this.bodies[o];a.previousPosition.lerp(a.position,r,a.interpolatedPosition),a.previousQuaternion.slerp(a.quaternion,r,a.interpolatedQuaternion),a.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;let e=this.contacts,n=Ha,i=Wa,s=this.bodies.length,r=this.bodies,o=this.solver,a=this.gravity,l=this.doProfiling,c=this.profile,u=j.DYNAMIC,h=-1/0,d=this.constraints,p=Ga;a.length();let g=a.x,x=a.y,v=a.z,_=0;for(l&&(h=lt.now()),_=0;_!==s;_++){let E=r[_];if(E.type===u){let F=E.force,C=E.mass;F.x+=C*g,F.y+=C*x,F.z+=C*v}}for(let E=0,F=this.subsystems.length;E!==F;E++)this.subsystems[E].update();l&&(h=lt.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(c.broadphase=lt.now()-h);let S=d.length;for(_=0;_!==S;_++){let E=d[_];if(!E.collideConnected)for(let F=n.length-1;F>=0;F-=1)(E.bodyA===n[F]&&E.bodyB===i[F]||E.bodyB===n[F]&&E.bodyA===i[F])&&(n.splice(F,1),i.splice(F,1))}this.collisionMatrixTick(),l&&(h=lt.now());let y=ka,b=e.length;for(_=0;_!==b;_++)y.push(e[_]);e.length=0;let M=this.frictionEquations.length;for(_=0;_!==M;_++)p.push(this.frictionEquations[_]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,y,this.frictionEquations,p),l&&(c.narrowphase=lt.now()-h),l&&(h=lt.now()),_=0;_<this.frictionEquations.length;_++)o.addEquation(this.frictionEquations[_]);let w=e.length;for(let E=0;E!==w;E++){let F=e[E],C=F.bi,I=F.bj,K=F.si,X=F.sj,W;if(C.material&&I.material?W=this.getContactMaterial(C.material,I.material)||this.defaultContactMaterial:W=this.defaultContactMaterial,W.friction,C.material&&I.material&&(C.material.friction>=0&&I.material.friction>=0&&C.material.friction*I.material.friction,C.material.restitution>=0&&I.material.restitution>=0&&(F.restitution=C.material.restitution*I.material.restitution)),o.addEquation(F),C.allowSleep&&C.type===j.DYNAMIC&&C.sleepState===j.SLEEPING&&I.sleepState===j.AWAKE&&I.type!==j.STATIC){let Y=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),B=I.sleepSpeedLimit**2;Y>=B*2&&(C.wakeUpAfterNarrowphase=!0)}if(I.allowSleep&&I.type===j.DYNAMIC&&I.sleepState===j.SLEEPING&&C.sleepState===j.AWAKE&&C.type!==j.STATIC){let Y=C.velocity.lengthSquared()+C.angularVelocity.lengthSquared(),B=C.sleepSpeedLimit**2;Y>=B*2&&(I.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(C,I,!0),this.collisionMatrixPrevious.get(C,I)||(De.body=I,De.contact=F,C.dispatchEvent(De),De.body=C,I.dispatchEvent(De)),this.bodyOverlapKeeper.set(C.id,I.id),this.shapeOverlapKeeper.set(K.id,X.id)}for(this.emitContactEvents(),l&&(c.makeContactConstraints=lt.now()-h,h=lt.now()),_=0;_!==s;_++){let E=r[_];E.wakeUpAfterNarrowphase&&(E.wakeUp(),E.wakeUpAfterNarrowphase=!1)}for(S=d.length,_=0;_!==S;_++){let E=d[_];E.update();for(let F=0,C=E.equations.length;F!==C;F++){let I=E.equations[F];o.addEquation(I)}}o.solve(t,this),l&&(c.solve=lt.now()-h),o.removeAllEquations();let A=Math.pow;for(_=0;_!==s;_++){let E=r[_];if(E.type&u){let F=A(1-E.linearDamping,t),C=E.velocity;C.scale(F,C);let I=E.angularVelocity;if(I){let K=A(1-E.angularDamping,t);I.scale(K,I)}}}this.dispatchEvent(Va),l&&(h=lt.now());let T=this.stepnumber%(this.quatNormalizeSkip+1)===0,D=this.quatNormalizeFast;for(_=0;_!==s;_++)r[_].integrate(t,T,D);this.clearForces(),this.broadphase.dirty=!0,l&&(c.integrate=lt.now()-h),this.stepnumber+=1,this.dispatchEvent(za);let O=!0;if(this.allowSleep)for(O=!1,_=0;_!==s;_++){let E=r[_];E.sleepTick(this.time),E.sleepState!==j.SLEEPING&&(O=!0)}this.hasActiveBodies=O}emitContactEvents(){let t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Vt,kt),t){for(let s=0,r=Vt.length;s<r;s+=2)Fe.bodyA=this.getBodyById(Vt[s]),Fe.bodyB=this.getBodyById(Vt[s+1]),this.dispatchEvent(Fe);Fe.bodyA=Fe.bodyB=null}if(e){for(let s=0,r=kt.length;s<r;s+=2)Ue.bodyA=this.getBodyById(kt[s]),Ue.bodyB=this.getBodyById(kt[s+1]),this.dispatchEvent(Ue);Ue.bodyA=Ue.bodyB=null}Vt.length=kt.length=0;let n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Vt,kt),n){for(let s=0,r=Vt.length;s<r;s+=2){let o=this.getShapeById(Vt[s]),a=this.getShapeById(Vt[s+1]);Gt.shapeA=o,Gt.shapeB=a,o&&(Gt.bodyA=o.body),a&&(Gt.bodyB=a.body),this.dispatchEvent(Gt)}Gt.bodyA=Gt.bodyB=Gt.shapeA=Gt.shapeB=null}if(i){for(let s=0,r=kt.length;s<r;s+=2){let o=this.getShapeById(kt[s]),a=this.getShapeById(kt[s+1]);Ht.shapeA=o,Ht.shapeB=a,o&&(Ht.bodyA=o.body),a&&(Ht.bodyB=a.body),this.dispatchEvent(Ht)}Ht.bodyA=Ht.bodyB=Ht.shapeA=Ht.shapeB=null}}clearForces(){let t=this.bodies,e=t.length;for(let n=0;n!==e;n++){let i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}};new St;var oi=new Tt,lt=globalThis.performance||{};if(!lt.now){let f=Date.now();lt.timing&&lt.timing.navigationStart&&(f=lt.timing.navigationStart),lt.now=()=>Date.now()-f}new m;var za={type:"postStep"},Va={type:"preStep"},De={type:j.COLLIDE_EVENT_NAME,body:null,contact:null},ka=[],Ga=[],Ha=[],Wa=[],Vt=[],kt=[],Fe={type:"beginContact",bodyA:null,bodyB:null},Ue={type:"endContact",bodyA:null,bodyB:null},Gt={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Ht={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};var Ks=1;var Qs=3;var Ii=0,Pi=1,Li=2,Ni=3,Di=4,Fi=5,Ui=6,Bi=7,tr=0,er=1,nr=2;var ji=1,Ki=2,Qi=3,ts=4,es=5,ns=6,is=7;var ss=300,ir=301,rs=302;var sr=306,Oi=1e3,qe=1001,zi=1002;var rr=1006;var or=1008;var ar=1009;var lr=1015;var cr=1023;var Ye=2300,Ln=2301,In=2302,Vi=2303,ki=2400,Gi=2401,Hi=2402;var os="",It="srgb",Wi="srgb-linear",qi="linear",Pn="srgb";var hr=35044;var Xe=2e3,Xi=2001;function qa(f){for(let t=f.length-1;t>=0;--t)if(f[t]>=65535)return!0;return!1}function Xa(f){return ArrayBuffer.isView(f)&&!(f instanceof DataView)}function Yi(f){return document.createElementNS("http://www.w3.org/1999/xhtml",f)}var zs={},Nn=null;function ur(f){let t=f[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=f[1];e&&e.isStackTrace?f[0]+=" "+e.getLocation():f[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return f}function ut(...f){f=ur(f);let t="THREE."+f.shift();if(Nn)Nn("warn",t,...f);else{let e=f[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...f)}}function rt(...f){f=ur(f);let t="THREE."+f.shift();if(Nn)Nn("error",t,...f);else{let e=f[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...f)}}function Re(...f){let t=f.join(" ");t in zs||(zs[t]=!0,ut(...f))}var Ya={[Ii]:Pi,[Li]:Ui,[Di]:Bi,[Ni]:Fi,[Pi]:Ii,[Ui]:Li,[Bi]:Di,[Fi]:Ni},de=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,r=i.length;s<r;s++)i[s].call(this,t);t.target=null}}},ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Ad=Math.PI/180,$a=180/Math.PI;function Jn(){let f=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ft[f&255]+ft[f>>8&255]+ft[f>>16&255]+ft[f>>24&255]+"-"+ft[t&255]+ft[t>>8&255]+"-"+ft[t>>16&15|64]+ft[t>>24&255]+"-"+ft[e&63|128]+ft[e>>8&255]+"-"+ft[e>>16&255]+ft[e>>24&255]+ft[n&255]+ft[n>>8&255]+ft[n>>16&255]+ft[n>>24&255]).toLowerCase()}function et(f,t,e){return Math.max(t,Math.min(e,f))}function Za(f,t){return(f%t+t)%t}function vi(f,t,e){return(1-e)*f+e*t}function Ve(f,t){switch(t.constructor){case Float32Array:return f;case Uint32Array:return f/4294967295;case Uint16Array:return f/65535;case Uint8Array:case Uint8ClampedArray:return f/255;case Int32Array:return Math.max(f/2147483647,-1);case Int16Array:return Math.max(f/32767,-1);case Int8Array:return Math.max(f/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function yt(f,t){switch(t.constructor){case Float32Array:return f;case Uint32Array:return Math.round(f*4294967295);case Uint16Array:return Math.round(f*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(f*255);case Int32Array:return Math.round(f*2147483647);case Int16Array:return Math.round(f*32767);case Int8Array:return Math.round(f*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ct=class f{static{f.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=et(this.x,t.x,e.x),this.y=et(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=et(this.x,t,e),this.y=et(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(et(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*n-r*i+t.x,this.y=s*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},mt=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,r,o){let a=n[i+0],l=n[i+1],c=n[i+2],u=n[i+3],h=s[r+0],d=s[r+1],p=s[r+2],g=s[r+3];if(u!==g||a!==h||l!==d||c!==p){let x=a*h+l*d+c*p+u*g;x<0&&(h=-h,d=-d,p=-p,g=-g,x=-x);let v=1-o;if(x<.9995){let _=Math.acos(x),S=Math.sin(_);v=Math.sin(v*_)/S,o=Math.sin(o*_)/S,a=a*v+h*o,l=l*v+d*o,c=c*v+p*o,u=u*v+g*o}else{a=a*v+h*o,l=l*v+d*o,c=c*v+p*o,u=u*v+g*o;let _=1/Math.sqrt(a*a+l*l+c*c+u*u);a*=_,l*=_,c*=_,u*=_}}t[e]=a,t[e+1]=l,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,r){let o=n[i],a=n[i+1],l=n[i+2],c=n[i+3],u=s[r],h=s[r+1],d=s[r+2],p=s[r+3];return t[e]=o*p+c*u+a*d-l*h,t[e+1]=a*p+c*h+l*u-o*d,t[e+2]=l*p+c*d+o*h-a*u,t[e+3]=c*p-o*u-a*h-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,r=t._order,o=Math.cos,a=Math.sin,l=o(n/2),c=o(i/2),u=o(s/2),h=a(n/2),d=a(i/2),p=a(s/2);switch(r){case"XYZ":this._x=h*c*u+l*d*p,this._y=l*d*u-h*c*p,this._z=l*c*p+h*d*u,this._w=l*c*u-h*d*p;break;case"YXZ":this._x=h*c*u+l*d*p,this._y=l*d*u-h*c*p,this._z=l*c*p-h*d*u,this._w=l*c*u+h*d*p;break;case"ZXY":this._x=h*c*u-l*d*p,this._y=l*d*u+h*c*p,this._z=l*c*p+h*d*u,this._w=l*c*u-h*d*p;break;case"ZYX":this._x=h*c*u-l*d*p,this._y=l*d*u+h*c*p,this._z=l*c*p-h*d*u,this._w=l*c*u+h*d*p;break;case"YZX":this._x=h*c*u+l*d*p,this._y=l*d*u+h*c*p,this._z=l*c*p-h*d*u,this._w=l*c*u-h*d*p;break;case"XZY":this._x=h*c*u-l*d*p,this._y=l*d*u-h*c*p,this._z=l*c*p+h*d*u,this._w=l*c*u+h*d*p;break;default:ut("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10],h=n+o+u;if(h>0){let d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(c-a)*d,this._y=(s-l)*d,this._z=(r-i)*d}else if(n>o&&n>u){let d=2*Math.sqrt(1+n-o-u);this._w=(c-a)/d,this._x=.25*d,this._y=(i+r)/d,this._z=(s+l)/d}else if(o>u){let d=2*Math.sqrt(1+o-n-u);this._w=(s-l)/d,this._x=(i+r)/d,this._y=.25*d,this._z=(a+c)/d}else{let d=2*Math.sqrt(1+u-n-o);this._w=(r-i)/d,this._x=(s+l)/d,this._y=(a+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(et(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,r=t._w,o=e._x,a=e._y,l=e._z,c=e._w;return this._x=n*c+r*o+i*l-s*a,this._y=i*c+r*a+s*o-n*l,this._z=s*c+r*l+n*a-i*o,this._w=r*c-n*o-i*a-s*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,s=t._z,r=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,s=-s,r=-r,o=-o);let a=1-e;if(o<.9995){let l=Math.acos(o),c=Math.sin(l);a=Math.sin(a*l)/c,e=Math.sin(e*l)/c,this._x=this._x*a+n*e,this._y=this._y*a+i*e,this._z=this._z*a+s*e,this._w=this._w*a+r*e,this._onChangeCallback()}else this._x=this._x*a+n*e,this._y=this._y*a+i*e,this._z=this._z*a+s*e,this._w=this._w*a+r*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class f{static{f.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Vs.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Vs.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,r=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*r,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*r,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*r,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,r=t.y,o=t.z,a=t.w,l=2*(r*i-o*n),c=2*(o*e-s*i),u=2*(s*n-r*e);return this.x=e+a*l+r*u-o*c,this.y=n+a*c+o*l-s*u,this.z=i+a*u+s*c-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=et(this.x,t.x,e.x),this.y=et(this.y,t.y,e.y),this.z=et(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=et(this.x,t,e),this.y=et(this.y,t,e),this.z=et(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,r=e.x,o=e.y,a=e.z;return this.x=i*a-s*o,this.y=s*r-n*a,this.z=n*o-i*r,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return yi.copy(this).projectOnVector(t),this.sub(yi)}reflect(t){return this.sub(yi.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(et(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},yi=new N,Vs=new mt,J=class f{static{f.prototype.isMatrix3=!0}constructor(t,e,n,i,s,r,o,a,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,o,a,l)}set(t,e,n,i,s,r,o,a,l){let c=this.elements;return c[0]=t,c[1]=i,c[2]=o,c[3]=e,c[4]=s,c[5]=a,c[6]=n,c[7]=r,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],o=n[3],a=n[6],l=n[1],c=n[4],u=n[7],h=n[2],d=n[5],p=n[8],g=i[0],x=i[3],v=i[6],_=i[1],S=i[4],y=i[7],b=i[2],M=i[5],w=i[8];return s[0]=r*g+o*_+a*b,s[3]=r*x+o*S+a*M,s[6]=r*v+o*y+a*w,s[1]=l*g+c*_+u*b,s[4]=l*x+c*S+u*M,s[7]=l*v+c*y+u*w,s[2]=h*g+d*_+p*b,s[5]=h*x+d*S+p*M,s[8]=h*v+d*y+p*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],l=t[7],c=t[8];return e*r*c-e*o*l-n*s*c+n*o*a+i*s*l-i*r*a}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],l=t[7],c=t[8],u=c*r-o*l,h=o*a-c*s,d=l*s-r*a,p=e*u+n*h+i*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/p;return t[0]=u*g,t[1]=(i*l-c*n)*g,t[2]=(o*n-i*r)*g,t[3]=h*g,t[4]=(c*e-i*a)*g,t[5]=(i*s-o*e)*g,t[6]=d*g,t[7]=(n*a-l*e)*g,t[8]=(r*e-n*s)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,r,o){let a=Math.cos(s),l=Math.sin(s);return this.set(n*a,n*l,-n*(a*r+l*o)+r+t,-i*l,i*a,-i*(-l*r+a*o)+o+e,0,0,1),this}scale(t,e){return Re("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Si.makeScale(t,e)),this}rotate(t){return Re("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Si.makeRotation(-t)),this}translate(t,e){return Re("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Si.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Si=new J,ks=new J().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gs=new J().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ja(){let f={enabled:!0,workingColorSpace:Wi,spaces:{},convert:function(i,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Pn&&(i.r=Xt(i.r),i.g=Xt(i.g),i.b=Xt(i.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Pn&&(i.r=Ie(i.r),i.g=Ie(i.g),i.b=Ie(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===os?qi:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,r){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Re("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),f.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Re("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),f.colorSpaceToWorking(i,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return f.define({[Wi]:{primaries:t,whitePoint:n,transfer:qi,toXYZ:ks,fromXYZ:Gs,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:t,whitePoint:n,transfer:Pn,toXYZ:ks,fromXYZ:Gs,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),f}var Rt=Ja();function Xt(f){return f<.04045?f*.0773993808:Math.pow(f*.9478672986+.0521327014,2.4)}function Ie(f){return f<.0031308?f*12.92:1.055*Math.pow(f,.41666)-.055}var ye,Dn=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ye===void 0&&(ye=Yi("canvas")),ye.width=t.width,ye.height=t.height;let i=ye.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ye}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Yi("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let r=0;r<s.length;r++)s[r]=Xt(s[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Xt(e[n]/255)*255):e[n]=Xt(e[n]);return{data:e,width:t.width,height:t.height}}else return ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ja=0,Fn=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ja++}),this.uuid=Jn(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?s.push(bi(i[r].image)):s.push(bi(i[r]))}else s=bi(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function bi(f){return typeof HTMLImageElement<"u"&&f instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&f instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&f instanceof ImageBitmap?Dn.getDataURL(f):f.data?{data:Array.from(f.data),width:f.width,height:f.height,type:f.data.constructor.name}:(ut("Texture: Unable to serialize Texture."),{})}var Ka=0,Mi=new N,Pe=class f extends de{constructor(t=f.DEFAULT_IMAGE,e=f.DEFAULT_MAPPING,n=qe,i=qe,s=rr,r=or,o=cr,a=ar,l=f.DEFAULT_ANISOTROPY,c=os){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ka++}),this.uuid=Jn(),this.name="",this.source=new Fn(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=r,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=a,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new J,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mi).x}get height(){return this.source.getSize(Mi).y}get depth(){return this.source.getSize(Mi).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){ut(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ss)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Oi:t.x=t.x-Math.floor(t.x);break;case qe:t.x=t.x<0?0:1;break;case zi:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Oi:t.y=t.y-Math.floor(t.y);break;case qe:t.y=t.y<0?0:1;break;case zi:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=ss;Pe.DEFAULT_ANISOTROPY=1;var $i=class f{static{f.prototype.isVector4=!0}constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*s,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*s,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*s,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,a=t.elements,l=a[0],c=a[4],u=a[8],h=a[1],d=a[5],p=a[9],g=a[2],x=a[6],v=a[10];if(Math.abs(c-h)<.01&&Math.abs(u-g)<.01&&Math.abs(p-x)<.01){if(Math.abs(c+h)<.1&&Math.abs(u+g)<.1&&Math.abs(p+x)<.1&&Math.abs(l+d+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let S=(l+1)/2,y=(d+1)/2,b=(v+1)/2,M=(c+h)/4,w=(u+g)/4,A=(p+x)/4;return S>y&&S>b?S<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(S),i=M/n,s=w/n):y>b?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=M/i,s=A/i):b<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(b),n=w/s,i=A/s),this.set(n,i,s,e),this}let _=Math.sqrt((x-p)*(x-p)+(u-g)*(u-g)+(h-c)*(h-c));return Math.abs(_)<.001&&(_=1),this.x=(x-p)/_,this.y=(u-g)/_,this.z=(h-c)/_,this.w=Math.acos((l+d+v-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=et(this.x,t.x,e.x),this.y=et(this.y,t.y,e.y),this.z=et(this.z,t.z,e.z),this.w=et(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=et(this.x,t,e),this.y=et(this.y,t,e),this.z=et(this.z,t,e),this.w=et(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(et(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var Ot=class f{static{f.prototype.isMatrix4=!0}constructor(t,e,n,i,s,r,o,a,l,c,u,h,d,p,g,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,r,o,a,l,c,u,h,d,p,g,x)}set(t,e,n,i,s,r,o,a,l,c,u,h,d,p,g,x){let v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=i,v[1]=s,v[5]=r,v[9]=o,v[13]=a,v[2]=l,v[6]=c,v[10]=u,v[14]=h,v[3]=d,v[7]=p,v[11]=g,v[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new f().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/Se.setFromMatrixColumn(t,0).length(),s=1/Se.setFromMatrixColumn(t,1).length(),r=1/Se.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,r=Math.cos(n),o=Math.sin(n),a=Math.cos(i),l=Math.sin(i),c=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){let h=r*c,d=r*u,p=o*c,g=o*u;e[0]=a*c,e[4]=-a*u,e[8]=l,e[1]=d+p*l,e[5]=h-g*l,e[9]=-o*a,e[2]=g-h*l,e[6]=p+d*l,e[10]=r*a}else if(t.order==="YXZ"){let h=a*c,d=a*u,p=l*c,g=l*u;e[0]=h+g*o,e[4]=p*o-d,e[8]=r*l,e[1]=r*u,e[5]=r*c,e[9]=-o,e[2]=d*o-p,e[6]=g+h*o,e[10]=r*a}else if(t.order==="ZXY"){let h=a*c,d=a*u,p=l*c,g=l*u;e[0]=h-g*o,e[4]=-r*u,e[8]=p+d*o,e[1]=d+p*o,e[5]=r*c,e[9]=g-h*o,e[2]=-r*l,e[6]=o,e[10]=r*a}else if(t.order==="ZYX"){let h=r*c,d=r*u,p=o*c,g=o*u;e[0]=a*c,e[4]=p*l-d,e[8]=h*l+g,e[1]=a*u,e[5]=g*l+h,e[9]=d*l-p,e[2]=-l,e[6]=o*a,e[10]=r*a}else if(t.order==="YZX"){let h=r*a,d=r*l,p=o*a,g=o*l;e[0]=a*c,e[4]=g-h*u,e[8]=p*u+d,e[1]=u,e[5]=r*c,e[9]=-o*c,e[2]=-l*c,e[6]=d*u+p,e[10]=h-g*u}else if(t.order==="XZY"){let h=r*a,d=r*l,p=o*a,g=o*l;e[0]=a*c,e[4]=-u,e[8]=l*c,e[1]=h*u+g,e[5]=r*c,e[9]=d*u-p,e[2]=p*u-d,e[6]=o*c,e[10]=g*u+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qa,t,tl)}lookAt(t,e,n){let i=this.elements;return bt.subVectors(t,e),bt.lengthSq()===0&&(bt.z=1),bt.normalize(),Kt.crossVectors(n,bt),Kt.lengthSq()===0&&(Math.abs(n.z)===1?bt.x+=1e-4:bt.z+=1e-4,bt.normalize(),Kt.crossVectors(n,bt)),Kt.normalize(),Mn.crossVectors(bt,Kt),i[0]=Kt.x,i[4]=Mn.x,i[8]=bt.x,i[1]=Kt.y,i[5]=Mn.y,i[9]=bt.y,i[2]=Kt.z,i[6]=Mn.z,i[10]=bt.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,r=n[0],o=n[4],a=n[8],l=n[12],c=n[1],u=n[5],h=n[9],d=n[13],p=n[2],g=n[6],x=n[10],v=n[14],_=n[3],S=n[7],y=n[11],b=n[15],M=i[0],w=i[4],A=i[8],R=i[12],T=i[1],D=i[5],O=i[9],E=i[13],F=i[2],C=i[6],I=i[10],K=i[14],X=i[3],W=i[7],Y=i[11],B=i[15];return s[0]=r*M+o*T+a*F+l*X,s[4]=r*w+o*D+a*C+l*W,s[8]=r*A+o*O+a*I+l*Y,s[12]=r*R+o*E+a*K+l*B,s[1]=c*M+u*T+h*F+d*X,s[5]=c*w+u*D+h*C+d*W,s[9]=c*A+u*O+h*I+d*Y,s[13]=c*R+u*E+h*K+d*B,s[2]=p*M+g*T+x*F+v*X,s[6]=p*w+g*D+x*C+v*W,s[10]=p*A+g*O+x*I+v*Y,s[14]=p*R+g*E+x*K+v*B,s[3]=_*M+S*T+y*F+b*X,s[7]=_*w+S*D+y*C+b*W,s[11]=_*A+S*O+y*I+b*Y,s[15]=_*R+S*E+y*K+b*B,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],r=t[1],o=t[5],a=t[9],l=t[13],c=t[2],u=t[6],h=t[10],d=t[14],p=t[3],g=t[7],x=t[11],v=t[15],_=a*d-l*h,S=o*d-l*u,y=o*h-a*u,b=r*d-l*c,M=r*h-a*c,w=r*u-o*c;return e*(g*_-x*S+v*y)-n*(p*_-x*b+v*M)+i*(p*S-g*b+v*w)-s*(p*y-g*M+x*w)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[1],r=t[5],o=t[9],a=t[2],l=t[6],c=t[10];return e*(r*c-o*l)-n*(s*c-o*a)+i*(s*l-r*a)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],r=t[4],o=t[5],a=t[6],l=t[7],c=t[8],u=t[9],h=t[10],d=t[11],p=t[12],g=t[13],x=t[14],v=t[15],_=e*o-n*r,S=e*a-i*r,y=e*l-s*r,b=n*a-i*o,M=n*l-s*o,w=i*l-s*a,A=c*g-u*p,R=c*x-h*p,T=c*v-d*p,D=u*x-h*g,O=u*v-d*g,E=h*v-d*x,F=_*E-S*O+y*D+b*T-M*R+w*A;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/F;return t[0]=(o*E-a*O+l*D)*C,t[1]=(i*O-n*E-s*D)*C,t[2]=(g*w-x*M+v*b)*C,t[3]=(h*M-u*w-d*b)*C,t[4]=(a*T-r*E-l*R)*C,t[5]=(e*E-i*T+s*R)*C,t[6]=(x*y-p*w-v*S)*C,t[7]=(c*w-h*y+d*S)*C,t[8]=(r*O-o*T+l*A)*C,t[9]=(n*T-e*O-s*A)*C,t[10]=(p*M-g*y+v*_)*C,t[11]=(u*y-c*M-d*_)*C,t[12]=(o*R-r*D-a*A)*C,t[13]=(e*D-n*R+i*A)*C,t[14]=(g*S-p*b-x*_)*C,t[15]=(c*b-u*S+h*_)*C,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,r=t.x,o=t.y,a=t.z,l=s*r,c=s*o;return this.set(l*r+n,l*o-i*a,l*a+i*o,0,l*o+i*a,c*o+n,c*a-i*r,0,l*a-i*o,c*a+i*r,s*a*a+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,r){return this.set(1,n,s,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,r=e._y,o=e._z,a=e._w,l=s+s,c=r+r,u=o+o,h=s*l,d=s*c,p=s*u,g=r*c,x=r*u,v=o*u,_=a*l,S=a*c,y=a*u,b=n.x,M=n.y,w=n.z;return i[0]=(1-(g+v))*b,i[1]=(d+y)*b,i[2]=(p-S)*b,i[3]=0,i[4]=(d-y)*M,i[5]=(1-(h+v))*M,i[6]=(x+_)*M,i[7]=0,i[8]=(p+S)*w,i[9]=(x-_)*w,i[10]=(1-(h+g))*w,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let s=this.determinantAffine();if(s===0)return n.set(1,1,1),e.identity(),this;let r=Se.set(i[0],i[1],i[2]).length(),o=Se.set(i[4],i[5],i[6]).length(),a=Se.set(i[8],i[9],i[10]).length();s<0&&(r=-r),Nt.copy(this);let l=1/r,c=1/o,u=1/a;return Nt.elements[0]*=l,Nt.elements[1]*=l,Nt.elements[2]*=l,Nt.elements[4]*=c,Nt.elements[5]*=c,Nt.elements[6]*=c,Nt.elements[8]*=u,Nt.elements[9]*=u,Nt.elements[10]*=u,e.setFromRotationMatrix(Nt),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,r,o=Xe,a=!1){let l=this.elements,c=2*s/(e-t),u=2*s/(n-i),h=(e+t)/(e-t),d=(n+i)/(n-i),p,g;if(a)p=s/(r-s),g=r*s/(r-s);else if(o===Xe)p=-(r+s)/(r-s),g=-2*r*s/(r-s);else if(o===Xi)p=-r/(r-s),g=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,r,o=Xe,a=!1){let l=this.elements,c=2/(e-t),u=2/(n-i),h=-(e+t)/(e-t),d=-(n+i)/(n-i),p,g;if(a)p=1/(r-s),g=r/(r-s);else if(o===Xe)p=-2/(r-s),g=-(r+s)/(r-s);else if(o===Xi)p=-1/(r-s),g=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Se=new N,Nt=new Ot,Qa=new N(0,0,0),tl=new N(1,1,1),Kt=new N,Mn=new N,bt=new N,Hs=new Ot,Ws=new mt,$e=class f{constructor(t=0,e=0,n=0,i=f.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],r=i[4],o=i[8],a=i[1],l=i[5],c=i[9],u=i[2],h=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(a,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(a,s));break;case"ZYX":this._y=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(a,s)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-et(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-c,d),this._y=0);break;default:ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Hs.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hs,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ws.setFromEuler(this),this.setFromQuaternion(Ws,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};$e.DEFAULT_ORDER="XYZ";var Un=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},el=0,qs=new N,be=new mt,Wt=new Ot,wn=new N,ke=new N,nl=new N,il=new mt,Xs=new N(1,0,0),Ys=new N(0,1,0),$s=new N(0,0,1),Zs={type:"added"},sl={type:"removed"},Me={type:"childadded",child:null},wi={type:"childremoved",child:null},fe=class f extends de{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:el++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=f.DEFAULT_UP.clone();let t=new N,e=new $e,n=new mt,i=new N(1,1,1);function s(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ot},normalMatrix:{value:new J}}),this.matrix=new Ot,this.matrixWorld=new Ot,this.matrixAutoUpdate=f.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=f.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Un,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return be.setFromAxisAngle(t,e),this.quaternion.multiply(be),this}rotateOnWorldAxis(t,e){return be.setFromAxisAngle(t,e),this.quaternion.premultiply(be),this}rotateX(t){return this.rotateOnAxis(Xs,t)}rotateY(t){return this.rotateOnAxis(Ys,t)}rotateZ(t){return this.rotateOnAxis($s,t)}translateOnAxis(t,e){return qs.copy(t).applyQuaternion(this.quaternion),this.position.add(qs.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Xs,t)}translateY(t){return this.translateOnAxis(Ys,t)}translateZ(t){return this.translateOnAxis($s,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wt.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wn.copy(t):wn.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),ke.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wt.lookAt(ke,wn,this.up):Wt.lookAt(wn,ke,this.up),this.quaternion.setFromRotationMatrix(Wt),i&&(Wt.extractRotation(i.matrixWorld),be.setFromRotationMatrix(Wt),this.quaternion.premultiply(be.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(rt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zs),Me.child=t,this.dispatchEvent(Me),Me.child=null):rt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(sl),wi.child=t,this.dispatchEvent(wi),wi.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wt.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wt.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wt),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zs),Me.child=t,this.dispatchEvent(Me),Me.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,r=i.length;s<r;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ke,t,nl),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ke,il,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,s=this.matrix.elements;s[12]+=e-s[0]*e-s[4]*n-s[8]*i,s[13]+=n-s[1]*e-s[5]*n-s[9]*i,s[14]+=i-s[2]*e-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,a){return o[a.uuid]===void 0&&(o[a.uuid]=a.toJSON(t)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let a=o.shapes;if(Array.isArray(a))for(let l=0,c=a.length;l<c;l++){let u=a[l];s(t.shapes,u)}else s(t.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let a=0,l=this.material.length;a<l;a++)o.push(s(t.materials,this.material[a]));i.material=o}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let a=this.animations[o];i.animations.push(s(t.animations,a))}}if(e){let o=r(t.geometries),a=r(t.materials),l=r(t.textures),c=r(t.images),u=r(t.shapes),h=r(t.skeletons),d=r(t.animations),p=r(t.nodes);o.length>0&&(n.geometries=o),a.length>0&&(n.materials=a),l.length>0&&(n.textures=l),c.length>0&&(n.images=c),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(o){let a=[];for(let l in o){let c=o[l];delete c.metadata,a.push(c)}return a}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};fe.DEFAULT_UP=new N(0,1,0);fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qt={h:0,s:0,l:0},An={h:0,s:0,l:0};function Ai(f,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?f+(t-f)*6*e:e<1/2?t:e<2/3?f+(t-f)*6*(2/3-e):f}var dt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=It){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Rt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Rt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Rt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Rt.workingColorSpace){if(t=Za(t,1),e=et(e,0,1),n=et(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,r=2*n-s;this.r=Ai(r,s,t+1/3),this.g=Ai(r,s,t),this.b=Ai(r,s,t-1/3)}return Rt.colorSpaceToWorking(this,i),this}setStyle(t,e=It){function n(s){s!==void 0&&parseFloat(s)<1&&ut("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:ut("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=It){let n=dr[t.toLowerCase()];return n!==void 0?this.setHex(n,e):ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xt(t.r),this.g=Xt(t.g),this.b=Xt(t.b),this}copyLinearToSRGB(t){return this.r=Ie(t.r),this.g=Ie(t.g),this.b=Ie(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=It){return Rt.workingToColorSpace(pt.copy(this),t),Math.round(et(pt.r*255,0,255))*65536+Math.round(et(pt.g*255,0,255))*256+Math.round(et(pt.b*255,0,255))}getHexString(t=It){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Rt.workingColorSpace){Rt.workingToColorSpace(pt.copy(this),e);let n=pt.r,i=pt.g,s=pt.b,r=Math.max(n,i,s),o=Math.min(n,i,s),a,l,c=(o+r)/2;if(o===r)a=0,l=0;else{let u=r-o;switch(l=c<=.5?u/(r+o):u/(2-r-o),r){case n:a=(i-s)/u+(i<s?6:0);break;case i:a=(s-n)/u+2;break;case s:a=(n-i)/u+4;break}a/=6}return t.h=a,t.s=l,t.l=c,t}getRGB(t,e=Rt.workingColorSpace){return Rt.workingToColorSpace(pt.copy(this),e),t.r=pt.r,t.g=pt.g,t.b=pt.b,t}getStyle(t=It){Rt.workingToColorSpace(pt.copy(this),t);let e=pt.r,n=pt.g,i=pt.b;return t!==It?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Qt),this.setHSL(Qt.h+t,Qt.s+e,Qt.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Qt),t.getHSL(An);let n=vi(Qt.h,An.h,e),i=vi(Qt.s,An.s,e),s=vi(Qt.l,An.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},pt=new dt;dt.NAMES=dr;var ne=class{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Dt.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Dt.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Dt.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Dt):Dt.fromBufferAttribute(s,r),Dt.applyMatrix4(t.matrixWorld),this.expandByPoint(Dt);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),En.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),En.copy(n.boundingBox)),En.applyMatrix4(t.matrixWorld),this.union(En)}let i=t.children;for(let s=0,r=i.length;s<r;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dt),Dt.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ge),Tn.subVectors(this.max,Ge),we.subVectors(t.a,Ge),Ae.subVectors(t.b,Ge),Ee.subVectors(t.c,Ge),te.subVectors(Ae,we),ee.subVectors(Ee,Ae),he.subVectors(we,Ee);let e=[0,-te.z,te.y,0,-ee.z,ee.y,0,-he.z,he.y,te.z,0,-te.x,ee.z,0,-ee.x,he.z,0,-he.x,-te.y,te.x,0,-ee.y,ee.x,0,-he.y,he.x,0];return!Ei(e,we,Ae,Ee,Tn)||(e=[1,0,0,0,1,0,0,0,1],!Ei(e,we,Ae,Ee,Tn))?!1:(Cn.crossVectors(te,ee),e=[Cn.x,Cn.y,Cn.z],Ei(e,we,Ae,Ee,Tn))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dt).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dt).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qt),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},qt=[new N,new N,new N,new N,new N,new N,new N,new N],Dt=new N,En=new ne,we=new N,Ae=new N,Ee=new N,te=new N,ee=new N,he=new N,Ge=new N,Tn=new N,Cn=new N,ue=new N;function Ei(f,t,e,n,i){for(let s=0,r=f.length-3;s<=r;s+=3){ue.fromArray(f,s);let o=i.x*Math.abs(ue.x)+i.y*Math.abs(ue.y)+i.z*Math.abs(ue.z),a=t.dot(ue),l=e.dot(ue),c=n.dot(ue);if(Math.max(-Math.max(a,l,c),Math.min(a,l,c))>o)return!1}return!0}var at=new N,Rn=new ct,rl=0,Yt=class extends de{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rl++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=hr,this.updateRanges=[],this.gpuType=lr,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Rn.fromBufferAttribute(this,e),Rn.applyMatrix3(t),this.setXY(e,Rn.x,Rn.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)at.fromBufferAttribute(this,e),at.applyMatrix3(t),this.setXYZ(e,at.x,at.y,at.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)at.fromBufferAttribute(this,e),at.applyMatrix4(t),this.setXYZ(e,at.x,at.y,at.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)at.fromBufferAttribute(this,e),at.applyNormalMatrix(t),this.setXYZ(e,at.x,at.y,at.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)at.fromBufferAttribute(this,e),at.transformDirection(t),this.setXYZ(e,at.x,at.y,at.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ve(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=yt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ve(e,this.array)),e}setX(t,e){return this.normalized&&(e=yt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ve(e,this.array)),e}setY(t,e){return this.normalized&&(e=yt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ve(e,this.array)),e}setZ(t,e){return this.normalized&&(e=yt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ve(e,this.array)),e}setW(t,e){return this.normalized&&(e=yt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=yt(e,this.array),n=yt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=yt(e,this.array),n=yt(n,this.array),i=yt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=yt(e,this.array),n=yt(n,this.array),i=yt(i,this.array),s=yt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var Bn=class extends Yt{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var On=class extends Yt{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var wt=class extends Yt{constructor(t,e,n){super(new Float32Array(t),e,n)}},ol=new ne,He=new N,Ti=new N,zn=class{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):ol.setFromPoints(t).getCenter(n);let i=0;for(let s=0,r=t.length;s<r;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;He.subVectors(t,this.center);let e=He.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(He,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ti.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(He.copy(t.center).add(Ti)),this.expandByPoint(He.copy(t.center).sub(Ti))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},al=0,Ct=new Ot,Ci=new fe,Te=new N,Mt=new ne,We=new ne,ht=new N,Le=class f extends de{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:al++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qa(t)?On:Bn)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new J().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ct.makeRotationFromQuaternion(t),this.applyMatrix4(Ct),this}rotateX(t){return Ct.makeRotationX(t),this.applyMatrix4(Ct),this}rotateY(t){return Ct.makeRotationY(t),this.applyMatrix4(Ct),this}rotateZ(t){return Ct.makeRotationZ(t),this.applyMatrix4(Ct),this}translate(t,e,n){return Ct.makeTranslation(t,e,n),this.applyMatrix4(Ct),this}scale(t,e,n){return Ct.makeScale(t,e,n),this.applyMatrix4(Ct),this}lookAt(t){return Ci.lookAt(t),Ci.updateMatrix(),this.applyMatrix4(Ci.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Te).negate(),this.translate(Te.x,Te.y,Te.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new wt(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ne);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];Mt.setFromBufferAttribute(s),this.morphTargetsRelative?(ht.addVectors(this.boundingBox.min,Mt.min),this.boundingBox.expandByPoint(ht),ht.addVectors(this.boundingBox.max,Mt.max),this.boundingBox.expandByPoint(ht)):(this.boundingBox.expandByPoint(Mt.min),this.boundingBox.expandByPoint(Mt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let n=this.boundingSphere.center;if(Mt.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){let o=e[s];We.setFromBufferAttribute(o),this.morphTargetsRelative?(ht.addVectors(Mt.min,We.min),Mt.expandByPoint(ht),ht.addVectors(Mt.max,We.max),Mt.expandByPoint(ht)):(Mt.expandByPoint(We.min),Mt.expandByPoint(We.max))}Mt.getCenter(n);let i=0;for(let s=0,r=t.count;s<r;s++)ht.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(ht));if(e)for(let s=0,r=e.length;s<r;s++){let o=e[s],a=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)ht.fromBufferAttribute(o,l),a&&(Te.fromBufferAttribute(t,l),ht.add(Te)),i=Math.max(i,n.distanceToSquared(ht))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==n.count)&&(r=new Yt(new Float32Array(4*n.count),4),this.setAttribute("tangent",r));let o=[],a=[];for(let A=0;A<n.count;A++)o[A]=new N,a[A]=new N;let l=new N,c=new N,u=new N,h=new ct,d=new ct,p=new ct,g=new N,x=new N;function v(A,R,T){l.fromBufferAttribute(n,A),c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,T),h.fromBufferAttribute(s,A),d.fromBufferAttribute(s,R),p.fromBufferAttribute(s,T),c.sub(l),u.sub(l),d.sub(h),p.sub(h);let D=1/(d.x*p.y-p.x*d.y);isFinite(D)&&(g.copy(c).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(D),x.copy(u).multiplyScalar(d.x).addScaledVector(c,-p.x).multiplyScalar(D),o[A].add(g),o[R].add(g),o[T].add(g),a[A].add(x),a[R].add(x),a[T].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:t.count}]);for(let A=0,R=_.length;A<R;++A){let T=_[A],D=T.start,O=T.count;for(let E=D,F=D+O;E<F;E+=3)v(t.getX(E+0),t.getX(E+1),t.getX(E+2))}let S=new N,y=new N,b=new N,M=new N;function w(A){b.fromBufferAttribute(i,A),M.copy(b);let R=o[A];S.copy(R),S.sub(b.multiplyScalar(b.dot(R))).normalize(),y.crossVectors(M,R);let D=y.dot(a[A])<0?-1:1;r.setXYZW(A,S.x,S.y,S.z,D)}for(let A=0,R=_.length;A<R;++A){let T=_[A],D=T.start,O=T.count;for(let E=D,F=D+O;E<F;E+=3)w(t.getX(E+0)),w(t.getX(E+1)),w(t.getX(E+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Yt(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);let i=new N,s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,u=new N;if(t)for(let h=0,d=t.count;h<d;h+=3){let p=t.getX(h+0),g=t.getX(h+1),x=t.getX(h+2);i.fromBufferAttribute(e,p),s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),c.subVectors(r,s),u.subVectors(i,s),c.cross(u),o.fromBufferAttribute(n,p),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),o.add(c),a.add(c),l.add(c),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z)}else for(let h=0,d=e.count;h<d;h+=3)i.fromBufferAttribute(e,h+0),s.fromBufferAttribute(e,h+1),r.fromBufferAttribute(e,h+2),c.subVectors(r,s),u.subVectors(i,s),c.cross(u),n.setXYZ(h+0,c.x,c.y,c.z),n.setXYZ(h+1,c.x,c.y,c.z),n.setXYZ(h+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ht.fromBufferAttribute(t,e),ht.normalize(),t.setXYZ(e,ht.x,ht.y,ht.z)}toNonIndexed(){function t(o,a){let l=o.array,c=o.itemSize,u=o.normalized,h=new l.constructor(a.length*c),d=0,p=0;for(let g=0,x=a.length;g<x;g++){o.isInterleavedBufferAttribute?d=a[g]*o.data.stride+o.offset:d=a[g]*c;for(let v=0;v<c;v++)h[p++]=l[d++]}return new Yt(h,c,u)}if(this.index===null)return ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new f,n=this.index.array,i=this.attributes;for(let o in i){let a=i[o],l=t(a,n);e.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let a=[],l=s[o];for(let c=0,u=l.length;c<u;c++){let h=l[c],d=t(h,n);a.push(d)}e.morphAttributes[o]=a}e.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,a=r.length;o<a;o++){let l=r[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let a=this.parameters;for(let l in a)a[l]!==void 0&&(t[l]=a[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let a in n){let l=n[a];t.data.attributes[a]=l.toJSON(t.data)}let i={},s=!1;for(let a in this.morphAttributes){let l=this.morphAttributes[a],c=[];for(let u=0,h=l.length;u<h;u++){let d=l[u];c.push(d.toJSON(t.data))}c.length>0&&(i[a]=c,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let l in i){let c=i[l];this.setAttribute(l,c.clone(e))}let s=t.morphAttributes;for(let l in s){let c=[],u=s[l];for(let h=0,d=u.length;h<d;h++)c.push(u[h].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let l=0,c=r.length;l<c;l++){let u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let a=t.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Ze=class f extends Le{constructor(t=1,e=1,n=1,i=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:r};let o=this;i=Math.floor(i),s=Math.floor(s),r=Math.floor(r);let a=[],l=[],c=[],u=[],h=0,d=0;p("z","y","x",-1,-1,n,e,t,r,s,0),p("z","y","x",1,-1,n,e,-t,r,s,1),p("x","z","y",1,1,t,n,e,i,r,2),p("x","z","y",1,-1,t,n,-e,i,r,3),p("x","y","z",1,-1,t,e,n,i,s,4),p("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(a),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(c,3)),this.setAttribute("uv",new wt(u,2));function p(g,x,v,_,S,y,b,M,w,A,R){let T=y/w,D=b/A,O=y/2,E=b/2,F=M/2,C=w+1,I=A+1,K=0,X=0,W=new N;for(let Y=0;Y<I;Y++){let B=Y*D-E;for(let U=0;U<C;U++){let q=U*T-O;W[g]=q*_,W[x]=B*S,W[v]=F,l.push(W.x,W.y,W.z),W[g]=0,W[x]=0,W[v]=M>0?1:-1,c.push(W.x,W.y,W.z),u.push(U/w),u.push(1-Y/A),K+=1}}for(let Y=0;Y<A;Y++)for(let B=0;B<w;B++){let U=h+B+C*Y,q=h+B+C*(Y+1),H=h+(B+1)+C*(Y+1),P=h+(B+1)+C*Y;a.push(U,q,P),a.push(q,H,P),X+=6}o.addGroup(d,X,R),d+=X,h+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new f(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Je=class f extends Le{constructor(t=1,e=1,n=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a};let l=this;i=Math.floor(i),s=Math.floor(s);let c=[],u=[],h=[],d=[],p=0,g=[],x=n/2,v=0;_(),r===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(c),this.setAttribute("position",new wt(u,3)),this.setAttribute("normal",new wt(h,3)),this.setAttribute("uv",new wt(d,2));function _(){let y=new N,b=new N,M=0,w=(e-t)/n;for(let A=0;A<=s;A++){let R=[],T=A/s,D=T*(e-t)+t;for(let O=0;O<=i;O++){let E=O/i,F=E*a+o,C=Math.sin(F),I=Math.cos(F);b.x=D*C,b.y=-T*n+x,b.z=D*I,u.push(b.x,b.y,b.z),y.set(C,w,I).normalize(),h.push(y.x,y.y,y.z),d.push(E,1-T),R.push(p++)}g.push(R)}for(let A=0;A<i;A++)for(let R=0;R<s;R++){let T=g[R][A],D=g[R+1][A],O=g[R+1][A+1],E=g[R][A+1];(t>0||R!==0)&&(c.push(T,D,E),M+=3),(e>0||R!==s-1)&&(c.push(D,O,E),M+=3)}l.addGroup(v,M,0),v+=M}function S(y){let b=p,M=new ct,w=new N,A=0,R=y===!0?t:e,T=y===!0?1:-1;for(let O=1;O<=i;O++)u.push(0,x*T,0),h.push(0,T,0),d.push(.5,.5),p++;let D=p;for(let O=0;O<=i;O++){let F=O/i*a+o,C=Math.cos(F),I=Math.sin(F);w.x=R*I,w.y=x*T,w.z=R*C,u.push(w.x,w.y,w.z),h.push(0,T,0),M.x=C*.5+.5,M.y=I*.5*T+.5,d.push(M.x,M.y),p++}for(let O=0;O<i;O++){let E=b+O,F=D+O;y===!0?c.push(F,F+1,E):c.push(F+1,F,E),A+=3}l.addGroup(v,A,y===!0?1:2),v+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new f(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var pe=class f extends Le{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};let s=[],r=[];o(i),l(n),c(),this.setAttribute("position",new wt(s,3)),this.setAttribute("normal",new wt(s.slice(),3)),this.setAttribute("uv",new wt(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(_){let S=new N,y=new N,b=new N;for(let M=0;M<e.length;M+=3)d(e[M+0],S),d(e[M+1],y),d(e[M+2],b),a(S,y,b,_)}function a(_,S,y,b){let M=b+1,w=[];for(let A=0;A<=M;A++){w[A]=[];let R=_.clone().lerp(y,A/M),T=S.clone().lerp(y,A/M),D=M-A;for(let O=0;O<=D;O++)O===0&&A===M?w[A][O]=R:w[A][O]=R.clone().lerp(T,O/D)}for(let A=0;A<M;A++)for(let R=0;R<2*(M-A)-1;R++){let T=Math.floor(R/2);R%2===0?(h(w[A][T+1]),h(w[A+1][T]),h(w[A][T])):(h(w[A][T+1]),h(w[A+1][T+1]),h(w[A+1][T]))}}function l(_){let S=new N;for(let y=0;y<s.length;y+=3)S.x=s[y+0],S.y=s[y+1],S.z=s[y+2],S.normalize().multiplyScalar(_),s[y+0]=S.x,s[y+1]=S.y,s[y+2]=S.z}function c(){let _=new N;for(let S=0;S<s.length;S+=3){_.x=s[S+0],_.y=s[S+1],_.z=s[S+2];let y=x(_)/2/Math.PI+.5,b=v(_)/Math.PI+.5;r.push(y,1-b)}p(),u()}function u(){for(let _=0;_<r.length;_+=6){let S=r[_+0],y=r[_+2],b=r[_+4],M=Math.max(S,y,b),w=Math.min(S,y,b);M>.9&&w<.1&&(S<.2&&(r[_+0]+=1),y<.2&&(r[_+2]+=1),b<.2&&(r[_+4]+=1))}}function h(_){s.push(_.x,_.y,_.z)}function d(_,S){let y=_*3;S.x=t[y+0],S.y=t[y+1],S.z=t[y+2]}function p(){let _=new N,S=new N,y=new N,b=new N,M=new ct,w=new ct,A=new ct;for(let R=0,T=0;R<s.length;R+=9,T+=6){_.set(s[R+0],s[R+1],s[R+2]),S.set(s[R+3],s[R+4],s[R+5]),y.set(s[R+6],s[R+7],s[R+8]),M.set(r[T+0],r[T+1]),w.set(r[T+2],r[T+3]),A.set(r[T+4],r[T+5]),b.copy(_).add(S).add(y).divideScalar(3);let D=x(b);g(M,T+0,_,D),g(w,T+2,S,D),g(A,T+4,y,D)}}function g(_,S,y,b){b<0&&_.x===1&&(r[S]=_.x-1),y.x===0&&y.z===0&&(r[S]=b/2/Math.PI+.5)}function x(_){return Math.atan2(_.z,-_.x)}function v(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new f(t.vertices,t.indices,t.radius,t.detail)}},je=class f extends pe{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new f(t.radius,t.detail)}};var Ke=class f extends pe{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new f(t.radius,t.detail)}};var Qe=class f extends pe{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new f(t.radius,t.detail)}};var tn=class f extends pe{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new f(t.radius,t.detail)}};function fr(f){let t={};for(let e in f){t[e]={};for(let n in f[e]){let i=f[e][n];if(Js(i))i.isRenderTargetTexture?(ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Js(i[0])){let s=[];for(let r=0,o=i.length;r<o;r++)s[r]=i[r].clone();t[e][n]=s}else t[e][n]=i.slice();else t[e][n]=i}}return t}function _t(f){let t={};for(let e=0;e<f.length;e++){let n=fr(f[e]);for(let i in n)t[i]=n[i]}return t}function Js(f){return f&&(f.isColor||f.isMatrix3||f.isMatrix4||f.isVector2||f.isVector3||f.isVector4||f.isTexture||f.isQuaternion)}function Ce(f,t){return!f||f.constructor===t?f:typeof t.BYTES_PER_ELEMENT=="number"?new t(f):Array.prototype.slice.call(f)}function Ri(f){return f!==void 0&&f.inTangents!==void 0&&f.outTangents!==void 0}var ie=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let r;e:{i:if(!(t<i)){for(let o=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=e[++n],t<i)break t}r=e.length;break e}if(!(t>=s)){let o=e[1];t<o&&(n=2,s=o);for(let a=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=s,s=e[--n-1],t>=s)break t}r=n,n=0;break e}break n}for(;n<r;){let o=n+r>>>1;t<e[o]?r=o:n=o+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let r=0;r!==i;++r)e[r]=n[s+r];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Vn=class extends ie{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ki,endingEnd:ki}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,r=t+1,o=i[s],a=i[r];if(o===void 0)switch(this.getSettings_().endingStart){case Gi:s=t,o=2*e-n;break;case Hi:s=i.length-2,o=e+i[s]-i[s+1];break;default:s=t,o=n}if(a===void 0)switch(this.getSettings_().endingEnd){case Gi:r=t,a=2*n-e;break;case Hi:r=1,a=n+i[1]-i[0];break;default:r=t-1,a=e}let l=(n-e)*.5,c=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(a-n),this._offsetPrev=s*c,this._offsetNext=r*c}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=t*o,l=a-o,c=this._offsetPrev,u=this._offsetNext,h=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),g=p*p,x=g*p,v=-h*x+2*h*g-h*p,_=(1+h)*x+(-1.5-2*h)*g+(-.5+h)*p+1,S=(-1-d)*x+(1.5+d)*g+.5*p,y=d*x-d*g;for(let b=0;b!==o;++b)s[b]=v*r[c+b]+_*r[l+b]+S*r[a+b]+y*r[u+b];return s}},kn=class extends ie{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=t*o,l=a-o,c=(n-e)/(i-e),u=1-c;for(let h=0;h!==o;++h)s[h]=r[l+h]*u+r[a+h]*c;return s}},Gn=class extends ie{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Hn=class extends ie{interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=t*o,l=a-o,c=this.inTangents,u=this.outTangents;if(!c||!u){let p=(n-e)/(i-e),g=1-p;for(let x=0;x!==o;++x)s[x]=r[l+x]*g+r[a+x]*p;return s}let h=o*2,d=t-1;for(let p=0;p!==o;++p){let g=r[l+p],x=r[a+p],v=d*h+p*2,_=u[v],S=u[v+1],y=t*h+p*2,b=c[y],M=c[y+1],w=cl(n,e,_,b,i);s[p]=pr(w,g,S,M,x)}return s}};function pr(f,t,e,n,i){let s=1-f;return s*s*s*t+3*s*s*f*e+3*s*f*f*n+f*f*f*i}function ll(f,t,e,n,i){let s=1-f;return 3*s*s*(e-t)+6*s*f*(n-e)+3*f*f*(i-n)}function cl(f,t,e,n,i){let s=(f-t)/(i-t);for(let r=0;r<8;r++){let o=pr(s,t,e,n,i)-f;if(Math.abs(o)<1e-10)break;let a=ll(s,t,e,n,i);if(Math.abs(a)<1e-10)break;s=Math.max(0,Math.min(1,s-o/a))}return s}var At=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ce(e,this.TimeBufferType),this.values=Ce(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ce(t.times,Array),values:Ce(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Ri(t.settings)&&(n.settings={inTangents:Ce(t.settings.inTangents,Array),outTangents:Ce(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Gn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new kn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Vn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Hn(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ye:e=this.InterpolantFactoryMethodDiscrete;break;case Ln:e=this.InterpolantFactoryMethodLinear;break;case In:e=this.InterpolantFactoryMethodSmooth;break;case Vi:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ut("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ye;case this.InterpolantFactoryMethodLinear:return Ln;case this.InterpolantFactoryMethodSmooth:return In;case this.InterpolantFactoryMethodBezier:return Vi}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Ri(this.settings)&&(js(this.settings.inTangents,t),js(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,s=0,r=i-1;for(;s!==i&&n[s]<t;)++s;for(;r!==-1&&n[r]>e;)--r;if(++r,s!==0||r!==i){s>=r&&(r=Math.max(r,1),s=r-1);let o=this.getValueSize();this.times=n.slice(s,r),this.values=this.values.slice(s*o,r*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(rt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(rt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==s;o++){let a=n[o];if(typeof a=="number"&&isNaN(a)){rt("KeyframeTrack: Time is not a valid number.",this,o,a),t=!1;break}if(r!==null&&r>a){rt("KeyframeTrack: Out of order keys.",this,o,a,r),t=!1;break}r=a}if(i!==void 0&&Xa(i))for(let o=0,a=i.length;o!==a;++o){let l=i[o];if(isNaN(l)){rt("KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===In,s=t.length-1,r=1;for(let o=1;o<s;++o){let a=!1,l=t[o],c=t[o+1];if(l!==c&&(o!==1||l!==t[0]))if(i)a=!0;else{let u=o*n,h=u-n,d=u+n;for(let p=0;p!==n;++p){let g=e[u+p];if(g!==e[h+p]||g!==e[d+p]){a=!0;break}}}if(a){if(o!==r){t[r]=t[o];let u=o*n,h=r*n;for(let d=0;d!==n;++d)e[h+d]=e[u+d]}++r}}if(s>0){t[r]=t[s];for(let o=s*n,a=r*n,l=0;l!==n;++l)e[a+l]=e[o+l];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=e.slice(0,r*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Ri(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function js(f,t){for(let e=0,n=f.length;e!==n;e+=2)f[e]*=t}At.prototype.ValueTypeName="";At.prototype.TimeBufferType=Float32Array;At.prototype.ValueBufferType=Float32Array;At.prototype.DefaultInterpolation=Ln;var se=class extends At{constructor(t,e,n){super(t,e,n)}};se.prototype.ValueTypeName="bool";se.prototype.ValueBufferType=Array;se.prototype.DefaultInterpolation=Ye;se.prototype.InterpolantFactoryMethodLinear=void 0;se.prototype.InterpolantFactoryMethodSmooth=void 0;var Wn=class extends At{constructor(t,e,n,i){super(t,e,n,i)}};Wn.prototype.ValueTypeName="color";var qn=class extends At{constructor(t,e,n,i){super(t,e,n,i)}};qn.prototype.ValueTypeName="number";var Xn=class extends ie{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,r=this.sampleValues,o=this.valueSize,a=(n-e)/(i-e),l=t*o;for(let c=l+o;l!==c;l+=4)mt.slerpFlat(s,0,r,l-o,r,l,a);return s}},en=class extends At{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Xn(this.times,this.values,this.getValueSize(),t)}};en.prototype.ValueTypeName="quaternion";en.prototype.InterpolantFactoryMethodSmooth=void 0;var re=class extends At{constructor(t,e,n){super(t,e,n)}};re.prototype.ValueTypeName="string";re.prototype.ValueBufferType=Array;re.prototype.DefaultInterpolation=Ye;re.prototype.InterpolantFactoryMethodLinear=void 0;re.prototype.InterpolantFactoryMethodSmooth=void 0;var Yn=class extends At{constructor(t,e,n,i){super(t,e,n,i)}};Yn.prototype.ValueTypeName="vector";var $n=class{constructor(t,e,n){let i=this,s=!1,r=0,o=0,a,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(c){o++,s===!1&&i.onStart!==void 0&&i.onStart(c,r,o),s=!0},this.itemEnd=function(c){r++,i.onProgress!==void 0&&i.onProgress(c,r,o),r===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(c){i.onError!==void 0&&i.onError(c)},this.resolveURL=function(c){return c=c.normalize("NFC"),a?a(c):c},this.setURLModifier=function(c){return a=c,this},this.addHandler=function(c,u){return l.push(c,u),this},this.removeHandler=function(c){let u=l.indexOf(c);return u!==-1&&l.splice(u,2),this},this.getHandler=function(c){for(let u=0,h=l.length;u<h;u+=2){let d=l[u],p=l[u+1];if(d.global&&(d.lastIndex=0),d.test(c))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},mr=new $n,Zn=class{constructor(t){this.manager=t!==void 0?t:mr,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};Zn.DEFAULT_MATERIAL_NAME="__DEFAULT";var as="\\[\\]\\.:\\/",hl=new RegExp("["+as+"]","g"),ls="[^"+as+"]",ul="[^"+as.replace("\\.","")+"]",dl=/((?:WC+[\/:])*)/.source.replace("WC",ls),fl=/(WCOD+)?/.source.replace("WCOD",ul),pl=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ls),ml=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ls),gl=new RegExp("^"+dl+fl+pl+ml+"$"),xl=["material","materials","bones","map"],Zi=class{constructor(t,e,n){let i=n||st.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},st=class f{constructor(t,e,n){this.path=e,this.parsedPath=n||f.parseTrackName(e),this.node=f.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new f.Composite(t,e,n):new f(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(hl,"")}static parseTrackName(t){let e=gl.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);xl.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let r=0;r<s.length;r++){let o=s[r];if(o.name===e||o.uuid===e)return o;let a=n(o.children);if(a)return a}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=f.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){ut("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let c=0;c<t.length;c++)if(t[c].name===l){l=c;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){rt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let r=t[i];if(r===void 0){let l=e.nodeName;rt("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}a=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=s}else r.fromArray!==void 0&&r.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(a=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};st.Composite=Zi;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Ed=new Float32Array(1);var Ji=class f{static{f.prototype.isMatrix2=!0}constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let s=this.elements;return s[0]=t,s[2]=e,s[1]=n,s[3]=i,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");var _l=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vl=`#ifdef USE_ALPHAHASH
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
#endif`,yl=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sl=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bl=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ml=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wl=`#ifdef USE_AOMAP
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
#endif`,Al=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,El=`#ifdef USE_BATCHING
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
#endif`,Tl=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cl=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rl=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Il=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pl=`#ifdef USE_IRIDESCENCE
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
#endif`,Ll=`#ifdef USE_BUMPMAP
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
#endif`,Nl=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Fl=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ul=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ol=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,zl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vl=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,kl=`#define PI 3.141592653589793
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
} // validated`,Gl=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hl=`vec3 transformedNormal = objectNormal;
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
#endif`,Wl=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ql=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xl=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yl=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$l="gl_FragColor = linearToOutputTexel( gl_FragColor );",Zl=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jl=`#ifdef USE_ENVMAP
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
#endif`,jl=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kl=`#ifdef USE_ENVMAP
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
#endif`,Ql=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tc=`#ifdef USE_ENVMAP
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
#endif`,ec=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ic=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,sc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rc=`#ifdef USE_GRADIENTMAP
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
}`,oc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ac=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cc=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,hc=`#ifdef USE_ENVMAP
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
#endif`,uc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,dc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,fc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pc=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mc=`PhysicalMaterial material;
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
#endif`,gc=`uniform sampler2D dfgLUT;
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
}`,xc=`
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
#endif`,_c=`#if defined( RE_IndirectDiffuse )
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
#endif`,vc=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yc=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Sc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,bc=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mc=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wc=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ac=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ec=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tc=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Cc=`#if defined( USE_POINTS_UV )
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
#endif`,Rc=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ic=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pc=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lc=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nc=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dc=`#ifdef USE_MORPHTARGETS
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
#endif`,Fc=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uc=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Bc=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Oc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zc=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vc=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,kc=`#ifdef USE_NORMALMAP
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
#endif`,Gc=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hc=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wc=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qc=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xc=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yc=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$c=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zc=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jc=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jc=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kc=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qc=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,th=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,eh=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ih=`float getShadowMask() {
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
}`,sh=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rh=`#ifdef USE_SKINNING
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
#endif`,oh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ah=`#ifdef USE_SKINNING
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
#endif`,lh=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ch=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uh=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dh=`#ifdef USE_TRANSMISSION
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
#endif`,fh=`#ifdef USE_TRANSMISSION
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
#endif`,ph=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,_h=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vh=`uniform sampler2D t2D;
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
}`,yh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sh=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wh=`#include <common>
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
}`,Ah=`#if DEPTH_PACKING == 3200
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
}`,Eh=`#define DISTANCE
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
}`,Th=`#define DISTANCE
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
}`,Ch=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ih=`uniform float scale;
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
}`,Ph=`uniform vec3 diffuse;
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
}`,Lh=`#include <common>
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
}`,Nh=`uniform vec3 diffuse;
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
}`,Dh=`#define LAMBERT
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
}`,Fh=`#define LAMBERT
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
}`,Uh=`#define MATCAP
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
}`,Bh=`#define MATCAP
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
}`,Oh=`#define NORMAL
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
}`,zh=`#define NORMAL
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
}`,Vh=`#define PHONG
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
}`,kh=`#define PHONG
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
}`,Gh=`#define STANDARD
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
}`,Hh=`#define STANDARD
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
}`,Wh=`#define TOON
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
}`,qh=`#define TOON
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
}`,Xh=`uniform float size;
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
}`,Yh=`uniform vec3 diffuse;
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
}`,$h=`#include <common>
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
}`,Zh=`uniform vec3 color;
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
}`,Jh=`uniform float rotation;
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
}`,jh=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:_l,alphahash_pars_fragment:vl,alphamap_fragment:yl,alphamap_pars_fragment:Sl,alphatest_fragment:bl,alphatest_pars_fragment:Ml,aomap_fragment:wl,aomap_pars_fragment:Al,batching_pars_vertex:El,batching_vertex:Tl,begin_vertex:Cl,beginnormal_vertex:Rl,bsdfs:Il,iridescence_fragment:Pl,bumpmap_pars_fragment:Ll,clipping_planes_fragment:Nl,clipping_planes_pars_fragment:Dl,clipping_planes_pars_vertex:Fl,clipping_planes_vertex:Ul,color_fragment:Bl,color_pars_fragment:Ol,color_pars_vertex:zl,color_vertex:Vl,common:kl,cube_uv_reflection_fragment:Gl,defaultnormal_vertex:Hl,displacementmap_pars_vertex:Wl,displacementmap_vertex:ql,emissivemap_fragment:Xl,emissivemap_pars_fragment:Yl,colorspace_fragment:$l,colorspace_pars_fragment:Zl,envmap_fragment:Jl,envmap_common_pars_fragment:jl,envmap_pars_fragment:Kl,envmap_pars_vertex:Ql,envmap_physical_pars_fragment:hc,envmap_vertex:tc,fog_vertex:ec,fog_pars_vertex:nc,fog_fragment:ic,fog_pars_fragment:sc,gradientmap_pars_fragment:rc,lightmap_pars_fragment:oc,lights_lambert_fragment:ac,lights_lambert_pars_fragment:lc,lights_pars_begin:cc,lights_toon_fragment:uc,lights_toon_pars_fragment:dc,lights_phong_fragment:fc,lights_phong_pars_fragment:pc,lights_physical_fragment:mc,lights_physical_pars_fragment:gc,lights_fragment_begin:xc,lights_fragment_maps:_c,lights_fragment_end:vc,lightprobes_pars_fragment:yc,logdepthbuf_fragment:Sc,logdepthbuf_pars_fragment:bc,logdepthbuf_pars_vertex:Mc,logdepthbuf_vertex:wc,map_fragment:Ac,map_pars_fragment:Ec,map_particle_fragment:Tc,map_particle_pars_fragment:Cc,metalnessmap_fragment:Rc,metalnessmap_pars_fragment:Ic,morphinstance_vertex:Pc,morphcolor_vertex:Lc,morphnormal_vertex:Nc,morphtarget_pars_vertex:Dc,morphtarget_vertex:Fc,normal_fragment_begin:Uc,normal_fragment_maps:Bc,normal_pars_fragment:Oc,normal_pars_vertex:zc,normal_vertex:Vc,normalmap_pars_fragment:kc,clearcoat_normal_fragment_begin:Gc,clearcoat_normal_fragment_maps:Hc,clearcoat_pars_fragment:Wc,iridescence_pars_fragment:qc,opaque_fragment:Xc,packing:Yc,premultiplied_alpha_fragment:$c,project_vertex:Zc,dithering_fragment:Jc,dithering_pars_fragment:jc,roughnessmap_fragment:Kc,roughnessmap_pars_fragment:Qc,shadowmap_pars_fragment:th,shadowmap_pars_vertex:eh,shadowmap_vertex:nh,shadowmask_pars_fragment:ih,skinbase_vertex:sh,skinning_pars_vertex:rh,skinning_vertex:oh,skinnormal_vertex:ah,specularmap_fragment:lh,specularmap_pars_fragment:ch,tonemapping_fragment:hh,tonemapping_pars_fragment:uh,transmission_fragment:dh,transmission_pars_fragment:fh,uv_pars_fragment:ph,uv_pars_vertex:mh,uv_vertex:gh,worldpos_vertex:xh,background_vert:_h,background_frag:vh,backgroundCube_vert:yh,backgroundCube_frag:Sh,cube_vert:bh,cube_frag:Mh,depth_vert:wh,depth_frag:Ah,distance_vert:Eh,distance_frag:Th,equirect_vert:Ch,equirect_frag:Rh,linedashed_vert:Ih,linedashed_frag:Ph,meshbasic_vert:Lh,meshbasic_frag:Nh,meshlambert_vert:Dh,meshlambert_frag:Fh,meshmatcap_vert:Uh,meshmatcap_frag:Bh,meshnormal_vert:Oh,meshnormal_frag:zh,meshphong_vert:Vh,meshphong_frag:kh,meshphysical_vert:Gh,meshphysical_frag:Hh,meshtoon_vert:Wh,meshtoon_frag:qh,points_vert:Xh,points_frag:Yh,shadow_vert:$h,shadow_frag:Zh,sprite_vert:Jh,sprite_frag:jh},k={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new J}},envmap:{envMap:{value:null},envMapRotation:{value:new J},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new J}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new J}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new J},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new J},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new J},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new J}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new J}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new J}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0},uvTransform:{value:new J}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}}},gr={basic:{uniforms:_t([k.common,k.specularmap,k.envmap,k.aomap,k.lightmap,k.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:_t([k.common,k.specularmap,k.envmap,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.fog,k.lights,{emissive:{value:new dt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:_t([k.common,k.specularmap,k.envmap,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.fog,k.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:_t([k.common,k.envmap,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.roughnessmap,k.metalnessmap,k.fog,k.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:_t([k.common,k.aomap,k.lightmap,k.emissivemap,k.bumpmap,k.normalmap,k.displacementmap,k.gradientmap,k.fog,k.lights,{emissive:{value:new dt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:_t([k.common,k.bumpmap,k.normalmap,k.displacementmap,k.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:_t([k.points,k.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:_t([k.common,k.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:_t([k.common,k.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:_t([k.common,k.bumpmap,k.normalmap,k.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:_t([k.sprite,k.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new J},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new J}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:_t([k.common,k.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:_t([k.lights,k.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};gr.physical={uniforms:_t([gr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new J},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new J},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new J},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new J},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new J},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new J},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new J},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new J},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new J},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new J},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new J},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new J}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};var Kh=new J;Kh.set(-1,0,0,0,1,0,0,0,1);var Zx={[ji]:"LINEAR_TONE_MAPPING",[Ki]:"REINHARD_TONE_MAPPING",[Qi]:"CINEON_TONE_MAPPING",[ts]:"ACES_FILMIC_TONE_MAPPING",[ns]:"AGX_TONE_MAPPING",[is]:"NEUTRAL_TONE_MAPPING",[es]:"CUSTOM_TONE_MAPPING"};var Jx=new Float32Array(16),jx=new Float32Array(9),Kx=new Float32Array(4);var Qx={[ji]:"Linear",[Ki]:"Reinhard",[Qi]:"Cineon",[ts]:"ACESFilmic",[ns]:"AgX",[is]:"Neutral",[es]:"Custom"};var t_={[Ks]:"SHADOWMAP_TYPE_PCF",[Qs]:"SHADOWMAP_TYPE_VSM"};var e_={[ir]:"ENVMAP_TYPE_CUBE",[rs]:"ENVMAP_TYPE_CUBE",[sr]:"ENVMAP_TYPE_CUBE_UV"};var n_={[rs]:"ENVMAP_MODE_REFRACTION"};var i_={[tr]:"ENVMAP_BLENDING_MULTIPLY",[er]:"ENVMAP_BLENDING_MIX",[nr]:"ENVMAP_BLENDING_ADD"};var Qh=new J;Qh.set(-1,0,0,0,1,0,0,0,1);var s_=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);var jn=new Map;function Kn(f){if(jn.has(f))return jn.get(f);let t;if(f===4)t=new tn(1);else if(f===6)t=new Ze(1.25,1.25,1.25);else if(f===8)t=new Qe(1);else if(f===12)t=new je(1);else if(f===20)t=new Ke(1);else if(f===2)t=new Je(.85,.85,.22,20);else if(f===10||f===100)return tu(f);let e=t.getAttribute("position"),n=t.index,i=[];for(let o=0;o<(n?n.count:e.count);o+=3){let a=Array.from({length:3},(h,d)=>new N().fromBufferAttribute(e,n?n.getX(o+d):o+d)),l=new N().crossVectors(a[1].clone().sub(a[0]),a[2].clone().sub(a[0])).normalize(),c=l.dot(a[0]),u=i.find(h=>h.n.dot(l)>.9999&&Math.abs(h.plane-c)<.001);u||(u={n:l,plane:c,points:[]},i.push(u));for(let h of a)u.points.some(d=>d.distanceTo(h)<.001)||u.points.push(h)}let s=i.map((o,a)=>{let l=o.points.reduce((h,d)=>h.add(d),new N).multiplyScalar(1/o.points.length),c=o.points[0].clone().sub(l).normalize(),u=new N().crossVectors(o.n,c);return{normal:o.n,center:l,points:o.points.sort((h,d)=>Math.atan2(u.dot(h.clone().sub(l)),c.dot(h.clone().sub(l)))-Math.atan2(u.dot(d.clone().sub(l)),c.dot(d.clone().sub(l)))),value:a+1}}),r={faces:s,top:o=>new mt().setFromUnitVectors((f===2?s.find(a=>a.normal.y>.9):s[(o-1)%s.length]).normal,new N(0,0,1))};return jn.set(f,r),t.dispose(),r}function tu(f){let n=[];for(let l=0;l<2;l++)for(let c=0;c<5;c++){let u=c*2*Math.PI/5+l*Math.PI/5;n.push(new N(Math.cos(u),Math.sin(u),l?-.48:.48))}let i=[Array.from({length:5},(l,c)=>c),Array.from({length:5},(l,c)=>5+c)];for(let l=0;l<5;l++){let c=(l+1)%5;i.push([l,c,5+l],[5+l,5+c,c])}let s=i.map(l=>{let c=n[l[0]],u=n[l[1]],h=n[l[2]],d=new N().crossVectors(u.clone().sub(c),h.clone().sub(c)).normalize();return d.dot(c)<0&&d.negate(),d.multiplyScalar(1/d.dot(c))}),r=1/Math.max(...s.map(l=>l.length()));s.forEach(l=>l.multiplyScalar(r));let o=n.map((l,c)=>{let u=l.clone().normalize(),h=i.flatMap((x,v)=>x.includes(c)?[s[v]]:[]),d=h.reduce((x,v)=>x.add(v),new N).multiplyScalar(1/h.length),p=h[0].clone().sub(d).normalize(),g=new N().crossVectors(u,p);return{normal:u,center:d,points:h.sort((x,v)=>Math.atan2(g.dot(x.clone().sub(d)),p.dot(x.clone().sub(d)))-Math.atan2(g.dot(v.clone().sub(d)),p.dot(v.clone().sub(d)))),value:c+1}}),a={faces:o,top:l=>new mt().setFromUnitVectors(o[(l-1)%10].normal,new N(0,0,1))};return jn.set(f,a),a}var cs=new Map;function eu(f){let t=f===100?10:f;if(cs.has(t))return cs.get(t);let e=Kn(t),n=[],i=e.faces.map(r=>r.points.map(o=>{let a=n.findIndex(l=>Math.hypot(l.x-o.x,l.y-o.y,l.z-o.z)<1e-6);return a<0&&(a=n.length,n.push(new m(o.x,o.y,o.z))),a})),s=new Be({vertices:n,faces:i});return cs.set(t,s),s}function xr(f,{width:t,height:e,radius:n,onImpact:i=()=>{}}){let s=new bn({gravity:new m(0,0,-32),allowSleep:!0});s.broadphase=new pn(s),s.solver.iterations=12,s.defaultContactMaterial.friction=.38,s.defaultContactMaterial.restitution=.35;let r=new j({mass:0,shape:new yn});s.addBody(r);let o=t/n,a=e/n;for(let[u,h,d,p]of[[0,a/2,1,a/2+2],[o,a/2,1,a/2+2],[o/2,0,o/2+2,1],[o/2,a,o/2+2,1]])s.addBody(new j({mass:0,shape:new Oe(new m(d,p,10)),position:new m(u,h,8)}));let l=0,c=f.map(u=>{let h=new j({mass:1,shape:eu(u.record.sides),linearDamping:.3,angularDamping:.28,sleepTimeLimit:.25,sleepSpeedLimit:.15});return h.position.set(u.x/n,u.y/n,u.z?u.z/n/.48:1.05),h.quaternion.copy(u.q),h.fixedRotation=!0,h.updateMassProperties(),h.addEventListener("collide",d=>{let p=Math.abs(d.contact?.getImpactVelocityAlongNormal?.()||0);p>1&&Date.now()-l>45&&(l=Date.now(),i(Math.min(2,p/7)))}),s.addBody(h),h});return{world:s,bodies:c,toss(u=Math.random){for(let[h,d]of c.entries())f[h].record.held||(d.fixedRotation=!1,d.updateMassProperties(),d.wakeUp(),d.position.z=3+u()*3,d.velocity.set((u()-.5)*12,(u()-.5)*10,3+u()*5),d.angularVelocity.set((u()-.5)*25,(u()-.5)*25,(u()-.5)*25),d.quaternion.setFromEuler(u()*6,u()*6,u()*6))},step(u,h={x:0,y:0}){s.gravity.set((h.x||0)*12,(h.y||0)*12,-32),s.step(1/90,Math.min(.09,u),8)},sync(){for(let[u,h]of c.entries()){let d=f[u];d.x=h.position.x*n,d.y=h.position.y*n,d.z=h.position.z*n*.48,d.q.copy(h.quaternion)}},freeze(){for(let u of c)u.velocity.setZero(),u.angularVelocity.setZero(),u.fixedRotation=!0,u.updateMassProperties(),u.sleep()},drag(u,h,d,p=0,g=0){let x=c[u];x.position.x=Math.max(2,Math.min(o-2,h/n)),x.position.y=Math.max(2,Math.min(a-2,d/n)),x.velocity.set(p/n,g/n,0),x.wakeUp()},destroy(){for(let u of[...s.bodies])s.removeBody(u)}}}var nn=Object.freeze([2,4,6,8,10,12,20,100]),Qn=Object.freeze(["sum","target","highest","lowest","drop-highest","drop-lowest","keep-highest","keep-lowest"]);function nu(f,t=null){if(!nn.includes(f))throw Error("Unsupported die.");if(t){let s=t();if(!Number.isFinite(s)||s<0||s>=1)throw Error("Invalid random source.");return 1+Math.floor(s*f)}let e=2**32,n=e-e%f,i=new Uint32Array(1);do crypto.getRandomValues(i);while(i[0]>=n);return 1+i[0]%f}function ti(f,{mode:t="sum",target:e=4,modifier:n=0,keep:i=1,base:s=null,net:r=0}={}){if(!Qn.includes(t)||!Number.isFinite(e)||!Number.isFinite(n))throw Error("Invalid result calculation.");let o=f.map((p,g)=>({i:g,value:p.value})).sort((p,g)=>g.value-p.value||p.i-g.i),a=f.map((p,g)=>g);s!==null?a=(r>=0?o:[...o].reverse()).slice(0,s).map(p=>p.i):t==="drop-highest"?a=o.slice(1).map(p=>p.i):t==="drop-lowest"?a=o.slice(0,-1).map(p=>p.i):t==="keep-highest"?a=o.slice(0,i).map(p=>p.i):t==="keep-lowest"&&(a=o.slice(-i).map(p=>p.i));let l=f.filter((p,g)=>a.includes(g)),c=l.reduce((p,g)=>p+g.value,0)+n,u=l.filter(p=>p.value+n>=e).length,h=l.length?Math.max(...l.map(p=>p.value)):0,d=l.length?Math.min(...l.map(p=>p.value)):0;return{sum:c,hits:u,highest:h,lowest:d,chosen:a,dropped:f.map((p,g)=>g).filter(p=>!a.includes(p)),exploding:a.filter(p=>f[p].value===f[p].sides),result:t==="target"?u:t==="highest"?h+n:t==="lowest"?d+n:c}}var _r=(f,t)=>typeof f=="string"&&f.trim().length>0&&f.length<=t&&!/[<>\u0000-\u001f]/.test(f);function $t(f){if(!f||typeof f!="object"||Array.isArray(f)||!_r(f.name,60)||!Array.isArray(f.pool)||!f.pool.length||f.pool.length>40)throw Error("Choose a valid dice bag.");let t=0;for(let e of f.pool){if(!e||!nn.includes(e.sides)||!Number.isInteger(e.count)||e.count<1||e.count>120||e.color&&!/^#[0-9a-f]{6}$/i.test(e.color)||e.faces&&(!Array.isArray(e.faces)||e.faces.length!==e.sides||e.faces.some(n=>!_r(n.label,20)||!Number.isFinite(n.value)||Math.abs(n.value)>1e5)))throw Error("Invalid dice bag entry.");t+=e.count}if(t>120)throw Error("A free-roll bag supports up to 120 dice. Game-required pools are prepared separately.");if(!Qn.includes(f.mode)||!Number.isFinite(f.target)||f.target<-1e5||f.target>1e5||!Number.isFinite(f.modifier)||Math.abs(f.modifier)>1e5||!Number.isInteger(f.keep)||f.keep<1||f.keep>120||typeof f.exploding!="boolean")throw Error("Invalid dice bag calculation.");return structuredClone({name:f.name,pool:f.pool,mode:f.mode,target:f.target,modifier:f.modifier,keep:f.keep,exploding:f.exploding})}function vr(f,{random:t=null,previous:e=[]}={}){let n=$t(f),i=Date.now().toString(36),s=[],r=e.filter(l=>l.held),o=new Set,a=0;for(let l of n.pool)for(let c=0;c<l.count;c++){let u=r.find((p,g)=>!o.has(g)&&p.sides===l.sides&&p.customKey===JSON.stringify(l.faces||null));if(u){o.add(r.indexOf(u)),s.push({...u});continue}let h=0,d;do{if(++h>100||s.length>=2e3)throw Error("Free-roll explosion limit exceeded.");d=nu(l.sides,t);let p=l.faces?.[d-1];s.push({id:"free-"+i+"-"+a++,sides:l.sides,face:d,value:p?.value??d,label:p?.label??String(d),color:l.color,customKey:JSON.stringify(l.faces||null),faces:l.faces,explosion:h>1,held:!1})}while(n.exploding&&d===l.sides)}for(let[l,c]of r.entries())o.has(l)||s.push({...c});return{records:s,summary:ti(s,n)}}var hs=()=>({name:"Field dice",pool:[{sides:6,count:3}],mode:"target",target:4,modifier:0,keep:1,exploding:!0});var yr="kdwarf-dice-room-v1",us="kdwarf-dice-bags-v1",ds="kdwarf-dice-history-v1",Et=f=>String(f).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),fs={board:"arcane",skin:"obsidian",color:"#283d52",ink:"#ffe1a4",sound:!0,volume:.35,voice:!1,voiceURI:"",music:!1,track:0,haptics:!1,shake:!1,tilt:!1,instant:!1,speed:"normal"},ps=(f,t)=>{try{return JSON.parse(localStorage.getItem(f))??t}catch{return t}},sn=(f,t)=>{try{localStorage.setItem(f,JSON.stringify(t))}catch{}},oe=(f,t,e)=>`<option value="${Et(f)}" ${String(f)===String(e)?"selected":""}>${Et(t)}</option>`,ot=(f,t,e="")=>`<button type="button" data-tray="${f}" ${e}>${t}</button>`,iu={sum:"Sum",target:"Hit target",highest:"Highest",lowest:"Lowest","drop-highest":"Drop highest","drop-lowest":"Drop lowest","keep-highest":"Keep highest","keep-lowest":"Keep lowest"};function v_(f,{request:t=null,onRecord:e=()=>{},onContinue:n=()=>{},onError:i=()=>{},onExport:s=()=>{},onClose:r=()=>{},resolved:o=null}={}){let a=new AbortController,{signal:l}=a,c=ps(yr,{}),u={...fs,...c};for(let P of["color","ink"])/^#[0-9a-f]{6}$/i.test(u[P])||(u[P]=fs[P]);let h=hs(),d=ps(us,[]),p=ps(ds,[]),g=[],x=null,v=!1,_=!1,S=0,y=null,b=null,M=null,w=!1,A=0,R={x:0,y:0},T=!0;try{d=d.map($t).slice(0,30)}catch{d=[]}Array.isArray(p)||(p=[]),p=p.filter(P=>P&&typeof P.label=="string"&&Array.isArray(P.pool)&&P.pool.length<=2e3&&typeof P.at=="string").slice(0,30);let D=!!t||!!o;o&&(g=o.records,x=ti(g,{mode:"target",target:o.target??4,modifier:o.modifier??0}),v=!0);function O(P=null){return Array.from({length:t.count},(z,V)=>({id:"action-"+V,sides:t.sides,face:P?.[V]??1,value:P?.[V]??1,label:P?String(P[V]):"?",held:!1}))}function E(){return g.length?ti(g,D?{mode:t?.kind==="roll-off"?"highest":"target",target:t?.target??4,modifier:t?.modifier??0,base:t?.stage==="roots"&&t?.base?t.base:null,net:t?.net??0}:h):null}function F(){if(!x)return;let P=(D||h.mode==="target"?`${x.hits} successes`:`Result ${x.result}`)+`. Total ${x.sum}.`;if(u.voice&&"speechSynthesis"in window){speechSynthesis.cancel();let z=new SpeechSynthesisUtterance(P);z.voice=speechSynthesis.getVoices().find(V=>V.voiceURI===u.voiceURI)||null,speechSynthesis.speak(z)}u.haptics&&navigator.vibrate?.([35,20,35])}function C(P=1){if(u.sound)try{b??=new(window.AudioContext||window.webkitAudioContext),b.resume();let z=b.createOscillator(),V=b.createGain();z.type="triangle",z.frequency.setValueAtTime(140+P*90,b.currentTime),z.frequency.exponentialRampToValueAtTime(55,b.currentTime+.075),V.gain.setValueAtTime(Math.min(.2,u.volume*.2),b.currentTime),V.gain.exponentialRampToValueAtTime(1e-4,b.currentTime+.08),z.connect(V).connect(b.destination),z.start(),z.stop(b.currentTime+.09)}catch{}}function I(){if(M){clearInterval(M.timer);for(let P of M.nodes)try{P.stop()}catch{}M=null}}function K(){if(I(),!!u.music)try{b??=new(window.AudioContext||window.webkitAudioContext),b.resume();let P=[],z=b.createGain();z.gain.value=u.volume*.035,z.connect(b.destination);let V=42*Math.pow(2,Number(u.track)%12/12+Math.floor(Number(u.track)/12)),Q=Math.floor(Number(u.track)/8)%2;for(let Z of[1,Math.pow(2,(Q?3:4)/12),1.5]){let L=b.createOscillator();L.type=Number(u.track)%3?"sine":"triangle",L.frequency.value=V*Z,L.connect(z),L.start(),P.push(L)}M={nodes:P,timer:setInterval(()=>{for(let Z of P)Z.detune.setTargetAtTime((Math.random()-.5)*14,b.currentTime,4)},4e3)}}catch{}}function X(){p=[{at:new Date().toISOString(),label:t?.label||h.name,pool:g.map(z=>({sides:z.sides,value:z.value,label:z.label})),summary:x},...p].slice(0,30),sn(ds,p)}function W(){sn(yr,u)}function Y(){let P=[...f.querySelectorAll("details[open]")].map(L=>L.className||L.querySelector("summary")?.textContent),z=y?.poses();if(y?.destroy(),y=null,!T)return;!v&&!o&&(g=t?O():h.pool.flatMap((L,$)=>Array.from({length:L.count},(Pt,ae)=>({id:`ready-${$}-${ae}`,sides:L.sides,value:1,face:1,label:"?",color:L.color,faces:L.faces,held:!1})))),f.className="dice-room",f.dataset.board=u.board;let V=g.slice(S*64,S*64+64),Q=D?t?`${t.count} \xD7 D${t.sides}${t.base?` \xB7 ${t.base} kept${t.net?` \xB7 ${Math.abs(t.net)} ${t.net>0?"ADV":"DIS"}`:""}`:""}`:"Resolved game roll":h.pool.map(L=>`${L.count}D${L.sides}${L.faces?" custom":""}`).join(" + ");f.innerHTML=`<div class="tray-result-header">${ot("settings","\u2699",'aria-label="Dice settings"')}<div class="tray-total"><small>${D?t?.stage==="explosion"?"EXPLOSION BATCH":"GAME POOL \xB7 AUTOMATIC SETUP":"DICE TABLE \xB7 FREE ROLL"}</small><strong aria-live="polite">${x?Et(x.result):"READY"}</strong><span>${x?((D?t?.kind!=="roll-off":h.mode==="target")?`${x.hits} HITS \xB7 `:"")+`TOTAL ${x.sum} \xB7 HIGH ${x.highest} \xB7 LOW ${x.lowest}`:Et(Q)}</span></div>${ot("voice",u.voice?"VOICE ON":"VOICE OFF",'aria-label="Toggle result voice"')}</div><p class="tray-context">${Et(t?.label||o?.label||h.name)}</p><div class="tray-board"><canvas aria-label="Interactive three-dimensional dice tray. Drag dice; tap free dice to hold them." role="img"></canvas><div class="tray-watermark">K\u2013D / ORBITAL DICE SYSTEM</div><div class="tray-batch">${v?`${x?.chosen.length??g.length} KEPT${x?.dropped.length?" \xB7 "+x.dropped.length+" DISCARDED":""}`:"DRAG TO THROW \xB7 SHAKE OPTIONAL"}</div></div><div class="tray-dice-list" aria-label="Individual dice">${V.map((L,$)=>`<button type="button" data-tray="hold" data-index="${S*64+$}" class="tray-die-chip ${L.held?"held":""} ${x?.dropped.includes(S*64+$)?"discarded":""}" ${D?"disabled":""} aria-label="${Et(`D${L.sides}: ${L.label}${L.held?", held":""}`)}"><small>D${L.sides}</small>${Et(L.label)}${L.explosion?" \u2726":""}${L.held?" \u25A3":""}</button>`).join("")}</div>${g.length>64?`<div class="tray-pagination">${ot("prev","\u2039")}<span>Dice ${S*64+1}\u2013${Math.min(g.length,S*64+64)} of ${g.length}</span>${ot("next","\u203A")}</div>`:""}<div class="tray-primary-actions">${v&&D?ot("continue","CONTINUE GAME",'class="primary"'):ot("roll",D?`ROLL ${t.count}D${t.sides}`:v?"ROLL UNHELD DICE":"ROLL DICE",'class="primary"')}${ot("details","DETAILS")}${D?"":ot("clear","CLEAR RESULT")}</div><p class="tray-rule">${D?t?.kind==="roll-off"?"Compare natural faces; ties reroll. Recon roll-offs do not use the 4+ target or exploding dice.":"Game sets the exact die types, count, target, modifiers, retained dice and explosion batches. Accepted results are saved before animation. A batch may be only part of the completed action; explosions belong to their original pool.":"Tap a die to hold it. Mix die types and colors, create custom faces, or save a bag. Free rolls do not change the battle."}</p>${D?`${t?.initiativeRule?'<p class="initiative-pass-note">Rally and Skill: a completed result of 0 or 1 successes passes initiative automatically. Resolve every required pool and explosion batch before judging the final outcome.</p>':""}<details class="tray-physical"><summary>Enter physical dice instead</summary><div class="tray-physical-grid">${Array.from({length:t?.count??0},(L,$)=>`<label>Die ${$+1}<input type="number" name="tray-physical-${$}" min="1" max="${t?.sides}" inputmode="numeric" required ${v?"disabled":""}></label>`).join("")}</div>${v?"":ot("physical","RECORD PHYSICAL DICE")}</details>`:`<div class="tray-type-picker">${nn.map(L=>`<div><span>D${L}</span><div>${ot("minus","\u2212",`data-sides="${L}" aria-label="Remove D${L}"`)}<b>${h.pool.filter($=>$.sides===L).reduce(($,Pt)=>$+Pt.count,0)}</b>${ot("plus","+",`data-sides="${L}" aria-label="Add D${L}"`)}</div></div>`).join("")}</div><div class="tray-calculation"><label>Calculation<select name="tray-mode">${Qn.map(L=>oe(L,iu[L],h.mode)).join("")}</select></label><label>Target<input name="tray-target" type="number" value="${h.target}"></label><label>Modifier<input name="tray-modifier" type="number" value="${h.modifier}"></label><label>Keep<input name="tray-keep" type="number" min="1" max="120" value="${h.keep}"></label><label class="member"><input name="tray-exploding" type="checkbox" ${h.exploding?"checked":""}>Maximum explodes</label></div><details><summary>Dice bags, presets &amp; custom faces</summary><div class="tray-pool-edit">${h.pool.map((L,$)=>`<label>D${L.sides}${L.faces?" custom":""} \xB7 count<input type="number" name="tray-pool-count-${$}" min="1" max="120" value="${L.count}"></label><label>Die color<input type="color" name="tray-pool-color-${$}" value="${L.color||u.color}"></label>`).join("")}</div><label>Bag name<input name="tray-bag-name" maxlength="60" value="${Et(h.name)}"></label><div class="tray-inline">${ot("save-bag","SAVE BAG")}${ot("export-bag","EXPORT BAG")}${ot("import-bag","IMPORT BAG")}</div><label>Saved bags<select name="tray-bag"><option value="">Choose a preset</option>${d.map((L,$)=>oe($,L.name,"")).join("")}</select></label><div class="tray-inline">${ot("load-bag","LOAD")}${ot("delete-bag","DELETE")}${ot("reset","RESET POOL")}</div><label>Custom die shape<select name="tray-custom-sides">${nn.filter(L=>L!==100).map(L=>oe(L,"D"+L,6)).join("")}</select></label><label>Faces, separated by commas (optional label=value)<textarea name="tray-custom-faces" maxlength="3000" placeholder="Miss=0, Pin=1, Pin=1, Suppress=2, Rout=3, Destroy=4"></textarea></label><label>Color<input name="tray-custom-color" type="color" value="${u.color}"></label>${ot("custom","ADD CUSTOM DIE")}<p>Standard dice, each custom face and its numeric value are saved in the bag. D100 uses a tens/ones percentile pair; 00 means 100.</p></details>`}<details class="tray-settings"><summary>Table, dice, sound &amp; motion</summary><div class="tray-calculation"><label>Game board<select name="tray-board">${["arcane","wood","velvet","starship"].map(L=>oe(L,L.toUpperCase(),u.board)).join("")}</select></label><label>Dice finish<select name="tray-skin">${["obsidian","bone","copper","crystal"].map(L=>oe(L,L.toUpperCase(),u.skin)).join("")}</select></label><label>Dice color<input type="color" name="tray-color" value="${u.color}"></label><label>Number color<input type="color" name="tray-ink" value="${u.ink}"></label><label>Roll speed<select name="tray-speed">${["fast","normal","slow"].map(L=>oe(L,L,u.speed)).join("")}</select></label><label>Volume<input type="range" name="tray-volume" min="0" max="1" step=".05" value="${u.volume}"></label>${["sound","voice","music","haptics","instant","shake","tilt"].map(L=>`<label class="member"><input type="checkbox" name="tray-${L}" ${u[L]?"checked":""}>${{sound:"Dice sounds",voice:"Speak results",music:"Ambient music",haptics:"Vibration",instant:"Instant roll newly added dice",shake:"Shake to roll",tilt:"Tilt gravity"}[L]}</label>`).join("")}<label>Voice<select name="tray-voiceURI"><option value="">Device default</option>${(window.speechSynthesis?.getVoices()||[]).map(L=>oe(L.voiceURI,L.name,u.voiceURI)).join("")}</select></label><label>Ambient score<select name="tray-track">${Array.from({length:32},(L,$)=>oe($,`${["Starlit chamber","Ancient vault","Orbital drift","Copper dusk"][Math.floor($/8)]} ${$%8+1}`,u.track)).join("")}</select></label></div><p>Motion controls require a supported secure browser and a deliberate tap to enable device sensors. Shake and tilt are separate controls. Reduced-motion device preferences shorten animations.</p>${ot("sensors",w?"DISABLE DEVICE MOTION":"ENABLE DEVICE MOTION")}</details><details class="tray-history"><summary>Roll history (${p.length})</summary>${p.map(L=>`<div class="tray-history-row"><b>${Et(L.label)}</b><span>${Et(L.pool?.map($=>`D${$.sides}:${$.label}`).join(" \xB7 ")||"")} \u2192 ${Et(L.summary?.result??"")}</span><small>${Et(L.at)}</small></div>`).join("")}${ot("clear-history","CLEAR LOCAL ROLL HISTORY")}</details>${D?ot("export-game",t?"EXPORT PENDING SAVE":"EXPORT GAME SAVE"):""}<input type="file" data-tray-import hidden accept="application/json,.json"><p class="tray-message" aria-live="polite"></p>`;for(let L of f.querySelectorAll("details"))P.includes(L.className||L.querySelector("summary")?.textContent)&&(L.open=!0);let Z=V.map((L,$)=>({...L,index:S*64+$,dropped:x?.dropped.includes(S*64+$),explode:x?.exploding.includes(S*64+$)}));y=su(f.querySelector("canvas"),Z,u,{sound:C,onRoll:()=>q(),onHold:L=>U(L),gravity:()=>u.tilt&&w?R:{x:0,y:0},poses:z})}function B(P){let z=f.querySelector(".tray-message");z&&(z.textContent=P),i(P)}function U(P){if(D||_||!v)return;g[P].held=!g[P].held,y?.hold(P,g[P].held);let z=f.querySelector(`[data-index="${P}"]`);z?.classList.toggle("held",g[P].held),z&&(z.innerHTML=`<small>D${g[P].sides}</small>${Et(g[P].label)}${g[P].held?" \u25A3":""}`)}async function q(P=null){if(!(_||D&&v))try{if(D)g=O(P||t.generated),x=E(),e(g.map(z=>z.value));else{let z=vr(h,{previous:g});g=z.records,x=z.summary}if(v=!0,_=!0,S=0,Y(),f.querySelector('[data-tray="continue"]')?.setAttribute("disabled",""),f.querySelector('[data-tray="roll"]')?.setAttribute("disabled",""),f.querySelector(".tray-total")?.scrollIntoView({block:"nearest"}),C(),await y.animate(),!T)return;_=!1,X(),F(),Y()}catch(z){_=!1,B(z.message)}}async function H(){if(w){w=!1,B("Device motion disabled."),Y();return}try{if(!("DeviceMotionEvent"in window))throw Error("Device motion is unavailable in this browser.");if(typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()!=="granted")throw Error("Motion permission was not granted.");w=!0,B("Device motion enabled. Shake rolls an unrolled game pool or unheld free dice."),Y()}catch(P){B(P.message)}}return window.addEventListener("devicemotion",P=>{if(!w||!T)return;let z=P.accelerationIncludingGravity;if(!z)return;R={x:Math.max(-1,Math.min(1,(z.x||0)/8)),y:Math.max(-1,Math.min(1,-(z.y||0)/8))};let V=P.acceleration||z,Q=Math.hypot(V.x||0,V.y||0,V.z||0);u.shake&&Q>(P.acceleration?14:23)&&Date.now()-A>1600&&(A=Date.now(),q()),u.tilt&&y?.wake()},{signal:l}),f.addEventListener("click",async P=>{let z=P.target.closest("[data-tray]");if(!z)return;P.preventDefault(),P.stopPropagation();let V=z.dataset.tray;if(_){B("Dice are settling.");return}try{if(V==="roll")return q();if(V==="continue")return n();if(V==="physical"){let Q=Array.from({length:t.count},(Z,L)=>Number(f.querySelector(`[name="tray-physical-${L}"]`).value));if(Q.some(Z=>!Number.isInteger(Z)||Z<1||Z>t.sides))throw Error(`Enter ${t.count} values from 1 to ${t.sides}.`);return q(Q)}if(V==="hold")return U(Number(z.dataset.index));if(V==="sensors")return H();if(V==="export-game")return s();if(V==="settings"){f.querySelector(".tray-settings").open=!f.querySelector(".tray-settings").open;return}if(V==="details"){f.querySelector(".tray-history").open=!f.querySelector(".tray-history").open;return}if(V==="voice"){u.voice=!u.voice,W(),Y(),u.voice&&x&&F();return}if(V==="next"||V==="prev"){S=Math.max(0,Math.min(Math.ceil(g.length/64)-1,S+(V==="next"?1:-1))),Y();return}if(V==="clear-history"){p=[],sn(ds,p),Y();return}if(V==="clear"){v=!1,x=null,g=[],Y();return}if(V==="plus"||V==="minus"){let Q=Number(z.dataset.sides),Z=h.pool.find(L=>L.sides===Q&&!L.faces);if(V==="plus"){if(h.pool.reduce((L,$)=>L+$.count,0)>=120)throw Error("Maximum 120 dice in a free pool.");Z?Z.count++:h.pool.push({sides:Q,count:1})}else if(Z)Z.count--,h.pool=h.pool.filter(L=>L.count>0);else{let L=h.pool.find($=>$.sides===Q);L&&(L.count--,h.pool=h.pool.filter($=>$.count>0))}v=!1,x=null,Y(),u.instant&&h.pool.length&&q();return}if(V==="reset"){h=hs(),v=!1,x=null,Y();return}if(V==="save-bag"||V==="export-bag"){if(h.name=f.querySelector('[name="tray-bag-name"]').value.trim(),h=$t(h),V==="save-bag"){if(d=d.filter(Q=>Q.name!==h.name),d.length>=30)throw Error("Maximum 30 bags; remove a bag first.");d.push(structuredClone(h)),sn(us,d),Y()}else{let Q=URL.createObjectURL(new Blob([JSON.stringify({format:"kdwarf-dice-bag",version:1,bag:h},null,2)],{type:"application/json"})),Z=document.createElement("a");Z.href=Q,Z.download="kdwarf-dice-bag.json",Z.click(),setTimeout(()=>URL.revokeObjectURL(Q),1e3)}return}if(V==="load-bag"||V==="delete-bag"){let Q=f.querySelector('[name="tray-bag"]').value;if(Q==="")throw Error("Choose a saved bag.");let Z=Number(Q);V==="load-bag"?(h=$t(d[Z]),v=!1,x=null):(d.splice(Z,1),sn(us,d)),Y();return}if(V==="import-bag"){f.querySelector("[data-tray-import]").click();return}if(V==="custom"){let Q=Number(f.querySelector('[name="tray-custom-sides"]').value),Z=f.querySelector('[name="tray-custom-faces"]').value,L=Z.split(",").map((ae,me)=>{let Zt=ae.trim().split("=");return{label:Zt[0].trim(),value:Zt.length>1?Number(Zt[1]):Number.isFinite(Number(Zt[0]))?Number(Zt[0]):me+1}}),$={sides:Q,count:1,faces:L,color:f.querySelector('[name="tray-custom-color"]').value},Pt={...h,pool:[...h.pool,$]};h=$t(Pt),v=!1,x=null,Y();return}}catch(Q){B(Q.message)}},{signal:l}),f.addEventListener("change",async P=>{let z=P.target.name;if(!_)try{if(P.target.matches("[data-tray-import]")){let Q=P.target.files[0];if(!Q)return;if(Q.size>1e5)throw Error("Dice bag file is too large.");let Z=JSON.parse(await Q.text());if(Z.format!=="kdwarf-dice-bag"||Z.version!==1)throw Error("Choose a K-Dwarf dice bag file.");h=$t(Z.bag),v=!1,x=null,Y();return}if(!z?.startsWith("tray-"))return;if(z.startsWith("tray-pool-")){let[,,Q,Z]=z.split("-"),L=structuredClone(h);L.pool[Number(Z)][Q==="count"?"count":"color"]=Q==="count"?Number(P.target.value):P.target.value,h=$t(L),v=!1,x=null,Y();return}let V=z.slice(5);if(["mode","target","modifier","keep","exploding"].includes(V)&&!D){h[V]=P.target.type==="checkbox"?P.target.checked:["target","modifier","keep"].includes(V)?Number(P.target.value):P.target.value,$t(h),v&&(x=E()),Y();return}Object.hasOwn(fs,V)&&(u[V]=P.target.type==="checkbox"?P.target.checked:["volume","track"].includes(V)?Number(P.target.value):P.target.value,W(),["music","track","volume"].includes(V)&&K(),Y())}catch(V){B(V.message)}},{signal:l}),f.addEventListener("keydown",P=>{P.code==="Space"&&!/INPUT|SELECT|TEXTAREA/.test(P.target.tagName)&&(P.preventDefault(),q())},{signal:l}),Y(),{destroy(){T=!1,a.abort(),y?.destroy(),I(),b?.close(),u.voice&&window.speechSynthesis?.cancel()}}}function su(f,t,e,{sound:n,onRoll:i,onHold:s,gravity:r,poses:o}){let a=f.getContext("2d"),l=new AbortController,c=l.signal,u=new N(0,.48,.88),h=[],d=1,p=1,g=25,x=null,v=0,_=0,S=!1,y=null,b=!0,M=null,w=null,A=(B,U)=>B+Math.random()*(U-B),R=(B,U,q=null)=>({record:B,index:U,part:q,x:0,y:0,z:0,vx:0,vy:0,vz:0,q:new mt,target:new mt,angular:new N,shape:Kn(B.sides===100?10:B.sides)});for(let B of t)B.sides===100?h.push(R(B,B.index,"tens"),R(B,B.index,"ones")):h.push(R(B,B.index));let T=B=>B.part==="tens"?Math.floor(B.record.face%100/10)+1:B.part==="ones"?B.record.face%10+1:B.record.face;function D(){let B=f.getBoundingClientRect();if(w&&Math.abs(B.width-d)<.5&&Math.abs(B.height-p)<.5)return;d=Math.max(220,B.width),p=Math.max(160,B.height);let U=Math.min(devicePixelRatio||1,1.75);f.width=d*U,f.height=p*U,a.setTransform(U,0,0,U,0,0);let q=Math.ceil(Math.sqrt(Math.max(1,h.length)*d/p)),H=Math.ceil(Math.max(1,h.length)/q);g=Math.max(9,Math.min(40,d/(q+1)*.36,p/(H+1)*.36)),h.forEach((P,z)=>{P.x=d*(z%q+1)/(q+1)+Math.sin(z*13)*g*.12,P.y=p*(Math.floor(z/q)+1)/(H+1),P.z=0,P.target=P.shape.top(T(P)).premultiply(new mt().setFromAxisAngle(new N(0,0,1),z*2.399)),P.q.copy(P.target),P.faceOffset=0;let V=o?.[P.record.id+":"+(P.part||"")];V&&P.record.label!=="?"&&(P.x=V.x,P.y=V.y,P.z=V.z,P.q.copy(V.q),P.faceOffset=V.faceOffset)}),w?.destroy(),w=xr(h,{width:d,height:p,radius:g,onImpact:n}),F()}function O(B,U){return{x:U.x+B.x*g,y:U.y+(B.y*.88-B.z*.48)*g-U.z}}function E(B,U){let q=parseInt(B.replace("#",""),16);return`rgb(${[q>>16&255,q>>8&255,q&255].map(H=>Math.max(0,Math.min(255,Math.round(H*U)))).join(",")})`}function F(){if(!b||!a)return;a.clearRect(0,0,d,p);let B={arcane:["#112d46","#081623"],wood:["#61442a","#261e18"],velvet:["#352842","#130f24"],starship:["#213c43","#0b1b23"]},U=B[e.board]||B.arcane,q=a.createRadialGradient(d*.5,p*.4,10,d*.5,p*.5,d*.7);if(q.addColorStop(0,U[0]),q.addColorStop(1,U[1]),a.fillStyle=q,a.fillRect(0,0,d,p),a.strokeStyle=e.board==="wood"?"#af85532b":"#69a6c526",a.lineWidth=1,e.board==="wood")for(let H=8;H<p;H+=29)a.beginPath(),a.moveTo(0,H),a.bezierCurveTo(d*.3,H-6,d*.7,H+5,d,H-2),a.stroke();else{for(let H=0;H<d;H+=45)a.beginPath(),a.moveTo(H,0),a.lineTo(H,p),a.stroke();for(let H=0;H<p;H+=45)a.beginPath(),a.moveTo(0,H),a.lineTo(d,H),a.stroke();a.beginPath(),a.arc(d*.5,p*.5,Math.min(d,p)*.36,0,Math.PI*2),a.stroke(),a.beginPath(),a.arc(d*.5,p*.5,Math.min(d,p)*.33,0,Math.PI*2),a.stroke()}a.strokeStyle="#d1b77f66",a.strokeRect(11,11,d-22,p-22),a.strokeStyle="#d1b77f22",a.strokeRect(16,16,d-32,p-32);for(let H of[...h].sort((P,z)=>P.y-z.y||P.z-z.z)){a.save(),a.globalAlpha=H.record.dropped?.35:1,a.fillStyle="#0008",a.filter="blur(3px)",a.beginPath(),a.ellipse(H.x+5,H.y+g*.42,g*.8,g*.42,0,0,Math.PI*2),a.fill(),a.filter="none";let P={bone:"#d6c5a1",copper:"#986141",crystal:"#2c99ae",obsidian:e.color}[e.skin]||e.color,z=H.record.color||P,V=e.ink,Q=H.shape.faces.map(Z=>({f:Z,n:Z.normal.clone().applyQuaternion(H.q),p:Z.points.map(L=>O(L.clone().applyQuaternion(H.q),H)),center:O(Z.center.clone().applyQuaternion(H.q),H)})).filter(Z=>Z.n.dot(u)>0).sort((Z,L)=>Z.n.dot(u)-L.n.dot(u));for(let{f:Z,n:L,p:$,center:Pt}of Q){let ae=.48+.6*Math.max(0,L.dot(new N(-.3,-.4,.85).normalize()));a.beginPath(),$.forEach((gt,ge)=>ge?a.lineTo(gt.x,gt.y):a.moveTo(gt.x,gt.y)),a.closePath();let me=a.createLinearGradient(Pt.x-g,Pt.y-g,Pt.x+g,Pt.y+g);me.addColorStop(0,E(z,ae*1.28)),me.addColorStop(.55,E(z,ae)),me.addColorStop(1,E(z,ae*.65)),a.fillStyle=me,a.fill(),a.strokeStyle=e.skin==="crystal"?"#b7f3ff99":"#c5b68a77",a.lineWidth=.8,a.stroke();let Zt=H.record.sides===2;if(Zt&&Math.abs(Z.normal.y)<.9)continue;let rn=(Z.value-1+(H.faceOffset||0))%(H.record.sides===100?10:H.record.sides)+1,ms=H.record.label==="?"?"?":H.part==="tens"?String((rn-1)*10).padStart(2,"0"):H.part==="ones"?String(rn-1):Zt?H.record.face===1?"I":"II":H.record.faces?.[rn-1]?.label??String(rn),Sr=Math.abs($.reduce((gt,ge,gs)=>gt+ge.x*$[(gs+1)%$.length].y-$[(gs+1)%$.length].x*ge.y,0))/2,br=Math.max(...$.map(gt=>gt.x))-Math.min(...$.map(gt=>gt.x)),Mr=Math.max(3,Math.min(g*.65,Math.sqrt(Sr)*.57,br/(Math.max(1,ms.length)*.72)));a.save(),a.beginPath(),$.forEach((gt,ge)=>ge?a.lineTo(gt.x,gt.y):a.moveTo(gt.x,gt.y)),a.closePath(),a.clip(),a.translate(Pt.x,Pt.y);let wr=Math.abs(L.z);a.scale(1,.65+.35*wr),a.fillStyle=V,a.shadowColor=H.record.explode?"#ffbb54":"transparent",a.shadowBlur=H.record.explode?6:0,a.textAlign="center",a.textBaseline="middle",a.font=`600 ${Mr}px Georgia,serif`,a.fillText(ms,0,0,g*1.2),a.restore()}H.record.held&&(a.fillStyle="#efcf8e",a.font="13px sans-serif",a.fillText("\u25A3",H.x+g*.6,H.y-g*.8)),a.restore()}}function C(B){if(x=null,!b)return;let U=Math.min(.025,(B-v)/1e3||.016);v=B,S&&(_+=U),f.dataset.rollState=S?"rolling":"settled",f.dataset.elapsed=_.toFixed(2);let q=r(),H=S||y||Math.abs(q.x)+Math.abs(q.y)>.08;if(H){if(y?.body){let P=h.indexOf(y.body);w.drag(P,y.body.x,y.body.y,y.body.vx,y.body.vy)}if(w.step(U*(S?Math.max(1,4/I):1),q),w.sync(),S&&_>=I){S=!1,f.dataset.rollState="settled",h.forEach(z=>{let V=0,Q=-1/0;for(let[Z,L]of z.shape.faces.entries()){let $=L.normal.clone().applyQuaternion(z.q).z;$>Q&&(Q=$,V=Z)}z.faceOffset=((T(z)-1-V)%(z.record.sides===100?10:z.record.sides)+(z.record.sides===100?10:z.record.sides))%(z.record.sides===100?10:z.record.sides)}),w.freeze();let P=M;M=null,P?.(),H=!1}F()}H&&(x=setTimeout(()=>C(performance.now()),16))}let I=matchMedia("(prefers-reduced-motion: reduce)").matches?.22:e.speed==="fast"?.65:e.speed==="slow"?2.6:1.65,K=()=>{!x&&b&&(v=performance.now(),x=setTimeout(()=>C(performance.now()),16))},X=B=>{let U=f.getBoundingClientRect();return{x:B.clientX-U.left,y:B.clientY-U.top}};f.addEventListener("pointerdown",B=>{if(S)return;let U=X(B);y={body:[...h].reverse().find(H=>Math.hypot(H.x-U.x,H.y-U.y)<g*1.3),start:U,last:U,moved:!1},f.setPointerCapture(B.pointerId)},{signal:c}),f.addEventListener("pointermove",B=>{if(!y)return;let U=X(B);if(Math.hypot(U.x-y.start.x,U.y-y.start.y)>6&&(y.moved=!0),y.body&&y.moved){let q=y.body;q.x=U.x,q.y=U.y,q.vx=(U.x-y.last.x)*20,q.vy=(U.y-y.last.y)*20,w.drag(h.indexOf(q),q.x,q.y,q.vx,q.vy),F()}y.last=U},{signal:c});let W=B=>{if(!y)return;let U=y;y=null,U.body&&!U.moved?s(U.body.index):U.moved&&!S&&t.every(q=>q.label==="?")?i():K()};f.addEventListener("pointerup",W,{signal:c}),f.addEventListener("pointercancel",()=>{y=null},{signal:c});let Y=new ResizeObserver(D);return Y.observe(f),D(),{wake:K,poses(){return Object.fromEntries(h.map(B=>[B.record.id+":"+(B.part||""),{x:B.x,y:B.y,z:B.z,q:B.q.clone(),faceOffset:B.faceOffset}]))},hold(B,U){for(let q of h)q.index===B&&(q.record.held=U);F()},animate(){return S=!0,_=0,w.toss(),new Promise(B=>{M=B,K()})},destroy(){b=!1,l.abort(),w?.destroy(),Y.disconnect(),x&&clearTimeout(x),M?.()}}}export{v_ as mountDiceTray};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
