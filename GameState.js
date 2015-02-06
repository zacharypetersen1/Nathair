//Builds and returns menu of specified type
function menuBuilder(type) {
    var new_menu = new Menu();
    switch(type) {
        case "main_menu":
            //add play button to main menu
            var temp = new MenuComponent();
            temp.name = "Play";
            temp.x = 50;
            temp.y = 50;
            temp.onEvent = function() {
                currentLevel = 0;
                initLevel(currentLevel);
                currentState.push(new InGameState);
            };
            new_menu.menu_components.push(temp);
            //add controls button
            temp = new MenuComponent();
            temp.name = "Controls";
            temp.x = 50;
            temp.y = 70;
            temp.onEvent = function() {
                console.log("go to controls menu");
            };
            new_menu.menu_components.push(temp);
            //TODO add controls to main menu
            break;
        case "controls_menu": 
            //TODO add components to conrols menu
            break;
    }
    //return the new menu object
    return new_menu;
}

//Provides menu structure that can be run as a game state
function Menu () {
    //TODO define selectable and non-selectable components list
    this.menu_components = [];
    this.active_component = 0;
}

//Loop function that is run by all menu objects
Menu.prototype.loop = function (delta) {
    //Call draw function for all components attached to this menu
    for(i in this.menu_components) {
        this.menu_components[i].draw();
    }
};

//keyDown function that is run by all menu objects
Menu.prototype.keyDown = function (e) {
    //TODO check for selection changes with arrow keys- alter menu components accordingly
    
    //If 'R' key is pressed, trigger the active menu component
    if(e.keyCode == 82) {
        this.menu_components[this.active_component].onEvent();
    }
};

//keyUp function that is run by all menu objects
Menu.prototype.keyUp = function (e) {
    //No keyUp actions in Menu objects
};


//Provides structure for components or 'buttons' to be added to menu objects
function MenuComponent() {
    //Name should be overwritten after creating menuComponent
    this.name = "No Name Asigned";
    this.x = 0;
    this.y = 0;
    //TODO add more variables to customize drawing of this component
    //onEvent() should be overwritten after menuComponent is created
    this.onEvent = function() {
        console.log("Error- onEvent() function for this component was not defined");
    };
}

MenuComponent.prototype.draw = function(style) {
    //TODO customize draw function based on variables in 'this'
    ctx.fillText(this.name, this.x, this.y);
};


//In-game game state
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
