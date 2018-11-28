var animationToken;
var delta = 0;
var lastFrameTime = 0;

function main(timestamp) {
    animationToken = window.requestAnimationFrame(main);
    delta = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    update(delta);
    render();
};

function stop() {
    window.cancelAnimationFrame(animationToken);
};

function update(delta) {
    
}

function render() {

}

export {main, stop};
