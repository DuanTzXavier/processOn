export class ShaoeDrawingUtils {
    drawShape(styleName, canvas, lineWidth) {
        switch (styleName) {
            case "rectangle": this.drawRetangle(caches, lineWidth)
                break;
            case "circle_rectangle": this.drawRetangle(caches, lineWidth)
                break;
            case "rhomb": this.drawRetangle(caches, lineWidth)
                break;
            default:
                console.log(styleName + "   uncaught")
                break;
        }
    }

    drawRetangle(canvas, lineWidth) {

    }

    drawCircleRectangle(canvas, lineWidth) {

    }

    drawRhomb(canvas, lineWidth) {

    }
}