import assert from 'node:assert/strict';
import {writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const librarySHA='6e4a33adcbaa6bd60a6c1c6e677521d6eac14ca5';
const universeRef=process.env.GITHUB_SHA||'verify/publication-scope-p0-p1-20261023';
const base='https://raw.githubusercontent.com/Neyito96/asarisunowa/'+librarySHA+'/public/library/';
async function get(path){const r=await fetch(base+path,{cache:'no-store'});if(!r.ok)throw Error(path+' HTTP '+r.status);return r.text()}
async function main(){
 const [manifestText,scopeText,moduleText]=await Promise.all([get('data/manifest.json'),get('data/scope.json'),get('publication-scope.mjs')]);
 const manifest=JSON.parse(manifestText),scope=JSON.parse(scopeText);
 const shared=await import('data:text/javascript;base64,'+Buffer.from(moduleText).toString('base64'));
 const paths=manifest.shows.flatMap(show=>show.search||[]);
 assert.equal(paths.length,61,'unexpected search-file count');
 assert.equal(manifest.publicationScope?.file,'scope.json');
 assert.equal(manifest.publicationScope.version,scope.version);
 assert.equal(scope.libraryVersion,manifest.version);
 assert.equal(manifest.total,scope.adopted);
 assert.equal(scope.source,scope.adopted+scope.excluded+scope.held);
 const arrays=await Promise.all(paths.map(async path=>{const a=JSON.parse(await get('data/'+path));assert(Array.isArray(a),path+' must be an array');return a}));
 const all=arrays.flat(),allowed=new Set(scope.publishedIds);
 const ids=all.map(x=>x.id),seen=new Set(ids);
 assert.equal(seen.size,ids.length,'duplicate source EP-ID');
 assert.equal(allowed.size,scope.publishedIds.length,'duplicate scope EP-ID');
 const selected=shared.selectPublishedEpisodes(all,scope,{requireComplete:true});
 const actual=new Set(selected.map(x=>x.id));
 const missing=[...allowed].filter(id=>!actual.has(id)),extra=[...actual].filter(id=>!allowed.has(id));
 const sourceExtra=[...seen].filter(id=>!allowed.has(id));
 assert.equal(missing.length,0,'scope IDs missing from universe');
 assert.equal(extra.length,0,'unapproved IDs in universe');
 assert.equal(sourceExtra.length,0,'unapproved IDs in published search index');
 assert.equal(selected.length,manifest.total);
 const counts=Object.fromEntries(manifest.shows.map(x=>[x.name,selected.filter(e=>e.show===x.name).length]));
 for(const show of manifest.shows)assert.equal(counts[show.name],show.count,'show count '+show.name);
 // The same selected array is the only input to the universe's topic/cast/geo aggregations.
 const aggregate=items=>({ids:new Set(items.map(e=>e.id)),shows:new Map([...new Set(items.map(e=>e.show))].map(name=>[name,items.filter(e=>e.show===name).length])),people:new Map([...new Set(items.flatMap(e=>e.cast||[]).map(String))].map(name=>[name,items.filter(e=>(e.cast||[]).map(String).includes(name)).length])),topics:new Map([...new Set(items.flatMap(e=>e.topics||[]))].map(name=>[name,items.filter(e=>(e.topics||[]).includes(name)).length])),geo:new Map([...new Set(items.flatMap(e=>e.places||[]))].map(name=>[name,items.filter(e=>(e.places||[]).includes(name)).length]))});
 const fixture=[{id:'EP-00001',show:'番組A',cast:['出演者A'],topics:['福祉'],places:['長野']},{id:'EP-00002',show:'番組A',cast:['出演者B'],topics:['教育'],places:['東京']}];
 const mkScope=(items)=>({schema:1,policy:'REVIEWED_D_TARGET',publishedIds:items.map(e=>e.id),adopted:items.length,source:items.length,excluded:0,held:0,shows:[...new Set(items.map(e=>e.show))].map(name=>({name,count:items.filter(e=>e.show===name).length}))});
 const run=(items,approved)=>aggregate(shared.selectPublishedEpisodes(items,mkScope(approved),{requireComplete:true}));
 const baseline=run(fixture,fixture),newEpisode={id:'EP-00003',show:'番組B',cast:['出演者A'],topics:['福祉'],places:['大阪']};
 const added=run([...fixture,newEpisode],[...fixture,newEpisode]);assert.equal(added.ids.size,3);assert.equal(added.people.get('出演者A'),2);assert.equal(added.topics.get('福祉'),2);assert.equal(added.geo.get('大阪'),1);assert.equal(added.shows.get('番組B'),1);
 const removed=run(fixture,[fixture[0]]);assert.equal(removed.ids.size,1);assert(!removed.ids.has('EP-00002'));assert(!removed.people.has('出演者B'));assert(!removed.topics.has('教育'));assert(!removed.geo.has('東京'));
 const corrected={...fixture[0],cast:['出演者C'],topics:['医療'],places:['京都']};const changed=run([corrected,fixture[1]],[corrected,fixture[1]]);assert.equal(changed.ids.size,2);assert.equal(changed.people.get('出演者C'),1);assert(!changed.people.has('出演者A'));assert.equal(changed.topics.get('医療'),1);assert.equal(changed.geo.get('京都'),1);
 assert.throws(()=>run([fixture[0],fixture[0]],fixture),/DUPLICATE/);
 assert.throws(()=>run([fixture[0]],fixture),/INCOMPLETE/);
 assert.notEqual(manifest.publicationScope.version,'incorrect-version');
 const report={result:'PASS',libraryCommit:librarySHA,universeRef,manifestVersion:manifest.version,scopeVersion:scope.version,generatedAt:manifest.generatedAt,searchFiles:paths.length,sourceEpisodes:all.length,selectedEpisodes:selected.length,scopeIds:allowed.size,missing:missing.length,extra:extra.length,sourceExtra:sourceExtra.length,duplicateSource:ids.length-seen.size,duplicateScope:scope.publishedIds.length-allowed.size,showCounts:counts,tests:['new episode','revocation','correction','duplicate','missing','version mismatch metadata'],scopeSHA256:createHash('sha256').update(scopeText).digest('hex')};
 await mkdir('artifacts',{recursive:true});await writeFile('artifacts/publication-scope-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}
main().catch(async e=>{await mkdir('artifacts',{recursive:true});await writeFile('artifacts/publication-scope-verification.json',JSON.stringify({result:'FAIL',libraryCommit,error:String(e.stack||e)},null,2));console.error(e);process.exitCode=1});
