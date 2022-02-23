# Development environment using webpack
- [最新版で学ぶwebpack 5入門 JavaScriptのモジュールバンドラ](https://ics.media/entry/12140/)
- [最新版で学ぶwebpack 5入門 Babel 7でES2021環境の構築](https://ics.media/entry/16028/#webpack-babel-esnext)
- [webpack の基本的な使い方](https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html)

## Index
1. [Create Project](https://github.com/NakatsuboYusuke/webpack_project#create-project)
1. [Watch Project](https://github.com/NakatsuboYusuke/webpack_project#watch-project)
1. [Babel](https://github.com/NakatsuboYusuke/webpack_project#babel)
1. [Babel pollyfill](https://github.com/NakatsuboYusuke/webpack_project#babel-pollyfill)
1. [Command setting](https://github.com/NakatsuboYusuke/webpack_project#command-setting)
1. [CSS Project](https://github.com/NakatsuboYusuke/webpack_project#css-project)
1. [Image Project](https://github.com/NakatsuboYusuke/webpack_project#image-project)
1. [Sass](https://github.com/NakatsuboYusuke/webpack_project#sass)
1. [Asset Modules](https://github.com/NakatsuboYusuke/webpack_project#asset-modules)
1. [Plugins]()

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

### Path setting

```javascript
const path = require("path");  // path モジュールの読み込み

// ...

  // ファイルの出力設定
  output: {
    // 出力ファイルのディレクトリ名
    path: path.resolve(__dirname, "dist/assets/js"),
```

#### webpack.config.js
~~下記のコードを記載しないとバンドルされたファイルが出力されない~~

~~tmpファイルが毎回生成されてしまうが、解決策がわからないので一旦残す~~

ファイルを出力するごとにクリーンアップする/index.htmlは除く

```javascript
//ファイルを出力する前にディレクトリをクリーンアップ
clean: {
  keep: /index.html/, // index.html をキープ（削除しない）
  } 
},
```

```javascript
const path = require("path"); // path モジュールの読み込み
// ...

  // ファイルの出力設定
  output: {
    // 出力ファイルのディレクトリ名
    path: path.resolve(__dirname, "dist/assets/js"),
    // 出力ファイル名
    filename: "main.js",
    //ファイルを出力する前にディレクトリをクリーンアップ
    clean: {
      keep: /index.html/, // index.html をキープ（削除しない）
    } 
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
```

```javascript
const path = require("path"); // path モジュールの読み込み

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
    // 出力ファイルのディレクトリ名
    path: path.resolve(__dirname, "dist/assets/js"),
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
ローダーを使用してJavascriptファイルをモジュール化しバンドルする

```bash
$ npm install -D babel-loader @babel/core @babel/preset-env
```

#### webpack.config.js

```javascript
// ...

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
```

```javascript
const path = require("path"); // path モジュールの読み込み

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
    // 出力ファイルのディレクトリ名
    path: path.resolve(__dirname, "dist/assets/js"),
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

```bash
.
├── dist
│   ├── assets
│   │   └── js
│   │       ├── main.js
│   │       └── main.js.map
│   └── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
│   └── assets
│       ├── js
│       │   ├── index.js
│       │   └── modules
│       │       ├── bar.js
│       │       └── foo.js
│       └── scss
└── webpack.config.js
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
cssをJavascript内にビルドする

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
    "style-loader": "^3.3.1",
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}
```

#### webpack.config.js

```javascript
// ...

  module: {
    rules: [
      // CSS のローダー
      { 
        //拡張子 .css や .CSS を対象
        test: /\.css$/i,  
        //　使用するローダーを指定
        use: [
          // CSS を出力するローダー
          "style-loader",
          { 
            // CSS を変換するローダー
            loader: "css-loader",
            // ソースマップを有効にする
            options: {
              sourceMap: false // true or false
            }
          }
        ]
      },
```

```javascript
const path = require("path");  // path モジュールの読み込み

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
    ignored: ["node_modules/**"]
  },


  module: {
    rules: [
      // CSS のローダー
      { 
        //拡張子 .css や .CSS を対象
        test: /\.css$/i,  
        //　使用するローダーを指定
        use: [
          // CSS を出力するローダー
          "style-loader",
          { 
            // CSS を変換するローダー
            loader: "css-loader",
            // ソースマップを有効にする
            options: {
              sourceMap: false // true or false
            }
          }
        ]
      },
      // Bable のローダー
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
    path: path.resolve(__dirname, "dist/assets/js"),
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

```bash
.
├── dist
│   ├── assets
│   │   └── js
│   │       ├── main.js
│   │       └── main.js.map
│   └── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
│   └── assets
│       ├── css
│       │   └── style.css
│       ├── img
│       │   └── sample.jpg
│       ├── js
│       │   ├── index.js
│       │   └── modules
│       │       ├── bar.js
│       │       └── foo.js
│       └── scss
└── webpack.config.js
```

#### index.js

```javascript
// ...
import  '../css/style.css'; // import 文を使って style.css を読み込む
```

#### style.css

```css
p {
  color: green;
  background-color: yellow;
}
```

## Image Project
画像をJavascriptで書き出す

### css image in Javascript

#### webpack.cofig.js

```javascript
// ...

  module: {
    rules: [
      // ...

      // 画像用のモジュール
      {
        // 対象のアセットファイルの拡張子を指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // type を指定
        type: "asset"
      },
```

```javascript
const path = require("path"); // path モジュールの読み込み

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
    ignored: ["node_modules/**"]
  },

  module: {
    rules: [
      // CSS のローダー
      { 
        //拡張子 .css や .CSS を対象
        test: /\.css$/i,  
        //　使用するローダーを指定
        use: [
          // CSS を出力するローダー
          "style-loader",
          { 
            // CSS を変換するローダー
            loader: "css-loader",
            // ソースマップを有効にする
            options: {
              sourceMap: false // true or false
            }
          }
        ]
      },
      // 画像用のモジュール
      {
        // 対象のアセットファイルの拡張子を指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // type を指定
        type: "asset"
      },
      // Bable のローダー
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
    path: path.resolve(__dirname, "dist/assets/js"),
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

#### style.css

```css
p {
  color: green;
  background-color: yellow;
}
div {
  background-image: url("../img/sample.jpg");
  background-size: cover;
  padding: 30px;
  max-width: 640px;
}
```

```bash
.
├── dist
│   ├── assets
│   │   └── js
│   │       ├── 717ad58b3ff5fb2e9889.jpg
│   │       ├── main.js
│   │       └── main.js.map
│   └── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
│   └── assets
│       ├── css
│       │   └── style.css
│       ├── img
│       │   └── sample.jpg
│       ├── js
│       │   ├── index.js
│       │   └── modules
│       │       ├── bar.js
│       │       └── foo.js
│       └── scss
└── webpack.config.js
```

### not css image in Javascript

#### webpack.cofig.js

```javascript
// ..

  module: {
    rules: [
      // CSS のローダー
      {
        // ...
            options: {
              // CSS 内の画像URL指定の解決を無効にする
              url: false, // true or false
              sourceMap: false // true or false
            }
```

```javascript
const path = require("path"); // path モジュールの読み込み

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
    ignored: ["node_modules/**"]
  },

  module: {
    rules: [
      // CSS のローダー
      { 
        //拡張子 .css や .CSS を対象
        test: /\.css$/i,  
        //　使用するローダーを指定
        use: [
          // CSS を出力するローダー
          "style-loader",
          { 
            // CSS を変換するローダー
            loader: "css-loader",
            // ソースマップを有効にする
            options: {
              // CSS 内の画像URL指定の解決を無効にする
              url: false, // true or false
              sourceMap: false // true or false
            }
          }
        ]
      },
      // 画像用のモジュール
      {
        // 対象のアセットファイルの拡張子を指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // type を指定
        type: "asset"
      },
      // Bable のローダー
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
    path: path.resolve(__dirname, "dist/assets/js"),
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

#### style.css

```css
p {
  color: green;
  background-color: yellow;
}
div {
  /* パスを変更 */
  background-image: url("./assets/img/sample.jpg");
  background-size: cover;
  padding: 30px;
  max-width: 640px;
}
```

```bash
.
├── dist
│   ├── assets
│   │   ├── img
│   │   │   └── sample.jpg
│   │   └── js
│   │       ├── main.js
│   │       └── main.js.map
│   └── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
│   └── assets
│       ├── css
│       │   └── style.css
│       ├── img
│       ├── js
│       │   ├── index.js
│       │   └── modules
│       │       ├── bar.js
│       │       └── foo.js
│       └── scss
└── webpack.config.js
```

## Sass
ローダーを使用してSassファイルをモジュール化しバンドルする

### Install sass-loader sass

```bash
$ npm install -D sass-loader sass
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
    "sass": "^1.49.8",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}
```

#### webpack.cofig.js

```javascript
// ...

  module: {
    rules: [
      // ...
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i, // 拡張子 .scss、.sass、css を対象
        // 使用するローダーを指定
        use: [
          // CSS を出力するローダー
          "style-loader",
          // CSS を JavaScript に変換するローダー
          "css-loader",
          // Sass をコンパイルするローダー
          "sass-loader",
        ],
      },
```

```javascript
const path = require("path"); // path モジュールの読み込み

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
    ignored: ["node_modules/**"]
  },

  module: {
    rules: [
      // // CSS のローダー
      // { 
      //   //拡張子 .css や .CSS を対象
      //   test: /\.css$/i,  
      //   //　使用するローダーを指定
      //   use: [
      //     // CSS を出力するローダー
      //     "style-loader",
      //     { 
      //       // CSS を変換するローダー
      //       loader: "css-loader",
      //       // ソースマップを有効にする
      //       options: {
      //         // CSS 内の画像URL指定の解決を無効にする
      //         url: false, // true or false
      //         sourceMap: false // true or false
      //       }
      //     }
      //   ]
      // },
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i, // 拡張子 .scss、.sass、css を対象
        // 使用するローダーを指定
        use: [
          // CSS を出力するローダー
          "style-loader",
          // CSS を JavaScript に変換するローダー
          "css-loader",
          // Sass をコンパイルするローダー
          "sass-loader",
        ],
      },
      // 画像用のモジュール
      {
        // 対象のアセットファイルの拡張子を指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // type を指定
        type: 'asset'
      },
      // Bable のローダー
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
    path: path.resolve(__dirname, "dist/assets/js"),
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

### Extending setting
Sassのソースマップを有効、アウトプットスタイルを圧縮

#### webpack.cofig.js

```javascript
// ...

  module: {
    rules: [
      {
        //CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  //拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          "style-loader", // CSS を出力するローダー
          {    
            loader: "css-loader", // CSS を JavaScript に変換するローダー
            options: {
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader", // Sass をコンパイルするローダー
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // アウトプットスタイルの指定
              sassOptions: {  
                outputStyle: "compressed",
              },
            }
          }
        ],
      },

```

```javascript
const path = require("path"); // path モジュールの読み込み

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
    ignored: ["node_modules/**"]
  },

  module: {
    rules: [
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  //拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          "style-loader", // CSS を出力するローダー
          {    
            loader: "css-loader", // CSS を JavaScript に変換するローダー
            options: {
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader", // Sass をコンパイルするローダー
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // アウトプットスタイルの指定
              sassOptions: {  
                outputStyle: "compressed",
              },
            }
          }
        ],
      },
      // 画像用のモジュール
      {
        // 対象のアセットファイルの拡張子を指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // type を指定
        type: "asset"
      },
      // Bable のローダー
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
    path: path.resolve(__dirname, "dist/assets/js"),
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

#### style.scss

```scss
/* Sass 変数で色と背景色を定義 */ 
$color: blue;
$bg_color: pink;
 
p {
  color: $color;
  background-color: $bg_color;
}
```

```bash
.
├── dist
│   ├── assets
│   │   ├── img
│   │   │   └── sample.jpg
│   │   └── js
│   │       ├── main.js
│   │       └── main.js.map
│   └── index.html
├── node_modules
├── package-lock.json
├── package.json
├── src
│   └── assets
│       ├── css
│       │   └── style.css
│       ├── img
│       ├── js
│       │   ├── index.js
│       │   └── modules
│       │       ├── bar.js
│       │       └── foo.js
│       └── scss
│           └── style.scss
└── webpack.config.js
```

### Install postcss-loader postcss postcss-preset-env
PostCSSを使用しコンパイルする

>PostCSS Preset Env は CSS の新しい仕様を後方互換性を持って変換したり、CSS プロパティに自動でベンダープレフィックスを付与することができるプラグインです。

```bash
$ npm install -D postcss-loader postcss postcss-preset-env
```

#### webpack.config.js

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
    "postcss": "^8.4.6",
    "postcss-loader": "^6.2.1",
    "postcss-preset-env": "^7.4.1",
    "sass": "^1.49.8",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}
```

#### webpack.config.js

```javascript
// ...

  module: {
    rules: [
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  //拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          "style-loader", // CSS を出力するローダー
          {    
            loader: "css-loader", // CSS を JavaScript に変換するローダー
            options: {
               // postcss-loader と sass-loader の場合は2を指定
               importLoaders: 2, 
               // 0 => no loaders (default);
               // 1 => postcss-loader;
               // 2 => postcss-loader, sass-loader
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
          // PostCSS の設定
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 必要に応じてオプションを指定
                      // stage: 0,
                      // browsers: 'last 2 versions',
                      // autoprefixer のオプション
                      // autoprefixer: { grid: true }
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader", // Sass をコンパイルするローダー
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // アウトプットスタイルの指定
              sassOptions: {  
                outputStyle: "compressed",
              },
            }
          }
        ],
      },
```

```javascript
const path = require("path");  // path モジュールの読み込み

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
    ignored: ["node_modules/**"]
  },

  module: {
    rules: [
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  //拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          "style-loader", // CSS を出力するローダー
          {    
            loader: "css-loader", // CSS を JavaScript に変換するローダー
            options: {
               // postcss-loader と sass-loader の場合は2を指定
               importLoaders: 2, 
               // 0 => no loaders (default);
               // 1 => postcss-loader;
               // 2 => postcss-loader, sass-loader
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
          // PostCSS の設定
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 必要に応じてオプションを指定
                      // stage: 0,
                      // browsers: 'last 2 versions',
                      // autoprefixer のオプション
                      // autoprefixer: { grid: true }
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader", // Sass をコンパイルするローダー
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // アウトプットスタイルの指定
              sassOptions: {  
                outputStyle: "compressed",
              },
            }
          }
        ],
      },
      // 画像用のモジュール
      {
        // 対象のアセットファイルの拡張子を指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // type を指定
        type: "asset"
      },
      // Bable のローダー
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
    path: path.resolve(__dirname, "dist/assets/js"),
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

## Asset Modules
画像などのアセットファイルをコピーしてビルドディレクトリに出力する

#### webpack.config.js

```javascript
// ...

  module: {
    rules: [
      // ...

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 対象とするアセットファイルの拡張子
        type: "asset/resource"  // asset/resource を指定して画像をコピーして出力
      },
      // ...

      output: {
        // 出力ファイルのディレクトリ名
        path: path.resolve(__dirname, "dist"), // -> パスの設定を変更
        // Asset Modules の出力先を指定
        assetModuleFilename: 'assets/img/[name][ext][query]',
        // 出力ファイル名
        filename: "assets/js/main.js",
        // clean: true //ファイルを出力する前にディレクトリをクリーンアップ
```

```javascript
const path = require("path");  //path モジュールの読み込み

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
    ignored: ["node_modules/**"]
  },

  module: {
    rules: [
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  // 拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          "style-loader", // CSS を出力するローダー
          {    
            loader: "css-loader", // CSS を JavaScript に変換するローダー
            options: {
               // postcss-loader と sass-loader の場合は2を指定
               importLoaders: 2, 
               // 0 => no loaders (default);
               // 1 => postcss-loader;
               // 2 => postcss-loader, sass-loader
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
          // PostCSS の設定
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 必要に応じてオプションを指定
                      // stage: 0,
                      // browsers: 'last 2 versions',
                      // autoprefixer のオプション
                      // autoprefixer: { grid: true }
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader", // Sass をコンパイルするローダー
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // アウトプットスタイルの指定
              sassOptions: {  
                outputStyle: "compressed",
              },
            }
          }
        ],
      },
      // Bable のローダー
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
      // 画像用のモジュール
      // {
      //   // 対象のアセットファイルの拡張子を指定
      //   test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      //   // type を指定
      //   type: "asset"
      // },
      // Asset Modules の設定
      // 画像
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 対象とするアセットファイルの拡張子
        type: 'asset/resource'  // asset/resource を指定して画像をコピーして出力
      },
      // フォント
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, //対象とするフォントファイルの拡張子
        type: 'asset/resource', // フォントをコピーして出力 
        generator: {
          //出力先を指定（fonts フォルダにファイル名と拡張子で出力）
          filename: 'fonts/[name][ext][query]'
        }
      },
    ],
  },
  target: ["web", "es5"],

  // ファイルの出力設定
  output: {
    // 出力ファイルのディレクトリ名
    path: path.resolve(__dirname, "dist"), // -> パスの設定を変更
    // Asset Modules の出力先を指定
    assetModuleFilename: 'assets/img/[name][ext][query]',
    // 出力ファイル名
    filename: "assets/js/main.js",
    // clean: true //ファイルを出力する前にディレクトリをクリーンアップ
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

## Plugins

### Install MiniCssExtractPlugin
CSSを抽出して別ファイルとして出力する

```bash
$ npm install -D mini-css-extract-plugin
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
    "postcss": "^8.4.6",
    "postcss-loader": "^6.2.1",
    "postcss-preset-env": "^7.4.1",
    "sass": "^1.49.8",
    "sass-loader": "^12.6.0",
    "style-loader": "^3.3.1",
    "webpack": "^5.68.0",
    "webpack-cli": "^4.9.2",
    "webpack-dev-server": "^4.7.4"
  }
}
```

#### webpack.config.js

```javascript
// ...

// require() を使って MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// ...
// メインとなるJavaScriptファイル（エントリーポイント）に CSSファイルも追加
  entry: [
    './src/assets/css/style.css',
    './src/assets/js/index.js',
  ],

// ...
// プラグインの設定
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css',  // 出力先とファイル名を指定
    }),
  ],

// ...
  module: {
    rules: [
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  // 拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          // "style-loader", // CSS を出力するローダー　-> 削除
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          MiniCssExtractPlugin.loader,
          {    
            loader: "css-loader", // CSS を JavaScript に変換するローダー
            options: {
               // postcss-loader と sass-loader の場合は2を指定
               importLoaders: 2, 
               // 0 => no loaders (default);
               // 1 => postcss-loader;
               // 2 => postcss-loader, sass-loader
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
```

```javascript
// path モジュールの読み込み
const path = require("path");
// require() を使って MiniCssExtractPlugin の読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  devtool: "source-map",
  mode: "development",
  // mode: "production",

  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: [
    './src/assets/css/style.css',
    './src/assets/js/index.js',
  ],

  // ファイルの監視設定
  // watch: true,
  watchOptions: {
    ignored: ["node_modules/**"]
  },

  // プラグインの設定
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css',  // 出力先とファイル名を指定
    }),
  ],

  module: {
    rules: [
      {
        // CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  // 拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          // "style-loader", // CSS を出力するローダー　-> 削除
          // CSSファイルを抽出するように MiniCssExtractPlugin のローダーを指定
          MiniCssExtractPlugin.loader,
          {    
            loader: "css-loader", // CSS を JavaScript に変換するローダー
            options: {
               // postcss-loader と sass-loader の場合は2を指定
               importLoaders: 2, 
               // 0 => no loaders (default);
               // 1 => postcss-loader;
               // 2 => postcss-loader, sass-loader
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
          // PostCSS の設定
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 必要に応じてオプションを指定
                      // stage: 0,
                      // browsers: "last 2 versions",
                      // autoprefixer のオプション
                      // autoprefixer: { grid: true }
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader", // Sass をコンパイルするローダー
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // アウトプットスタイルの指定
              sassOptions: {  
                outputStyle: "compressed",
              },
            }
          }
        ],
      },
      // Bable のローダー
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
      // 画像用のモジュール
      {
        // 対象のアセットファイルの拡張子を指定
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // type を指定
        type: "asset"
      },
      // Asset Modules の設定
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 対象とするアセットファイルの拡張子
        type: 'asset/resource'  // asset/resource を指定して画像をコピーして出力
      },
      // フォント
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, //対象とするフォントファイルの拡張子
        type: 'asset/resource', // フォントをコピーして出力 
        generator: {
          //出力先を指定（fonts フォルダにファイル名と拡張子で出力）
          filename: 'fonts/[name][ext][query]'
        }
      },
    ],
  },
  target: ["web", "es5"],

  // ファイルの出力設定
  output: {
    // 出力ファイルのディレクトリ名
    path: path.resolve(__dirname, "dist"),
    // Asset Modules の出力先を指定
    assetModuleFilename: "assets/img/[name][ext][query]",
    
    // 出力ファイル名
    filename: "assets/js/main.js",
    //ファイルを出力する前にディレクトリをクリーンアップ
    clean: {
      keep: /index.html/, // index.html をキープ（削除しない）
    } 
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

### Install MiniCssExtractPlugin