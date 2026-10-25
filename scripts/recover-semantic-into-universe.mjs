#!/usr/bin/env node
// Offline, read-only semantic recovery. Usage:
// node scripts/recover-semantic-into-universe.mjs PATH_TO_ASARISUNOWA_BRANCH PATH_TO_PUBLISHED_DATA_DIR
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [libraryRoot,publishedRoot] = process.argv.slice(2);
if(!libraryRoot || !publishedRoot) {
  console.error('Usage: node scripts/recover-semantic-into-universe.mjs <asarisunowa checkout of work/semantic-classification-bulk-20261023> <published library/data directory>');
  process.exit(2);
}
const bulk = path.join(libraryRoot,'docs/semantic-classification/bulk-20261023');
const manifest=JSON.parse(fs.readFileSync(path.join(publishedRoot,'manifest.json'),'utf8'));
const showFiles=(manifest.shows||[]).flatMap(s=>s.search||[]);
const eligible=new Map();
for(const file of showFiles){
 const rows=JSON.parse(fs.readFileSync(path.join(publishedRoot,file),'utf8'));
 for(const row of rows){
  if(eligible.has(row.id))throw Error('duplicate published EP-ID: '+row.id);
  eligible.set(row.id,{title:row.title,show:row.show});
 }
}
if(eligible.size!==manifest.total) throw Error('published dataset count mismatch: '+eligible.size+' vs '+manifest.total);
const batchFiles=fs.readdirSync(bulk).filter(n=>/^batch-.*\.json$/.test(n)).sort();
const candidates=new Map(), malformed=[], statuses={}, bases={};
for(const file of batchFiles){
 const parsed=JSON.parse(fs.readFileSync(path.join(bulk,file),'utf8'));
 const rows=Array.isArray(parsed)?parsed:(parsed.records||parsed.episodes);
 if(!Array.isArray(rows)){malformed.push({file,issue:'no records array'});continue}
 rows.forEach((r,i)=>{
  const id=r.ep_id||r.id, theme=r.main_theme||r.primary, status=r.status||'unknown', basis=r.review_basis||'unknown';
  if(!/^EP-\d{5}$/.test(id||'') || typeof theme!=='string' || !theme.trim()){malformed.push({file,index:i,issue:'invalid id/theme'});return}
  statuses[status]=(statuses[status]||0)+1;bases[basis]=(bases[basis]||0)+1;
  if(!candidates.has(id))candidates.set(id,[]);
  candidates.get(id).push({epId:id,primary:theme.trim(),secondary:Array.isArray(r.sub_themes)?r.sub_themes:Array.isArray(r.related)?r.related:[],status,basis,sourceFile:file});
 });
}
const conflicts=[], outside=[], resolved=[];
const rank=s=>({confirmed:4,approved:4,reviewed:3,provisional:2,held:1,unknown:0})[s]??0;
for(const [id,rows] of candidates){
 if(!eligible.has(id)){outside.push({id,sourceFiles:rows.map(r=>r.sourceFile)});continue}
 const variants=[...new Set(rows.map(r=>JSON.stringify([r.primary,r.secondary,r.status,r.basis])))];
 if(variants.length>1){conflicts.push({id,candidates:rows});continue} // No silent overwrites
 const selected=rows[0];
 resolved.push({...selected,sourceFiles:rows.map(r=>r.sourceFile)});
}
resolved.sort((a,b)=>a.epId.localeCompare(b.epId));
const audit={schema:'asapoki-semantic-recovery-audit-v1',sourceBranch:'work/semantic-classification-bulk-20261023',publicationVersion:manifest.version,publicationTotal:manifest.total,sourceFiles:batchFiles.length,rawRecords:[...candidates.values()].reduce((n,x)=>n+x.length,0),uniqueCandidateIds:candidates.size,readyUniqueIds:resolved.length,conflictingIds:conflicts.length,outsidePublicationIds:outside.length,malformedRecords:malformed.length,sourceStatusCounts:statuses,reviewBasisCounts:bases,warning:'No classification is elevated to confirmed by this process. Existing human approvals need a separate source reconciliation.'};
const target='data/semantic-recovery';
fs.mkdirSync(target,{recursive:true});
fs.writeFileSync(path.join(target,'audit.json'),JSON.stringify({...audit,conflicts,outside,malformed},null,2)+'\n');
fs.writeFileSync(path.join(target,'nonconflicting.json'),JSON.stringify({schema:'asapoki-semantic-nonconflicting-v1',sourceBranch:audit.sourceBranch,publicationVersion:manifest.version,records:resolved},null,2)+'\n');
console.log(JSON.stringify(audit,null,2));
if(conflicts.length||malformed.length)process.exitCode=1;
