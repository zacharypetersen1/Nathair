//Contains update function

var gameFrames;
var snake;              //stores position of snake
var dir;                //current direction of snake's forward-time movement
var fruitPos;

function update() {
    
    //This block runs if game is moving in forward time
    if(gameState == 1) {
        
        //Find the next pos that snake will move to, exit function if that pos triggers collision
        var newLocation = getCoords(snake[0], dir);
        if(checkCollision(newLocation))
            return;
        
        //record if new pos collides with fruit
        var fruitCol = (newLocation[0] == fruitPos[0] && newLocation[1] == fruitPos[1]);
        
        //adjust snake
        gameFrames.push(getDirection(snake[snake.length-2], snake[snake.length-1]));
        if(!fruitCol)
            snake.pop();    //if ate fruit, don't pop tail
        else
            genFruit();
        snake.unshift(newLocation);
    }
    //This block runs if game is moving in backward time
    else if(gameState == 2) {
        //Do nothing if gameFrames is at first index
        if(gameFrames.length != 1)
        {
            snake.shift();
            snake.push(getCoords(snake[snake.length-1], gameFrames[gameFrames.length-1]));
            gameFrames.pop();
            dir = getDirection(snake[1], snake[0]);
        }
    }
}


//Generates a fruit in empty location
function genFruit() {
    var openCells = [];
    var w, h;
    
    //Loop through every cell and store if it is empty
    for(w = 0; w < cellCountW; w++)
        for(h = 0; h < cellCountH; h++) {
            if(!checkCollision([w,h]))
                openCells.push([w,h]);
        }
        
    console.log("arraylng: " + openCells.length);
    var selectedIndex = Math.floor(Math.random() * (openCells.length));
    console.log(selectedIndex);
    fruitPos = openCells[selectedIndex];
}