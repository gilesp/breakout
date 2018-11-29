class Bat {
    constructor(width, height) {
	this.width = width;
	this.height = height;
	this.xPos = 0;
	this.yPos = 0;
	this.vx = 0.8;
    }

    get x() {
	return this.xPos;
    }

    set x(xPos) {
	this.xPos = xPos;
    }

    get y() {
	return this.yPos;
    }

    set y(yPos) {
	this.yPos = yPos;
    }

    get velocity() {
	return this.vx;
    }
    
    draw(context) {
	context.fillStyle = 'rgb(200, 200, 200)';
	context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Bat;
