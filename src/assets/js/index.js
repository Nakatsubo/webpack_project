// import  '../css/style.css'; // import 文を使って style.css を読み込む
import  '../scss/style.scss'; // import 文を使って style.scss を読み込む

import mainImage from '../img/sample.jpg';
 
function component() {
  const divElem = document.createElement('div');
  const img = document.createElement('img');
  img.src = mainImage;  //インポートした画像を img 要素の src 属性に指定
  divElem.appendChild(img);  //div 要素に img 要素を追加
  return divElem;
}
document.body.appendChild(component());