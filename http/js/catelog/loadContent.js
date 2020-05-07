$().ready(()=>{
    //获取dom
    const $summaryContent=$('.summaryContent');
    // 拼接接口 url
    let url = '/api/blog/titleList'
    const urlParams = getUrlParams()
    if (urlParams.author) {
        url += '?author=' + urlParams.author
    }
    var catelog=urlParams.catelog;
    switch(urlParams.catelog){
        case 'JP':{
            catelog='日语';
            break;
        }
        case 'HTML':{
            catelog='HTML';
            break;
        }
        case 'Others':{
            catelog='其它笔记';
            break;
        }
        default:{
            catelog='HTML';
            break;
        }
    }
    $('title').text(catelog);
    $('.header').text(catelog);
    console.log(catelog);
    url+='?catelog='+catelog;
    // 加载数据
    get(url).then(res=>{
        if(res.errno!==0){
            alert('数据错误');
            return;
        }
        // 遍历博客列表，并显示
        const data = res.data || [];
        // console.log(data);
        data.forEach(item=>{
                // const content=formatHtml(item.content);
                console.log(item);
                $summaryContent.append(`
                    <div class="summaryText">
                        <h2><a href="/detail?id=${item.id}">${item.title}</a></h2>
                        <div class="summary"><span class="date">创建时间：${getFormatDate(item.createtime)}</span></div>
                    </div>
                `)
            
        })
        return Promise.resolve(catelog);
    }).then(navbar(catelog)).then(dynamicTitle);
})