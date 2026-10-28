// Order matters: the first retained stand leads a declared group move.
export function toggleFriendlySelection(game,selected,id,side){
 const u=game.units.find(u=>u.id===id&&!u.dead);if(!u||u.side!==side)return selected;
 const own=selected.filter(id=>game.units.some(v=>v.id===id&&!v.dead&&v.side===side));
 return own.includes(id)?own.filter(v=>v!==id):[...own,id];
}

// Preserve the chosen leader without carrying enemy/reserve selections into a move.
export function movementSelection(game,selected,id){
 const all=[...game.units,...(game.decoys||[])],u=all.find(v=>v.id===id);
 if(!u)return[];
 const own=selected.filter(key=>all.some(v=>v.id===key&&v.side===u.side&&!v.dead&&!v.surrendered&&!v.offTable));
 return own.includes(id)?own:[id];
}
