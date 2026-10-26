import {CATALOG} from './catalog.js';
export {CATALOG};
export const VERSION='0.2.0',B=32,W=1200,H=1000;
export const QUALITIES={irregular:{name:'Irregular',die:4,points:1,fmr:2},regular:{name:'Regular',die:6,points:3,fmr:3},veteran:{name:'Veteran',die:8,points:5,fmr:4},elite:{name:'Elite',die:10,points:7,fmr:5},super:{name:'Super',die:12,points:9,fmr:5}};
export const TYPES={'camouflage-marker':{name:'Camouflaged contact',dice:0},'recon-marker':{name:'Recon marker',dice:0},rifle:{name:'Infantry team',dice:3,squad:true},smg:{name:'Assault team',dice:3,squad:true},hmg:{name:'Support weapon',dice:3,squad:true},pc:{name:'Platoon commander',dice:0},cc:{name:'Company commander',dice:0},bc:{name:'Battalion commander',dice:0},fo:{name:'Forward observer',dice:3,squad:true},recon:{name:'Reconnaissance',dice:3,squad:true},medic:{name:'Combat medic',dice:3,squad:true},engineer:{name:'Combat engineer',dice:3,squad:true},hacker:{name:'Cyberwarfare',dice:3,squad:true},android:{name:'Combat android',dice:3,squad:true},vehicle:{name:'Combat vehicle',dice:3,squad:true},drone:{name:'Combat drone',dice:3,squad:true},heavy:{name:'Heavy weapon',dice:3,squad:true},indirect:{name:'Indirect battery',dice:3,squad:true},crew:{name:'Weapon crew',dice:3,squad:true}};
export const NATIONS={athenian:{name:'The Athenian Order',command:'free'},expedition:{name:'Expeditionary force',command:'free'},dominion:{name:'Opposing force',command:'free'}};
export const WEAPONS=Object.fromEntries(CATALOG.weapons.map(w=>[w.id,w]));
export const ARMOR=Object.fromEntries(CATALOG.infantryArmor.map(a=>[a.id,{...a,incomingDisadvantage:a.id==='heavy-armor'?1:a.incomingDisadvantage}]));
export const PROGRAMS={ice:{name:'ICE',module:'standard'},tracer:{name:'Tracer',module:'standard'},possession:{name:'Possession',module:'standard'},isolation:{name:'Isolation',module:'hunter'},static:{name:'Static',module:'standard'},counterware:{name:'Counterware',module:'standard'},wipe:{name:'Wipe',module:'hunter'},assist:{name:'Assist',module:'support'},firewall:{name:'Firewall',module:'support'}};
export const FEATS=['Command Control','Steelstorm','Firestorm','Terrifying','Inspiring Maneuvering','Inspire Fire','Inspire Courage','Inspire Charge','Inspire Competency','Inspire Heroism'];
export const VARIANTS={};
const rect=(id,name,type,x,y,w,h)=>({id,name,type,points:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],capacity:type==='building'?2:8});
const blob=(id,name,type,x,y,rx,ry)=>({id,name,type,points:Array.from({length:12},(_,i)=>{const a=i*Math.PI/6,r=[.92,1,.94,1.03,.9,1,.93,1.02,.91,1,.95,1][i];return[x+Math.cos(a)*rx*r,y+Math.sin(a)*ry*r];}),capacity:8});
const baseTerrain=()=>[
 blob('westwood','West copse','woods',150,210,135,140),blob('southwood','South wood','woods',185,790,150,150),
 blob('eastwood','East wood','woods',1015,205,145,150),blob('southeast','Orchard','woods',1015,785,145,150),
 rect('field1','Wheat field','field',325,80,235,210),rect('field2','South field','field',670,745,215,185),
 blob('hill','Low hill','hill',810,180,145,125),blob('rough','Shell-torn ground','rough',365,580,135,105),
 blob('northgrove','North grove','woods',600,370,110,105),blob('southgrove','South grove','woods',600,715,95,100),
 rect('farm','Farmhouse','building',550,490,100,95),rect('barn','Barn','building',755,455,110,95),
 blob('hedgewood','Hedgerow copse','woods',920,600,100,90),blob('westhill','West rise','hill',160,480,110,90)
];

export const SCENARIOS={crossroads:{name:'Relay at Dawn',tag:'Orbital relay interdiction',desc:'Two expeditionary forces converge on a communications array beneath a K-dwarf star. Reconnaissance determines deployment. Hold every objective at the start of your initiative or break opposing force morale.',objective:'Control all objectives, break enemy morale, or force domination.',terrain:baseTerrain,hidden:false,deploy:'meeting'},farm:{name:'The Silent Installation',tag:'Prepared defence',desc:'Secure the deserted installation and its archive. Hidden teams defend the approach.',objective:'Control all objectives or break the opposing force.',terrain:baseTerrain,hidden:true,deploy:'defence'},woods:{name:'Xenoflora Protocol',tag:'Alien biosphere encounter',desc:'Scout through towering alien growth to seize the research complex.',objective:'Control all objectives or break the opposing force.',terrain:()=>baseTerrain().map(t=>t.type==='building'?{...t,type:'rough',name:'Ancient ruins',cover:2,capacity:8}:t),hidden:false,deploy:'meeting'}};
export const RULES_URL='https://docs.google.com/document/d/11W8BBr9D3J0fkVOdEOABGfhBlMCzVLUzG3uNhxfYPJM/edit';
