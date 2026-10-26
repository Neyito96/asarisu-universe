# 航海羅針盤 1026｜原本調査と正規化第1稿

## 直接確認したもの
- asarisunowa別ブランチ `work/semantic-classification-bulk-20261023` と元バッチJSON。
- asarisu-universeの `data/semantic-recovery/shard-00.json` ～ `shard-18.json`、監査JSONと監査日誌。
- 2026-10-25の誤分類事故記録と修正コミット。
- 2026-10-22の `classification-pilot-results-20261022.json` はルール補助であり、人間承認ではない。

## 数値（既存全件監査の再確認）
299バッチ、5358レコード、公開対象5848、照合待ち490。ステータス：assistant_reviewed 33、title_only 68、provisional 5257。

## 誤分類原因
表示用テーマブリッジの「文学・美術」ルールに一文字「本」が含まれ、「日本」「日本版DBS」などまで誤一致。事故記録によると明白なスポーツ18件を是正、疑わしい97件を検討中へ退避、坂本花織1件をフィギュアへ移動。ただし全件検証は未了。

## 今回保存した成果
`data/semantic-normalized-draft/shard-00.json`（441件）。原本の `main_theme` を削除・改変せず、スラッシュの前後を仮の主テーマ・小テーマに分離。元の status、reason、confidence、related_themes、_sourceを保持。キーワード推測による分類は行わない。

## 未了
- shard-01〜18の保存は分割実行で完了（下記追加実行・再検証参照）。
- 人間承認約109件の所在特定、照合待ち490件、全件意味監査、統一テーマ設計。
- ブラウザ・iPhoneの実機試験、本番統合。

## 保護
このブランチだけ変更。本番 main、図書館の元データ、GAS、RSS、Spotify、新着ロボには一切変更しない。

## 追加実行・再検証（同日）
- 19/19シャードを `data/semantic-normalized-draft/shard-00.json`〜`shard-18.json` に保存完了。
- 保存ファイルを全て再読込して件数を再計算：総計5358件、ユニークEP-ID5358件、重複0件。
- `human_approved` は全シャード null（未調査）に統一。元の status=assistant_reviewed は人間承認を意味しない。
- これは元の `main_theme` のスラッシュ階層を抽出しただけで、共通20分類・100小分類の統合作業は未実施。
- 490件の原本探索と人間承認約109件の統合も未実施。
- main・本番URL・表示用ブリッジは未変更。
