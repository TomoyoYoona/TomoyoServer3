const plot=(canvas,data)=>{
    var ctx=canvas.getContext('2d');
    //设置环境参数
    ctx.lineWidth="5";
    ctx.strokeStyle='green';
    ctx.translate(0.5, 0.5);
    //读取数据
    const x=data.x;
    const y=data.y;
    if(x.length==0||y.length==0||x.length!=y.length){
        return alert('数据xy坐标长度不匹配');
    }
    //设置画布的宽高
    const width=600;
    const height=500;
    canvas.height=`${height}`;
    canvas.width=`${width}`;
    //求最大值的函数：
    const max=(data)=>{
        var maxnum=data[0];
        for(let i=1;i<data.length;i++){
            (data[i]>maxnum)?(maxnum=data[i]):1;
        }
        return maxnum;
    }
    //计算绘图比例，因为我们的画布高只有500，我们设计图线区域为400px，所以纵向上每1个单位数据占据400/maxnum个像素
    const maxnum=max(y);
    const scaleY=(height-100)/maxnum;
    //而宽有600，我们设计图线区域为500px，所以绘图比例为500/x.length
    const scaleX=(width-100)/x.length;
    //绘制箭头的函数：(方向只有上和右，分别用真假表示)
    const drawArrow=(ctx,begin,length,direct)=>{
        ctx.beginPath();
        if(direct){
            ctx.moveTo(begin.x,begin.y);
            ctx.lineTo(begin.x-length,begin.y+length);
            ctx.stroke();
            ctx.moveTo(begin.x,begin.y);
            ctx.lineTo(begin.x+length,begin.y+length);
            ctx.stroke();
        }
        else{
            ctx.moveTo(begin.x,begin.y);
            ctx.lineTo(begin.x-length,begin.y+length);
            ctx.stroke();
            ctx.moveTo(begin.x,begin.y);
            ctx.lineTo(begin.x-length,begin.y-length);
            ctx.stroke();
        }
    }
    //绘制坐标轴
        //绘制x轴
    ctx.beginPath();
    ctx.moveTo(50,height-50);
    ctx.lineTo(width-50,height-50);
    ctx.stroke();
    drawArrow(ctx,{x:width-50,y:height-50},10,false);
        //绘制y轴
    ctx.beginPath();
    ctx.moveTo(50,height-50);
    ctx.lineTo(50,50);
    ctx.stroke();
    drawArrow(ctx,{x:50,y:50},10,true);


}   

$().ready(()=>{
    // const canvas=document.createElement('canvas');
    // document.getElementById('canvasDiv').appendChild(canvas);
    // const data={
    //     x:[
    //         1,2,3,4,5,6
    //     ],
    //     y:[
    //         2,3,4,1,4,5
    //     ]
    // }
    // plot(canvas,data);
    
    //需要在html中加上这一段：
    //<div id="chartContainer" style="height: 370px; max-width: 920px; margin: 0px auto;"></div>
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Site Traffic"
        },
        axisX:{
            valueFormatString: "DD MMM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Number of Visits",
            crosshair: {
                enabled: true
            }
        },
        toolTip:{
            shared:true
        },  
        legend:{
            cursor:"pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        data: [{
            type: "line",
            showInLegend: true,
            name: "Total Visit",
            markerType: "square",
            xValueFormatString: "DD MMM, YYYY",
            color: "#F08080",
            dataPoints: [
                { x: new Date(2017, 0, 3), y: 650 },
                { x: new Date(2017, 0, 4), y: 700 },
                { x: new Date(2017, 0, 5), y: 710 },
                { x: new Date(2017, 0, 6), y: 658 },
                { x: new Date(2017, 0, 7), y: 734 },
                { x: new Date(2017, 0, 8), y: 963 },
                { x: new Date(2017, 0, 9), y: 847 },
                { x: new Date(2017, 0, 10), y: 853 },
                { x: new Date(2017, 0, 11), y: 869 },
                { x: new Date(2017, 0, 12), y: 943 },
                { x: new Date(2017, 0, 13), y: 970 },
                { x: new Date(2017, 0, 14), y: 869 },
                { x: new Date(2017, 0, 15), y: 890 },
                { x: new Date(2017, 0, 16), y: 930 }
            ]
        },
        {
            type: "line",
            showInLegend: true,
            name: "Unique Visit",
            lineDashType: "dash",
            dataPoints: [
                { x: new Date(2017, 0, 3), y: 510 },
                { x: new Date(2017, 0, 4), y: 560 },
                { x: new Date(2017, 0, 5), y: 540 },
                { x: new Date(2017, 0, 6), y: 558 },
                { x: new Date(2017, 0, 7), y: 544 },
                { x: new Date(2017, 0, 8), y: 693 },
                { x: new Date(2017, 0, 9), y: 657 },
                { x: new Date(2017, 0, 10), y: 663 },
                { x: new Date(2017, 0, 11), y: 639 },
                { x: new Date(2017, 0, 12), y: 673 },
                { x: new Date(2017, 0, 13), y: 660 },
                { x: new Date(2017, 0, 14), y: 562 },
                { x: new Date(2017, 0, 15), y: 643 },
                { x: new Date(2017, 0, 16), y: 570 }
            ]
        }]
    });
    chart.render();
    
    function toogleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    

})