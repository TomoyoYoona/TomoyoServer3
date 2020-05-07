/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/canvas-nest.js
**/
// https://www.cnblogs.com/qq597585136/p/7019755.html


// 首先准备几个函数n(),e(),t(),o(),i()
// 作用分别为获取属性、获取对象、返回各项css设置、设置宽高、
// 对象a,c,u,d,l,r,x,w,y,s[]
//其中a和c分别为显示区的宽和高
//m为画布元素
//d中存储上面t()设置的css属性
//l为画布的id，字符串'c_nl'其中的l为第几个script标签。
//r为一个 CanvasRenderingContext2D 对象，使用它可以绘制到 Canvas 元素中。
//x为requestAnimationFrame函数，用于刷新帧
//本效果的实现原理为：定义若干个点，存放在数组s中。每个点由横纵坐标x,y组成，同时给每个点分配两个偏移量ax,ay，坐标和偏移量都是由随机数产生的。这些点靠着i()函数中的逐帧刷新而不断漂移，位移即偏移量。遇到边界时会转头。
//然后在i()函数中将每个点和其他所有点用线连起来，但是首先用一些条件限制是否连线，如距离过远等。其次这条线的宽度和不透明度与两端点的距离有关，相距越远二者数值越小，从而使得有时候某点看起来没有和任何点连在一起。
//在i()函数中，一共进行的循环次数为count*(count-1)（这里是119*118），但是有条件限制，所以当我们设置一个counter来计算调用多少次lineto的时候，基本上在130-160次之间。
//也就是说一般页面上同时存在130-160条线
//这里距离过远的判断标准为两点之间距离平方小于6000（定义在s[]中），也就是说两点间连线最长大概为50px，如果是鼠标位置和点之间距离平方应小于20000.也就是与鼠标相连的线最长大概为100px。
//由于光标也作为一个点和其他所有100px内的点连起来，并且有句代码使得点向附近的光标有一小段位移，所以看起来光标像磁铁一样吸引线段。（虽然位移一次只有0.03*o，但因为只要满足点-光标距离平方在(max/2,max)区间内就执行位移，所以一周期执行一次，短时间内会快速执行多次。
//对于requestAnimationFrame函数，一般电脑上，其频率是默认的60hz



window.onload=(function() {
    //用来获取对象的属性
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }
    function e(n) {
        return document.getElementsByTagName(n);
    }
    function t() {
        var t = e("script"),
        o = t.length,
        i = t[o - 1];
        return {
            l: o,
            z: n(i, "zIndex", -1),//层数
            o: n(i, "opacity", 1),//线条透明度
            c: n(i, "color", "255,0,0"),//线条颜色
            n: n(i, "count", 99)//点个数
        }
    }
    function o() {
        //设置显示区的宽高
        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    function i() {
        //先擦除画布，之后是定义几个局域变量。n,e,t,o,m,l
        r.clearRect(0, 0, a, c);
        var n, e, t, o, m, l;
        //forEach()为对数组s中的每个元素都执行一次此函数。
        s.forEach(function(i, x) {
            //这里i.x为线条的x坐标，i.xa为线条的一个方向向量，值域为：（-1,1）；然后让x+=xa，如果越界了就掉头。
            for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e],
            null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + (t + .2) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
        }),
        
        x(i);
    }

    //从这里开始才是函数的主执行部分，只执行一次，动态效果仅由函数i()实现。
    //x为刷新帧的函数，在html5里有requestAnimationFrame，如果没有，则用setTimeOut等
    //y中存放鼠标位置
    var a, c, u, m = document.createElement("canvas"),
    d = t(),
    l = "c_n" + d.l,
    r = m.getContext("2d"),
    x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(n) {
        window.setTimeout(n, 1e3 / 45)
    },
    w = Math.random,
    y = {
        x: null,
        y: null,
        max: 2e4
    };
    //这里设置画布元素的id、css样式
    m.id = l,
    m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o,
    e("body")[0].appendChild(m),//这里将画布元素添加到body中
    o(),//设置宽高
    window.onresize = o,
    //动鼠标的时候执行：将鼠标位置数据存放在y中
    window.onmousemove = function(n) {
        n = n || window.event,
        y.x = n.clientX,
        y.y = n.clientY


    },
    window.onmouseout = function() {
        y.x = null,
        y.y = null
    };
    for (var s = [], f = 0; d.n > f; f++) {
        //s里面存放h,g,v,p和max，一共存count个。相当于存count个线条
        //h为宽*随机数
        //g为高*随机数
        //v和p为偏移量
        var h = w() * a,
        g = w() * c,
        v = 2 * w() - 1,
        p = 2 * w() - 1;
        s.push({
            x: h,
            y: g,
            xa: v,
            ya: p,
            max: 6e3
        })
    }
    u = s.concat([y]),
    setTimeout(function() {
        i()
    },
    100)
    

} );