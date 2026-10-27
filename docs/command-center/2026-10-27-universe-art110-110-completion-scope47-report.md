# 宇宙船長 → 司令塔｜文学・美術110件W/V一次文脈監査完走・表示ブリッジ原因追跡（2026-10-27）

## 指令と保護対象
正式指令 `docs/command-center/2026-10-27-universe-art110-first-audit-acceptance-next100.md` （commit `d0ce9aa16f2b180a0b3ce7deba4ed4d6fe61e1c3`）全文確認。LAB/READ_ONLYで本番台帳を参照。台帳、GAS、Spotify、蔵、main、Pages、分類元AI、人間承認109、公開5,848への書込0。

## 110件の母集団と4便実績
- 旧ヒューリスティック表示ブリッジ `data/semantic-recovery/theme-bridge-pilot.json` の `episodes[i][2] === "文学・美術"` で110件抽出。これは元の正しい文学美術分類ではない。
- 出典全110IDは `data/semantic-normalized-draft/art110-cohort-provenance-20261027.json`（commit `de1ccab3d23a2b97a5727f4f47fa23d19f8f18a5`）に固定。
- 第1便35件（既査10＋新査25）：`data/semantic-normalized-draft/art110-quality-batch01-complete35-20261027.json` commit `5c8042b85545e0aa6dfa4e79d8eb097f3d6a2260`。
- 第2便35件：`data/semantic-normalized-draft/art110-quality-batch02-35-20261027.json` commit `c23e3d21371aebd567bc9a10cb59bf00c691386a`。
- 第3便35件：`data/semantic-normalized-draft/art110-quality-batch03-35-20261027.json` commit `0ac2be54e8241ddcb7c6ede96d321300a855e7ca`。
- 第4便5件：`data/semantic-normalized-draft/art110-quality-batch04-5-20261027.json` commit `0bbfc0ac690ed47be0205cd9c83b950cd918d828`。
- GitHubに保存後に4ファイルを再読込し、**監査レコード110、unique110、対象IDに不足0、対象外0、35+35+35+5**と検証。人間承認109集合との交差0。
- ステータスの格納値合計：CONFIRMED25、REVISE_MAIN55、RELATED_TAG_NEEDED20、DISPLAY_BRIDGE_BUG/疑い3、DISPLAY_BRIDGE_BUG_SUSPECTED5、SOURCE_INSUFFICIENT2。
- 注意：旧10件の`DISPLAY_BRIDGE_BUG`も、生成コード実機の再現がないため、**本報告では疑い扱いの計8件**とする。分類の最終承認・統計的正答率ではない。
- V/Wとも空欄の`EP-02178`・`EP-02186`はSOURCE_INSUFFICIENT。元分類や題名だけで本採用しない。その他の新査98件にはWの文脈を確認した。

## 文脈監査からの主な指摘
- `EP-02032`は日本の保育環境、`EP-02199`は小惑星探査、`EP-02366`は島の地理統計、`EP-03014`は核軍縮、`EP-03136`はオーロラ。文学・美術ではない。
- `EP-02407`は仏像/親鸞肖像展、`EP-02920`は村上隆の美術展、`EP-05104〜05106`は漫画評、`EP-05813`は博物館展示。文化・芸術主軸が妥当。
- `EP-02531`は漫画を通じた沖縄戦の記憶、`EP-02732`は原爆写真の取材、`EP-03920`は震災報道写真。漫画/写真を作品論として主に押し込まない。
- `EP-05247`写真報道の技法、`EP-05438`五輪紙面編集、`EP-04893`本屋風ランディングページの話を含む制作会議はメディアに振り直し候補。
- `EP-06178`大気汚染対策にアートを使用、`EP-06384`ゴッホ作品の窃盗、`EP-06404`贋作犯罪は、芸術を題材にしていても社会現象・犯罪を主テーマにすべき場合がある。
- 20主/103小辞書と矛盾する新ラベル（例：美術品犯罪、言語・方言、科学/地理）はあくまでLABの**語彙候補**。既存分類原本の置換は禁止。

## 表示ブリッジの発生源調査
- `docs/semantic-misclassification-postmortem-20261025.md`に**旧試験ブリッジの文学・美術ルールが一文字「本」を含み、日本/日本代表等が誤一致した**という当時の事故記録あり。また18スポーツ訂正、97件退避が記録されている。
- `docs/semantic-cloud-pilot-20261025.md`から、当該ブリッジが自由記述主題の**ヒューリスティック表示**であることを再確認。
- `scripts/recover-semantic-into-universe.mjs` は分類**回収**を行うスクリプトで、表示カテゴリの「本」正規表現ルールは含まない。
- **生成コードの実ファイル・バージョンはまだ特定できず、現在の実行コードの回帰テストも未実施。結果：CODE_PATH_UNKNOWN／CODE_CAUSE_NOT_REPRODUCED_NOW。** 事故記録での原因説明と今回の再現は混同しない。
- 調査ファイル：`data/semantic-normalized-draft/art110-bridge-cause-trace-20261027.json` commit `e9ac62bd3fdf0d29b3189183efecd7cd4287b867`。旧パイロット・UIコード修正は未実施。

## 206件品質47候補の対象内外
- `data/semantic-normalized-draft/quality-206-unified-review-queue-20261027.json` の47候補を206母集団ID集合で再照合。
- **47件すべて対象内、対象外0、重複する監査履歴7EP-ID、主テーマ提案間の競合EP-05538（1件）**。
- `data/semantic-normalized-draft/quality-206-scope-verified47-20261027.json` commit `11106af7cca337dfbaa978048fe08c4298585afc`。全候補はreview_pending。前回の監査参考例である206母集団外の3件は品質候補47には入っていない。

## スポーツ境界
既存の6件回帰ファイル `data/semantic-normalized-draft/sport-boundary-regression6-20261027.json` （commit `24d8efca0f9eeed04715d48ecb0a994a4ab080b9`）を維持。作品/競技/報道/国際の境界を110件監査にも適用した。スポーツ下位件数は旧ヒューリスティック表示値であり、正答に基づく全数確認はまだ未実施。EP-00531のW空欄は引き続き保留。

## 保全証拠・今後のゲート
- 人間承認109 JSONのGitHub再読blob SHA `bcc9845ea9a40ec7d090960314a9d97f332a4964`、従前と一致。
- 既存公開5,848集合Git blob SHA1 `7d8a1bd9d25e75796ccd1377af65cf62dea93ac8` は過去の検証済み既知値で、今回のライブ再計算は実施していない。main/Pages未変更。
- W/V原文本文はGitHubに大量転載せず。WのSHA256は未計算につきnull、個別公式URL独立HTTP検証なし。
- 次工程はsource空欄2件の追跡、表示ブリッジ生成元履歴の特定、110件の分類案・暫定辞書の整合、人間受入前レビュー、スポーツ下位分類の実数検証。
