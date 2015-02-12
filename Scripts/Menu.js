//Contains structures used to build menu objects
//Menus are treated as game states

//Provides menu structure that acts as a game state
function Menu () {
    //list of menu components that will be treated as selectable
    this.selectable_components = [];
    //list of menu components that will only be drawn- i.e. no selection capabilities
    this.decoration_components = [];
    //index of active component within selectable_components
    this.active_component = 0;
}

//Loop function that is run by all menu objects
Menu.prototype.loop = function (delta) {
    //Draw background first
    drawBG(rgbToHex(255,255,255));
    //Call draw function for all components attached to this menu
    ctx.textAlign = "center";
    for(i in this.selectable_components) {
        if(i == this.active_component)
            this.selectable_components[i].draw("active");
        else this.selectable_components[i].draw("inactive");
    }
    for(i in this.decoration_components) {
        this.decoration_components[i].draw("inactive");
    }
};

//keyDown function that is run by all menu objects
Menu.prototype.keyDown = function (e) {
    
    //If 'Enter' key is pressed, trigger the active menu component
    if(e.keyCode == 13) {
        this.selectable_components[this.active_component].onEvent();
    }
    //If arrow key is pressed, scroll selection to corresponding MenuComponent
    //Up arrow
    if(e.keyCode == 38) {
        if(this.active_component > 0)
            this.active_component--;
    }
    //Down arrow
    if(e.keyCode == 40) {
        if(this.active_component < this.selectable_components.length-1)
            this.active_component++;
    }
    
};

//keyUp function that is run by all menu objects
Menu.prototype.keyUp = function (e) {
    //No keyUp actions in Menu objects
};
   

//Provides structure for components that can act as 'buttons' or 'decorations' for menu objects
function MenuComponent() {
    //Name should be overwritten after creating menuComponent
    this.name = "No Name Asigned";
    //All position and size variables are treated as percentages of the canvas size
    this.x = 0;
    this.y = 0;
    this.txtSize = .1;
    //TODO add more variables to customize drawing of this component
    //onEvent() should be overwritten after menuComponent is created
    this.onEvent = function() {
        console.log("Error- onEvent() function for this component was not defined");
    };
}


//Draws the component
MenuComponent.prototype.draw = function(style) {
    //TODO customize draw function based on variables in 'this'
    var pxSize = Math.floor(this.txtSize*canvHeight);
    ctx.font = pxSize.toString() + "px Ariel";
    if(style == "active");
        ctx.fillStyle = rgbToHex(255,255,0);
    if(style == "inactive")
        ctx.fillStyle = rgbToHex(0,0,0);
    ctx.fillText(this.name, this.x*canvWidth, this.y*canvHeight);
};


