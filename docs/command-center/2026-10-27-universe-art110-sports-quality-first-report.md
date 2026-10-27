# 宇宙船長 → 司令塔｜文学・美術110品質ゲート着手、206件品質修正キュー統合、スポーツ回帰（2026-10-27）

## 指令と安全線
司令塔正式指令 `docs/command-center/2026-10-27-universe-206-wv-completion-acceptance-art-sports-next.md` （指定コミット `2de6929b94cee729d5bb435157b8d06ced0abaf7`）をGitHub直接全文確認。開発ブランチ `work/semantic-normalization-20261026` のLAB専用追加ファイルのみ作成。公開5848、人間承認109、既存AI原本、台帳、GAS、Spotify、main、Pages変更なし。

## A：110件の出所と抽出再現
- 旧LABブリッジ `data/semantic-recovery/theme-bridge-pilot.json`、取得blob `dd7a26acdd884dc33eca9c429a107b0a11232a69` の `episodes[i][2] === "文学・美術"` を再抽出：正確に110件、ユニーク110。
- 古い監査キュー `data/semantic-normalized-draft/lab-risk-review-20261027.json` blob `8bc594a40c0629a3de83892a6d0b6d22da73a312` の110 EP-IDと完全一致、承認109との重複0。
- **これは「文学・美術」というヒューリスティック表示先へ投影された110件。元の主分類が文学美術と確定した110件ではない。**
- 全110 ID・元free-text分類・元分類状態・抽出式・出典SHA・35/35/35/5の便分割を保存：`data/semantic-normalized-draft/art110-cohort-provenance-20261027.json`、commit `de1ccab3d23a2b97a5727f4f47fa23d19f8f18a5`。
- 現時点で本番台帳W/Vを実査し監査判断を保存したのは**先頭10/110件のみ**。30〜40件便全体や110件全件完走とは主張しない。
- `data/semantic-normalized-draft/art110-quality-batch01-partial10-20261027.json` commit `4aeb26232bd99f31a6d311ffb2efbda191106d85`。先頭10件の内訳：CONFIRMED3、DISPLAY_BRIDGE_BUG3、REVISE_MAIN3、RELATED_TAG_NEEDED1。例：EP-00939の核武装は文学でなく安全保障、EP-01776の「見本」は文字列部分一致に由来する表示誤分類の疑い、EP-01989のQアノンは陰謀論。仏像展・瀬戸内寂聴連載・写真家などは美術文学と文脈上整合。
- `DISPLAY_BRIDGE_BUG` は症状を示す推定ラベルであり個別コード経路を再実行してバグを確定したわけではない。特に原因を「本」一文字マッチに断定するにはコード監査が必要。

## B：スポーツ境界のW/V回帰6例
- `data/semantic-normalized-draft/sport-boundary-regression6-20261027.json` commit `24d8efca0f9eeed04715d48ecb0a994a4ab080b9`。
- EP-00531：本番Wは空欄、題名と元分類だけで主副の採択を確定せず SOURCE_INSUFFICIENT。
- EP-05538：漫画『キャプテン翼』の人物・作中技なので文化・芸術／漫画を主、サッカーを関連とするLAB案。
- EP-05605：北京五輪、フィギュアスケートのドーピング報道（スポーツ主）。
- EP-05606：北京パラ・選手の競技と人生（スポーツ主）。
- EP-04988：麻雀Mリーグ競技と新聞報道の複合、スポーツ／頭脳競技主＋報道関連案。
- EP-05598：北京パラのノルディックスキーとウクライナ戦争（スポーツ主、国際関連）。
- ブリッジのスポーツ各表示小分類の数（サッカー38、スポーツ全般37、野球32、陸上31、フィギュア29、バスケット22、相撲・格闘19）は**検証前のヒューリスティック表示ノード件数**で、公開スポーツ正確集計とは表示しない。

## C：206件の改訂・葛藤キュー統合
- ソース7件：HOLD7監査、初回サンプル18、次50、境界7、残134の50/50/34。各ファイルをGitHubで再読し、EP-IDでgroup、各判断版・保存元ファイルSHA・判断理由を保持。
- `data/semantic-normalized-draft/quality-206-unified-review-queue-20261027.json`、commit `acc06bdc473e03dd53afc6c29e42d0431509b742`。
- 参照監査ID209ユニークには、既知の206母集団外3件が含まれる。レビュー理由があるIDはユニーク47、複数の監査版をもつID7。元案の違いとしてEP-05538を競合候補としてマーク（スポーツ→漫画）。
- 47件を206母集団内外で別計数する追加検証は未実施。人手確認の承認済み件数ではない。

## 次便・保留
- 文学・美術110件のW/V本文監査は**10/110**、残100件。35/35/35/5の予定便に順次記録し、最終的な全110判定を要する。
- ID一意性と原本由来の問題を切り分け、実際の文字列判定コードを検証。確実性低いものは SOURCE_INSUFFICIENT。
- スポーツ小テーマの全量集計・206修正キューの正式採択・新25公開可否は未完了で別ゲート。
- W記述ハッシュ／公式サイト独立HTTP／iPhone実機確認は未実施。
