import { Point } from './Point.js'

export class LinkedArrow {

    constructor(canvas, startPoint, endPoint) {
        this.canvas = canvas
        this.startPoint = startPoint
        this.endPoint = endPoint
    }

    static getArrowWidth(){
        return 20
    }

    drawArrow() {
        var left = Math.min(this.startPoint.x, this.endPoint.x)
        var top = Math.min(this.startPoint.y, this.endPoint.y)

        var width = Math.abs(this.startPoint.x, this.endPoint.x)
        var height = Math.abs(this.startPoint.y, this.endPoint.y)

        var rootElement = document.createElement("div");
        rootElement.style = "position: absolute;left: " + left + "px;top: " + top + "px;width:" + width + "px;height:" + height + " px"
        rootElement.id = (new Date()).valueOf();
        rootElement.__startPositionX = left
        rootElement.__startPositionY = top
        //init原件背景
        var backgd = document.createElement("canvas");
        backgd.height = height
        backgd.width = width
        backgd.style = "position:absolute"
        drawCanvasLine(backgd, true)

        //组装所有布局
        this.canvas.appendChild(rootElement);
        rootElement.appendChild(backgd);
        rootElement.onclick = function (e) {
            // addContourForElement(rootElement.id)
        }

        console.log(height)
    }
}

var startPoint = new Point(1, 2)
var endPoint = new Point(4, 5)
var canvas = document.createElement("canvas")
var drawer = new LinkedArrow(canvas, startPoint, endPoint)
drawer.drawArrow()
console.log(endPoint.x)