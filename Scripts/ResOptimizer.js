//Optimizes game to fit window resolution


//used to create playing grid
var gridX, gridY;           //origin of grid
var cellCountW, cellCountH; //number of cells wide and high
var cellSize;               //size of each cell
var gridWidth, gridHeight;  //total size of grid
var gridLnSize;             //size of grid lines


//evaluates best grid dimensions to best fit within canvas' size (right now, assuming canvas is square)
function updGridDimension() {
    
    //determine the optimal cell size
    var limitingVal = cellCountW > cellCountH ? cellCountW : cellCountH;
    cellSize = canvWidth/limitingVal;
    gridLnSize = Math.round(cellSize*.15);
    if(gridLnSize == 0) gridLnSize = 1;
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