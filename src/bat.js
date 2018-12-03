class Bat {
    constructor(width, height) {
	this.width = width;
	this.height = height;
	this.x = 0;
	this.y = 0;
	this.vx = 0.8;
    }

    draw(context) {
	context.fillStyle = 'rgb(200, 200, 200)';
	context.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default Bat;
