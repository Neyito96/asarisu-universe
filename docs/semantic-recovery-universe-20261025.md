# 意味分類成果・宇宙への統合作業記録（2026-10-25）

## 決定
- 入力元: Neyito96/asarisunowa の work/semantic-classification-bulk-20261023 にある docs/semantic-classification/bulk-20261023/batch-*.json
- 統合先: Neyito96/asarisu-universe の data/semantic-recovery/
- 公開対象の照合キー: 図書館公開 manifest.json と全検索用JSONのEP-ID集合
- バッチ同士で同一IDの判断が競合した場合、自動採用・上書きをしない。
- 暫定 status=provisional、title_based の判断を確定へ昇格しない。109件の人間承認済み判断は別の原本と突合して保護する。
- 宇宙 index.html と図書館台帳/GAS/RSSの改変なし。

## 今回の実装
scripts/recover-semantic-into-universe.mjs を追加。
2つのチェックアウトをローカルに配置して実行すると、公開EP-IDとの整合、重複候補、競合、対象外、入力欠陥、status と review_basis を集計し、非競合レコードと監査JSONを出力する。
現環境はgithub.comのネットワーク名前解決ができないため、実データをコピーした状態でのスクリプト実行は未実施。監査済み、統合済み、公開済みとは言わない。

## 次の受け入れ条件
1. ブランチ上の実際のbatchファイル全部を読み込み、ファイル数とユニークEP-ID数を確定。
2. 公開5,848件のEP-IDと一致することを検査し、対象外と重複・競合を分離。
3. 確定判定・暫定判定・保留を保持し、承認済み109件の原本と照合する。
4. 宇宙テストページで前計算済みの主・副テーマと関係線を表示。軽量化の性能試験を行う。
5. 本番への反映は検証後に別途判断。
