var tenp = 1;
var i = 1;
function addIndex(a) {
    a.style.zIndex = tenp + i;
    i++;
}

//公共的拖拽方法
function drag(divObj) {

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
        var cans = divObj.getContext('2d');
        //用isPointInPath方法
        var p = getEventPosition(e);

        if (cans.isPointInPath(p.x, p.y)) {
            //点击了矩形

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
                    addIndex(divObj);
                    divObj.style.left = moveEvent.clientX - mwidth + "px";
                    divObj.style.top = moveEvent.clientY - mheight + "px";
                    //将鼠标坐标传给Canvas中的图像
                    X = moveEvent.clientX - mwidth;
                    Y = moveEvent.clientY - mheight;
                    //下面四个条件为限制div以及图像的活动边界
                    if (moveEvent.clientX <= mwidth) {
                        divObj.style.left = 0 + "px";
                        X = 0;
                    }
                    if (parseInt(divObj.style.left) + divObj.offsetWidth >= 1366) {
                        divObj.style.left = 1366 - divObj.offsetWidth + "px";
                        X = 1366 - divObj.offsetWidth;
                    }
                    if (moveEvent.clientY <= mheight) {
                        divObj.style.top = 0 + "px";
                        Y = 0;
                    }
                    if (parseInt(divObj.style.top) + divObj.offsetHeight >= 768) {
                        divObj.style.top = 768 - divObj.offsetHeight + "px";
                        Y = 768 - divObj.offsetHeight;
                    }
                    divObj.onmouseup = function () {
                        moveFlag = false;
                    }
                }
            }
        }
    }

}

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

function addAView() {

    var canvas = document.createElement("canvas");
    canvas.height = 100
    canvas.width = 100
    canvas.style = "position:absolute;left:470px;top:100px"

    var cxt = canvas.getContext("2d");
    //填充或闭合 需要先闭合路径才能画
    cxt.beginPath();
    cxt.fillStyle = "blue";
    cxt.rect(0, 0, 100, 100);
    cxt.closePath();
    cxt.fill();

    var para = document.createElement("div");
    var node = document.createTextNode("添加一个airzilong");
    para.appendChild(node);
    canvas.appendChild(para);

    var element = document.getElementById("container");

    var div = document.createElement("div");

    element.appendChild(div);
    div.appendChild(canvas);
    // div.height = 100
    // div.width = 100
    // div.style = "position:absolute;left:470px;top:100px"
    drag(canvas);

}
