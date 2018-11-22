var __LINE_WIDTH = 20
var __CANVAS_LINE_WIDTH = 4

function drawCanvasLineV2(canvas) {
    //获取对应的CanvasRenderingContext2D对象(画笔)
    var ctx = canvas.getContext("2d");

    //如果 canvas 宽度大于 线宽则为折线，否则为直线
    if (canvas.width > LINE_WIDTH) {
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
        if (canvas.__isVertical) {
            base = canvas.height
            reference = canvas.width
        } else {
            base = canvas.width
            reference = canvas.height
        }

        if (base >= reference) {
            //双折线

            /*
             * startPoint 开始的位置，根据canvas.__startPosition界定起始点
             * 距离边界为__LINE_WIDTH / 2(线宽一半)
             * __________________
             * | 0            1 |
             * |                |
             * | 2            3 |
             * |________________|
             * 
             * __isVertical = ture: 从Y = 0、Y=canvas.height开始
             * 0：(x: __LINE_WIDTH / 2, y: 0)
             * 1：(x: canvas.width - __LINE_WIDTH / 2, y: 0)
             * 2：(x: __LINE_WIDTH / 2, y: canvas.height)
             * 3：(x: canvas.width - __LINE_WIDTH / 2, y: canvas.height)
             * 
             * __isVertical = false:从X = 0、X=canvas.width开始
             * 0：(x: 0, y: __LINE_WIDTH / 2)
             * 1：(x: 0, y: canvas.height - __LINE_WIDTH / 2)
             * 2：(x: canvas.width, y: __LINE_WIDTH / 2)
             * 3：(x: canvas.width, y: canvas.height - __LINE_WIDTH / 2)
             * 
             * TODO -> 太复杂，优化！！！！
             * 
             * 
             */
            var harfWidth = __LINE_WIDTH / 2
            var startPoint = {
                "x": canvas.__isVertical ? 
                (canvas.__startPoint & 1 == 0 ? harfWidth : reference - harfWidth): (canvas.__startPoint > 1 ? 0 : base), 
                "y": canvas.__isVertical ? 
                (canvas.__startPoint > 1 ? 0 : base): (canvas.__startPoint & 1 == 0 ? harfWidth : reference - __LINE_WIDTH / 2)
            }
            var endPoint = {
                "x": canvas.__isVertical ? 
                (canvas.__startPoint > 1 ? 0 : base): (canvas.__startPoint & 1 == 0 ? harfWidth : reference - __LINE_WIDTH / 2),
                "y": canvas.__isVertical ? 
                (canvas.__startPoint & 1 == 0 ? harfWidth : reference - harfWidth): (canvas.__startPoint > 1 ? 0 : base), 
            }

            var harfX = (endPoint.x - startPoint.x)/2 
            var harfY = (endPoint.y - startPoint.y)/2 

            var halfPositionFirst = {
                "x": canvas.__isVertical ? 
                startPoint.x: startPoint.x + harfX, 
                "y": canvas.__isVertical ? 
                startPoint.y + harfY: startPoint.y
            }

            var halfPositionSecond = {
                "x": canvas.__isVertical ? 
                endPoint.x: startPoint.x + harfX, 
                "y": canvas.__isVertical ? 
                startPoint.y + harfY: endPoint.y
            }

            ctx.moveTo(startPoint.x, startPoint.y)
            ctx.lineTo(point.x, point.y)
            ctx.lineTo(halfPositionFirst.x, halfPositionFirst.y)
            ctx.lineTo(halfPositionSecond.x, halfPositionSecond.y)
            ctx.lineTo(endPoint.x, endPoint.y)

            var angle = isVertical ? DOWN_ARROW : RIGHT_ARROW;
            drawLastArrow(ctx, point, angle)
        } else {
            //单折线
            var startPoint = LINE_WIDTH / 2
            var halfPoint = base - startPoint
            var endPoint = reference
            var point = getPointByIsVertical(startPoint, 0, isVertical)
            ctx.moveTo(point.x, point.y)

            point = getPointByIsVertical(startPoint, halfPoint, isVertical)
            ctx.lineTo(point.x, point.y)
            ctx.moveTo(point.x, point.y)

            // point = getPointByIsVertical(endPoint, halfPoint, isVertical)
            // ctx.lineTo(point.x, point.y)
            // var angle = isVertical ? RIGHT_ARROW : DOWN_ARROW;
            // drawLastArrow(ctx, point, angle)
        }
    } else {
        //直线
        var harfWidth = __LINE_WIDTH / 2
        if (canvas.__isVertical){
            ctx.moveTo(harfWidth, 0);
            ctx.lineTo(harfWidth, canvas.height);
        }else{
            ctx.moveTo(0, harfWidth);
            ctx.lineTo(canvas.width, harfWidth);
        }
        // point = getPointByIsVertical(10, canvas.height, isVertical)
        // var angle = isVertical ? DOWN_ARROW : RIGHT_ARROW;
        // drawLastArrow(ctx, point, angle)
    }
    //沿着坐标点顺序的路径绘制直线
    ctx.stroke();
    //关闭当前的绘制路径
    ctx.closePath();
}

