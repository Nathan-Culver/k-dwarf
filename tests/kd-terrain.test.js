import test from 'node:test';
import assert from 'node:assert/strict';
import {B} from '../data.js';
import {boardOf,polygonArea,tableContains} from '../table.js';
import {MAX_MAPS,TERRAIN_TYPES,TERRAIN_RULES,blankBattlefield,validateBattlefield,encodeBattlefield,decodeBattlefield,saveBattlefield,savedBattlefields,generateBattlefield,configureBattlefield,battlefieldStats,renderBattlefieldPreview,objectiveSectors} from '../battlefields.js';

const core=['ruins','building','fortification','hill','woods','field','lowfield','highbarrier','lowbarrier','rough','depression'];
function withFeature(type,extra={}){const map=blankBattlefield(type);map.terrain=[{id:'terrain-1',name:TERRAIN_TYPES[type],type,capacity:TERRAIN_RULES[type].defaultCapacity,points:[[100,100],[260,100],[260,260],[100,260]],...extra}];return map;}
const memory=()=>{const entries=new Map();return{getItem:key=>entries.get(key)??null,setItem:(key,value)=>entries.set(key,value),entries};};

test('all source terrain categories survive a portable map without losing their identity',()=>{
 for(const type of [...core,'bocage','hedge']){
  const map=withFeature(type);
  assert.deepEqual(decodeBattlefield(encodeBattlefield(map)),map,type);
  assert.doesNotMatch(renderBattlefieldPreview(map),/fill="undefined"/);
 }
 assert.equal(TERRAIN_TYPES.field,'High field');
 assert.notEqual(TERRAIN_TYPES.field,TERRAIN_TYPES.lowfield);
});

test('terrain LOS and fire protection distinguish low obstacles and depressions',()=>{
 const nonblocking=['lowfield','lowbarrier','rough','depression'];
 for(const type of core){
  const map=withFeature(type);
  assert.equal(battlefieldStats(map).blocking,nonblocking.includes(type)?0:1,type);
 }
 assert.equal(TERRAIN_RULES.woods.protection,'all');
 assert.equal(TERRAIN_RULES.rough.protection,'all');
 assert.equal(TERRAIN_RULES.ruins.protection,'direct');
 assert.equal(TERRAIN_RULES.depression.protection,'depression');
 assert.equal(TERRAIN_RULES.highbarrier.kind,'obstacle');
 assert.equal(TERRAIN_RULES.lowbarrier.kind,'obstacle');
});

test('ordinary area terrain requires capacity and footprint for at least four unit bases',()=>{
 for(const type of core.filter(type=>!['building','fortification','highbarrier','lowbarrier'].includes(type))){
  assert.throws(()=>validateBattlefield(withFeature(type,{capacity:3})),/at least four units/,type);
  assert.throws(()=>validateBattlefield(withFeature(type,{points:[[100,100],[150,100],[150,150],[100,150]]})),/four unit-base areas/,type);
  assert.doesNotThrow(()=>validateBattlefield(withFeature(type,{capacity:4,points:[[100,100],[100+B*2,100],[100+B*2,100+B*2],[100,100+B*2]]})),type);
 }
});

test('room and fortification limits override generic area capacity without applying to barriers',()=>{
 assert.doesNotThrow(()=>validateBattlefield(withFeature('building',{capacity:2,rooms:1})));
 assert.doesNotThrow(()=>validateBattlefield(withFeature('building',{capacity:6,rooms:3})));
 assert.throws(()=>validateBattlefield(withFeature('building',{capacity:3,rooms:1})),/two units per room/);
 assert.throws(()=>validateBattlefield(withFeature('building',{capacity:2,rooms:0})),/1–10 rooms/);
 assert.throws(()=>validateBattlefield(withFeature('fortification',{capacity:3})),/at most two units/);
 assert.doesNotThrow(()=>validateBattlefield(withFeature('fortification',{capacity:2})));
 for(const type of ['highbarrier','lowbarrier','bocage','hedge'])assert.doesNotThrow(()=>validateBattlefield(withFeature(type,{capacity:1,points:[[100,100],[100+B*4,100],[100+B*4,100+B/4],[100,100+B/4]]})),type);
 // Existing building files did not record rooms; preserve them as multiroom buildings.
 assert.doesNotThrow(()=>validateBattlefield(withFeature('building',{capacity:8})));
});

test('generation covers every supported terrain type reproducibly and uses neutral installation names',()=>{
 const types=new Set();
 for(const style of ['mixed','woodland','village','farmland'])for(const density of ['open','normal','dense'])for(const seed of [1,42,987654]){
  const map=generateBattlefield({seed,style,density});
  assert.deepEqual(map,generateBattlefield({seed,style,density}));
  assert.doesNotThrow(()=>validateBattlefield(map));
  assert.equal(map.terrain.length,30);
  for(const terrain of map.terrain){types.add(terrain.type);assert(!/farm|barn/i.test(terrain.name));}
  assert.equal(objectiveSectors(map).length,2);
 }
 for(const type of Object.keys(TERRAIN_TYPES))assert(types.has(type),`Missing generated ${type}`);
});

test('terrain configuration clips each shape and drops fragments too small for their type',()=>{
 const source=generateBattlefield({seed:57});
 for(const shape of ['rectangle','square','circle','oval','hexagon']){
  const map=configureBattlefield(source,{shape,width:1200,height:['square','circle'].includes(shape)?1200:1000});
  assert.equal(boardOf(map).shape,shape);
  assert.doesNotThrow(()=>validateBattlefield(map));
  for(const terrain of map.terrain){assert(terrain.points.every(([x,y])=>tableContains(map,{x,y})));assert(polygonArea(terrain.points)>=TERRAIN_RULES[terrain.type].minArea);}
 }
 const map=withFeature('ruins',{points:[[0,0],[100,0],[100,100],[0,100]]});
 assert.equal(configureBattlefield(map,{shape:'circle',width:1200,height:1200}).terrain.length,0);
});

test('objective buildings are not restricted to a historical eastern-half assault',()=>{
 const map=blankBattlefield('West installations');
 map.terrain=[withFeature('building').terrain[0],{...withFeature('building').terrain[0],id:'terrain-2',points:[[300,100],[460,100],[460,260],[300,260]]}];
 map.objectives=['terrain-1','terrain-2'];
 assert.doesNotThrow(()=>validateBattlefield(map));
 assert.deepEqual(objectiveSectors(map),map.objectives);
});

test('ten saved map slots preserve new terrain types, rooms and selected table outline',()=>{
 const storage=memory();
 for(let slot=1;slot<=MAX_MAPS;slot++){
  const map=withFeature(core[slot-1],core[slot-1]==='building'?{capacity:4,rooms:2}:{});
  map.name='Slot '+slot;
  saveBattlefield(configureBattlefield(map,{shape:'hexagon',width:1600,height:1200}),slot,storage);
 }
 const saved=savedBattlefields(storage);
 assert.equal(saved.length,10);
 assert.equal(storage.entries.size,10);
 assert(saved.every(entry=>entry.map&&!entry.error));
 assert.equal(saved[1].map.terrain[0].rooms,2);
 assert(saved.every(entry=>boardOf(entry.map).shape==='hexagon'));
 saveBattlefield(withFeature('depression'),5,storage);
 assert.equal(savedBattlefields(storage)[4].map.terrain[0].type,'depression');
 assert.equal(savedBattlefields(storage)[5].map.name,'Slot 6');
});
