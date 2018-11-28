import Bat from './bat.js';
import Ball from './ball.js';
import Block from './block.js';

var bat = new Bat(50, 5);
var ball = new Ball(bat, 5, 'rgb(200, 0, 0)');
var blocks = [];

var animationToken;
var canvas = { width: 640, height: 480 }; //fake it until set properly
var ctx;

var fpsDisplay = document.getElementById('fpsDisplay');

// The maximum FPS we want to allow
var maxFPS = 60; 

// simulate 1000 ms / 60 FPS = 16.667 ms per frame every time we run update()
var timestep = 1000 / maxFPS; 

var fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    delta = 0,
    lastFrameTime = 0;

function main(timestamp) {
    // Throttle the frame rate.
    if (timestamp < (lastFrameTime + timestep)) {
        animationToken = requestAnimationFrame(main);
        return;
    }
    delta += timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    fps = calcFPS(timestamp);
    
    var updateSteps = 0;
    while (delta >= timestep) {
	update(timestep);
	delta -= timestep;
	if(++updateSteps >= 240) {
	    panic();
	    break;
	}
    }
    
    render();
    animationToken = window.requestAnimationFrame(main);
};

function calcFPS(timestamp) {
    if (timestamp > lastFpsUpdate + 1000) {
        fps = 0.25 * framesThisSecond + 0.75 * fps;

        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;

    return fps;
}

function start() {
    if (!canvas) {
	console.error("No canvas defined.");
	return;
    }

    //create blocks;
    // TODO: make this less crap ;-)
    var i;
    var row;
    var xPos = 20;
    var yPos = 50;
    var colors = ['rgb(230, 0, 0)', 'rgb(230, 115, 0)', 'rgb(230, 230, 0)', 'rgb(38, 230, 0)', 'rgb(0, 38, 230)'];
    var blockWidth = 55;
    var blockHeight = 25;

    for (row = 0; row < 5; row++) {
	xPos = 20;
	for (i = 0; i < 10; i++) {
	    blocks.push(new Block(xPos, yPos, blockWidth, blockHeight, colors[row]));
	    xPos += blockWidth + 5;
	}
	yPos += blockHeight + 5;
    }
    // setup initial positions
    bat.x = (canvas.width / 2) - (bat.width / 2);
    bat.y = canvas.height - 20;
    ball.initialise(bat);
    
    main(0);
}

function stop() {
    window.cancelAnimationFrame(animationToken);
};

function panic() {
    console.error("Panic! - things are running too slowly");
    delta = 0;
}

function update(delta) {
    ball.update(canvas, delta, bat);
}

function render() {
    if (ctx) {
	ctx.clearRect(0, 0, 640, 480);

	bat.draw(ctx);

	ball.draw(ctx);

	blocks.forEach(function (block) {
	    block.draw(ctx);
	});
	
	//display fps
	fpsDisplay.textContent = Math.round(fps) + ' FPS';
    }
}

function setCanvas(newCanvas) {
    canvas = newCanvas;

   if (canvas.getContext) {
	ctx = canvas.getContext("2d");
    } else {
	console.error("Unable to get 2d context from canvas");
    }
}

function moveLeft() {
    if (bat.x > 0) {
	bat.x -= bat.velocity * timestep;
    }
}

function moveRight() {
    if (bat.x < 590) {
	bat.x += bat.velocity * timestep;
    }
}

function launchBall() {
    ball.inMotion = true;
}

export {start, stop, moveLeft, moveRight, launchBall, setCanvas};
