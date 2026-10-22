# V0.9 — 共通検索対象判定アダプター（実験ブランチ）

- 公開サイトの `main` / V0.8 は**変更しない**。
- Google Sheets「図書館・宇宙 検索対象判定」は図書館側の責任範囲。宇宙はシートを直接読まず、図書館側で公開された `search-scope.json` のみ読み取る。
- `search-scope.mjs` は **未接続の検証用アダプター**。現時点では公開サイトの検索対象は変わらない。
- JSONが存在しない・未完成・スキーマ不一致・元台帳件数不一致・バージョン不一致・代表EP-ID欠落の場合は **適用しない**。
- `status: "complete"` は図書館側で全件判定と監査が完了したときだけ付与する。
- `schemaVersion: 1`, `sourceLibraryVersion`, `counts.ledger`, `counts.universeIncluded`, `episodes[EP-ID].universe`, `onsaComparison`, `representativeId` が必要。
- 6,591は現在の台帳の期待値であり将来固定ではない。RSS新着収蔵時は図書館側が更新した台帳件数を明示し、宇宙側の期待値を連携仕様に基づき更新する。
- 5,936件は暫定目標。固定の一致条件にはしない。
- 代表EP-IDが別の代表EP-IDを指すなどの連鎖や循環、代表のみ表示のルールは図書館側と合意してから追加する。
- 切替前に公開JSONが全件検索対象を含むか、EP-IDが一致するか、既存の宇宙画面が動くか検証する。
- 検証後、別PRでV0.9を公開サイトへ統合する。明示的な承認まで本番切替なし。

## 想定する図書館側の公開先
`https://neyito96.github.io/asarisunowa/library/data/search-scope.json` （現時点で存在・公開を保証しない）
