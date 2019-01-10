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
        console.log(1, 1)
        console.log(canvas.width, canvas.height)
        let width = canvas.width - lineWidth * 2
        let height = canvas.height - lineWidth * 2
        var cxt=canvas.getContext("2d");
        cxt.lineWidth = lineWidth;
        cxt.lineJoin="round";
        console.log("123123", width, height)
        cxt.strokeRect(lineWidth,lineWidth,width,height);       
    }

    drawCircleRectangle(canvas, lineWidth) {

    }

    drawRhomb(canvas, lineWidth) {

    }
}