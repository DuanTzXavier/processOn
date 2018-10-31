function drawArrow2(myCanvas2, fromX, fromY, toX, toY, theta, headlen, width, color) {
    var ctx = myCanvas2.getContext('2d');

    theta = typeof (theta) != 'undefined' ? theta : 30;
    headlen = typeof (theta) != 'undefined' ? headlen : 10;
    width = typeof (width) != 'undefined' ? width : 1;
    color = typeof (color) != 'color' ? color : '#000'; 
    // 计算各角度和对应的P2,P3坐标 
    var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
        angle1 = (angle + theta) * Math.PI / 180,
        angle2 = (angle - theta) * Math.PI / 180,
        topX = headlen * Math.cos(angle1),
        topY = headlen * Math.sin(angle1),
        botX = headlen * Math.cos(angle2),
        botY = headlen * Math.sin(angle2);
    ctx.save();
    ctx.beginPath();
    var arrowX = fromX - topX, arrowY = fromY - topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
}

function drawArrow2Down(myCanvas2) {
    drawArrow2(myCanvas2, myCanvas2.width / 2, 0, myCanvas2.width / 2, myCanvas2.height - 4, 30, 20, 4, '#acc')
}

function drawArrow2Up(myCanvas2) {
    drawArrow2(myCanvas2, myCanvas2.width / 2, myCanvas2.height, myCanvas2.width / 2, 4,30,20,4,'#acc')
}

function drawArrow2Left(myCanvas2) {
    drawArrow2(myCanvas2, myCanvas2.width , myCanvas2.height / 2, 4, myCanvas2.height / 2,30,20,4,'#acc')
}

function drawArrow2Right(myCanvas2) {
    drawArrow2(myCanvas2, 0, myCanvas2.height / 2, myCanvas2.width - 4, myCanvas2.height / 2,30,20,4,'#acc')
}

function drawLineArrow(canvas, startX, startY, endX, endY){
    drawArrow2(canvas, startX, startY, endX, endY, 30, 20, 4, '#acc')
}


