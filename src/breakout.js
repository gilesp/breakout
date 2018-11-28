var animationToken;
var delta = 0;
var lastFrameTime = 0;
var canvas = { width: 640, height: 480 }; //fake it until set properly
var ctx;

var bat = {
    width: 50,
    height: 5,
    x: 0,
    y: 0,
    velocity: 2,
    draw: function (ctx) {
	ctx.fillStyle = 'rgb(200, 200, 200)';
	ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

var ball = {
    x: 0,
    y: 0,
    radius: 5,
    color: 'rgb(200, 0, 0)',
    vx: 0,
    vy: 0,
    inMotion: false,
    draw: function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
    },
    initialise: function () {
	this.inMotion = false;
	this.x = bat.x + (bat.width / 2);
	this.y = bat.y - this.radius;
	this.vx = 0.2;
	this.vy = -0.2;
    },
    update: function (delta) {
	if (!this.inMotion) {
	    // follow the bat.
	    this.x = bat.x + (bat.width / 2);
	    return;
	}
	this.x += this.vx * delta;
	this.y += this.vy * delta;

	if (this.x <= 0 || this.x >= canvas.width) {
	    this.vx = -this.vx;
	}

	if (this.y <= 0) {
	    this.vy = -this.vy;
	}

	//primitive collision detection with bat
	if (this.y === (bat.y - this.radius) &&
	    (this.x >= bat.x && this.x <= bat.x + bat.width)) {
	    this.vy = -this.vy;
	}

	// the ball has gone out of bounds
	if (this.y >= canvas.height) {
	    this.initialise();
	}
    }
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
    if (!canvas) {
	console.error("No canvas defined.");
	return;
    }

    // setup initial positions
    bat.x = (canvas.width / 2) - (bat.width / 2);
    bat.y = canvas.height - 20;
    ball.initialise();
    
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
    ball.update(delta);
}

function render() {
    if (ctx) {
	ctx.clearRect(0, 0, 640, 480);

	bat.draw(ctx);

	ball.draw(ctx);
	
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
