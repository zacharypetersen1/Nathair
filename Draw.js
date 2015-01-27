//Contains drawing methods for various game objects

//used to create playing grid
var gridX, gridY;           //origin of grid
var cellCountW = 15, cellCountH = 10; //number of cells wide and high
var cellSize;               //size of each cell
var gridWidth, gridHeight;  //total size of grid
var gridLnSize;             //size of grid lines


//converts RGB value to Hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

//evaluates best grid dimensions to best fit within canvas' size (right now, assuming canvas is square)
function updGridDimension() {
    
    //determine the optimal cell size
    var limitingVal = cellCountW > cellCountH ? cellCountW : cellCountH;
    cellSize = canvWidth/limitingVal;
    gridLnSize = Math.round(cellSize*.15);
    if(gridLnSize == 0)
        gridLnSize = 1;
    console.log("cell size: " + cellSize);
    console.log("canvas size: " + canvWidth);
    console.log("used size: " + (cellSize*limitingVal));

    //set grid width and height
    gridWidth = cellSize * cellCountW;
    gridHeight = cellSize * cellCountH;
    console.log("grid width: " + gridWidth);
    console.log("grid height: " + gridHeight);
    
    //determine the origin point of the grid
    gridX = cellCountW < limitingVal ? (canvWidth-gridWidth)/2 : 0; //half of the difference between real height and used height
    gridY = cellCountH < limitingVal ? (canvWidth-gridHeight)/2 : 0; 
    console.log("grid x: " + gridX);
    console.log("grid y: " + gridY);
}

function drawBG() {
    ctx.fillStyle = rgbToHex(255,255,255);
    ctx.fillRect(0,0, canvWidth, canvHeight);
    ctx.fillStyle = rgbToHex(200,200,200);
    ctx.fillRect(gridX,gridY, gridWidth,gridHeight);
}

function drawGrid() {
    ctx.strokeStyle = rgbToHex(255,255,255);
    ctx.lineWidth = gridLnSize;
    
    var i = 0;
    for(i; i <= cellCountW; i++) {
        ctx.beginPath();
        ctx.moveTo(gridX + cellSize*i, gridY);
        ctx.lineTo(gridX + cellSize*i, gridY + gridHeight);
        ctx.stroke();
    }
    
    i = 0;
    for(i; i <= cellCountH; i++) {
        ctx.beginPath();
        ctx.moveTo(gridX, gridY + cellSize*i);
        ctx.lineTo(gridX + gridWidth, gridY + cellSize*i);
        ctx.stroke();
    }
}