//Builds and returns menu of specified type
function menuBuilder(type) {
    var new_menu = new Menu();
    switch(type) {
        case "main_menu":
            //add Game name
            temp = new MenuComponent();
            temp.name = "-Nathair-";
            temp.x = .5;
            temp.y = .2;
            temp.txtSize = .2;
            new_menu.decoration_components.push(temp);
            //add play button to main menu
            var temp = new MenuComponent();
            temp.name = "Play";
            temp.x = .5;
            temp.y = .35;
            temp.onEvent = function() {
                currentLvl = 0;
                initLevel(currentLvl);
                currentState.push(new InGameState);
            };
            new_menu.selectable_components.push(temp);
            //add controls button
            temp = new MenuComponent();
            temp.name = "Controls";
            temp.x = .5;
            temp.y = .5;
            temp.onEvent = function() {
                currentState.push(menuBuilder("controls_menu"));
            };
            new_menu.selectable_components.push(temp);
            
            //add about button
            temp = new MenuComponent();
            temp.name = "About";
            temp.x = .5;
            temp.y = .65;
            temp.onEvent = function() {
                currentState.push(menuBuilder("about_menu"));
            };
            new_menu.selectable_components.push(temp);
            
            break;
        case "controls_menu": 
            //add 'back' button- returns to main menu
            var temp = new MenuComponent();
            temp.name = "Back";
            temp.x = .5;
            temp.y = .8;
            temp.onEvent = function() {
                currentState.pop();
            };
            new_menu.selectable_components.push(temp);
            //add controls info
            temp = new MenuComponent();
            temp.name = "Use arrow keys to direct snake";
            temp.x = .5;
            temp.y = .4;
            temp.txtSize = .08;
            new_menu.decoration_components.push(temp);
            //add controls info
            temp = new MenuComponent();
            temp.name = "Hold 'R' key to re-wind time";
            temp.x = .5;
            temp.y = .6;
            temp.txtSize = .08;
            new_menu.decoration_components.push(temp);
            break;
        case "about_menu":
            //add 'back' button- returns to main menu
            var temp = new MenuComponent();
            temp.name = "Back";
            temp.x = .5;
            temp.y = .9;
            temp.onEvent = function() {
                currentState.pop();
            };
            new_menu.selectable_components.push(temp);
            //add controls info
            temp = new MenuComponent();
            temp.name = "Nathair is the Irish word for 'Snake'.";
            temp.x = .5;
            temp.y = .1;
            temp.txtSize = .06;
            new_menu.decoration_components.push(temp);
            //add controls info
            temp = new MenuComponent();
            temp.name = "In this game- reminiscent of classic";
            temp.x = .5;
            temp.y = .2;
            temp.txtSize = .06;
            new_menu.decoration_components.push(temp);
            temp = new MenuComponent();
            temp.name = "snake- you try to grow until filling";
            temp.x = .5;
            temp.y = .3;
            temp.txtSize = .06;
            new_menu.decoration_components.push(temp);
            temp = new MenuComponent();
            temp.name = "the entire screen. If you get stuck,";
            temp.x = .5;
            temp.y = .4;
            temp.txtSize = .06;
            new_menu.decoration_components.push(temp);
            temp = new MenuComponent();
            temp.name = "just hold 'R' to re-wind time!";
            temp.x = .5;
            temp.y = .5;
            temp.txtSize = .06;
            new_menu.decoration_components.push(temp);
            
            break;
        case "pause_menu" :
         
            //add Game name
            temp = new MenuComponent();
            temp.name = "-Pause-";
            temp.x = .5;
            temp.y = .2;
            temp.txtSize = .15;
            new_menu.decoration_components.push(temp);
            //add resume button
            temp = new MenuComponent();
            temp.name = "Resume";
            temp.x = .5;
            temp.y = .45;
            temp.onEvent = function() {
                currentState.pop();
            };
            new_menu.selectable_components.push(temp);
            //add controls button
            temp = new MenuComponent();
            temp.name = "Controls";
            temp.x = .5;
            temp.y = .6;
            temp.onEvent = function() {
                currentState.push(menuBuilder("controls_menu"));
            };
            new_menu.selectable_components.push(temp);
            
            //add about button
            temp = new MenuComponent();
            temp.name = "About";
            temp.x = .5;
            temp.y = .75;
            temp.onEvent = function() {
                currentState.push(menuBuilder("about_menu"));
            };
            new_menu.selectable_components.push(temp);
            break;
        case "levelComplete_menu": 
            //add 'continue' button- moves to next level
            var temp = new MenuComponent();
            temp.name = "Next Level";
            temp.x = .5;
            temp.y = .8;
            temp.onEvent = function() {
                currentLvl++;
                initLevel(currentLvl);
                currentState.pop();
            };
            new_menu.selectable_components.push(temp);
            //add decorations info
            temp = new MenuComponent();
            temp.name = "Level Completed!";
            temp.x = .5;
            temp.y = .4;
            temp.txtSize = .08;
            new_menu.decoration_components.push(temp);
            break;
        case "gameComplete_menu": 
            //add 'continue' button- moves to next level
            var temp = new MenuComponent();
            temp.name = "Main Menu";
            temp.x = .5;
            temp.y = .8;
            temp.onEvent = function() {
                //Pop twice to get back to main menu
                currentState.pop();
                currentState.pop();
            };
            new_menu.selectable_components.push(temp);
            //add decorations
            temp = new MenuComponent();
            temp.name = "Congrats!";
            temp.x = .5;
            temp.y = .4;
            temp.txtSize = .08;
            new_menu.decoration_components.push(temp);
            //add decorations
            temp = new MenuComponent();
            temp.name = "You completed the game!";
            temp.x = .5;
            temp.y = .6;
            temp.txtSize = .08;
            new_menu.decoration_components.push(temp);
            break;    
    }
    //return the new menu object
    return new_menu;
}
