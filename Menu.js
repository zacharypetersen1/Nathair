//Contains structures used to build menu objects
//Menus are treated as game states

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

//Provides menu structure that acts as a game state
function Menu () {
    //TODO define selectable and non-selectable components list
    this.menu_components = [];
    this.active_component = 0;
}

//Loop function that is run by all menu objects
Menu.prototype.loop = function (delta) {
    //Call draw function for all components attached to this menu
    for(i in this.menu_components) {
        if(i == this.active_component)
            this.menu_components[i].draw("active");
        else this.menu_components[i].draw("inactive");
    }
};

//keyDown function that is run by all menu objects
Menu.prototype.keyDown = function (e) {
    
    //If 'R' key is pressed, trigger the active menu component
    if(e.keyCode == 82) {
        this.menu_components[this.active_component].onEvent();
    }
    //If arrow key is pressed, scroll selection to corresponding MenuComponent
    //Up arrow
    if(e.keyCode == 38) {
        if(this.active_component > 0)
            this.active_component--;
    }
    //Down arrow
    if(e.keyCode == 40) {
        if(this.active_component < this.menu_components.length-1)
            this.active_component++;
    }
    
};

//keyUp function that is run by all menu objects
Menu.prototype.keyUp = function (e) {
    //No keyUp actions in Menu objects
};


//Provides structure for components or 'buttons' that can be added to menu objects
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

//Draws the component
MenuComponent.prototype.draw = function(style) {
    //TODO customize draw function based on variables in 'this'
    if(style == "active");
        ctx.fillStyle = rgbToHex(255,255,0);
    if(style == "inactive")
        ctx.fillStyle = rgbToHex(0,0,0);
    ctx.fillText(this.name, this.x, this.y);
};
