//Contains state object to handle the actual game after play is selected from menu

//In-game
function InGameState() {
    this.loop = function(delta) {
        //trigger update if sufficient amount of time has passed
        sinceLastUpd += delta;
        if(sinceLastUpd >= updAfter) {
            sinceLastUpd -= updAfter;
            update();
        }
        
        //get drawScalar and call draw
        //TODO alter time change based on in-game time
        drawTime += delta;
        drawTime = drawTime % drawInterval;
        drawScalar = Math.sin(drawTime * 2 * Math.PI / drawInterval);
        draw();
    };
    
    this.keyDown = function(e) {
        //pause the game if escape was pressed 
        if(e.keyCode == 27)  
            currentState.push(menuBuilder("pause_menu"));
            
        if(e.keyCode == 82)
            gameTimeState = 1;
        //Check for direction change if gameState is "forward time"
        if(gameTimeState == 0)
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
    };
    
    this.keyUp = function(e) {
        if(e.keyCode == 82)
            gameTimeState = 0;
    };
}