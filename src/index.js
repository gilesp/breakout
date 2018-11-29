import * as Breakout from './breakout.js';

(function (breakout) {
    breakout.setCanvas(document.getElementById('breakout'));
    breakout.start();

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    function keyDownHandler(e) {
	if (e.keyCode == 37) {
	    breakout.setMovingLeft(true);
	} else if (e.keyCode == 39) {
	    breakout.setMovingRight(true);
	} else if (e.keyCode == 32) {
	    breakout.launchBall();
	}
    }

    function keyUpHandler(e) {
	if (e.keyCode == 37) {
	    breakout.setMovingLeft(false);
	} else if (e.keyCode == 39) {
	    breakout.setMovingRight(false);
	}
    }
})(Breakout);
