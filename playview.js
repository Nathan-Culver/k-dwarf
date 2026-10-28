export function isBrowserFullscreen(doc=globalThis.document){
 return !!(doc.fullscreenElement||doc.webkitFullscreenElement);
}
export async function requestLandscape({document:doc=globalThis.document,screen:device=globalThis.screen}={}){
 let error=null;
 try{
  if(!isBrowserFullscreen(doc)){
   if(doc.documentElement.requestFullscreen)await doc.documentElement.requestFullscreen({navigationUI:'hide'});
   else if(doc.documentElement.webkitRequestFullscreen)await doc.documentElement.webkitRequestFullscreen();
  }
 }catch(e){error=e.message;}
 if(isBrowserFullscreen(doc)&&device?.orientation?.lock)try{await device.orientation.lock('landscape');}catch{}
 return{fullscreen:isBrowserFullscreen(doc),error};
}
export async function exitBrowserFullscreen(doc=globalThis.document){
 try{if(doc.fullscreenElement&&doc.exitFullscreen)await doc.exitFullscreen();else if(doc.webkitFullscreenElement&&doc.webkitExitFullscreen)await doc.webkitExitFullscreen();}catch{}
}
