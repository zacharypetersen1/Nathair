//Contains the initializer and main game loop

$(document).ready(initDocument);

var docWidth, docHeight;
var canvWidth, canvHeight;
var ctx;
var currentState = [];    //current game state stack
var gameTimeState = 0; //0=forward time - 1=backward time - 2=stuck- game time is stopped
var pastTime, curTime, deltaTime;   //store time at which each frame is called
var updAfter = 200, sinceLastUpd;  //time increment for update and time since last update
var drawTime, drawInterval = 2000, drawScalar; //used for pulsing draw effects
var currentLvl = 0;

//Sets up canvas for the game
function initDocument() {
	console.log("ready");
	docWidth = $(document).width();
	docHeight = $(document).height();
	console.log("doc size: " + docWidth + " " + docHeight);
	
	//get the canvas and context
	canvas = $("#canvas");
	ctx = canvas[0].getContext('2d');
	canvWidth = canvas.width();
	canvHeight = canvas.height();
	
	//initialize the level array
	storeLevels();
	
	//initialize the game
	initGame();
}


//Initializes game
function initGame() {

    //Push main menu onto game stack
    currentState.push(menuBuilder("main_menu"));
    
    //Initialize loop
    pastTime = Date.now();
    sinceLastUpd = 0;
    drawTime = 0;
    gameTimeState = 0;
    setInterval(gameLoop, 60);
}

function gameLoop() {
    
    //get delta time
    curTime = Date.now();
    deltaTime = curTime - pastTime;
   
    //call the loop() function on whatever the current game state is
    currentState[currentState.length-1].loop(deltaTime);
    
    //prep time for next frame
    pastTime = curTime;
}