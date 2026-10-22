// Run locally: node --test experiments/v0.9/search-scope.test.mjs
import test from "node:test";
import assert from "node:assert/strict";
import {validateScope,applySearchScope,loadSearchScope} from "./search-scope.mjs";
const make=()=>({schemaVersion:1,status:"complete",sourceLibraryVersion:"v1",counts:{ledger:2,universeIncluded:1},episodes:{"EP-00001":{universe:true,onsaComparison:true,representativeId:"EP-00001"},"EP-00002":{universe:false,onsaComparison:false,representativeId:"EP-00001"}}});
const check=s=>validateScope(s,{expectedLibraryVersion:"v1",expectedLedgerCount:2});
test("valid complete scope",()=>{const x=check(make());assert.equal(x.ok,true);assert.equal(x.count,1)});
test("incomplete scope is rejected",()=>{const s=make();s.status="draft";assert.equal(check(s).ok,false)});
test("missing representative is rejected",()=>{const s=make();s.episodes["EP-00002"].representativeId="EP-99999";assert.equal(check(s).ok,false)});
test("version mismatch is rejected",()=>{const s=make();s.sourceLibraryVersion="old";assert.equal(check(s).ok,false)});
test("declared count mismatch is rejected",()=>{const s=make();s.counts.universeIncluded=2;assert.equal(check(s).ok,false)});
test("failed fetch preserves current rows",async()=>{const result=await loadSearchScope({fetcher:async()=>({ok:false,status:404}),expectedLedgerCount:2});const rows=[{id:"EP-00001"},{id:"EP-00002"}];assert.deepEqual(applySearchScope(rows,result),rows)});
test("valid scope selects included IDs",()=>{const rows=[{id:"EP-00001"},{id:"EP-00002"}];const result=check(make());assert.deepEqual(applySearchScope(rows,{active:true,ids:result.included}),[rows[0]])});
