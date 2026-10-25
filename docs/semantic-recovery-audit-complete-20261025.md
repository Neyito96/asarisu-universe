# 意味分類 299バッチ救出・全件照合結果 — 2026-10-25

## GitHubでの実作業
- 元: Neyito96/asarisunowa `work/semantic-classification-bulk-20261023`, `docs/semantic-classification/bulk-20261023/batch-*.json`。
- 元の299ファイルを全て読み、宇宙側 `data/semantic-recovery/shard-00.json` 〜 `shard-18.json` の19シャードに無変更の判断記録として保存。元データの判定状況、主テーマ、出典ファイル名を保持。
- 公開図書館 `manifest.json` の検索用61ファイルから、EP-IDのみを宇宙側 `published-ids-00.json` 〜 `published-ids-03.json` に保存。
- 全件突合結果 `data/semantic-recovery/published-join-audit.json` に記録。

## 実測
| 項目 | 件数 |
|---|---:|
| 元バッチファイル数 | 299 |
| 回収レコード数 | 5,358 |
| ユニークEP-ID | 5,358 |
| EP-ID重複 | 0 |
| 主テーマ形式不備 | 0 |
| assistant_reviewed | 33 |
| title_only | 68 |
| provisional | 5,257 |
| review_basis=title_and_description | 3,930 |
| review_basis=title_based | 1,313 |
| review_basis=title_only | 14 |
| review_basis未記載 | 101 |
| 公開対象のEP-ID | 5,848 |
| 公開対象と一致 | 5,358 |
| 公開対象外 | 0 |
| このブランチのバッチに未収録の公開EP-ID | 490 |

## 未完了・重要な注意
- 5,358件は保存済み分類レコード数。意味精読で確定した件数と同義ではない。
- 上記490件には、別原本に保存済みの109件の承認判断などが含まれる可能性があり、未分類とは断定しない。
- 原本バッチを上書きせず、本番宇宙 index.html は変更していない。
- 主・副テーマの体系整理、エピソード間の意味的つながり、軽量宇宙ページはまだ未完成。
- 一括監査結果の整合が取れたため、次は承認済み原本との照合と主・副テーマの意味品質監査を行う。

## 復元対象リンク
- https://github.com/Neyito96/asarisunowa/tree/work/semantic-classification-bulk-20261023/docs/semantic-classification/bulk-20261023
- https://github.com/Neyito96/asarisu-universe/blob/main/data/semantic-recovery/published-join-audit.json