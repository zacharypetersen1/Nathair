//Handles input

 
var leftPrimed  = false;
var downPrimed  = false;
var rightPrimed = false;
var upPrimed    = false;


//Handles keydown event
document.addEventListener("keydown", function(e) {
    //Call keyUp function on current game state
    currentState[currentState.length-1].keyDown(e);
});


//Handles keyup event
document.addEventListener("keyup", function(e) {
    //Call keyUp function on current game state
    currentState[currentState.length-1].keyUp(e);
});


//Updates the direction of the snake based on key input
function updateDir(newDir) {
    //prevent user from moving snake's head directly back into itself
    if(newDir != getDirection(snake[0], snake[1]))
        //Don't set the direction if it will just cause a collision
        if(  !checkCollision(getCoords(snake[0], newDir))  )
            dir = newDir;
}