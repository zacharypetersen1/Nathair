//Contains update function

var gameFrames;
var snake;              //stores position of snake
var dir;                //current direction of snake's forward-time movement

function update() {
    if(gameState == 1) {
        gameFrames.push(getDirection(snake[snake.length-2], snake[snake.length-1]));
        snake.pop();
        snake.unshift(getCoords(snake[0], dir));
    }
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