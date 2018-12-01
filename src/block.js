class Block {
    constructor(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
    }

    draw(context) {
	context.fillStyle = this.color;
	context.fillRect(this.x, this.y, this.width, this.height);
    }

    check(x, y) {
	return ((x >= this.x && x <= this.x + this.width) &&
		(y >= this.y && y <= this.y + this.height)) ;
    }

    bounds() {
	return {
	    x1: this.x,
	    y1: this.y,
	    x2: this.x + this.width,
	    y2: this.y + this.height
	};
    }
}

export default Block;
