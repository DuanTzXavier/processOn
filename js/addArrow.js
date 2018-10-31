// 公共的拖拽方法
function dragAnchor(divObj, builtID) {
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
                var rootElement = document.getElementById(builtID)
                divObj.style.top = moveEvent.clientY - startTop + "px";
                rootElement.style.height = moveEvent.clientY - startTop + "px";
                var canvas = rootElement.getElementsByTagName("canvas")
                canvas[0].height = moveEvent.clientY - startTop
                drawArrow2Down(canvas[0])
            }
        }

        document.onmouseup = function () {
            moveFlag = false;
        }
    }
}

function addAnArrow() {
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
    rootElement.style = "position: absolute;left: 520px;top: 420px;width:150px;height:150px"
    rootElement.id = (new Date()).valueOf();
    //init原件背景
    var backgd = document.createElement("canvas");
    backgd.height = 150
    backgd.width = 150
    backgd.style = "position:absolute"
    drawArrow2Down(backgd)

    //init原件文字内容
    var text = document.createElement("textarea");
    var node = document.createTextNode("添加一个airzilong");
    text.style = "position:absolute;width: 144px;border-style:none;resize:none;text-align:center;text-decoration: none;background: transparent"
    text.appendChild(node);

    //组装所有布局
    rootContainer.appendChild(rootElement);
    rootElement.appendChild(backgd);
    rootElement.appendChild(text);
    rootElement.onclick = function (e){
        addContourForElement(rootElement.id)
    }
    // dragElement(rootElement)

}

function addContourForElement(id){

    var rootContainer = document.getElementById("canvas_draw_paper");
    var rootElement = document.getElementById(id);
    var builtID = "ContourFor"+id
    var elementContour = document.getElementById(builtID);
    if(elementContour == null){
        var elementContour = document.createElement("div");
        
        rootContainer.appendChild(elementContour)
    }
    elementContour.id = "ContourFor"+id
    var left = rootElement.style.left;
    var top = rootElement.style.top;
    var style = "position: absolute;" + "left: "+left+";top: " + top

    console.log()

    elementContour.style = style

    elementContour.innerHTML = ""
    var anchor = document.createElement("div");
    var anchorTop = parseInt(rootElement.style.height) + "px"
    var anchorLeft = parseInt(rootElement.style.width) / 2 - 5.5 + "px"
    var anchorStyle = "position: absolute;border-style: solid;border-width: 1;border-color: rgb(136, 51, 51); border-radius: 4px; width: 6px; height: 6px; left: " + anchorLeft + "; top: "+ anchorTop +";"
    anchor.style = anchorStyle
    elementContour.appendChild(anchor)

    dragAnchor(anchor, id)

}