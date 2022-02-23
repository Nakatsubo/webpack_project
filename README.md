# Development environment using webpack
- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)
- [最新版で学ぶwebpack 5入門 Babel 7でES2021環境の構築](https://ics.media/entry/16028/#webpack-babel-esnext)
- [webpack の基本的な使い方](https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html)

## Create Project

```bash
$ npm init -y
$ npm i -D webpack webpack-cli
```

### Watch Install Packages

```bash
// 第一階層まで表示
$ npm ls -depth=0

// 第二階層まで表示
$ npm ls -depth=1
```

#### package.json

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
  "private": true // プロジェクトを誤って公開しないようにする
}
```

#### webpack.config.js

```javascript
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/assets/js/index.js`,

  // ファイルの監視設定
  // watch: true,  // watch オプションを有効にする -> ここで指定しなくてもよい
  watchOptions: {
    ignored: ['node_modules/**']  // 'files/**/*.js' -> 配列とワイルドカードで指定
  },

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

#### package.json

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

#### webpack.config.js
~~下記のコードを記載しないとバンドルされたファイルが出力されない~~
~~tmpファイルが毎回生成されてしまうが、解決策がわからないので一旦残す~~
ファイルを出力するごとにクリーンアップする

```javascript
devMiddleware: {
  writeToDisk: true, //バンドルされたファイルを出力する（実際に書き出す）
},
```

```javascript
// const path = require('path');  //path モジュールの読み込み

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/assets/js/index.js`,

  // ファイルの監視設定
  // watch: true,  // watch オプションを有効にする -> ここで指定しなくてもよい
  watchOptions: {
    ignored: ['node_modules/**']  // 'files/**/*.js' -> 配列とワイルドカードで指定
  },

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

#### package.json

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
ローダーを使用してファイルをモジュール化しバンドルする

```bash
$ npm install -D babel-loader @babel/core @babel/preset-env
```

#### webpack.config.js

```javascript
// const path = require('path');  //path モジュールの読み込み

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  devtool: "source-map",

  // production モード で圧縮しない場合
  // optimization: {
  //   minimize: false
  // },

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/assets/js/index.js`,

  // ファイルの監視設定
  // watch: true,  // watch オプションを有効にする -> ここで指定しなくてもよい
  watchOptions: {
    ignored: ['node_modules/**']  // 'files/**/*.js' -> 配列とワイルドカードで指定
  },

  // モジュールの設定
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        // 処理対象から外すディレクトリ
        exclude: /node_modules/,
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
~~@babel/polyfill をインポートする~~
この設定は不要かも...

```javascript
import "@babel/polyfill";
```

## Command setting

#### package.json

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

## Enviroment Valiables

```bash
// webpack を実行時に NODE_ENV に development を渡す場合
$ NODE_ENV=development npx webpack
 
// webpack を実行時に NODE_ENV に production を渡す場合
$ NODE_ENV=production npx webpack
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

### CSS in Javascript

### Install style-loader css-loader 

```bash
$ npm i -D style-loader css-loader
```

#### package.json

```javascript
{
  "version": "1.0.0",
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack --mode development",
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
    "mini-css-extract-plugin": "^2.5.3",
    "style-loader": "^3.3.1",
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}
```

#### webpack.config.js

```javascript
const path = require('path');  //path モジュールの読み込み

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  devtool: "source-map",
  mode: "development",
  // mode: "production",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/assets/js/index.js`,

  // ファイルの監視設定
  // watch: true,
  watchOptions: {
    ignored: ['node_modules/**']
  },


  module: {
    rules: [
      // CSS 用のローダー
      { 
        //拡張子 .css や .CSS を対象
        test: /\.css$/i,  
        //使用するローダーを指定
        use: ['style-loader', 'css-loader']
      },
      // Bable 用のローダー
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        // ローダーの処理対象から外すディレクトリ
        exclude: /node_modules/,
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
  target: ["web", "es5"],

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: path.resolve(__dirname, 'dist/assets/js'),
    // 出力ファイル名
    filename: "main.js",
    clean: true //ファイルを出力する前にディレクトリをクリーンアップ
  },

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    static: "dist",
    open: true,
    devMiddleware: {
      writeToDisk: true, //バンドルされたファイルを出力する（実際に書き出す）
    },
  },
  
};
```

#### index.js

```javascript
// ...
import  '../css/style.css';  // import 文を使って style.css を読み込む
```
