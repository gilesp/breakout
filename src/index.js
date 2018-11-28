import * as Breakout from './breakout.js';

(function (breakout) {
    breakout.setCanvas(document.getElementById('breakout'));
    breakout.start();

    document.addEventListener('keydown', function (event) {
	if (event.keyCode == 37) {
	    breakout.moveLeft();
	} else if (event.keyCode == 39) {
	    breakout.moveRight();
	}
    }, false);
    
})(Breakout);
