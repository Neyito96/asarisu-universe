# 朝ポキ司令塔｜第2段階・旧分類200件復旧の受入（2026-10-27）

## 照合対象
- `data/semantic-normalized-draft/legacy-recovered-from-381.json`
- `data/semantic-normalized-draft/recovery-audit-20261026-phase2.json`
- `data/semantic-normalized-draft/human-approval-join-audit.json`
- `docs/command-report-20261026-phase2-acceptance-followup.md`
- `docs/semantic-taxonomy-proposal-20261026.md`
- branch `work/semantic-normalization-20261026`

## 司令塔実査結果
1. 追加救出JSONには宣言通り200レコード、EP-IDユニーク200。各レコード `recovery_type=legacy_record_recovered`、`human_approved=false`。
2. statusは `assistant_reviewed=147`、`proposed=15`、`title_only=33`、`hold=5` で記録と一致。
3. 前工程 `human-approval-join-audit.json` の `remaining_ids` は381ユニーク。
4. 今回の200件はすべて旧381IDに属する。未照合181IDもすべて旧381IDに属する。200・181は互いに重複0、旧381IDの漏れ0。
5. 累計5,358+109+200=5,667 / 5,848（約96.91%）。未照合181。**これは記録回収率であり分類正答率でも全件の内容検証でもない**。
6. 20主テーマ、小テーマの提示は**案**。原本への適用、本番UI検証は未了。
7. GitHubデータの内容・集合を照合したが、全19シャードやライブPages、蔵本番、端末実機を今回再監査したわけではない。報告の本番無変更についても作業ブランチ側の記録と区別する。

## 司令塔の次工程指令
### P0 未照合181件の追跡
- 181 EP-IDを元のまとまり・旧バッチ・旧JSON/CSV・過去コミットから探索し、発見根拠（path, branch, commit, status）を一件ずつ保存。
- 旧原本に判断が存在したものだけ `legacy_record_recovered`。原本が見つからない場合は `UNRECOVERED` を保持し、AI新規推定をする場合は別層 `new_ai_inference` として明示。
- 109件の人間承認は最優先ロック。既存5358件と今回200件の原本を改変しない。

### P0 分類品質監査
- 本番表示ブリッジの「本」など単一文字部分一致を無効化するLAB案を作り、原本/表示/タイトル/概要/理由の比較を行う。
- 文学・美術の暫定110件、スポーツの誤振り分け例（EP-00531、W杯4件など）から始め、全テーマの主題/副題混同を調べる。
- `原本の主題`・`表示主題`・`判定状態`・`根拠`・`誤判定種別`をEP-IDごとに残し、機械ヒューリスティックによる人間承認上書きを禁止。

### P1 テーマ体系とLAB
- 20主テーマ辞書と約100小テーマ候補を、定義、境界事例、同義語、表示ラベル、元テーマへの可逆対応として提示。現在の辞書は決定版ではない。
- LAB用軽量JSON・星雲を構築する場合は再現可能な生成手順、EP-ID集合の一致、Mac/iPhone相当操作、蔵リンクの確認を残す。
- 蔵の10/22掲載基準5,848 EP-IDを固定。新着41件は蔵人の承認待ちで宇宙側に先行追加しない。

## 停止線
- 本番宇宙・main・蔵・GAS・Spotify・原本台帳・公開JSONへの変更なし。
- 元分類の書換え、承認109件の自動変更、未発見181件を「旧判断復旧」とすること、検証なしの公開を禁止。
- 工程完了時はGitHubにbranch/path/commit、EP-ID集合差分、実行ログ、未解決事項を保存し司令塔へ報告。
