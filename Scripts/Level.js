//Contains functions for storing and loading levels

var levels = [];

//Level class
function Level() {
    this.lvlCountW;
    this.lvlCountH;
    this.initialSnake = [];
    this.initialDir;
    this.setWalls;
    this.openCells;
}


//Creates series of levels and stores them in array
function storeLevels() {
   
    levels[levels.length] = new Level();
    levels[levels.length-1].lvlCountW = 6;
    levels[levels.length-1].lvlCountH = 6;
    levels[levels.length-1].initialSnake = [[0,1], [0,0]];
    levels[levels.length-1].setWalls = [[1,2], [2,2], [3,2], [2,0], [3,0], [1,3], [1,4], [4,2], [4,3], [4,4]];
    levels[levels.length-1].initialDir = 2;
   
    levels[levels.length] = new Level();
    levels[levels.length-1].lvlCountW = 4;
    levels[levels.length-1].lvlCountH = 4;
    levels[levels.length-1].initialSnake = [[1,3], [0,3]];
    levels[levels.length-1].setWalls = [[2,1], [2,2]];
    levels[levels.length-1].initialDir = 0;
    
    levels[levels.length] = new Level();
    levels[levels.length-1].lvlCountW = 4;
    levels[levels.length-1].lvlCountH = 4;
    levels[levels.length-1].initialSnake = [[2,3], [1,3]];
    levels[levels.length-1].setWalls = [[0,3], [3,3], [3,0], [0,0]];
    levels[levels.length-1].initialDir = 0;
}


//Initializes level so that it is ready to be played
function initLevel(index){
       
    //load current level
    cellCountW = levels[index].lvlCountW;
    cellCountH = levels[index].lvlCountH;
    snake = dupCoordArray(levels[index].initialSnake);
    addToTail = 0;
    walls = dupCoordArray(levels[index].setWalls);
    dir = levels[index].initialDir;
    genFruit();
    
    //reset game history 
    gameFrames = [[0,0]];
    wasGrowth = [0];
    
    //update dimensions of grid
    updGridDimension();
    
    //store number of open cells- to check when snake fills whole level
    openCells = cellCountW * cellCountH - walls.length;
}