function buildLabel(id) {
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
    rootElement.style.position = "absolute";
    rootElement.id = id
    //init原件背景
    var backgd = document.createElement("canvas");

    rootContainer.appendChild(rootElement)
    rootElement.appendChild(backgd)

    bindDivObj(rootElement, backgd)
}

function initStartPoint(id, startPoint) {
    var divObj = document.getElementById(id);
    divObj.__startPoint = startPoint;
}

function moveEndPoint(id, endPoint) {
    var divObj = document.getElementById(id);
    divObj.__endPoint = endPoint;
}

function drawLastArrowV2(ctx, lastPoint, toAngle) {
    var angle = toAngle;
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

function getPointByIsVerticalV2(base, reference, isVertical) {
    var x, y;
    if (isVertical) {
        x = base
        y = reference
    } else {
        x = reference
        y = base
    }
    return { x: x, y: y };
}

function bindDivObj(divObj, canvas) {
    //设置一些动态变化的变量

    /**
     * 1. 设置终点位置时，动态改变divObj在 parent div的位置及宽高
     * 逻辑：
     *  1.1 位置left 为startPoint(鼠标起点)和endPoint(鼠标终点) x 的最小值
     *          top 为startPoint(鼠标起点)和endPoint(鼠标终点) y 的最小值
     *  1.2 宽高width 为startPoint(鼠标起点)和endPoint(鼠标终点) x 的差值的绝对值
     *          height 为startPoint(鼠标起点)和endPoint(鼠标终点) y 的差值的绝对值
     */
    Object.defineProperty(divObj, "__endPoint", {
        set: function (point) {
            divObj.__startPoint = { "x": 0, "y": 0 }
            divObj.style.left = Math.min(divObj.__startPoint.x, point.x) + "px";
            divObj.style.top = Math.min(divObj.__startPoint.y, point.y) + "px";
            divObj.style.width = Math.abs(divObj.__startPoint.x - point.x) + "px";
            divObj.style.height = Math.abs(divObj.__startPoint.y - point.y) + "px";
        },
        enumerable: true,
        configurable: true
    })

    /**
     * 2. 设置双向绑定canvas 与 divObj 的宽与高，当divObj宽高改变的时候，canvas也随之改变
     * 
     * TODO -> 应该去添加改变后重新绘制！！！！后期增加
     */
    Object.defineProperty(canvas, "width", {
        get: function () {
            return parseInt(divObj.style.width);
        },
        set: function (width) {
            divObj.style.width = parseInt(width) + "px";
        },
        enumerable: true,
        configurable: true
    })

    Object.defineProperty(canvas, "height", {
        get: function () {
            return parseInt(divObj.style.height);
        },
        set: function (height) {
            divObj.style.height = parseInt(height) + "px";
        },
        enumerable: true,
        configurable: true
    })

    /**
     * 3. 设置canvas绘制的起始位置
     *  计算起始位置
     *  位运算
     *  0：左上角
     *  1：右上角
     *  2：左下角
     *  3：右下角
     * 
     *  例如 
     * 左上角的时候：
     * | 
     * |____
     *      |
     *      |
     * 
     * 右上角的时候：
     *      |
     *  ____|
     * |    
     * |     
     * 
     */
    Object.defineProperty(canvas, "__startPosition", {
        get: function () {
            var bitmmap = 0;
            if (divObj.__startPoint == null || divObj.__endPoint == null) {
                bitmmap = 0
            } else {
                bitmmap = divObj.__startPoint.x > divObj.__endPoint.x ? 1 : 0
                bitmmap = bitmmap | (divObj.__startPoint.y > divObj.__endPoint.y ? 2 : 0)
            }
            return pbitmmap
        },
        enumerable: true,
        configurable: true
    })


    /**
     * 4. 设置canvas是否画竖直的箭头
     * 
     * isVertical如果为true，则为竖线，竖线的起点边应为横边；
     * 如果为false，则为横线，横线的起点边应为竖边
     * 
     */
    Object.defineProperty(canvas, "__isVertical", {
        get: function () {
            if (canvas.__isVertical == null || !canvas.__isVertical instanceof Boolean) {
                canvas.__isVertical = true
            }
            return canvas.__isVertical;
        },
        set: function (isVertical) {
            canvas = __isVertical;
        },
        enumerable: true,
        configurable: true
    })
}