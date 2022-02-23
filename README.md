# Development environment using webpack
- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)
- [最新版で学ぶwebpack 5入門 Babel 7でES2021環境の構築](https://ics.media/entry/16028/#webpack-babel-esnext)
- [webpack の基本的な使い方](https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html)

## Create Project

```bash
$ npm init -y
$ npm i -D webpack webpack-cli
```

### package.json

```javascript
{
  "version": "1.0.0",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
  },
  "private": true
}
```

### webpack.config.js

```javascript
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/assets/js/index.js`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/assets/js/`,
    // 出力ファイル名
    filename: "main.js"
  }
};
```

### For development

```bash
$ npm run build
```

### For production

```bash
$ npx webpack
```

## Watch Project

```bash
$ npm i -D webpack-dev-server
```

### package.json

```javascript
{
  "version": "1.0.0",
  "scripts": {
    "build": "webpack",
    "start": "webpack serve"
  },
  "devDependencies": {
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  },
  "private": true
}
```

### webpack.config.js
~~下記のコードを記載しないとバンドルされたファイルが出力されない~~
~~tmpファイルが毎回生成されてしまうが、解決策がわからないので一旦残す~~
ファイルを出力するごとにクリーンアップする

```javascript
devMiddleware: {
  writeToDisk: true, //バンドルされたファイルを出力する（実際に書き出す）
},
```

```javascript
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/assets/js/index.js`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/assets/js/`,
    // 出力ファイル名
    filename: "main.js",
    clean: true //ファイルを出力する前にディレクトリをクリーンアップ
  },

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    static: "dist",
    open: true,
    // devMiddleware: {
    //   writeToDisk: true, //バンドルされたファイルを出力する（実際に書き出す）
    // },
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],
};
```

### For development

```bash
$ npx webpack serve
// or
// $ npm run start
```

## Watch for differences Project

### package.json

```javascript
{
  "version": "1.0.0",
  "scripts": {
    "build": "webpack",
    "start": "webpack serve",
    "watch": "webpack --watch"
  },
  "devDependencies": {
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  },
  "private": true
}
```

```bash
$ npx webpack --watch
```

## Babel

```bash
$ npm install -D babel-loader @babel/core @babel/preset-env
```

### webpack.config.js

```javascript
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  devtool: "source-map",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/assets/js/index.js`,

  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2021 を ES5 に変換
                "@babel/preset-env",
              ],
            },
          },
        ],
      },
    ],
  },
  // ES5(IE11等)向けの指定
  target: ["web", "es5"],

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist/assets/js/`,
    // 出力ファイル名
    filename: "main.js"
  },

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    static: "dist",
    open: true,
    // devMiddleware: {
    //   writeToDisk: true, //バンドルされたファイルを出力する（実際に書き出す）
    // },
  },
  
};
```

## Babel pollyfill

```bash
$ npm install @babel/polyfill
```

### index.js
@babel/polyfill をインポートする

```javascript
import "@babel/polyfill";
```

## Command setting

### package.json

```javascript
{
  "version": "1.0.0",
  "scripts": {
    "build": "NODE_ENV=production webpack --mode production",
    "dev": "NODE_ENV=development webpack --mode development",
    "start:dev": "npx webpack serve --mode development",
    "watch": "webpack --watch"
  },
  "private": true,
  "devDependencies": {
    "@babel/core": "^7.17.2",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.16.11",
    "babel-loader": "^8.2.3",
    "css-loader": "^6.6.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}
```

### Build command

```bash
// for hotReload
$ npm run start:dev

// for development
$ npm run dev

// for production
$ npm run build
```

## CSS Project
CSSをmain.jsに一元化する過程でペンディング。
https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html

```bash
$ npm i -D style-loader css-loader
```
