//Contains functions for storing and loading levels

var levels = [];

//Level class
function Level() {
    this.lvlCountW;
    this.lvlCountH;
    this.initialSnake = [];
    this.initialDir;
}


//Creates series of levels and stores them in array
function storeLevels() {
    levels[0] = new Level();
    levels[0].lvlCountW = 10;
    levels[0].lvlCountH = 6;
    levels[0].initialSnake = [[4,3], [3,3], [2,3]];
    levels[0].initialDir = 0;
}


//Loads values stored in level based on given index
function loadLevel(index) {
    cellCountW = levels[index].lvlCountW;
    cellCountH = levels[index].lvlCountH;
    snake = levels[index].initialSnake.splice();
    dir = levels[index].initialDir;
    
    //reset gameFrames
    gameFrames = [[0,0]];
}
