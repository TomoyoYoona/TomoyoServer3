$().ready(()=>{
    

    //下拉菜单内容
    $('.dropdown-menu').eq(0).html('<li><a href="../htmlPages/indexPage.html">HTML</a></li><li><a>游戏</a></li><li><a href="../jpPages/indexPage.html">日语</a></li><li><a>菜单</a></li><li><a>其它笔记</a></li>');

    //导航栏Tomoyo链接
    $('.navbar-brand').attr('href','../index.html')
    // $('li.dropdown').text('HTML');
})