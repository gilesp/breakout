var ball = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
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
    initialise: function (bat) {
	this.inMotion = false;
	this.x = bat.x + (bat.width / 2);
	this.y = bat.y - this.radius;
	this.vx = 0.2;
	this.vy = -0.2;
    },
    update: function (canvas, delta, bat) {
	if (!this.inMotion) {
	    // follow the bat.
	    this.x = bat.x + (bat.width / 2);
	    return;
	}
	this.lastX = this.x;
	this.lastY = this.y;
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
	    this.initialise(bat);
	}
    }
};

export default ball;
