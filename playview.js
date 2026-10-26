export async function requestLandscape(){
 try{if(!document.fullscreenElement&&document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();}catch{}
 try{if(document.fullscreenElement&&screen.orientation?.lock)await screen.orientation.lock('landscape');}catch{}
}
