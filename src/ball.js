class Ball {
    constructor(bat, radius, color) {
	this.radius = radius;
	this.color = color;
	this.initialise(bat);
    }

    draw(context) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	context.closePath();
	context.fillStyle = this.color;
	context.fill();
    }

    initialise(bat) {
	this.inMotion = false;
	this.x = bat.x + (bat.width / 2);
	this.y = bat.y - this.radius;
	this.vx = 0.2;
	this.vy = -0.2;
    }

    update(canvas, delta, bat, blocks) {
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
	
	//insanely inefficient collision detection for the blocks
	blocks.forEach(function (block, index) {
	    if (block.check(this.x - this.radius, this.y)) {
		delete blocks[index];
		this.vy = -this.vy;
	    }
	}, this);
	
	// the ball has gone out of bounds
	if (this.y >= canvas.height) {
	    this.initialise(bat);
	}
    }
}

export default Ball;
