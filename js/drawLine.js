LINE_WIDTH = 20

function drawLine() {

    /**
     * _______________________
     * | rootContainer div   |
     * | ___________________ |
     * | | rootElement div | |
     * | | _______________ | |
     * | | |backgd canvas| | |
     * | | |_____________| | |
     * | | _______________ | |
     * | | |text textarea| | |
     * | | |_____________| | |
     * | |_________________| |
     * |_____________________|
     * 
     */


    //包含原件的布局
    var rootContainer = document.getElementById("canvas_draw_paper");

    //init原件父布局
    var rootElement = document.createElement("div");
    rootElement.style = "position: absolute;left: 520px;top: 120px"
    //init原件背景
    var backgd = document.createElement("canvas");
    backgd.height = 200
    backgd.width = 150
    // backgd.style = "position:absolute"
    drawCanvasLine(backgd, true)

    var backgd1 = document.createElement("canvas");
    backgd1.height = 100
    backgd1.width = 150
    // backgd1.style = "position:absolute"
    drawCanvasLine(backgd1, true)

    var backgd2 = document.createElement("canvas");
    backgd2.height = 200
    backgd2.width = 150
    // backgd2.style = "position:absolute"
    drawCanvasLine(backgd2, false)

    var backgd3 = document.createElement("canvas");
    backgd3.height = 100
    backgd3.width = 150
    // backgd3.style = "position:absolute"
    drawCanvasLine(backgd3, false)

    var backgd4 = document.createElement("canvas");
    backgd4.height = 100
    backgd4.width = 20
    // backgd4.style = "position:absolute"
    drawCanvasLine(backgd4, true)

    //组装所有布局
    rootContainer.appendChild(rootElement);
    rootElement.appendChild(backgd);
    rootElement.appendChild(backgd1);
    rootElement.appendChild(backgd2);
    rootElement.appendChild(backgd3);
    rootElement.appendChild(backgd4);
}

function drawCanvasLine(canvas, isVertical){
    //获取对应的CanvasRenderingContext2D对象(画笔)
    var ctx = canvas.getContext("2d");

    //如果 canvas 宽度大于 线宽则为折线，否则为直线
    if(canvas.width > LINE_WIDTH){
        //折线
        
        /**
         * 设置参照物
         * 若为竖线，则base为高度
         * 若为横线，则base为宽度
         * 
         * reference > base时为单折线，
         *  |_______
         * 
         * base >= reference时为双折线
         * | 
         * |____
         *      |
         *      |
         */
        var base = 0
        var reference = 0
        if(isVertical){
            base = canvas.height
            reference = canvas.width
        }else{
            base = canvas.width
            reference = canvas.height
        }

        if(base >= reference){
            //双折线
            var startPoint = LINE_WIDTH / 2
            var halfPoint = base / 2
            var endPoint = reference - startPoint
            var point = getPointByIsVertical(startPoint, 0, isVertical)
            ctx.moveTo(point.x, point.y)

            point = getPointByIsVertical(startPoint, halfPoint, isVertical)
            ctx.lineTo(point.x, point.y)
            ctx.moveTo(point.x, point.y)
            
            point = getPointByIsVertical(endPoint, halfPoint, isVertical)
            ctx.lineTo(point.x, point.y)
            ctx.moveTo(point.x, point.y)

            point = getPointByIsVertical(endPoint, base, isVertical)
            ctx.lineTo(point.x, point.y)
        }else{
            //单折线
            var startPoint = LINE_WIDTH / 2
            var halfPoint = base - startPoint
            var endPoint = reference
            var point = getPointByIsVertical(startPoint, 0, isVertical)
            ctx.moveTo(point.x, point.y)

            point = getPointByIsVertical(startPoint, halfPoint, isVertical)
            ctx.lineTo(point.x, point.y)
            ctx.moveTo(point.x, point.y)
            
            point = getPointByIsVertical(endPoint, halfPoint, isVertical)
            ctx.lineTo(point.x, point.y)
        }
    }else{
        //直线
        ctx.moveTo(10, 0);
        ctx.lineTo(10, canvas.height);
    }
    //沿着坐标点顺序的路径绘制直线
    ctx.stroke();
    //关闭当前的绘制路径
    ctx.closePath();
}

function getPointByIsVertical(base, reference, isVertical){
    var x, y;
    if(isVertical){
        x = base
        y = reference
    }else{
        x = reference
        y = base
    }
    return { x: x, y: y };
}