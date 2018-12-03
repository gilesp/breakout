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

    initialise(bat, vx, vy) {
	this.inMotion = false;
	this.x = bat.x + (bat.width / 2);
	this.y = bat.y - this.radius;
	this.vx = vx ? vx : 0.2;
	this.vy = vy ? vy : -0.2;
    }

    update(canvas, delta, bat) {
	if (!this.inMotion) {
	    // follow the bat.
	    this.x = bat.x + (bat.width / 2);
	    return;
	}

	this.x += this.vx * delta;
	this.y += this.vy * delta;

	if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
	    this.vx = -this.vx;
	}

	if (this.y <= this.radius) {
	    this.vy = -this.vy;
	}

	//primitive collision detection with bat
	/*
	if (this.y === (bat.y - this.radius) &&
	    (this.x >= bat.x && this.x <= bat.x + bat.width)) {
	    this.vy = -this.vy;
	}
	*/
	
	// the ball has gone out of bounds
	if (this.y >= canvas.height - this.radius) {
	    this.initialise(bat, Math.abs(this.vx), -Math.abs(this.vy));
	}
    }

    bounds() {
	return {
	    x1: this.x - this.radius,
	    y1: this.y - this.radius,
	    x2: this.x + this.radius,
	    y2: this.x + this.radius
	};
    }
}

export default Ball;
