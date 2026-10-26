import {mkdir,copyFile,rm,cp,readdir} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
execFileSync('./node_modules/.bin/esbuild',['tabletop.js','--bundle','--minify','--format=esm','--platform=browser','--external:./engine.js','--external:./geometry.js','--external:./data.js','--outfile=tabletop.bundle.js'],{stdio:'inherit'});
await mkdir('dist',{recursive:true});for(const f of await readdir('dist'))await rm('dist/'+f,{recursive:true,force:true});
for(const f of ['index.html','catalog.js','rolls.js','save-validation.js','orders.js','styles.css','app.js','data.js','geometry.js','engine.js','ai.js','map.js','sightlines.js','dice.js','battlefields.js','table.js','hold.js','selection.js','playview.js','storage.js','army.js','tabletop.bundle.js','manifest.webmanifest','icon.svg','sw.js','.nojekyll'])await copyFile(f,`dist/${f}`);
await cp('vendor','dist/vendor',{recursive:true});
