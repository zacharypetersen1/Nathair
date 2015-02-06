//Contains update function that is called from InGameState object

var gameFrames;     //an array that stores history of snake's movement directions
var wasGrowth;      //an array that stores history of snake's growth

var snake;              //stores position of snake
var dir;                //current direction of snake's forward-time movement
var fruitPos;
var lastHeadPos;        //records last position of snake's head while time is going backwards
var addToTail = 0;      //If this # is > 0, tail segment will be added

function update() {
    //This block runs if game is moving in forward time
    if(gameTimeState == 0) {
        
        //Find the next pos that snake will move to, exit function if that pos triggers collision
        var newLocation = getCoords(snake[0], dir);
        if(checkCollision(newLocation))
            return;
        
        //record if new pos collides with fruit
        var fruitCol = (newLocation[0] == fruitPos[0] && newLocation[1] == fruitPos[1]);
        if(fruitCol)
            addToTail += 3;
        
        //record history information
        gameFrames.push(getDirection(snake[snake.length-2], snake[snake.length-1]));
        if(fruitCol)
            wasGrowth.push(2);  //means snake 'ate' a fruit on this frame and tail grew
        else if(addToTail > 0)
            wasGrowth.push(1);  //means snake did not 'eat' fruit but tail grew
        else
            wasGrowth.push(0);  //means snake did not 'eat' fruit or grow tail
        
        //adjust snake
        snake.unshift(newLocation);
        if(addToTail > 0)
            addToTail --;
        else
           snake.pop();    //if need to add tail segment, don't pop tail     
        
        //If there was a collision reset fruit (must be after adjusting snake)
        if(fruitCol)
            genFruit();
            
        //record head position- used to reset fruit if player rewinds game
        lastHeadPos = snake[0];
    }
    //This block runs if game is moving in backward time
    else if(gameTimeState == 1) {
        //Do nothing if gameFrames is at first index
        if(gameFrames.length != 1)
        {
            //since snake is moving backwards, remove head of snake
            snake.shift();
            //reset fruit position if it was eaten on this frame
            if(wasGrowth[wasGrowth.length-1] == 2)
                fruitPos = lastHeadPos;
            //if the snake was growing on this frame, it must be shrinking when time is reversed
            if(wasGrowth[wasGrowth.length-1] == 0)
                snake.push(getCoords(snake[snake.length-1], gameFrames[gameFrames.length-1]));
            //update growth variables
            else if(wasGrowth[wasGrowth.length-1] == 1)
                addToTail++;
            else if(wasGrowth[wasGrowth.length-1] == 2)
                addToTail -= 2;
            //remove this frame from history
            gameFrames.pop();
            wasGrowth.pop();
            dir = getDirection(snake[1], snake[0]);
            
            //record head position- used to reset fruit if player rewinds game
            lastHeadPos = snake[0];
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
        
    var selectedIndex = Math.floor(Math.random() * (openCells.length));
    fruitPos = openCells[selectedIndex];
}