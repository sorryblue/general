//下面内容的高度等于可视区高度减去头部的高度
const section = document.getElementById('section');
const head = document.getElementById('head');
let iH = window.innerHeight;
const headH = head.offsetHeight;
section.style.height = iH - headH + 'px';

//页面缩放的时候计算section的高度
window.onresize = function(){
    iH = window,innerHeight;
    section.style.height = iH - headH + 'px';
}