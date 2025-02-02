const remove = document.getElementById('remove');
const ok = modelTree.getElementsByClassName('ok')[0];
const off = modelTree.getElementsByClassName('cancel')[0];
const cancel = modelTree.getElementsByClassName('icon_close')[0];
let kid = 0;
remove.onclick = function(){
    let timer = null;
    if(!seleEleArr.length){
        let tanbox = document.getElementById('tanboxTi');
        tanbox.innerHTML = '请选择想移动的文件';
        tanbox.style.opacity = 1;
        tanbox.style.top = '50px';
        let onOff = true;
        if(onOff){
            onOff = false;
            timer = setTimeout(function(){
                onOff = true;
                tanbox.style.opacity = 0;
                tanbox.style.top = '-100px';
            },600);
        }
    }else{
        modelTree.style.display = 'block';
        content.appendChild(renderTree2(-1,-1));
    }
}
ok.onclick = function(){
    if(seleEleArr.length){
        seleEleArr.forEach(e=>{
            children.push(e);
            getChildren(e.id);
        });
        if(!children.some(e=>e.id == kid)){
            seleEleArr.forEach(e=>{
                let arr = getChild(e.id);
                if(arr && arr.some(el=>el.title === e.title)){
                    let a = arr.filter(f=>{
                        let re = new RegExp('^' + e.title + '(-副本)*$');
                        return re.test(f.title);
                    }).sort((a,b)=>{
                        return a.title.length - b.title.length;
                    });
                    if(a.length == 1){
                        e.title = a[0].title + '-副本';
                    }else{
                        e.title = a[a.length-1].title + '-副本';
                    }
                }
                e.pid = kid;
                e.checked = false;
            });
            render(breadNav.getElementsByTagName('span')[0].dataset.id*1);
            treeMenu.appendChild(renderTree(-1,-1));
        }else{
            let tanbox = document.getElementById('tanboxTi');
            tanbox.innerHTML = '凯文,别瞎搞!';
            tanbox.style.opacity = 1;
            tanbox.style.top = '50px';
            let onOff = true;
            if(onOff){
                onOff = false;
                timer = setTimeout(function(){
                    onOff = true;
                    tanbox.style.opacity = 0;
                    tanbox.style.top = '-100px';
                },600);
            }
        }
        children.length = 0;
        modelTree.style.display = 'none';
    }
}
off.onclick = function(){
    modelTree.style.display = 'none';
}
cancel.onclick = function(){
    modelTree.style.display = 'none';
}
function renderTree2(pid,num){
    content.innerHTML = '';
    let arr = getChild(pid);
    let ul = document.createElement('ul');
    num++;
    ul.style.paddingLeft = num*5 + 'px';
    arr && arr.forEach(e=>{
        let ary = getChild(e.id);
        let li = document.createElement('li');
        li.onclick = function(ev){
            let lis = content.getElementsByTagName('li');
            for(let i = 0;i < lis.length;i++){
                lis[i].children[0].style.background = '';
            }
            li.children[0].style.background = '#999';
            kid = e.id;
            ev.cancelBubble = true;
        }
        let div = document.createElement('div');
        div.className = `tree-title ${ary?'tree-ico':''} close`;
        let span = document.createElement('span');
        span.className = `${ary?'open':''}`;
        span.innerHTML = '<i></i>'+ e.title;
        div.appendChild(span);
        li.appendChild(div);
        if(ary){
            li.appendChild(renderTree2(e.id,num));
        }
        ul.appendChild(li);
    });
    return ul;
}