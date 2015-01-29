//GameFrames record a single moment in the history of the game
//They are stored in a stack so that the history of the game can be rewinded

//Input length-two vectors representing x-y coords
//Outputs direction from first coord to second coord
function getDirection(fromHere, toHere) {
    var isVertical = fromHere[0] == toHere[0];
    switch(isVertical) {
        case true: return fromHere[1] < toHere[1] ? 2 : 6;
        case false: return fromHere[0] < toHere[0] ? 0 : 4;
    }
}


//Duplicates coordinate array while leaving the original untouched
function dupCoordArray(original) {
    var newArray = [];
    for(i in original)
        newArray[i] = [original[i][0], original[i][1]];
    return newArray;
}

//returns the coordinates of the location next to the original coordinates in the dir specified
function getCoords(fromHere, direction) {
    var newCoords = [fromHere[0], fromHere[1]];
    switch(direction) {
        case 0: newCoords[0]++; break;
        case 2: newCoords[1]++; break;
        case 4: newCoords[0]--; break;
        case 6: newCoords[1]--; break;
    }
    return newCoords;
}


//checks if there is collision at specified coordinates
function checkCollision(checkHere) {
    if(checkHere[0] < 0 || checkHere[0] >= cellCountW || 
       checkHere[1] < 0 || checkHere[1] >= cellCountH)
       return true;
    for(i in snake) {
        if(checkHere[0] == snake[i][0] && checkHere[1] == snake[i][1])
            return true;
    }
    
    return false;
}