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
                divObj.style.left = moveEvent.clientX - startLeft + "px";
                rootElement.style.height = moveEvent.clientY - startTop + "px";
                // rootElement.style.width = moveEvent.clientX - startLeft + "px";
                var canvas = rootElement.getElementsByTagName("canvas")
                canvas[0].height = moveEvent.clientY - startTop
                canvas[0].width = moveEvent.clientX - startLeft + 10
                drawCanvasLine(canvas[0], true)
            }
        }

        document.onmouseup = function () {
            moveFlag = false;
        }
    }
}

// dragArrow
function dragArrow(divObj) {
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
                var heightTMP = moveEvent.pageY - parseInt(divObj.style.top) + 10
                var widthTMP = moveEvent.pageX - parseInt(divObj.style.left) + 10
                divObj.style.height = heightTMP + "px";
                divObj.style.width = widthTMP + "px";
                // rootElement.style.width = moveEvent.clientX - startLeft + "px";
                var canvas = divObj.getElementsByTagName("canvas")
                canvas[0].height = heightTMP
                var width = widthTMP
                if(width > 20){
                    canvas[0].width = width
                }else{
                    canvas[0].width = 20
                }
                
                drawCanvasLine(canvas[0], true)
            }
        }

        document.onmouseup = function () {
            moveFlag = false;
        }
    }
}

function catMousemove(divObj, canvasObj){
    canvasObj.onmousemove = function (e) {
        var moveEvent = window.event || e;
        var y = moveEvent.pageY - parseInt(divObj.style.top)
        var x = moveEvent.pageX - parseInt(divObj.style.left)
        var positionY = parseInt(divObj.style.height) - y
        var positionX = parseInt(divObj.style.width) - x
        console.log("divObj.style.width:" + canvasObj.width)
        console.log("moveEvent.pageX:" + moveEvent.pageX + " divObj.style.left:" + divObj.style.left + " positionX:" + positionX)
        if(positionY < 20 && positionX < 20){
            divObj.style.cursor = "move"
            dragArrow(divObj)
        }else{
            divObj.style.cursor = "default"
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
    rootElement.style = "position: absolute;left: 520px;top: 420px;width:20px;height:150px"
    rootElement.id = (new Date()).valueOf();
    //init原件背景
    var backgd = document.createElement("canvas");
    backgd.height = 150
    backgd.width = 20
    backgd.style = "position:absolute"
    drawCanvasLine(backgd, true)

    //init原件文字内容
    var text = document.createElement("textarea");
    var node = document.createTextNode("添加一个airzilong");
    text.style = "position:absolute;width: 144px;border-style:none;resize:none;text-align:center;text-decoration: none;background: transparent"
    text.appendChild(node);

    //组装所有布局
    rootContainer.appendChild(rootElement);
    rootElement.appendChild(backgd);
    // rootElement.appendChild(text);
    rootElement.onclick = function (e){
        addContourForElement(rootElement.id)
    }
    catMousemove(rootElement, backgd)
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