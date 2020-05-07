$().ready(function(){
    // 获取 dom 元素
    const $title = $('#header')
    const $infoContainer = $('#info-container')
    const $content = $('#content')
    const $commentName=$('#comment-name');
    const $commentContent=$('#comment-content');
    const $btnComment=$('#btn-update-comment');
    // 获取数据
    const urlParams = getUrlParams()
    const url = '/api/blog/detail?id=' + urlParams.id
    const newCommentUrl='/api/guest/newComment';
    get(url).then(res => {
        if (res.errno !== 0) {
            alert('数据错误')
            return
        }
        if(!res.data){
            location.href='/404';
            
            return;
        }
        // 显示数据
        const data = res.data || {}
        $title.text(data.title);
        $('title').text(data.title);
        // $content.html($content.html()+data.content)
        $content.append($(data.content));
        $infoContainer.append($(`
            <span>创建时间：${getFormatDate(data.createtime)}</span>
        `))
        return Promise.resolve(data.catelog);
        
    }).then((catelog)=>{
        navbar(catelog);
        popovers();
        dynamicTitle();
        Promise.resolve();
    }).then(()=>{
        //为内容div中的所有div添加类名：text1|text2
        var $contentDiv=$('#content');
        var $textDivEven=$contentDiv.children(':even');
        var $textDivOdd=$contentDiv.children(':odd');
        $textDivEven.addClass('text1');
        $textDivOdd.addClass('text2');

        
        //为所有代码段<pre>标签加上字体图标
        var $pre=$('pre');
        $pre.each(function(){
            // $(this).html('<i class="fas fa-code"></i>\n'+$(this).html());
            // $(this).before('<i class="fas fa-code"></i>：')
        //     $(this).before(`<svg style="font-size:1.5em" class="bi bi-code-slash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        //     <path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 010 .708L1.707 8l3.147 3.146a.5.5 0 01-.708.708l-3.5-3.5a.5.5 0 010-.708l3.5-3.5a.5.5 0 01.708 0zm6.292 0a.5.5 0 000 .708L14.293 8l-3.147 3.146a.5.5 0 00.708.708l3.5-3.5a.5.5 0 000-.708l-3.5-3.5a.5.5 0 00-.708 0zm-.999-3.124a.5.5 0 01.33.625l-4 13a.5.5 0 01-.955-.294l4-13a.5.5 0 01.625-.33z" clip-rule="evenodd"/>
        //   </svg>`);
        })
        Promise.resolve();
        
    }).then(()=>{
        //自动填充目录：
        var $h2=$('.content h2');
        var $indexContent=$('#wrapper .item');
        $h2.each(function(i){
            $(this).attr('id','conttent'+i)
            $indexContent.append('<span><a href=#'+$(this).attr('id')+'>'+$(this).text()+'</a></span>');
        });

        //自动给每个h2标题添加动态下划线
        //由于h2元素与div不一样，本身的长度一定要占一整行，而div虽然也是block元素，但长度是随内容可变的。所以我们在每个h2元素外部包裹一个div
        //因为不只是文章页的h2标签，目录页的h2标签也要加下划线，所以这里再定义个变量_$h2
        var _$h2=$('h2');
        _$h2.each(function(){
            $(this).addClass('titleH2');
            $(this).wrap('<div></div>');
            $(this).prepend('<span class="titleLine"></span>');
        })
        //我们在js中根据h2的行高设置下划线的top值，而不用css，因为h2的行高/高度不一定确定，这样可以避免我们以后更改h2的height时下划线错位。
        $('.titleLine').each(function(){
            $(this).css('top',_$h2.css('line-height'));
        })
        $('.titleH2').each(function (i,e) {
            var $this=$(this);
            $this.mouseover(function(){
                $this.children('.titleLine').css('width',$this.css('width'));
            });
            $this.mouseout(function () {
                $this.children('.titleLine').css('width','0px');
            })
        })



        //动态调整目录高度
        +function () {
            var oIndex=document.getElementById('wrapper');
            if(!oIndex)return;
            var a=36*$('#wrapper .item span').length+300;
            a=a>450?a:450;
            oIndex.style.height=a+'px';
        }();
    })






    $btnComment.click(()=>{
        const ip='127.0.0.1';
        const fakename=$commentName.val();
        const content=$commentContent.val();
        const blogId=urlParams.id;
        const data={
            fakeName:fakename,
            ip:ip,
            content:content,
            blogId:blogId
        }
        post(newCommentUrl,data).then(res=>{
            if(res.errno!=0){
                alert('操作错误');
                return;
            }
            else{
                alert('提交成功')
            }
        })

    })

});