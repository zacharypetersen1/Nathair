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
    
    var count = -1;
    var bodyScaler;
    
    for(i in snake)
    {   
        count++;
        count = count % 4;
        bodyScaler = Math.cos(count*Math.PI*2/4);
        drawBodySegment(snake[i], bodyScaler);
    }
}

function drawBodySegment(position, scaler) {
    ctx.fillStyle = rgbToHex(Math.floor(60+10*scaler), Math.floor(60+10*scaler), Math.floor(150+20*scaler));
    ctx.fillRect(gridX+position[0]*cellSize, gridY+position[1]*cellSize, cellSize,cellSize);
}

function drawFruit(position) {
    ctx.fillStyle = rgbToHex(160, 80, 80);
    ctx.beginPath();
    ctx.arc(gridX + position[0]*cellSize+cellSize/2, gridY+position[1]*cellSize+cellSize/2,
            cellSize/2, 0, Math.PI*2);
    ctx.fill();
}