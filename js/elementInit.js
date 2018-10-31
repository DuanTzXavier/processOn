//公共的拖拽方法
function dragElement(divObj) {
    var moveFlag = false;
    var startLeft;
    var startTop;
    // 拖拽函数
    divObj.onmousedown = function (e) {
        moveFlag = true;
        var clickEvent = window.event || e;
        startLeft = clickEvent.clientX - divObj.offsetLeft;
        startTop = clickEvent.clientY - divObj.offsetTop;

        document.onmousemove = function (e) {
            var moveEvent = window.event || e;
            if (moveFlag) {
                divObj.style.left = moveEvent.clientX - startLeft + "px";
                divObj.style.top = moveEvent.clientY - startTop + "px";
            }
        }

        divObj.onmouseup = function () {
            moveFlag = false;
        }
    }
}

function addAnElement() {
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
    rootElement.style = "position: absolute;left: 520px;top: 420px"
    //init原件背景
    var backgd = document.createElement("canvas");
    backgd.height = 150
    backgd.width = 150
    backgd.style = "position:absolute"
    drawCavansRect(backgd, "orange", 150)

    //init原件文字内容
    var text = document.createElement("textarea");
    var node = document.createTextNode("添加一个airzilong");
    text.style = "position:absolute;width: 144px;border-style:none;resize:none;text-align:center;text-decoration: none;background: transparent"
    text.appendChild(node);

    //组装所有布局
    rootContainer.appendChild(rootElement);
    rootElement.appendChild(backgd);
    rootElement.appendChild(text);

    dragElement(rootElement)
}

function drawCavansRect(canvas, backgroundColor, length) {
    var cxt = canvas.getContext("2d");
    cxt.beginPath();
    cxt.fillStyle = backgroundColor;
    cxt.rect(0, 0, length, length);
    cxt.closePath();
    cxt.fill();
}