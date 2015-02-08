//Contains utility drawing methods along with draw() function called from InGameState

var pattern_horiz = new Image();
pattern_horiz.src = "pattern_horiz.png";
var pattern_vert = new Image();
pattern_vert.src = "pattern_vert.png";
var pattern_c02 = new Image();          //Corner of direction 0 and 2
pattern_c02.src = "pattern_c02.png";
var pattern_c06 = new Image();          //Corner of direction 0 and 6
pattern_c06.src = "pattern_c06.png";
var pattern_c24 = new Image();          //Corner of direction 2 and 4
pattern_c24.src = "pattern_c24.png";
var pattern_c46 = new Image();          //Corner of direction 4 and 6
pattern_c46.src = "pattern_c46.png";

var head_0 = new Image();
head_0.src = "head_0.png";
var head_2 = new Image();
head_2.src = "head_2.png";
var head_4 = new Image();
head_4.src = "head_4.png";
var head_6 = new Image();
head_6.src = "head_6.png";

var tail_0 = new Image();
tail_0.src = "tail_0.png";
var tail_2 = new Image();
tail_2.src = "tail_2.png";
var tail_4 = new Image();
tail_4.src = "tail_4.png";
var tail_6 = new Image();
tail_6.src = "tail_6.png";



//Main draw function called from game loop within InGameState
function draw() {
    //draw background
    drawBG(rgbToHex(255,255,255));
    drawGrid();
    drawSnake();
    drawFruit(fruitPos);
}


//converts RGB value to Hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


//Draws solid background
function drawBG(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0,0, canvWidth, canvHeight);
}


//Draws grid lines (call after drawing background)
function drawGrid() {
    
    //Flat background color of grid
    ctx.fillStyle = rgbToHex(200,200,200);
    ctx.fillRect(gridX,gridY, gridWidth,gridHeight);

    //Grid lines
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
    colorScaler = Math.cos(0);
    drawHead(snake[0], getDirection(snake[0], snake[1]), colorScaler);
    //loop and draw all body segments
    var i = 1;
    var end = snake.length-1;
    for(i; i < end; i++)
    {   
        count = ++count % 10;
        colorScaler = Math.cos(count*Math.PI*2/10);
        drawBody(snake[i], getDirection(snake[i], snake[i-1]),
                 getDirection(snake[i], snake[i+1]), colorScaler);
    }
    //draw tail
    count = ++count % 10;
    colorScaler = Math.cos(count*Math.PI*2/10);
    drawTail(snake[end], getDirection(snake[end], snake[end-1]), colorScaler);
}


//Draws head of the snake
function drawHead(position, direction, scaler) {
    var pxPos = getPxPos(position);
    
    //Draw solid background color
    ctx.fillStyle = rgbToHex(Math.floor(60+6*scaler), Math.floor(60+6*scaler), Math.floor(150+12*scaler));
    drawSegBG(pxPos, direction);
    
    //Draw correct pattern image of head
    if(direction == 0)
        ctx.drawImage(head_0,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(direction == 2)
        ctx.drawImage(head_2,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(direction == 4)
        ctx.drawImage(head_4,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(direction == 6)
        ctx.drawImage(head_6,pxPos[0],pxPos[1],cellSize,cellSize);
}


//draws a single body segment of snake- direction1 prevDir direction to previous segment
//nextDir is direction to next segment
function drawBody(position, prevDir, nextDir, scaler) {
    ctx.fillStyle = rgbToHex(Math.floor(60+10*scaler), Math.floor(60+10*scaler), Math.floor(150+20*scaler));
    var pxPos = getPxPos(position);
    
    //Draw solid background color
    for(i = 0; i < 2; i++) {
        var direction = i == 0 ? prevDir : nextDir;
        drawSegBG(pxPos, direction);
    }
    
    //Draw the correct pattern image
    if(prevDir + nextDir == 4)
        ctx.drawImage(pattern_horiz,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(prevDir + nextDir == 8)
        ctx.drawImage(pattern_vert,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(prevDir + nextDir == 2)
        ctx.drawImage(pattern_c02,pxPos[0],pxPos[1],cellSize,cellSize);
    else if((prevDir == 0 && nextDir == 6) || (prevDir == 6 && nextDir == 0))
        ctx.drawImage(pattern_c06,pxPos[0],pxPos[1],cellSize,cellSize);    
    else if((prevDir == 2 && nextDir == 4) || (prevDir == 4 && nextDir == 2))
        ctx.drawImage(pattern_c24,pxPos[0],pxPos[1],cellSize,cellSize);    
    else if(prevDir + nextDir == 10)
        ctx.drawImage(pattern_c46,pxPos[0],pxPos[1],cellSize,cellSize);
    
}


//Draws tail (the very last segment) of snake
function drawTail(position, direction, scaler) {
    var pxPos = getPxPos(position);
    
    //Draw flat background color
    ctx.fillStyle = rgbToHex(Math.floor(60+10*scaler), Math.floor(60+10*scaler), Math.floor(150+20*scaler));
    drawSegBG(pxPos, direction);
    
    //Draw correct pattern image of tail
    if(direction == 0)
        ctx.drawImage(tail_0,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(direction == 2)
        ctx.drawImage(tail_2,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(direction == 4)
        ctx.drawImage(tail_4,pxPos[0],pxPos[1],cellSize,cellSize);
    else if(direction == 6)
        ctx.drawImage(tail_6,pxPos[0],pxPos[1],cellSize,cellSize);
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

function drawPattern(pxPos) {
    ctx.drawImage(pattern_horiz,pxPos[0],pxPos[1],cellSize,cellSize);
}
