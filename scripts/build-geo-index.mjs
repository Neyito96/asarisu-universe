#!/usr/bin/env node
/**
 * Offline / CI build of a conservative EP-ID keyed geo index.
 * Input: published asarisunowa library data directory copied/cloned locally.
 * Output is a candidate index, not evidence of recording location.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const dir=process.argv[2],out=process.argv[3]||'data/geo-index-generated.json';
if(!dir)throw Error('Usage: node scripts/build-geo-index.mjs /path/to/library/data [output.json]');
const manifest=JSON.parse(fs.readFileSync(path.join(dir,'manifest.json'),'utf8'));
const names=['北海道','青森','岩手','宮城','秋田','山形','福島','茨城','栃木','群馬','埼玉','千葉','東京','神奈川','新潟','富山','石川','福井','山梨','長野','岐阜','静岡','愛知','三重','滋賀','京都','大阪','兵庫','奈良','和歌山','鳥取','島根','岡山','広島','山口','徳島','香川','愛媛','高知','福岡','佐賀','長崎','熊本','大分','宮崎','鹿児島','沖縄'];
// For ambiguous labels (e.g. 京都, 山口, 松本), only explicit administrative suffixes qualify.
const prefectures=names.map((n,i)=>({id:'JP-'+String(i+1).padStart(2,'0'),name:n+(n==='北海道'?'':n==='東京'?'都':n==='京都'||n==='大阪'?'府':'県'),alias:n,level:'prefecture',parent:'JP'}));
const cities=[
{id:'JP-37-Takamatsu',name:'高松市',alias:'高松',parent:'JP-37',lat:34.3428,lon:134.0466},
{id:'JP-36-Tokushima',name:'徳島市',alias:'徳島市',parent:'JP-36',lat:34.0703,lon:134.5548},
{id:'JP-38-Matsuyama',name:'松山市',alias:'松山市',parent:'JP-38',lat:33.8392,lon:132.7657},
{id:'JP-39-Kochi',name:'高知市',alias:'高知市',parent:'JP-39',lat:33.5597,lon:133.5311},
{id:'JP-20-Matsumoto',name:'松本市',alias:'松本市',parent:'JP-20',lat:36.2381,lon:137.9719}
].map(x=>({...x,level:'city'}));
const rows=[];for(const sh of manifest.shows){for(const f of sh.search||[]){const chunk=JSON.parse(fs.readFileSync(path.join(dir,f),'utf8'));if(!Array.isArray(chunk))throw Error('Non-array search data '+f);rows.push(...chunk)}}
const byId=new Map();for(const row of rows){if(!/^EP-\d{5}$/.test(row.id))throw Error('Invalid EP-ID '+row.id);if(byId.has(row.id))throw Error('Duplicate EP-ID '+row.id);byId.set(row.id,row)}
if(byId.size!==manifest.total||byId.size!==5848)throw Error('Publication scope mismatch '+byId.size+'/'+manifest.total+' expected 5848');
const locations=[...prefectures,...cities],mentions=[],ambiguous=[];
const explicitPref=p=>p.name;
for(const r of rows){const title=String(r.title||'');const found=new Map();
for(const p of prefectures){if(title.includes(explicitPref(p)))found.set(p.id,{epId:r.id,placeId:p.id,relation:'title_mention',sourceField:'title',confidence:'high_for_mention_only',matchedText:p.name})}
for(const city of cities){let token=city.alias;if(city.id==='JP-37-Takamatsu')token='高松';if(!title.includes(token))continue;
if(city.id==='JP-20-Matsumoto'&&!title.includes('松本市'))continue;
found.set(city.id,{epId:r.id,placeId:city.id,relation:'title_mention',sourceField:'title',confidence:'high_for_mention_only',matchedText:token})}
if(title.includes('四国')){ambiguous.push({epId:r.id,token:'四国',reason:'regional_mention_not_an_administrative_point'})}
for(const m of found.values())mentions.push(m);
}
const rejections=[{epId:'EP-02795',placeId:'JP-20-Matsumoto',context:'松本人志',reason:'person_name'},{epId:'EP-02239',placeId:'JP-20-Matsumoto',context:'松本工房',reason:'organization_name'}];
const blocked=new Set(rejections.map(x=>x.epId+'|'+x.placeId));
const kept=mentions.filter(x=>!blocked.has(x.epId+'|'+x.placeId));
const epIds=new Set(kept.map(x=>x.epId));
const output={schema:'asarisu-geo-index-v0.2-conservative',source:{manifestVersion:manifest.version,publicationScopeDate:'2026-10-22',publishedCount:manifest.total,searchFiles:manifest.shows.reduce((a,s)=>a+(s.search||[]).length,0)},policy:'Explicit place-name title mentions only; NOT recording locations or exhaustive gazetteer matches',locations,mentions:kept,ambiguous,rejections,stats:{published:byId.size,matchedUniqueEpisodes:epIds.size,mentions:kept.length,regionalUnresolved:ambiguous.length},checksum:crypto.createHash('sha256').update([...byId.keys()].sort().join('\n')).digest('hex')};
if(kept.some(m=>blocked.has(m.epId+'|'+m.placeId)))throw Error('Matsumoto false-positive regression');
if(!byId.has('EP-05560')||!kept.some(m=>m.epId==='EP-05560'&&m.placeId==='JP-37-Takamatsu'))throw Error('Takamatsu regression');
if(kept.some(m=>!byId.has(m.epId)))throw Error('Dangling EP-ID');
fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(output,null,2)+'\n');console.log(JSON.stringify(output.stats));
