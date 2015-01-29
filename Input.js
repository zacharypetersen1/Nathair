//Handles input

 
var leftPrimed  = false;
var downPrimed  = false;
var rightPrimed = false;
var upPrimed    = false;


//Handles keydown event
document.addEventListener("keydown", function(e) {

    //Check for direction change if gameState is "forward time"
    if(gameState == 1)
    {
        //Get direction of key that was pressed
        var thisKey = -1;
        switch(e.keyCode) {
            case 37:    thisKey = leftPrimed ? 4 : -1; 
                        leftPrimed = false; break;
            case 38:    thisKey = upPrimed ? 6 : -1;
                        upPrimed = false; break;
            case 39:    thisKey = rightPrimed ? 0 : -1;
                        upPrimed = false; break;
            case 40:    thisKey = downPrimed ? 2 : -1;
                        downPrimed = false; break;
        }
        
        //update snake's direction if keypress was not arbitrary
        if(thisKey != -1)
            updateDir(thisKey);
    }
});


//Handles keyup event
document.addEventListener("keyup", function(e) {
    switch(e.keyCode) {
        case 37: leftPrimed = true; break;
        case 38: upPrimed   = true; break;
        case 39: rightPrimed = true; break;
        case 40: downPrimed = true; break;
    }
});


//Updates the direction of the snake based on key input
function updateDir(newDir) {
    //prevent user from moving snake's head directly back into itself
    if(newDir != getDirection(snake[0], snake[1]))
        dir = newDir;
}