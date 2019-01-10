export class ShaoeDrawingUtils {
    drawShape(styleName, canvas, lineWidth) {
        switch (styleName) {
            case "rectangle": this.drawRetangle(canvas, lineWidth)
                break;
            case "circle_rectangle": this.drawCircleRectangle(canvas, lineWidth)
                break;
            case "rhomb": this.drawRhomb(canvas, lineWidth)
                break;
            default:
                console.log(styleName + "   uncaught")
                break;
        }
    }

    drawRetangle(canvas, lineWidth) {
        let width = canvas.width - lineWidth * 2
        let height = canvas.height - lineWidth * 2
        var cxt = canvas.getContext("2d");
        cxt.lineWidth = lineWidth;
        cxt.lineJoin = "round";
        cxt.strokeRect(lineWidth, lineWidth, width, height);
    }

    drawCircleRectangle(canvas, lineWidth) {
        let width = canvas.width - lineWidth * 2
        let height = canvas.height - lineWidth * 2
        var cxt = canvas.getContext("2d");
        cxt.lineWidth = lineWidth;
        cxt.lineJoin = "round";
        this.drawRoundRect(cxt, lineWidth, lineWidth, width, height, 15)
        cxt.stroke();
    }

    drawRoundRect(cxt, x, y, width, height, radius) {
        cxt.beginPath();
        cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
        cxt.lineTo(width - radius + x, y);
        cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
        cxt.lineTo(width + x, height + y - radius);
        cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
        cxt.lineTo(radius + x, height + y);
        cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
        cxt.closePath();
    }

    drawRhomb(canvas, lineWidth) {
        let width = canvas.width - lineWidth * 2
        let height = canvas.height - lineWidth * 2
        var cxt = canvas.getContext("2d");
        cxt.lineWidth = lineWidth;
        cxt.lineJoin = "round";
        this.drawCanvasRhomb(cxt, lineWidth, lineWidth, width, height)
        cxt.stroke();
    }

    drawCanvasRhomb(cxt, x, y, width, height) {
        cxt.beginPath();
        cxt.moveTo(width / 2 + x, y)
        cxt.lineTo(width + x, height / 2 + y);
        cxt.lineTo(width / 2 + x, height + y);
        cxt.lineTo(x, height / 2 + y);
        cxt.lineTo(width / 2 + x, y);
        cxt.closePath();
    }
}