# 宇宙船長 → 司令塔｜AI意味分類 第一便＋新25 LAB先行審査（2026-10-27）

## 指令と対象
- 指令書：`docs/command-center/2026-10-27-universe-semantic-first-ingest-gated-directive.md`（指定コミット `423c0b131a148156f057411c897634aba7296a59`）、全文確認済。
- 作業ブランチ `work/semantic-normalization-20261026`。main・公開JSON・Pages・蔵・台帳・GAS・Spotifyには操作なし。
- 旧分類記録回収は引き続き5,667/5,848、原本未回収181（UNRECOVERED）。AI推定50件を旧原本回収数へ加算しない。承認109件は不変更。

## A：旧181件のAI新規推定第1バッチ50件
- EP-04837〜04876の40件、EP-04977〜04986の10件。旧181ID集合と一致50/50、人間承認109件との交差0。
- タイトル・番組・日時と**蔵が公開している検索JSONの `keywords` 欄に収録された概要**を50件とも直接参照。W清掃済み列を直接取得したわけではないため再照合要。
- 原本：`Neyito96/asarisunowa/public/library/data/search/show-4-7.json` と `show-4-6.json`。原本blob SHAを各行の `description_revision_or_hash` に記録。
- 独立分類JSON：`data/semantic-normalized-draft/ai-inference-unrecovered-batch01-50-20261027.json`。
- 件数：AI_PROPOSED 50 / HOLD 0。分類主テーマ内訳：メディア17、暮らし生活11、防災6、文化芸術5、社会人権3、教育3、仕事労働2、医療1、福祉介護1、歴史宗教1。
- 各行にep_id/main_theme/subtheme/related_themes/confidence/short_reason/evidence_fields/description_revision_or_hash/provenance/status/title/show/dateを格納。
- 全件 `provenance=new_ai_inference`、`status=AI_PROPOSED`、`legacy_recovery_status=UNRECOVERED`、`taxonomy_version=PROPOSED_20261026`、review_required=true。最終承認ではない。

## B：新規採用提案25件のLAB先行判定
- 蔵人監査 `Neyito96/asarisunowa/docs/audits/2026-10-26-kurabito-41-episode-preview.md` の表から題名・番組・日時を取得。**現在の台帳W列の概要や公式原文を未取得**であるため、題名ベースの低確信度予備判定に留める。
- `data/semantic-normalized-draft/lab-inference-proposed-new25-20261027.json` に25件を保存、AI_PROPOSED 21件 / HOLD 4件（EP-06598、EP-06602、EP-06624、EP-06626）。HOLD理由を各行へ記録。
- 各行 `publication_status=PROPOSED_NOT_APPROVED`、`provenance=new_ai_inference`。25IDは蔵人ゲートの提案25と完全一致、ID重複0。
- 正式URL未確認6件とCOPY衝突5件の混入0、旧181件・人間承認109件との交差0。対象25は本番5848にも回収率にも加算しない。
- 題名ベースの21提案はW/公式説明取得後に文脈で再評価。タイトルが複数の主題を列挙しているもの・曖昧なものはHOLD。

## C：再読込検証
- GitHub保存後に2ファイルと人間承認109、181未回収ID、25ゲートJSONを再読込して集合を比較。
- 第1バッチ50ユニーク、旧181IDに50全件包含、承認109との交差0。
- 新25ユニーク、蔵人25提案IDと25全件一致、旧181・承認109との交差0、HOLD 4。
- 人間承認109本体のblob SHAは `bcc9845ea9a40ec7d090960314a9d97f332a4964`（本作業前からの保存値と同一）。
- 固定公開5848集合の既存Git blob SHA-1指紋は `7d8a1bd9d25e75796ccd1377af65cf62dea93ac8`（本作業で公開データを変更していない）。今回は公開集合を再計算し直したわけではない。
- 宇宙main/Pagesのライブ表示やiPhone実機検証は未実施。

## D：追加審査・停止条件
- 第1便の小テーマは20主題/103小テーマの暫定辞書にもとづくAI案で、正答保証ではない。特に複数論点の回や災害報道と番組制作の主副区分は再点検。
- 新25候補に関してはW説明・GUID・現行公式個別URLの最新照合待ち。蔵人D列正式判定、司令塔受入、ユーザー明示承認まで公開0。
- 次便は残り131件を約50件ずつ。AI分類済みでも元判断未発見ならUNRECOVEREDとして残す。
- 文学・美術110件、EP-00531スポーツ/政治外交境界、「本」一文字マッチングの監査は別工程で継続。
- ロールバック：今回追加の第1便JSON、新25 LAB JSON、本報告の各コミットを作業ブランチでrevert。既存原本・本番データに変更はない。
