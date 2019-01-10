export class ShaoeDrawingUtils {
    drawShape(styleName, canvas, lineWidth) {
        switch (styleName) {
            case "rectangle": this.drawRetangle(canvas, lineWidth)
                break;
            case "circle_rectangle": this.drawRetangle(canvas, lineWidth)
                break;
            case "rhomb": this.drawRetangle(canvas, lineWidth)
                break;
            default:
                console.log(styleName + "   uncaught")
                break;
        }
    }

    drawRetangle(canvas, lineWidth) {
        console.log(canvas.width)
        var cxt=canvas.getContext("2d");
        cxt.lineWidth = lineWidth;
        cxt.lineJoin="round";
        cxt.strokeRect(lineWidth,lineWidth,canvas.width - lineWidth * 2,canvas.height - lineWidth * 2);       
    }

    drawCircleRectangle(canvas, lineWidth) {

    }

    drawRhomb(canvas, lineWidth) {

    }
}