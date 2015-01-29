//Handles input

 
var leftPrimed  = false;
var downPrimed  = false;
var rightPrimed = false;
var upPrimed    = false;


//Handles keydown event
document.addEventListener("keydown", function(e) {

    if(e.keyCode == 82)
        gameState = 2;

    //Check for direction change if gameState is "forward time"
    if(gameState == 1)
    {
        //Get direction of key that was pressed
        var thisKey = -1;
        switch(e.keyCode) {
            case 37:    thisKey = 4; break;
            case 38:    thisKey = 6; break;
            case 39:    thisKey = 0; break;
            case 40:    thisKey = 2; break;
        }
        
        //update snake's direction if keypress was not arbitrary
        if(thisKey != -1)
            updateDir(thisKey);
    }
});


//Handles keyup event
document.addEventListener("keyup", function(e) {
    if(e.keyCode == 82)
        gameState = 1;
    /*switch(e.keyCode) {
        case 37: leftPrimed = true; break;
        case 38: upPrimed   = true; break;
        case 39: rightPrimed = true; break;
        case 40: downPrimed = true; break;
    }*/
});


//Updates the direction of the snake based on key input
function updateDir(newDir) {
    //prevent user from moving snake's head directly back into itself
    if(newDir != getDirection(snake[0], snake[1]))
        //Don't set the direction if it will just cause a collision
        if(  !checkCollision(getCoords(snake[0], newDir))  )
            dir = newDir;
}