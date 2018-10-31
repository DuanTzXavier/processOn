//得到点击的坐标
function getEventPosition(ev) {
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return { x: x, y: y };
}



//公共的拖拽方法
function drag2(divObj) {

    // 绘制图片坐标
    var X = 0;
    var Y = 0;
    // js部分
    //var divObj=document.getElementById("strCanvas");
    var moveFlag = false;
    //区别moueseup与click的标志
    var clickFlag = false;

    // 拖拽函数
    divObj.onmousedown = function (e) {
        // var cans = divObj.getContext('2d');
        //用isPointInPath方法
        var p = getEventPosition(e);

        moveFlag = true;
        clickFlag = true;
        var clickEvent = window.event || e;
        var mwidth = clickEvent.clientX - divObj.offsetLeft;
        var mheight = clickEvent.clientY - divObj.offsetTop;
        document.onmousemove = function (e) {
            clickFlag = false;
            var moveEvent = window.event || e;
            if (moveFlag) {
                //移动则z-index变大
                // addIndex(divObj);
                var now = moveEvent.clientX - mwidth;
                var values = (now - 120 + divObj.offsetWidth)/2

                console.log("offsetWidth"  + divObj.offsetWidth)

                divObj.style.width = values + "px"

                canvas.width = values

                console.log(values)
                drawArrow2Left(canvas)
                // divObj.style.top = moveEvent.clientY - mheight + "px";
                //将鼠标坐标传给Canvas中的图像
                X = moveEvent.clientX - mwidth;
                Y = moveEvent.clientY - mheight;
                //下面四个条件为限制div以及图像的活动边界
                // if (moveEvent.clientX <= mwidth) {
                //     divObj.style.left = 0 + "px";
                //     X = 0;
                // }
                // if (parseInt(divObj.style.left) + divObj.offsetWidth >= 1366) {
                //     divObj.style.left = 1366 - divObj.offsetWidth + "px";
                //     X = 1366 - divObj.offsetWidth;
                // }
                // if (moveEvent.clientY <= mheight) {
                //     divObj.style.top = 0 + "px";
                //     Y = 0;
                // }
                // if (parseInt(divObj.style.top) + divObj.offsetHeight >= 768) {
                //     divObj.style.top = 768 - divObj.offsetHeight + "px";
                //     Y = 768 - divObj.offsetHeight;
                // }
                divObj.onmouseup = function () {
                    moveFlag = false;
                    console.log("up")
                }
            }
        }
    }

}