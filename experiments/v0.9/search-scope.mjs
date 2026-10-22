// V0.9 experimental search scope adapter. Read-only; no effect on live V0.8.
export const SCOPE_URL="https://neyito96.github.io/asarisunowa/library/data/search-scope.json";
const ID=/^EP-\d{5}$/;
export function validateScope(scope,{expectedLibraryVersion=null,expectedLedgerCount=6591}={}){
 const errors=[];
 if(!scope||typeof scope!=="object")return {ok:false,errors:["invalid_root"]};
 if(scope.schemaVersion!==1)errors.push("unsupported_schema");
 if(scope.status!=="complete")errors.push("scope_not_complete");
 if(!scope.episodes||typeof scope.episodes!=="object"||Array.isArray(scope.episodes))errors.push("invalid_episodes");
 const entries=scope.episodes&&typeof scope.episodes==="object"&&!Array.isArray(scope.episodes)?Object.entries(scope.episodes):[];
 if(entries.length!==expectedLedgerCount)errors.push("ledger_count_mismatch");
 if(scope.counts?.ledger!==entries.length)errors.push("declared_ledger_count_mismatch");
 if(expectedLibraryVersion!==null&&scope.sourceLibraryVersion!==expectedLibraryVersion)errors.push("library_version_mismatch");
 const included=new Set();
 for(const [id,v] of entries){
  if(!ID.test(id)||!v||typeof v.universe!=="boolean"||typeof v.onsaComparison!=="boolean"||!ID.test(v.representativeId||"")){errors.push("invalid_record:"+id);continue}
  if(v.universe)included.add(id);
 }
 for(const [id,v] of entries){if(v?.representativeId&&!scope.episodes[v.representativeId])errors.push("missing_representative:"+id)}
 if(scope.counts?.universeIncluded!==included.size)errors.push("included_count_mismatch");
 return {ok:errors.length===0,errors,included,count:included.size}
}
export async function loadSearchScope({url=SCOPE_URL,libraryVersion=null,expectedLedgerCount=6591,fetcher=fetch}={}){
 try{
  const response=await fetcher(url,{cache:"no-store"});
  if(!response.ok)return {active:false,reason:"http_"+response.status};
  const result=validateScope(await response.json(),{expectedLibraryVersion:libraryVersion,expectedLedgerCount});
  if(!result.ok)return {active:false,reason:"validation_failed",errors:result.errors.slice(0,30)};
  return {active:true,ids:result.included,count:result.count};
 }catch(e){return {active:false,reason:"fetch_failed",error:String(e?.message||e)}}
}
export function applySearchScope(rows,scope){
 if(!scope?.active)return rows; // Fail closed for switching: preserve current V0.8 selection.
 return rows.filter(row=>scope.ids.has(row.id));
}
