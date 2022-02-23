// import  '../css/style.css'; // import 文を使って style.css を読み込む
import  '../scss/style.scss'; // import 文を使って style.scss を読み込む

const divElem = document.createElement('div');
const p = document.createElement('p');
p.textContent = 'Hello! This is sample text.';
divElem.appendChild(p);
document.body.appendChild(divElem);