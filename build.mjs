import {mkdir,copyFile,rm,cp,readdir} from 'node:fs/promises';
import {buildSync} from 'esbuild';
const bundle={bundle:true,minify:true,format:'esm',platform:'browser',logLevel:'info'};
buildSync({...bundle,entryPoints:['tabletop.js'],external:['./engine.js','./geometry.js','./data.js'],outfile:'tabletop.bundle.js'});
buildSync({...bundle,entryPoints:['dice-tray.js'],outfile:'dice-tray.bundle.js'});
await mkdir('dist',{recursive:true});for(const f of await readdir('dist'))await rm('dist/'+f,{recursive:true,force:true});
for(const f of ['index.html','rules.html','command.js','command-board.js','visibility.js','legacy-save-validation.js','catalog.js','rolls.js','save-validation.js','orders.js','styles.css','app.js','data.js','geometry.js','engine.js','ai.js','map.js','sightlines.js','dice.js','history.js','fire-events.js','fire-visuals.js','fire-effects.js','dice-tray.bundle.js','dice-tray-core.js','battlefields.js','table.js','hold.js','selection.js','playview.js','action-log.js','storage.js','army.js','tabletop.bundle.js','manifest.webmanifest','icon.svg','sw.js','.nojekyll'])await copyFile(f,`dist/${f}`);
await cp('vendor','dist/vendor',{recursive:true});

await mkdir('dist/docs',{recursive:true});
await copyFile('docs/IMPLEMENTED-RULES.md','dist/docs/IMPLEMENTED-RULES.md');
await copyFile('docs/K-Dwarf-Implemented-Rules.docx','dist/docs/K-Dwarf-Implemented-Rules.docx');
