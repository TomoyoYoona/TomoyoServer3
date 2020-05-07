
const dynamicTitle=()=>{

    //动态标题,主页的标题需要加上id=indexTitle
    var tit1='Tomoyo的主页(゜-゜)つロ                ';
    var tit2='----Tomoyo的笔记ヾ(*´▽‘*)ﾉ                ';
    var tit3='您已离开ﾍ(;´Д｀ﾍ)';
    var motoTit=$('title').text();
    var i=0,str1='',str2=motoTit;
    function funInterval(){
        str1+=tit1[i];
        str2+=tit2[i];
        i++;
        if($('#indexTitle').length>0){
            $('title').text(str1);
            i==tit1.length && (i = 0,str1='');
        }
        else{
            $('title').text(str2);
            i==tit2.length&&(i=0,str2=motoTit);
        }
    }
    var interval1=setInterval(funInterval,200);    
    function changeTitle(){
        if(document.hidden){
            $('title').text(tit3);
            clearInterval(interval1);
        }
        else{
            interval1=setInterval(funInterval,200);    
        }
    }
    document.addEventListener('visibilitychange',changeTitle);
}