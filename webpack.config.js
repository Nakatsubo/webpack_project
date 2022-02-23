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
  entry: `./src/assets/js/index.js`,

  // ファイルの監視設定
  // watch: true,
  watchOptions: {
    ignored: ["node_modules/**"]
  },

  // プラグインの設定
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',  //ファイル名を指定
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
        type: "asset/resource"  // asset/resource を指定して画像をコピーして出力
      },
    ],
  },
  target: ["web", "es5"],

  // ファイルの出力設定
  output: {
    // 出力ファイルのディレクトリ名
    path: path.resolve(__dirname, "dist"),
    // Asset Modules の出力先を指定 -> ↑で出力ファイルのディレクトリ名を指定しているため /assets/js/　以下に出力される
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