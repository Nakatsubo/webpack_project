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
    ignored: ["node_modules/**"]
  },

  module: {
    rules: [
      {
        //CSS & SASS 用のローダー
        test: /\.(scss|sass|css)$/i,  //拡張子 .scss、.sass、css を対象
        //使用するローダーを指定
        use: [
          'style-loader', // CSS を出力するローダー
          {    
            loader: 'css-loader', // CSS を JavaScript に変換するローダー
            options: {
              // ソースマップを有効に      
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader', // Sass をコンパイルするローダー
            options: {
              // ソースマップを有効に
              sourceMap: true,
              // アウトプットスタイルの指定
              sassOptions: {  
                outputStyle: 'compressed',
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