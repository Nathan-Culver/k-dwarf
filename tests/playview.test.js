import test from 'node:test';import assert from 'node:assert/strict';
import {requestLandscape,exitBrowserFullscreen} from '../playview.js';
import {filterActionLog,renderActionEntries} from '../action-log.js';
test('play mode requests native fullscreen with browser navigation hidden',async()=>{
 let options=null,locked=false;const doc={fullscreenElement:null,documentElement:{async requestFullscreen(o){options=o;doc.fullscreenElement=this;}}};
 const result=await requestLandscape({document:doc,screen:{orientation:{async lock(value){assert.equal(value,'landscape');locked=true;}}}});
 assert.deepEqual(options,{navigationUI:'hide'});assert(result.fullscreen);assert(locked);
});
test('fullscreen restrictions return a result while unsupported orientation stays optional',async()=>{
 const doc={fullscreenElement:null,documentElement:{async requestFullscreen(){throw Error('Gesture required');}}};
 assert.deepEqual(await requestLandscape({document:doc,screen:{}}),{fullscreen:false,error:'Gesture required'});
 const active={fullscreenElement:{},documentElement:{}};assert((await requestLandscape({document:active,screen:{orientation:{async lock(){throw Error('Unsupported');}}}})).fullscreen);
});
test('leaving fullscreen uses the native exit API',async()=>{
 let exited=false;await exitBrowserFullscreen({fullscreenElement:{},async exitFullscreen(){exited=true;}});assert(exited);
});
test('action log filters both sides and all retained entries without mutating the saved log',()=>{
 const log=Array.from({length:100},(_,n)=>({n,initiative:2,side:n%2,text:n===70?'unit-a completes movement':'action '+n,kind:'move'}));
 assert.equal(filterActionLog(log).length,100);assert.equal(filterActionLog(log)[0].n,99);assert.equal(log[0].n,0);
 assert.equal(filterActionLog(log,{side:'0'}).length,50);assert.equal(filterActionLog(log,{query:'UNIT-A'})[0].n,70);
 assert.equal(filterActionLog(log,{query:'unit-a',side:'1'}).length,0);
});
test('action log shows action, initiative and accepted dice while escaping stored text',()=>{
 const html=renderActionEntries([{n:4,initiative:2,side:1,kind:'fire',text:'unit <script> attacks',dice:[6,4,1]}]);
 assert(html.includes('ACTION 4'));assert(html.includes('INIT 2'));assert(html.includes('Dice: 6 · 4 · 1'));assert(!html.includes('<script>'));
 assert(!renderActionEntries([{n:4,initiative:2,side:0,text:'move',dice:[4]}],{compact:true}).includes('Dice:'));
});

test('movement action-log entries survive validated save and reload',async()=>{
 const E=await import('../engine.js'),{encode,decode}=await import('../storage.js');const s=E.newGame({seed:1});
 s.log.push({n:s.actions,initiative:s.initiative,side:0,kind:'move',text:'unit-a completes movement.',dice:null});
 assert.equal(decode(encode(s)).log.at(-1).kind,'move');
});
