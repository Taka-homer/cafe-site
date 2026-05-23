# cafe-site

カフェのウェブサイト。

## フォルダ構成

```
cafe-site/
├── index.html
│
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── style.scss   ← Sass ソース（編集はこちら）
│   │   ├── style.css    ← コンパイル後（HTMLが読み込む）
│   │   └── style.css.map
│   ├── js/
│   │   └── main.js
│   └── img/
│
├── parts/
│   ├── header.html
│   ├── footer.html
│   └── drawer.html
│
├── favicon/
├── Claude.md
└── README.md
```

## 開発メモ

- スタイルは `assets/css/style.scss` を編集し、Sass でコンパイルして `style.css` を生成する。
- 共通パーツ（header / footer / drawer）は `parts/` に分離し、`main.js` が `index.html` に読み込む。
- パーツの読み込みに `fetch()` を使うため、表示確認はローカルサーバー（VSCode の Live Server など）経由で行う。
- Webフォントは Google Fonts（Shippori Mincho / Parisienne）を使用。
