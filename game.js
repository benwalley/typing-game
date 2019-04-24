var canvas = $('#mainCanvas')[0];
var ctx = canvas.getContext('2d');
var startButton = $(".startButton");
var restartButton = $(".restartButton");
var difficultyButton = $(".difficultyButton");

var gameData = {
	speed: 1,
	running: true,
	screenWidth: undefined,
	screenHeight: undefined,
	currentSprite: "basic",
	defaultSprite: "basic",
	playerHeight: 0,
	spriteHeight: 250,
	spriteWidth: 150,
	currentAnimation: undefined,
	currentAnimationFrame: 0
}

var spritePaths = {
	basic: {x: 0, y: 0, width: 150, height: 325},
	attackHand: {x: 600, y: 0, width:250, height: 325},
	crossedArms: {x: 150, y: 320, width:130, height: 250},
	chestAttack: {x: 280, y: 320, width:200, height: 250},
	leftHand: {x: 1000, y:50, width:300, height: 250}

}

var animations = {
	attack: ["attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand",
	"attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand", "attackHand"],
	chestAttack: ['crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms',
	'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 'crossedArms', 
	'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack',
	'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 
	'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack', 'chestAttack'],
	leftAttack: ['leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 
	'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand', 'leftHand']
}

function createGame() {

	addListeners();
	resetCanvasSize();
	resetGame();
	startGame();
	console.log("created game")
}

function addListeners() {
	// remove any listeners first
	startButton.off();
	restartButton.off();
	difficultyButton.off();
	// then add listeners
	startButton.on("click", handleStart);
	restartButton.on("click", handleRestart);
	gameData.currentAnimation = animations.attack;
}

function handleStart() {
	console.log("starting from handleStart")
}

function handleRestart() {
	console.log("restarting from handleRestart")
}

function resetCanvasSize() {
	gameData.screenWidth = window.innerWidth;
	gameData.screenHeight = window.innerHeight;
	canvas.width = gameData.screenWidth;
	canvas.height = gameData.screenHeight;
	console.log("reseting canvas size");
}

function resetGame() {
	$(window).off();
	console.log("game has been reset")
	$(window).on("resize", function() {
		resetCanvasSize();
	})
}

function startGame() {
	console.log("game is started");
	window.requestAnimationFrame(draw);
}



function getNextAnimationFrame() {
	var animation = gameData.currentAnimation;
	var frame = gameData.currentAnimationFrame;
	if(frame == animation.length) {
		gameData.currentAnimation = undefined;
		gameData.currentSprite = gameData.defaultSprite;
	} else {
		gameData.currentSprite = animation[frame];
	}
	gameData.currentAnimationFrame = gameData.currentAnimationFrame + 1
}

function drawPlayer() {
	if(gameData.currentAnimation) {
		getNextAnimationFrame();
	}
	var x = 50;
	var y = (gameData.screenHeight / 2) - gameData.spriteHeight;
	let image = $("#playerSprite")[0];
	var sprite = spritePaths[gameData.currentSprite];
	ctx.drawImage(image, sprite.x, sprite.y, sprite.width, sprite.height, x, y, sprite.width, sprite.height)
}

function playerAttack(x, y) {
	gameData.currentAnimation = animations.attack;
	gameData.currentAnimationFrame = 0;
}

function draw() {
	if(gameData.running) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawPlayer();
		window.requestAnimationFrame(draw);
	}
}


if (canvas.getContext) {
	createGame()
} else {
  	alert("canvas is not supported or there was an error loading the page")
}