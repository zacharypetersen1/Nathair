//Contains utility drawing methods along with draw() function called from InGameState


//Main draw function called from game loop within InGameState
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


//Draws fruit at specified location
function drawFruit(position) {
    ctx.fillStyle = rgbToHex(160, 80, 80);
    ctx.beginPath();
    ctx.arc(gridX + position[0]*cellSize+cellSize/2, gridY+position[1]*cellSize+cellSize/2,
            cellSize/2, 0, Math.PI*2);
    ctx.fill();
}


//*************** Snake Drawing Functions *******************//
//Each function draws its corresponding segment of the snake differently based on the
//direction parameter. Direction in this case is defined as "direction from this segment
//to the chronologically next and/or previous segment of the snake"


//Higher level function that draws entire snake
function drawSnake() {
    var count = 0;
    var colorScaler;
    //draw the head
    colorScaler = Math.cos(count*Math.PI*2/4);
    drawHead(snake[0], getDirection(snake[0], snake[1]), colorScaler);
    //loop and draw all body segments
    var i = 1;
    var end = snake.length-1;
    for(i; i < end; i++)
    {   
        count = ++count % 4;
        colorScaler = Math.cos(count*Math.PI*2/4);
        drawBody(snake[i], getDirection(snake[i], snake[i-1]),
                 getDirection(snake[i], snake[i+1]), colorScaler);
    }
    //draw tail
    count = ++count % 4;
    colorScaler = Math.cos(count*Math.PI*2/4);
    drawTail(snake[end], getDirection(snake[end], snake[end-1]), colorScaler);
}


//Draws head of the snake
function drawHead(position, direction, scaler) {
    ctx.fillStyle = rgbToHex(Math.floor(60+10*scaler), Math.floor(60+10*scaler), Math.floor(150+20*scaler));
    drawSegBG(getPxPos(position), direction);
}


//draws a single body segment of snake- direction1 prevDir direction to previous segment
//nextDir is direction to next segment
function drawBody(position, prevDir, nextDir, scaler) {
    ctx.fillStyle = rgbToHex(Math.floor(60+10*scaler), Math.floor(60+10*scaler), Math.floor(150+20*scaler));
    var pxPos = getPxPos(position);
    
    for(i = 0; i < 2; i++) {
        var direction = i == 0 ? prevDir : nextDir;
        drawSegBG(pxPos, direction);
    }
}


//Draws tail (the very last segment) of snake
function drawTail(position, direction, scaler) {
    ctx.fillStyle = rgbToHex(Math.floor(60+10*scaler), Math.floor(60+10*scaler), Math.floor(150+20*scaler));
    drawSegBG(getPxPos(position), direction);
}


//Draws a flat background rectangle for snake segment in specified location/direction
function drawSegBG(pxPos, direction) {
    switch (direction) {
        case 0: ctx.fillRect(pxPos[0] + gridLnSize, //x coord
                             pxPos[1] + gridLnSize, //y coord
                             cellSize - gridLnSize, //width
                             cellSize - 2*gridLnSize); break; //height
        case 2: ctx.fillRect(pxPos[0] + gridLnSize, //x coord
                             pxPos[1] + gridLnSize, //y coord
                             cellSize - 2*gridLnSize, //width
                             cellSize - gridLnSize); break; //height
        case 4: ctx.fillRect(pxPos[0], //x coord
                             pxPos[1] + gridLnSize, //y coord
                             cellSize - gridLnSize, //width
                             cellSize - 2*gridLnSize); break; //height
        case 6: ctx.fillRect(pxPos[0] + gridLnSize, //x coord
                             pxPos[1], //y coord
                             cellSize - 2*gridLnSize, //width
                             cellSize - gridLnSize); break; //height      
    }
}
