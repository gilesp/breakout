import Bat from './bat.js';
import Ball from './ball.js';
import Block from './block.js';

var bat = new Bat(75, 10);
var ball = new Ball(bat, 7, 'rgb(200, 0, 0)');
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

var score = 0;

var movingLeft = false;
var movingRight = false;

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
    var columns = 10;
    var rows = 5;
    var offsetTop = 50;
    var offsetLeft = 22;
    var padding = 5;
    var colors = ['rgb(230, 0, 0)', 'rgb(230, 115, 0)', 'rgb(230, 230, 0)', 'rgb(38, 230, 0)', 'rgb(0, 38, 230)'];
    var blockWidth = 55;
    var blockHeight = 25;

    for (var r = 0; r < rows; r++) {
	for (var c = 0; c < columns; c++) {
	    blocks.push(new Block((c * (blockWidth + padding))+offsetLeft,
				     (r * (blockHeight + padding))+offsetTop,
				     blockWidth,
				     blockHeight,
				  colors[r]));
	}
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

function update(timestep) {
    if (movingLeft && bat.x > 0) {
	bat.x -= bat.velocity * timestep;
    }

    if (movingRight && bat.x < (canvas.width - bat.width)) {
	bat.x += bat.velocity * timestep;
    }
    
    ball.update(canvas, timestep, bat, blocks);

    //insanely inefficient collision detection for the blocks
    blocks.forEach(function (block, index) {
	if (block.check(ball.x - ball.radius, ball.y)) {
	    delete blocks[index];
	    ball.vy = -ball.vy;
	    score += 5;
	}
    });
}

function render() {
    if (ctx) {
	ctx.clearRect(0, 0, 640, 480);

	bat.draw(ctx);

	ball.draw(ctx);

	blocks.forEach(function (block) {
	    block.draw(ctx);
	});

	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.font = '22px sans';
	ctx.fillText('Score: ' + score, 20, 25);
	//display fps
	fpsDisplay.textContent = Math.round(fps) + ' FPS';
    }
}

function setCanvas(newCanvas) {
    canvas = newCanvas;

    if (canvas.getContext) {
	ctx = canvas.getContext("2d", { alpha: false });
    } else {
	console.error("Unable to get 2d context from canvas");
    }
}

function setMovingLeft(move) {
    movingLeft = move;
}

function setMovingRight(move) {
    movingRight = move;
}

function launchBall() {
    ball.inMotion = true;
}

export {start, stop, setMovingLeft, setMovingRight, launchBall, setCanvas};
