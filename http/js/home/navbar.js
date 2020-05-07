$().ready(()=>{
    const promise=new Promise((resolve,reject)=>{
        //下拉菜单内容
        $('.dropdown-menu').eq(0).html(`
        <a href="/index_catelog?catelog=HTML">HTML</a><a>游戏</a><a href="/index_catelog?catelog=JP">日语</a><a>菜单</a><a href="/index_catelog?catelog=Others">其它笔记</a>
        `);
        resolve();
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

})