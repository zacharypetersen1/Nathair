//Contains functions for storing and loading levels

var levels = [];

//Level class
function Level() {
    this.lvlCountW;
    this.lvlCountH;
    this.initialSnake = [];
    this.initialDir;
    this.setWalls;
}


//Creates series of levels and stores them in array
function storeLevels() {
    levels[0] = new Level();
    levels[0].lvlCountW = 6;
    levels[0].lvlCountH = 6;
    levels[0].initialSnake = [[1,1], [0,1]];
    levels[0].setWalls = [[2,2], [2,3]];
    levels[0].initialDir = 0;
}


//Initializes level so that it is ready to be played
function initLevel(index){   
    //load current level
    cellCountW = levels[index].lvlCountW;
    cellCountH = levels[index].lvlCountH;
    snake = dupCoordArray(levels[index].initialSnake);
    walls = dupCoordArray(levels[index].setWalls);
    dir = levels[index].initialDir;
    genFruit();
    
    //reset game history 
    gameFrames = [[0,0]];
    wasGrowth = [0];
    
    //update dimensions of grid
    updGridDimension();
}