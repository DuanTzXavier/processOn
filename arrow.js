window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded () {
  canvasApp(); //包含整个Canvas应用程序
}
function canvasSupport (e) {
  
      return !!e.getContext;

}
function canvasApp () {
  var myCanvas = document.getElementById('myCanvas');

  if (!canvasSupport(myCanvas)) {
      return; 
    }
  
  var ctx = myCanvas.getContext('2d');
  
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
  
  // Draw grid
  function drawGrid(ctx, w, h,strokeStyle, step) {
    for (var x = 0.5; x < w; x += step){
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    
    for (var y = 0.5; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
  

  function drawArrow(ctx, fromX, fromY, toX, toY,theta,headlen,width,color) {
    
    theta = typeof(theta) != 'undefined' ? theta : 30;
    headlen = typeof(theta) != 'undefined' ? headlen : 10;
    width = typeof(width) != 'undefined' ? width : 1;
    color = typeof(color) != 'color' ? color : '#000';
    
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
    
    var arrowX = fromX - topX,
        arrowY = fromY - topY;
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
  
  function drawScreen(){
    drawGrid(ctx, myCanvas.width, myCanvas.height, '#eee', 10);
    
    // 向右箭头
    drawArrow(ctx, myCanvas.width / 2, myCanvas.height / 2, myCanvas.width / 2 + 150, myCanvas.height / 2,30,30,4,'#f36');
    // 向下箭头
    drawArrow(ctx, myCanvas.width / 2, myCanvas.height / 2, myCanvas.width / 2, myCanvas.height / 2  + 150,30,30,4,'#f66');
    // 向左箭头
    drawArrow(ctx, myCanvas.width / 2, myCanvas.height / 2, myCanvas.width / 2 - 250, myCanvas.height / 2,30,30,4,'#0f6');
    // 向上箭头
    drawArrow(ctx, myCanvas.width / 2, myCanvas.height / 2, myCanvas.width / 2, myCanvas.height / 2 - 150,30,30,4,'#d6f');
    
  }
  
  drawScreen();
  
}
