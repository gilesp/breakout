var animationToken;
var delta = 0;
var lastFrameTime = 0;
var canvas;
var ctx;

var bat = {
    width: 50,
    height: 5,
    x: 295,
    y: 460,
    velocity: 1
};

// The maximum FPS we want to allow
var maxFPS = 60; 

// simulate 1000 ms / 60 FPS = 16.667 ms per frame every time we run update()
var timestep = 1000 / maxFPS; 

var fpsDisplay = document.getElementById('fpsDisplay');

var fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0;

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
    // bat.x += bat.velocity * delta;
    // if (bat.x >= 590 || bat.x <= 0) {
    // 	bat.velocity = -bat.velocity;
    // }
}

function render() {
    if (ctx) {
	ctx.clearRect(0, 0, 640, 480);

	//draw bat
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(bat.x, bat.y, bat.width, bat.height);

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

export {start, stop, moveLeft, moveRight, setCanvas};
