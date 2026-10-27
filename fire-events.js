// Persistent firing provenance. These are historical shots, not current LOS.
export function beginUnitAction(s,ids){
 const actors=new Set(ids.filter(Boolean));if(!actors.size)return;
 s.fireEvents=(s.fireEvents||[]).filter(e=>!actors.has(e.firerId)&&!actors.has(e.targetId));
}
export function recordFireEvent(s,{firerId,targetId=null,featureId=null,side,from,to,result='',mode='single',concealed=false}){
 if(mode==='command')mode='crossfire';
 s.fireEvents??=[];s.fireEventSerial??=0;
 const old=s.fireEvents.find(e=>e.action===s.actions&&e.firerId===firerId&&e.targetId===targetId&&e.featureId===featureId&&e.mode===mode);
 if(old){old.shotCount++;old.result=result;old.from={x:from.x,y:from.y};old.to={x:to.x,y:to.y};return old;}
 const event={id:'fire-'+(++s.fireEventSerial),action:s.actions,initiative:s.initiative,firerId,targetId,featureId,side,from:{x:from.x,y:from.y},to:{x:to.x,y:to.y},result,mode,shotCount:1,concealed};
 s.fireEvents.push(event);return event;
}
export function activeFireEvents(s,viewer=0){return(s.fireEvents||[]).filter(e=>e.side===viewer||!e.concealed);}
export const FIRE_MODE_NAMES={single:'STANDARD FIRE',group:'GROUP FIRE',crossfire:'CROSSFIRE',recon:'RECON BY FIRE',reactive:'REACTIVE FIRE',indirect:'INDIRECT FIRE'};
