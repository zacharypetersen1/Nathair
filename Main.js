//Contains the initializer and main game loop

$(document).ready(init);

var docWidth, docHeight;
var canvWidth, canvHeight;
var ctx;

function init() {
	console.log("ready");
	docWidth = $(document).width();
	docHeight = $(document).height();
	console.log("doc size: " + docWidth + " " + docHeight);
	
	//get the canvas and context
	canvas = $("#canvas");
	ctx = canvas[0].getContext('2d');
	canvWidth = canvas.width();
	canvHeight = canvas.height();
	
	//draw background
	updGridDimension();
	drawBG();
	drawGrid();
}

function update() {
	
}
