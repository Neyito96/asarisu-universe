# 司令塔｜文学・美術110件の第1次品質監査受入、残100件と表示ブリッジ原因追跡
**2026-10-27 JST／LAB・READ_ONLYのみ。分類本採用と本番公開変更は未承認。**

## 確認したGitHub原本
- 第1次報告 `docs/command-center/2026-10-27-universe-art110-sports-quality-first-report.md` 提出commit `9b5b07c631d94e20b2ff97af1ecd823a5aa1f760`、取得blob `3331321395c28e66d89e407049f36dcb4b6b81bb`。
- 110件集合 `data/semantic-normalized-draft/art110-cohort-provenance-20261027.json` 提出commit `de1ccab3`、blob `57a695987703bfc20c22cd9cb8f9e607a108a509`。
- 先頭10件 `data/semantic-normalized-draft/art110-quality-batch01-partial10-20261027.json` 提出commit `4aeb2623`、blob `a0501b2550232043c25d73d7f84ddf7d49766369`。
- 206レビューキュー `data/semantic-normalized-draft/quality-206-unified-review-queue-20261027.json` 提出commit `acc06bdc`、blob `94cba5b900a9ba84a5cb4b9d5278bdf8c5855cb2`。
- スポーツ6件 `data/semantic-normalized-draft/sport-boundary-regression6-20261027.json` 提出commit `24d8efca`、blob `80f9370f346f732e4a69f89dbb2d2d9febd967a9`。
司令塔は以上をGitHubで直接再読。Google Sheetsの原文と実際の旧ブリッジ実行コードの独立再現までは今回未実施。

## 受入の範囲・判断
1. 110件は `data/semantic-recovery/theme-bridge-pilot.json` の `episodes[i][2] === '文学・美術'` に合致した**旧ヒューリスティック表示先**。原本分類「文学・美術」の正解110件ではない。出典blob `dd7a26acdd884dc33eca9c429a107b0a11232a69` を保持。110件ユニーク、109人間承認集合との交差0と報告。
2. 先頭10件のW/V文脈点検を受入：CONFIRMED3、REVISE_MAIN3、DISPLAY_BRIDGE_BUG疑い3、RELATED_TAG_NEEDED1。DISPLAY_BRIDGE_BUGは原因確定ではない。EP-00939「日本の核武装」やEP-01776「見本」は一文字の『本』部分一致疑いだが、正規表現・トークン化・条件順序を検証してから原因を断定する。
3. 206件の品質課題47件はEP-ID単位で統合済み。改訂履歴が複数の7EPを明示。**47件に206対象外3件が含まれる可能性を残すため、206内／外を集合照合して別計数すること**。47件は人間承認数や修正確定数ではない。
4. スポーツ境界6件は独立回帰として受入。EP-00531 W空欄→SOURCE_INSUFFICIENT、EP-05538は漫画主/サッカー関連、EP-05605・05606は競技主、EP-04988麻雀報道複合、EP-05598戦争・パラスポーツ複合。ホバー小分類数は旧表示ブリッジの暫定表示数であり、正しいEP実数と呼ばない。
5. 本番公開5848件、人間承認109件、旧AI原本、分類回収5667/5848は維持。

## 次工程P0：110件全件文脈審査を完走
1. 既査10件を重複なく差し引いた**残100件**の明示的ID集合を固定。最初の便は未査25件で第1便35件を完成し、その後第2便35、第3便35、第4便5（全110）。各便に対象・済・保留・重複と元分類/旧ブリッジ分類の違いを記録。
2. 各EP-IDの本番W/V、題名、番組、元分類文言と元分類状態をREAD_ONLYで照合し、主テーマ・小テーマ・関連タグ・理由を分類。`CONFIRMED/REVISE_MAIN/REVISE_SUB/RELATED_TAG_NEEDED/DISPLAY_BRIDGE_BUG_SUSPECTED/SOURCE_INSUFFICIENT`。旧原本と人間承認109件の上書き禁止。
3. まず映画/ドラマ・文学/漫画・宗教的造形/芸術・報道の取材制作・政治/防災を異なる主題として区別。単語や番組名だけで判断しない。作品が登場するだけで文化芸術が主とは限らない。
4. バッチ境界ID集合差分を検証し、累計110/110に到達するまでは全件監査完了と報告しない。Wが空欄ならV公式原文とidentityが照合できるものを検討、裏付け不足ならHOLDとする。

## 次工程P0並行：旧表示ブリッジの原因再現
5. `theme-bridge-pilot.json` を生成した旧分類コードの**実ファイル/バージョン/コミット**を発見し、キーワード照合方式、`本`等の単文字・部分一致、条件の優先順位、デフォルト分類、番組名依存をREAD_ONLY解析。EP-00939とEP-01776などの回帰テストで実際に誤投影が発生するか検証。
6. 原因がコード上で確定したら、旧表示ブリッジは修正**提案**を別ファイルに保存。元パイロットJSONや公開画面を修正してはならない。
7. 該当コードが不明なら`CODE_PATH_UNKNOWN`と明記し、推定原因のままにする。

## P1：206レビュー47件とスポーツ境界の整合
8. 206母集団との集合交差を用いて47件のscope内/外を分離。重複7件の最新版を初回・改訂案の出典SHAとともに記録。確認不要に格上げせず、`review_pending`を保全。
9. スポーツの野球/サッカー/バスケ/フィギュア/相撲/陸上/パラスポーツの暫定件数と確定的な文脈判定件数を別表示。星雲ホバーのカテゴリ件数の実データ化は全件分類と一致検査の後に行う。
10. 蔵人・Phase15補填ロボとの連携はEP-ID、出典revision、旧W/新W hash、内容変更点だけをLABレビューキューへ流す仕様を維持。蔵の出版ゲートを通らない新25件の宇宙公開禁止。

## 次回成果
第1便35件（既査10＋新規25）の監査JSONと集計、旧ブリッジのコード起源と誤判定の再現結果、206レビュー47件の集合内外計数、スポーツ境界の追試状況をrepo/branch/path/commit付きで報告。
**STOP:** 本番台帳・GAS・COPY・Spotify・main・Pages・公開JSON、既存AI分類、人間承認109件、公開5848のEP-ID集合へは一切書き込まない。
