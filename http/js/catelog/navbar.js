const navbar=(catelog)=>{
    let url='/api/blog/titleList?catelog='+catelog;
    const urlParams=getUrlParams();
    const href='/api/blog/detail?id=';
    $('.dropdown-toggle').eq(1).text(catelog);
    if(urlParams.author){
        url+='?author='+urlParams.author;
    }
    const $menu=$('.dropdown-menu');
    get(url).then(res=>{
        if(res.errno!==0){
            alert('数据错误');
            return;
        }
        const data=res.data||[];
        
        return Promise.resolve(data);
    
    }).then((data)=>{
        
        console.log(data);
        console.log(catelog);
        data.forEach(item=>{   
            $menu.eq(1).append(`<a href='/detail.html?id=${item.id}'>${item.title}</a>`); 
        })
        //下拉菜单内容
        $menu.eq(0).html(`
        <a href="/index_catelog?catelog=HTML">HTML</a><a>游戏</a><a href="/index_catelog?catelog=JP">日语</a><a>菜单</a><a href="/index_catelog?catelog=Others">其它笔记</a>
        `);
        Promise.resolve();
    }).then(()=>{
        $('.dropdown-menu a').each((index,item)=>{
            $(item).addClass('dropdown-item');
        })
    })
    //设置dropdown
    $('.dropdown').each((index,item)=>{
        $(item).on('show.bs.dropdown',()=>{
            const $menu=$(item).children('.dropdown-menu');
            setCss($menu,'display','block').then(()=>{
                setTimeout(() => {
                    $menu.css('opacity','1')
                }, 50);
            })
        })

        $(item).on('hide.bs.dropdown',()=>{
            const $menu=$(item).children('.dropdown-menu');
            setCss($menu,'opacity','0')
        })
    })
    //异步调用函数css()的函数
    const setCss=($item,prop,value)=>{
        const promise=new Promise((resolve,reject)=>{
            $item.css(prop,value);
            resolve();
        })
        return promise;
    }
    //事件监听，透明度过渡为0后，隐藏菜单
    document.addEventListener('transitionend',function(){
        var $DropdownMenu=$('.dropdown .dropdown-menu');
        $DropdownMenu.each(function(){
            var iOpa=parseFloat($(this).css('opacity'));
            if(iOpa==0){
                $(this).css('display','none');
            }
        });
    });

}