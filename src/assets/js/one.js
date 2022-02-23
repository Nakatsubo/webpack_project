//jquery をインポート（読み込んで $ として使用）
import $ from 'jquery';
//foo.js をインポート
import { content } from './modules/foo.js';
//bar.js をインポート
import { heading } from './modules/bar.js';
 
const component = () => {
  //div 要素を生成
  const element = document.createElement('div');
  // インポートした関数の実行結果を使って div 要素の HTML を作成
  element.innerHTML = `<h1>ONE: ${heading()}</h1>
<p>${content()}</p>`
 
  return element;
}
 
// jQuery を使って body 要素に component() の実行結果を設定
$('body').html(component());
// jQuery を使って body 要素の色を緑色に変更
$('body').css('color', 'green');
