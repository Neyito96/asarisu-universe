# 意味分類の実データ回収｜2026-10-25

作業先: asarisu-universe。原本: asarisunowa / work/semantic-classification-bulk-20261023。

GitHub比較の先頭10個の分類バッチJSONを実際に取得して、初回の回収データを data/semantic-recovery/verified-batches-001-010.json に保存した。ファイル名の001-010は回収順を示し、バッチ番号10まで全件という意味ではない。

回収件数349レコード、349個の異なるEP-ID。status は assistant_reviewed=33、title_only=68、provisional=248。原本の status を変更していない。副テーマが未記載なら空配列のまま保存し、推測しない。

未了: 全保存バッチの網羅的回収、公開5,848件への所属照合、原本中の重複・競合精査、人間承認済み109件との整合。したがって今回の349レコードを全件分類済みと解釈しない。testと本番index.htmlは不変更。

次段階: バッチ全体の回収と照合、同一EP-IDの競合を確定した後に主テーマ・副テーマ構造を整え、軽量テスト宇宙を作る。
