// 发送 get 请求
function get(url) {
    return $.get(url)
}

// 发送 post 请求
function post(url, data = {}) {
    return $.ajax({
        type: 'post',
        url,
        //这里需要传的data是string类型？
        data: JSON.stringify(data),
        contentType: "application/json",
    })
}

// 获取 url 参数
function getUrlParams() {
    //location.href返回当前显示的文档的完整 URL
    let paramStr = location.href.split('?')[1] || ''
    paramStr = paramStr.split('#')[0]
    const result = {}
    paramStr.split('&').forEach(itemStr => {
        const arr = itemStr.split('=')
        const key = arr[0]
        const val = arr[1]
        result[key] = val
    })
    return result
}

// 显示格式化的时间
function getFormatDate(dt) {
    return moment(dt).format('LL')
}


//格式化源码
function formatHtml(html){
    var str=html.replace(/\<\/\w+\>/g,'_');
    str=str.replace(/\<.+[^\>]\>/g,'_');
    str=str.replace(/\<\w\>/g,'_');
    str=str.replace(/\s/g,'');
    str=str.replace(/\_+/g,'_');
    return str;
}