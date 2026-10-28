const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function filterActionLog(log,{side='all',query=''}={}){
 const term=query.trim().toLowerCase();
 return log.filter(l=>(side==='all'||l.side===Number(side))&&(!term||`${l.text} ${l.kind} ${l.n} ${l.initiative}`.toLowerCase().includes(term))).slice().reverse();
}
export function renderActionEntries(entries,{compact=false}={}){
 if(!entries.length)return '<p class="action-log-empty">No matching actions.</p>';
 return entries.map(l=>`<article class="action-log-entry ${l.side?'red':'blue'}"><small>${l.side?'RED':'BLUE'} · INIT ${esc(l.initiative)} · ACTION ${esc(l.n)}${compact?'':' · '+esc(l.kind||'event').toUpperCase()}</small><p>${esc(l.text)}</p>${!compact&&Array.isArray(l.dice)&&l.dice.length?`<span class="action-log-dice">Dice: ${l.dice.map(esc).join(' · ')}</span>`:''}</article>`).join('');
}
