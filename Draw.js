//Contains drawing methods for various game objects


//Main draw function called from game loop
function draw() {
    //draw background
    drawBG();
    drawGrid();
    drawSnake();
    drawFruit(fruitPos);
}


//converts RGB value to Hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


//Draws solid background
function drawBG() {
    ctx.fillStyle = rgbToHex(255,255,255);
    ctx.fillRect(0,0, canvWidth, canvHeight);
    ctx.fillStyle = rgbToHex(200,200,200);
    ctx.fillRect(gridX,gridY, gridWidth,gridHeight);
}


//Draws grid lines (call after drawing background)
function drawGrid() {
    ctx.strokeStyle = rgbToHex(255,255,255);
    ctx.lineWidth = gridLnSize;

    //Vertical grid lines    
    var i = 0;
    for(i; i <= cellCountW; i++) {
        ctx.beginPath();
        ctx.moveTo(gridX + cellSize*i, gridY);
        ctx.lineTo(gridX + cellSize*i, gridY + gridHeight);
        ctx.stroke();
    }
    
    //Horizontal grid lines
    i = 0;
    for(i; i <= cellCountH; i++) {
        ctx.beginPath();
        ctx.moveTo(gridX, gridY + cellSize*i);
        ctx.lineTo(gridX + gridWidth, gridY + cellSize*i);
        ctx.stroke();
    }
}

function drawSnake() {
    ctx.fillStyle = rgbToHex(60, 60, 150);
    for(i in snake) drawBodySegment(snake[i]);
}

function drawBodySegment(position) {
    ctx.fillRect(gridX+position[0]*cellSize, gridY+position[1]*cellSize, cellSize,cellSize);
}

function drawFruit(position) {
    ctx.fillStyle = rgbToHex(160, 80, 80);
    ctx.beginPath();
    ctx.arc(gridX + position[0]*cellSize+cellSize/2, gridY+position[1]*cellSize+cellSize/2,
            cellSize/2, 0, Math.PI*2);
    ctx.fill();
}