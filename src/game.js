class Game {
    constructor(maxFps, canvas) {
	this.canvas = canvas;
	if (this.canvas.getContext) {
	    this.context = canvas.getContext("2d");
	} else {
	    console.error("Unable to get 2d context from canvas");
	    return;
	}
	
	this.state = {
	    lastFrameTime: 0,
	    delta: 0,
	    maxFps: maxFps,
	    fps: {
		current: 0,
		lastUpdate: 0,
		framesThisSecond: 0
	    },
	    timestep: 1000 / this.state.maxFps
	};
    }

    main(timestamp) {
	// Throttle the frame rate.
	if (timestamp < (this.state.lastFrameTime + this.state.timestep)) {
            this.state.token = window.requestAnimationFrame(this.main);
            return;
	}
	this.state.delta += timestamp - this.state.lastFrameTime;
	this.state.lastFrameTime = timestamp;

	this.state.fps.current = this.calcFPS(timestamp, this.state.fps);

	var updateSteps = 0;
	while (this.state.delta >= this.state.timestep) {
	    this.update(this.state.timestep);
	    this.state.delta -= this.state.timestep;
	    if(++updateSteps >= 240) {
		this.state.delta = this.panic();
		break;
	    }
	}

	this.render();

	this.state.token = window.requestAnimationFrame(this.main);
    }

    calcFPS(timestamp, existingState) {
	var newState = {
	    current: existingState.current,
	    lastUpdate: existingState.lastUpdate,
	    framesThisSecond: existingState.framesThisSecond
	};
	
	if (timestamp > existingState.lastFpsUpdate + 1000) {
            newState.current = 0.25 * existingState.framesThisSecond + 0.75 * existingState.current;

            newState.lastUpdate = timestamp;
            newState.framesThisSecond = 0;
	}
	newState.framesThisSecond++;

	return newState;
    }

    panic() {
	console.error("Panic! - things are running too slowly");
	return 0;
    }

    update(timestep) {

    }

    start() {
	this.main(0);
    }

    render() {
	if (this.context) {
	    this.context.clearRect(0, 0, 640, 480);

	    //display fps
	    /*
	    if (debug.enabled) {
		debug.fpsElement.textContent = Math.round(fps) + ' FPS' + ' Hitcount: ' + hitcount + ' vx,vy: ' + ball.vx + ',' + ball.vy;
	    }
	    */
	}
    }
}

export default Game;
