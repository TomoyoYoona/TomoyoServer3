$().ready(function(){

    //滑动文件夹的翻页特效
    //每添加一个，需要
    var x=50,y=50;
    $('figure canvas').each(function () {
        var _ctx=this.getContext('2d');
        _ctx.translate(25.5,25.5);
    })
    //var ctx=cav1.getContext('2d'); 
    var sRbg=['rgb(177, 177, 177)','rgb(255, 229, 158)','rgb(14, 163, 126)','rgb(240, 130, 130)'];

    function drawTriangle(ctx,x,y){
        ctx.shadowBlur=10;
        ctx.shadowOffsetX=x>25?2:-2;
        ctx.shadowOffsetY=x>25?2:-2;
        ctx.beginPath();
        ctx.moveTo(50,0);
        ctx.lineTo(x,y);
        ctx.lineTo(0,50);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    function drawTriangleBackground(ctx){
        ctx.fillStyle='rgb(44, 63, 82)';
        ctx.shadowBlur=0;  
        ctx.shadowOffsetX=0;
        ctx.shadowOffsetY=0;
        ctx.beginPath();
        ctx.moveTo(50,2);
        ctx.lineTo(50,50);
        ctx.lineTo(2,50);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
    }
    function figHover(){
        var $thisCanvas1=$(this).children('canvas');
        var $this=$(this);
        var ctx=$thisCanvas1[0].getContext('2d');
        ctx.globalAlpha=1;
        ctx.lineWidth=0.1;
        ctx.shadowColor='grey';
        $thisCanvas1.css('visibility','visible');
        // $('#cav1').css('visibility','visible');
        x=50,y=50;
        var interHandle1=setInterval(function () {
            if(y<=0){
                clearInterval(interHandle1);
                return;
            }
            // y<25&&(ctx.fillStyle='rgb(255,255,255)');
            y-=2;
            x-=2;
            ctx.clearRect(-25.5,-25.5,75,75);
            drawTriangleBackground(ctx);
            var i=parseInt($this.attr('id').match(/\d+/));
            ctx.fillStyle=sRbg[i-1];
            drawTriangle(ctx,x,y);
        },8);
    }
    function figOut(){
        var $thisCanvas2=$(this).children('canvas');
        var $this=$(this);
        var ctx=$thisCanvas2[0].getContext('2d');
        ctx.globalAlpha=1;
        ctx.lineWidth=0.1;
        ctx.shadowColor='grey';
        x=0;
        y=0;
        ctx.fillStyle='rgb(255,255,255)';
        var interHandle2=setInterval(function () {
            if(y>=50){
                clearInterval(interHandle2);
                // $('#cav1').css('visibility','hidden');
                $thisCanvas2.css('visibility','hidden');
                return;
            }
            // y>25&&(ctx.fillStyle='rgb(177, 177, 177)');
            y+=2;
            x+=2;
            
            ctx.clearRect(-25.5,-25.5,75,75);
            drawTriangleBackground(ctx);
            var i=parseInt($this.attr('id').match(/\d+/));
            ctx.fillStyle=sRbg[i-1];
            drawTriangle(ctx,x,y);
        },8);
    }
    $('#fig1').hover(figHover,figOut);
    $('#fig2').hover(figHover,figOut);
    $('#fig3').hover(figHover,figOut);
    $('#fig4').hover(figHover,figOut);
    

});