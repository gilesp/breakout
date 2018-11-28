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

export default bat;
