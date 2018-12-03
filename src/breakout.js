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
    var columns = 10;
    var rows = 8;
    var offsetTop = 40;
    var offsetLeft = 2;
    var padding = 4;
    var colors = ['rgb(230, 0, 0)', 'rgb(230, 0, 0)', 'rgb(230, 115, 0)', 'rgb(230, 115, 0)', 'rgb(230, 230, 0)', 'rgb(230, 230, 0)', 'rgb(38, 230, 0)', 'rgb(38, 230, 0)'];
    var scores = [7, 7, 5, 5, 3, 3, 1, 1];
    var blockWidth = 60;
    var blockHeight = 20;

    for (var r = 0; r < rows; r++) {
	for (var c = 0; c < columns; c++) {
	    blocks.push(new Block((c * (blockWidth + padding))+offsetLeft,
				  (r * (blockHeight + padding))+offsetTop,
				  blockWidth,
				  blockHeight,
				  colors[r],
				  scores[r]));
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

var hitcount = 0;
function update(timestep) {
    if (movingLeft && bat.x > 0) {
	bat.x -= bat.vx * timestep;
    }

    if (movingRight && bat.x < (canvas.width - bat.width)) {
	bat.x += bat.vx * timestep;
    }

    //insanely inefficient collision detection for the blocks
    var ballx = ball.x + (ball.vx * timestep),
	bally = ball.y + (ball.vy * timestep),
	newVectors;
    blocks.forEach(function (block, index) {
	newVectors = calculateBallVector(ball, ballx, bally, block);

	ball.vx = newVectors.vx;
	ball.vy = newVectors.vy;
	
	if (newVectors.change) {
	    score += blocks[index].score;
	    delete blocks[index];
	    hitcount++;
	    if(hitcount === 4 || hitcount === 12) {
		ball.vx = ball.vx + (ball.vx > 0 ? 0.05 : -0.05);
		ball.vy = ball.vy + (ball.vy > 0 ? 0.05 : -0.05);
	    }
	}
    });

    newVectors = calculateBallVector(ball, ballx, bally, bat);
    ball.vx = newVectors.vx;
    ball.vy = newVectors.vy;
    
    ball.update(canvas, timestep, bat);
}

function calculateBallVector(ball, future_x, future_y, target) {
    var result = {
	vx: ball.vx,
	vy: ball.vy,
	change: false
    };

    var targetx = target.x - ball.radius;
    var targety = target.y - ball.radius;
    
    if (future_x > targetx &&
	future_x < targetx + target.width &&
	ball.y > targety &&
	ball.y < targety + target.height) {
	result.vx = -ball.vx;
	result.change = true;
    }

    if (future_y > targety &&
	future_y < targety + target.height &&
	ball.x > targetx &&
	ball.x < targetx + target.width) {
	result.vy = -ball.vy;
	result.change = true;
    }

    return result;
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
	fpsDisplay.textContent = Math.round(fps) + ' FPS' + ' Hitcount: ' + hitcount + ' vx,vy: ' + ball.vx + ',' + ball.vy;
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
