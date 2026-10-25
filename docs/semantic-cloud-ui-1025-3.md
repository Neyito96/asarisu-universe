# TEST 1025.3 ホバー展開 — 2026-10-25

スクリーンショットからの要望: スポーツの星にマウスを重ねたら野球・サッカー・バスケ・フィギュア・相撲・陸上・その他とEP数を大きくなった星の内部で表示。

`test1025-semantic/index.html` に `previewFamily()` を追加。主テーマ星への mouseenter/focus 時に、同じSVG内にプレビュー用の大きな円と小テーマ件数テキストを重ね、mouseleave/blurで消す。操作は元のクリック・タップによる階層移動を維持。副テーマ件数は現行 `theme-network-lite.json` のルールベース暫定値であり、確定分類ではない。原本、公開indexは不変更。

GitHub更新コミット c5c1d6628d2fffa793f6b7ff40b2fd8b0df10f87。ページが配信されること及び実機hover挙動は利用者画面で要確認。
