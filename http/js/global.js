$().ready(()=>{
    
    //设置ol的属性
    $('ol').attr('type','I');
    $('.index>ol').attr('type','1');

    //修改logo内容
    $('.logo').html('Tomoyo');




    
    //导航栏Tomoyo链接
    $('.navbar-brand').attr('href','/index.html')
    // $('li.dropdown').text('HTML');
})