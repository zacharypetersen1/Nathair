//Contains the initializer and main game loop

$(document).ready(initDocument);

var docWidth, docHeight;
var canvWidth, canvHeight;
var ctx;
var gameState = 0; //0=menu - 1=ingame(forward time) - 2=ingame(backward time) - 3=ingame(stuck) 
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
function initGame(){
    
    //load current level
    loadLevel(currentLvl);
    genFruit();
    
    //draw background
    updGridDimension();
    drawBG();
    drawGrid();
    
    //Initialize loop
    pastTime = Date.now();
    sinceLastUpd = 0;
    drawTime = 0;
    gameState = 1;
    setInterval(gameLoop, 60);
}

function gameLoop() {
    
    //get delta time
    curTime = Date.now();
    deltaTime = curTime - pastTime;
   
    //trigger update if sufficient amount of time has passed
    sinceLastUpd += deltaTime;
    if(sinceLastUpd >= updAfter) {
        sinceLastUpd -= updAfter;
        update();
    }
    
    //get drawScalar and call draw
    //EVENTUALLY THIS WILL ONLY OCCUR IF GAME IS ACTIVE
    drawTime += deltaTime;
    drawTime = drawTime % drawInterval;
    drawScalar = Math.sin(drawTime * 2 * Math.PI / drawInterval);
    draw();
    
    //prep time for next frame
    pastTime = curTime;
}