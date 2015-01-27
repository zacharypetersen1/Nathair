//Contains the initializer and main game loop

$(document).ready(init);

var docWidth, docHeight;
var width, height;
var context;

function init() {
	console.log("ready");
	docWidth = $(document).width();
	docHeight = $(document).height();
	console.log(docWidth + " " + docHeight);
	
	//get the canvas and context
	canvas = $("#canvas");
	context = canvas[0].getContext('2d');
	width = canvas.width();
	height = canvas.height();
	
	//draw background
	context.fillStyle = '#5050ff';
	context.fillRect(0,0, width,height);
}

function update() {
	
}
