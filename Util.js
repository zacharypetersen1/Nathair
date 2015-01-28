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
