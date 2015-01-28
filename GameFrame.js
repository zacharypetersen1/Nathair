//GameFrames record a single moment in the history of the game
//They are stored in a stack so that the history of the game can be rewinded

function GameFrame() {
	this.forTimeDir;
	this.backTimeDir;
	this.gameState;
}
