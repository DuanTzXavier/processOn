LINE_WIDTH = 20
THETA = 40
HEADLEN = 10

UP_ARROW = 90
DOWN_ARROW = -90
LEFT_ARROW = 0
RIGHT_ARROW = 180

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

    var backgd5 = document.createElement("canvas");
    backgd5.height = 20
    backgd5.width = 100
    // backgd4.style = "position:absolute"
    drawCanvasLine(backgd5, false)

    //组装所有布局
    rootContainer.appendChild(rootElement);
    rootElement.appendChild(backgd);
    rootElement.appendChild(backgd1);
    rootElement.appendChild(backgd2);
    rootElement.appendChild(backgd3);
    rootElement.appendChild(backgd4);
    rootElement.appendChild(backgd5);
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

            var angle = isVertical ? DOWN_ARROW : RIGHT_ARROW;
            drawLastArrow(ctx, point, angle)
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
            var angle = isVertical ? RIGHT_ARROW : DOWN_ARROW;
            drawLastArrow(ctx, point, angle)
        }
    }else{
        //直线
        ctx.moveTo(10, 0);
        ctx.lineTo(10, canvas.height);

        point = getPointByIsVertical(10, canvas.height, isVertical)
        var angle = isVertical ? DOWN_ARROW : RIGHT_ARROW;
        drawLastArrow(ctx, point, angle)
    }
    //沿着坐标点顺序的路径绘制直线
    ctx.stroke();
    //关闭当前的绘制路径
    ctx.closePath();
}

function drawLastArrow(ctx, lastPoint, toAngle){
    var angle = toAngle;
    // isVertical ? angle = -90 : angle = 180,
    angle1 = (angle + THETA) * Math.PI / 180,
    angle2 = (angle - THETA) * Math.PI / 180,
    topX = HEADLEN * Math.cos(angle1),
    topY = HEADLEN * Math.sin(angle1),
    botX = HEADLEN * Math.cos(angle2),
    botY = HEADLEN * Math.sin(angle2);

    arrowX = lastPoint.x + topX;
    arrowY = lastPoint.y + topY;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(arrowX, arrowY);

    arrowX = lastPoint.x + botX;
    arrowY = lastPoint.y + botY;
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(arrowX, arrowY);
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