const popovers=()=>{
    //pop为日语文章中使用的，文本框标题自动设置为内容
    $('.pop').each((index,item)=>{
        $(item).attr('data-trigger','click hover');
        $(item).attr('data-placement','top');
        $(item).attr('data-toggle','popover');
        // $(item).attr('data-delay','{ "show": 0, "hide": 1000 }')
        $(item).css('cursor','pointer')
        // $(item).addClass('text-info');
        $(item).attr('title',$(item).text());
        $(item).popover();
    })  
    //pop2不设置文本框标题  
    $('.pop2').each((index,item)=>{
        $(item).attr('data-trigger','click hover');
        $(item).attr('data-placement','top');
        $(item).attr('data-toggle','popover');
        $(item).css('cursor','pointer')
        $(item).popover();
    })
    
    //启用popover
    $('[data-toggle="popover"]').popover('enable');
}