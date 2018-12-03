/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Ball);


/***/ }),

/***/ "./src/bat.js":
/*!********************!*\
  !*** ./src/bat.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Bat);


/***/ }),

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Block {
    constructor(x, y, width, height, color, score) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
	this.score = score;
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

/* harmony default export */ __webpack_exports__["default"] = (Block);


/***/ }),

/***/ "./src/breakout.js":
/*!*************************!*\
  !*** ./src/breakout.js ***!
  \*************************/
/*! exports provided: start, stop, setMovingLeft, setMovingRight, launchBall, setCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stop", function() { return stop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMovingLeft", function() { return setMovingLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMovingRight", function() { return setMovingRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "launchBall", function() { return launchBall; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCanvas", function() { return setCanvas; });
/* harmony import */ var _bat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bat.js */ "./src/bat.js");
/* harmony import */ var _ball_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball.js */ "./src/ball.js");
/* harmony import */ var _block_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.js */ "./src/block.js");




var bat = new _bat_js__WEBPACK_IMPORTED_MODULE_0__["default"](75, 10);
var ball = new _ball_js__WEBPACK_IMPORTED_MODULE_1__["default"](bat, 7, 'rgb(200, 0, 0)');
var blocks = [];

var animationToken;
var canvas = { width: 640, height: 480 }; //fake it until set properly
var ctx;

var fpsDisplay = document.getElementById('fpsDisplay');

// The maximum FPS we want to allow
var maxFPS = 60; 

// simulate 1000 ms / 60 FPS = 16.667 ms per frame every time we run update()
var timestep = 1000 / maxFPS; 

var fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    delta = 0,
    lastFrameTime = 0;

var score = 0;

var movingLeft = false;
var movingRight = false;

function main(timestamp) {
    // Throttle the frame rate.
    if (timestamp < (lastFrameTime + timestep)) {
        animationToken = requestAnimationFrame(main);
        return;
    }
    delta += timestamp - lastFrameTime;
    lastFrameTime = timestamp;

    fps = calcFPS(timestamp);
    
    var updateSteps = 0;
    while (delta >= timestep) {
	update(timestep);
	delta -= timestep;
	if(++updateSteps >= 240) {
	    panic();
	    break;
	}
    }
    
    render();
    animationToken = window.requestAnimationFrame(main);
};

function calcFPS(timestamp) {
    if (timestamp > lastFpsUpdate + 1000) {
        fps = 0.25 * framesThisSecond + 0.75 * fps;

        lastFpsUpdate = timestamp;
        framesThisSecond = 0;
    }
    framesThisSecond++;

    return fps;
}

function start() {
    if (!canvas) {
	console.error("No canvas defined.");
	return;
    }

    //create blocks;
    var columns = 10;
    var rows = 8;
    var offsetTop = 40;
    var offsetLeft = 2;
    var padding = 4;
    var colors = ['rgb(230, 0, 0)', 'rgb(230, 0, 0)', 'rgb(230, 115, 0)', 'rgb(230, 115, 0)', 'rgb(230, 230, 0)', 'rgb(230, 230, 0)', 'rgb(38, 230, 0)', 'rgb(38, 230, 0)'];
    var scores = [7, 7, 5, 5, 3, 3, 1, 1];
    var blockWidth = 60;
    var blockHeight = 20;

    for (var r = 0; r < rows; r++) {
	for (var c = 0; c < columns; c++) {
	    blocks.push(new _block_js__WEBPACK_IMPORTED_MODULE_2__["default"]((c * (blockWidth + padding))+offsetLeft,
				  (r * (blockHeight + padding))+offsetTop,
				  blockWidth,
				  blockHeight,
				  colors[r],
				  scores[r]));
	}
    }

    // setup initial positions
    bat.x = (canvas.width / 2) - (bat.width / 2);
    bat.y = canvas.height - 20;
    ball.initialise(bat);
    
    main(0);
}

function stop() {
    window.cancelAnimationFrame(animationToken);
};

function panic() {
    console.error("Panic! - things are running too slowly");
    delta = 0;
}

var hitcount = 0;
function update(timestep) {
    if (movingLeft && bat.x > 0) {
	bat.x -= bat.vx * timestep;
    }

    if (movingRight && bat.x < (canvas.width - bat.width)) {
	bat.x += bat.vx * timestep;
    }

    //insanely inefficient collision detection for the blocks
    var ballx = ball.x + (ball.vx * timestep),
	bally = ball.y + (ball.vy * timestep),
	newVectors;
    blocks.forEach(function (block, index) {
	newVectors = calculateBallVector(ball, ballx, bally, block);

	ball.vx = newVectors.vx;
	ball.vy = newVectors.vy;
	
	if (newVectors.change) {
	    score += blocks[index].score;
	    delete blocks[index];
	    hitcount++;
	    if(hitcount === 4 || hitcount === 12) {
		ball.vx = ball.vx + (ball.vx > 0 ? 0.05 : -0.05);
		ball.vy = ball.vy + (ball.vy > 0 ? 0.05 : -0.05);
	    }
	}
    });

    newVectors = calculateBallVector(ball, ballx, bally, bat);
    ball.vx = newVectors.vx;
    ball.vy = newVectors.vy;
    
    ball.update(canvas, timestep, bat);
}

function calculateBallVector(ball, future_x, future_y, target) {
    var result = {
	vx: ball.vx,
	vy: ball.vy,
	change: false
    };

    var targetx = target.x - ball.radius;
    var targety = target.y - ball.radius;
    
    if (future_x > targetx &&
	future_x < targetx + target.width &&
	ball.y > targety &&
	ball.y < targety + target.height) {
	result.vx = -ball.vx;
	result.change = true;
    }

    if (future_y > targety &&
	future_y < targety + target.height &&
	ball.x > targetx &&
	ball.x < targetx + target.width) {
	result.vy = -ball.vy;
	result.change = true;
    }

    return result;
}

function render() {
    if (ctx) {
	ctx.clearRect(0, 0, 640, 480);

	bat.draw(ctx);

	ball.draw(ctx);

	blocks.forEach(function (block) {
	    block.draw(ctx);
	});

	ctx.fillStyle = 'rgb(255, 255, 255)';
	ctx.font = '22px sans';
	ctx.fillText('Score: ' + score, 20, 25);
	//display fps
	fpsDisplay.textContent = Math.round(fps) + ' FPS' + ' Hitcount: ' + hitcount + ' vx,vy: ' + ball.vx + ',' + ball.vy;
    }
}

function setCanvas(newCanvas) {
    canvas = newCanvas;

    if (canvas.getContext) {
	ctx = canvas.getContext("2d", { alpha: false });
    } else {
	console.error("Unable to get 2d context from canvas");
    }
}

function setMovingLeft(move) {
    movingLeft = move;
}

function setMovingRight(move) {
    movingRight = move;
}

function launchBall() {
    ball.inMotion = true;
}




/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _breakout_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./breakout.js */ "./src/breakout.js");


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
})(_breakout_js__WEBPACK_IMPORTED_MODULE_0__);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYmxvY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JyZWFrb3V0LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsbUVBQUksRUFBQzs7Ozs7Ozs7Ozs7OztBQ2pFcEI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsa0VBQUcsRUFBQzs7Ozs7Ozs7Ozs7OztBQ2ZuQjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsb0VBQUssRUFBQzs7Ozs7Ozs7Ozs7OztBQzlCckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBMkI7QUFDRTtBQUNFOztBQUUvQixjQUFjLCtDQUFHO0FBQ2pCLGVBQWUsZ0RBQUk7QUFDbkI7O0FBRUE7QUFDQSxjQUFjLDJCQUEyQjtBQUN6Qzs7QUFFQTs7QUFFQTtBQUNBLGdCOztBQUVBO0FBQ0EsNkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixVQUFVO0FBQzdCLGdCQUFnQixhQUFhO0FBQzdCLHFCQUFxQixpREFBSztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQyxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUUyRTs7Ozs7Ozs7Ozs7OztBQzlOM0U7QUFBQTtBQUEwQzs7QUFFMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxFQUFFLHlDQUFRIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImNsYXNzIEJhbGwge1xuICAgIGNvbnN0cnVjdG9yKGJhdCwgcmFkaXVzLCBjb2xvcikge1xuXHR0aGlzLnJhZGl1cyA9IHJhZGl1cztcblx0dGhpcy5jb2xvciA9IGNvbG9yO1xuXHR0aGlzLmluaXRpYWxpc2UoYmF0KTtcbiAgICB9XG5cbiAgICBkcmF3KGNvbnRleHQpIHtcblx0Y29udGV4dC5iZWdpblBhdGgoKTtcblx0Y29udGV4dC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMucmFkaXVzLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG5cdGNvbnRleHQuY2xvc2VQYXRoKCk7XG5cdGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcblx0Y29udGV4dC5maWxsKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGlzZShiYXQsIHZ4LCB2eSkge1xuXHR0aGlzLmluTW90aW9uID0gZmFsc2U7XG5cdHRoaXMueCA9IGJhdC54ICsgKGJhdC53aWR0aCAvIDIpO1xuXHR0aGlzLnkgPSBiYXQueSAtIHRoaXMucmFkaXVzO1xuXHR0aGlzLnZ4ID0gdnggPyB2eCA6IDAuMjtcblx0dGhpcy52eSA9IHZ5ID8gdnkgOiAtMC4yO1xuICAgIH1cblxuICAgIHVwZGF0ZShjYW52YXMsIGRlbHRhLCBiYXQpIHtcblx0aWYgKCF0aGlzLmluTW90aW9uKSB7XG5cdCAgICAvLyBmb2xsb3cgdGhlIGJhdC5cblx0ICAgIHRoaXMueCA9IGJhdC54ICsgKGJhdC53aWR0aCAvIDIpO1xuXHQgICAgcmV0dXJuO1xuXHR9XG5cblx0dGhpcy54ICs9IHRoaXMudnggKiBkZWx0YTtcblx0dGhpcy55ICs9IHRoaXMudnkgKiBkZWx0YTtcblxuXHRpZiAodGhpcy54IDw9IHRoaXMucmFkaXVzIHx8IHRoaXMueCA+PSBjYW52YXMud2lkdGggLSB0aGlzLnJhZGl1cykge1xuXHQgICAgdGhpcy52eCA9IC10aGlzLnZ4O1xuXHR9XG5cblx0aWYgKHRoaXMueSA8PSB0aGlzLnJhZGl1cykge1xuXHQgICAgdGhpcy52eSA9IC10aGlzLnZ5O1xuXHR9XG5cblx0Ly9wcmltaXRpdmUgY29sbGlzaW9uIGRldGVjdGlvbiB3aXRoIGJhdFxuXHQvKlxuXHRpZiAodGhpcy55ID09PSAoYmF0LnkgLSB0aGlzLnJhZGl1cykgJiZcblx0ICAgICh0aGlzLnggPj0gYmF0LnggJiYgdGhpcy54IDw9IGJhdC54ICsgYmF0LndpZHRoKSkge1xuXHQgICAgdGhpcy52eSA9IC10aGlzLnZ5O1xuXHR9XG5cdCovXG5cdFxuXHQvLyB0aGUgYmFsbCBoYXMgZ29uZSBvdXQgb2YgYm91bmRzXG5cdGlmICh0aGlzLnkgPj0gY2FudmFzLmhlaWdodCAtIHRoaXMucmFkaXVzKSB7XG5cdCAgICB0aGlzLmluaXRpYWxpc2UoYmF0LCBNYXRoLmFicyh0aGlzLnZ4KSwgLU1hdGguYWJzKHRoaXMudnkpKTtcblx0fVxuICAgIH1cblxuICAgIGJvdW5kcygpIHtcblx0cmV0dXJuIHtcblx0ICAgIHgxOiB0aGlzLnggLSB0aGlzLnJhZGl1cyxcblx0ICAgIHkxOiB0aGlzLnkgLSB0aGlzLnJhZGl1cyxcblx0ICAgIHgyOiB0aGlzLnggKyB0aGlzLnJhZGl1cyxcblx0ICAgIHkyOiB0aGlzLnggKyB0aGlzLnJhZGl1c1xuXHR9O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFsbDtcbiIsImNsYXNzIEJhdCB7XG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCkge1xuXHR0aGlzLndpZHRoID0gd2lkdGg7XG5cdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHR0aGlzLnggPSAwO1xuXHR0aGlzLnkgPSAwO1xuXHR0aGlzLnZ4ID0gMC44O1xuICAgIH1cblxuICAgIGRyYXcoY29udGV4dCkge1xuXHRjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2IoMjAwLCAyMDAsIDIwMCknO1xuXHRjb250ZXh0LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXQ7XG4iLCJjbGFzcyBCbG9jayB7XG4gICAgY29uc3RydWN0b3IoeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IsIHNjb3JlKSB7XG5cdHRoaXMueCA9IHg7XG5cdHRoaXMueSA9IHk7XG5cdHRoaXMud2lkdGggPSB3aWR0aDtcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdHRoaXMuY29sb3IgPSBjb2xvcjtcblx0dGhpcy5zY29yZSA9IHNjb3JlO1xuICAgIH1cblxuICAgIGRyYXcoY29udGV4dCkge1xuXHRjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG5cdGNvbnRleHQuZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBjaGVjayh4LCB5KSB7XG5cdHJldHVybiAoKHggPj0gdGhpcy54ICYmIHggPD0gdGhpcy54ICsgdGhpcy53aWR0aCkgJiZcblx0XHQoeSA+PSB0aGlzLnkgJiYgeSA8PSB0aGlzLnkgKyB0aGlzLmhlaWdodCkpIDtcbiAgICB9XG5cbiAgICBib3VuZHMoKSB7XG5cdHJldHVybiB7XG5cdCAgICB4MTogdGhpcy54LFxuXHQgICAgeTE6IHRoaXMueSxcblx0ICAgIHgyOiB0aGlzLnggKyB0aGlzLndpZHRoLFxuXHQgICAgeTI6IHRoaXMueSArIHRoaXMuaGVpZ2h0XG5cdH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCbG9jaztcbiIsImltcG9ydCBCYXQgZnJvbSAnLi9iYXQuanMnO1xuaW1wb3J0IEJhbGwgZnJvbSAnLi9iYWxsLmpzJztcbmltcG9ydCBCbG9jayBmcm9tICcuL2Jsb2NrLmpzJztcblxudmFyIGJhdCA9IG5ldyBCYXQoNzUsIDEwKTtcbnZhciBiYWxsID0gbmV3IEJhbGwoYmF0LCA3LCAncmdiKDIwMCwgMCwgMCknKTtcbnZhciBibG9ja3MgPSBbXTtcblxudmFyIGFuaW1hdGlvblRva2VuO1xudmFyIGNhbnZhcyA9IHsgd2lkdGg6IDY0MCwgaGVpZ2h0OiA0ODAgfTsgLy9mYWtlIGl0IHVudGlsIHNldCBwcm9wZXJseVxudmFyIGN0eDtcblxudmFyIGZwc0Rpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnBzRGlzcGxheScpO1xuXG4vLyBUaGUgbWF4aW11bSBGUFMgd2Ugd2FudCB0byBhbGxvd1xudmFyIG1heEZQUyA9IDYwOyBcblxuLy8gc2ltdWxhdGUgMTAwMCBtcyAvIDYwIEZQUyA9IDE2LjY2NyBtcyBwZXIgZnJhbWUgZXZlcnkgdGltZSB3ZSBydW4gdXBkYXRlKClcbnZhciB0aW1lc3RlcCA9IDEwMDAgLyBtYXhGUFM7IFxuXG52YXIgZnBzID0gNjAsXG4gICAgZnJhbWVzVGhpc1NlY29uZCA9IDAsXG4gICAgbGFzdEZwc1VwZGF0ZSA9IDAsXG4gICAgZGVsdGEgPSAwLFxuICAgIGxhc3RGcmFtZVRpbWUgPSAwO1xuXG52YXIgc2NvcmUgPSAwO1xuXG52YXIgbW92aW5nTGVmdCA9IGZhbHNlO1xudmFyIG1vdmluZ1JpZ2h0ID0gZmFsc2U7XG5cbmZ1bmN0aW9uIG1haW4odGltZXN0YW1wKSB7XG4gICAgLy8gVGhyb3R0bGUgdGhlIGZyYW1lIHJhdGUuXG4gICAgaWYgKHRpbWVzdGFtcCA8IChsYXN0RnJhbWVUaW1lICsgdGltZXN0ZXApKSB7XG4gICAgICAgIGFuaW1hdGlvblRva2VuID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW4pO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRlbHRhICs9IHRpbWVzdGFtcCAtIGxhc3RGcmFtZVRpbWU7XG4gICAgbGFzdEZyYW1lVGltZSA9IHRpbWVzdGFtcDtcblxuICAgIGZwcyA9IGNhbGNGUFModGltZXN0YW1wKTtcbiAgICBcbiAgICB2YXIgdXBkYXRlU3RlcHMgPSAwO1xuICAgIHdoaWxlIChkZWx0YSA+PSB0aW1lc3RlcCkge1xuXHR1cGRhdGUodGltZXN0ZXApO1xuXHRkZWx0YSAtPSB0aW1lc3RlcDtcblx0aWYoKyt1cGRhdGVTdGVwcyA+PSAyNDApIHtcblx0ICAgIHBhbmljKCk7XG5cdCAgICBicmVhaztcblx0fVxuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKTtcbiAgICBhbmltYXRpb25Ub2tlbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbik7XG59O1xuXG5mdW5jdGlvbiBjYWxjRlBTKHRpbWVzdGFtcCkge1xuICAgIGlmICh0aW1lc3RhbXAgPiBsYXN0RnBzVXBkYXRlICsgMTAwMCkge1xuICAgICAgICBmcHMgPSAwLjI1ICogZnJhbWVzVGhpc1NlY29uZCArIDAuNzUgKiBmcHM7XG5cbiAgICAgICAgbGFzdEZwc1VwZGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgZnJhbWVzVGhpc1NlY29uZCA9IDA7XG4gICAgfVxuICAgIGZyYW1lc1RoaXNTZWNvbmQrKztcblxuICAgIHJldHVybiBmcHM7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGlmICghY2FudmFzKSB7XG5cdGNvbnNvbGUuZXJyb3IoXCJObyBjYW52YXMgZGVmaW5lZC5cIik7XG5cdHJldHVybjtcbiAgICB9XG5cbiAgICAvL2NyZWF0ZSBibG9ja3M7XG4gICAgdmFyIGNvbHVtbnMgPSAxMDtcbiAgICB2YXIgcm93cyA9IDg7XG4gICAgdmFyIG9mZnNldFRvcCA9IDQwO1xuICAgIHZhciBvZmZzZXRMZWZ0ID0gMjtcbiAgICB2YXIgcGFkZGluZyA9IDQ7XG4gICAgdmFyIGNvbG9ycyA9IFsncmdiKDIzMCwgMCwgMCknLCAncmdiKDIzMCwgMCwgMCknLCAncmdiKDIzMCwgMTE1LCAwKScsICdyZ2IoMjMwLCAxMTUsIDApJywgJ3JnYigyMzAsIDIzMCwgMCknLCAncmdiKDIzMCwgMjMwLCAwKScsICdyZ2IoMzgsIDIzMCwgMCknLCAncmdiKDM4LCAyMzAsIDApJ107XG4gICAgdmFyIHNjb3JlcyA9IFs3LCA3LCA1LCA1LCAzLCAzLCAxLCAxXTtcbiAgICB2YXIgYmxvY2tXaWR0aCA9IDYwO1xuICAgIHZhciBibG9ja0hlaWdodCA9IDIwO1xuXG4gICAgZm9yICh2YXIgciA9IDA7IHIgPCByb3dzOyByKyspIHtcblx0Zm9yICh2YXIgYyA9IDA7IGMgPCBjb2x1bW5zOyBjKyspIHtcblx0ICAgIGJsb2Nrcy5wdXNoKG5ldyBCbG9jaygoYyAqIChibG9ja1dpZHRoICsgcGFkZGluZykpK29mZnNldExlZnQsXG5cdFx0XHRcdCAgKHIgKiAoYmxvY2tIZWlnaHQgKyBwYWRkaW5nKSkrb2Zmc2V0VG9wLFxuXHRcdFx0XHQgIGJsb2NrV2lkdGgsXG5cdFx0XHRcdCAgYmxvY2tIZWlnaHQsXG5cdFx0XHRcdCAgY29sb3JzW3JdLFxuXHRcdFx0XHQgIHNjb3Jlc1tyXSkpO1xuXHR9XG4gICAgfVxuXG4gICAgLy8gc2V0dXAgaW5pdGlhbCBwb3NpdGlvbnNcbiAgICBiYXQueCA9IChjYW52YXMud2lkdGggLyAyKSAtIChiYXQud2lkdGggLyAyKTtcbiAgICBiYXQueSA9IGNhbnZhcy5oZWlnaHQgLSAyMDtcbiAgICBiYWxsLmluaXRpYWxpc2UoYmF0KTtcbiAgICBcbiAgICBtYWluKDApO1xufVxuXG5mdW5jdGlvbiBzdG9wKCkge1xuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25Ub2tlbik7XG59O1xuXG5mdW5jdGlvbiBwYW5pYygpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiUGFuaWMhIC0gdGhpbmdzIGFyZSBydW5uaW5nIHRvbyBzbG93bHlcIik7XG4gICAgZGVsdGEgPSAwO1xufVxuXG52YXIgaGl0Y291bnQgPSAwO1xuZnVuY3Rpb24gdXBkYXRlKHRpbWVzdGVwKSB7XG4gICAgaWYgKG1vdmluZ0xlZnQgJiYgYmF0LnggPiAwKSB7XG5cdGJhdC54IC09IGJhdC52eCAqIHRpbWVzdGVwO1xuICAgIH1cblxuICAgIGlmIChtb3ZpbmdSaWdodCAmJiBiYXQueCA8IChjYW52YXMud2lkdGggLSBiYXQud2lkdGgpKSB7XG5cdGJhdC54ICs9IGJhdC52eCAqIHRpbWVzdGVwO1xuICAgIH1cblxuICAgIC8vaW5zYW5lbHkgaW5lZmZpY2llbnQgY29sbGlzaW9uIGRldGVjdGlvbiBmb3IgdGhlIGJsb2Nrc1xuICAgIHZhciBiYWxseCA9IGJhbGwueCArIChiYWxsLnZ4ICogdGltZXN0ZXApLFxuXHRiYWxseSA9IGJhbGwueSArIChiYWxsLnZ5ICogdGltZXN0ZXApLFxuXHRuZXdWZWN0b3JzO1xuICAgIGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaywgaW5kZXgpIHtcblx0bmV3VmVjdG9ycyA9IGNhbGN1bGF0ZUJhbGxWZWN0b3IoYmFsbCwgYmFsbHgsIGJhbGx5LCBibG9jayk7XG5cblx0YmFsbC52eCA9IG5ld1ZlY3RvcnMudng7XG5cdGJhbGwudnkgPSBuZXdWZWN0b3JzLnZ5O1xuXHRcblx0aWYgKG5ld1ZlY3RvcnMuY2hhbmdlKSB7XG5cdCAgICBzY29yZSArPSBibG9ja3NbaW5kZXhdLnNjb3JlO1xuXHQgICAgZGVsZXRlIGJsb2Nrc1tpbmRleF07XG5cdCAgICBoaXRjb3VudCsrO1xuXHQgICAgaWYoaGl0Y291bnQgPT09IDQgfHwgaGl0Y291bnQgPT09IDEyKSB7XG5cdFx0YmFsbC52eCA9IGJhbGwudnggKyAoYmFsbC52eCA+IDAgPyAwLjA1IDogLTAuMDUpO1xuXHRcdGJhbGwudnkgPSBiYWxsLnZ5ICsgKGJhbGwudnkgPiAwID8gMC4wNSA6IC0wLjA1KTtcblx0ICAgIH1cblx0fVxuICAgIH0pO1xuXG4gICAgbmV3VmVjdG9ycyA9IGNhbGN1bGF0ZUJhbGxWZWN0b3IoYmFsbCwgYmFsbHgsIGJhbGx5LCBiYXQpO1xuICAgIGJhbGwudnggPSBuZXdWZWN0b3JzLnZ4O1xuICAgIGJhbGwudnkgPSBuZXdWZWN0b3JzLnZ5O1xuICAgIFxuICAgIGJhbGwudXBkYXRlKGNhbnZhcywgdGltZXN0ZXAsIGJhdCk7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZUJhbGxWZWN0b3IoYmFsbCwgZnV0dXJlX3gsIGZ1dHVyZV95LCB0YXJnZXQpIHtcbiAgICB2YXIgcmVzdWx0ID0ge1xuXHR2eDogYmFsbC52eCxcblx0dnk6IGJhbGwudnksXG5cdGNoYW5nZTogZmFsc2VcbiAgICB9O1xuXG4gICAgdmFyIHRhcmdldHggPSB0YXJnZXQueCAtIGJhbGwucmFkaXVzO1xuICAgIHZhciB0YXJnZXR5ID0gdGFyZ2V0LnkgLSBiYWxsLnJhZGl1cztcbiAgICBcbiAgICBpZiAoZnV0dXJlX3ggPiB0YXJnZXR4ICYmXG5cdGZ1dHVyZV94IDwgdGFyZ2V0eCArIHRhcmdldC53aWR0aCAmJlxuXHRiYWxsLnkgPiB0YXJnZXR5ICYmXG5cdGJhbGwueSA8IHRhcmdldHkgKyB0YXJnZXQuaGVpZ2h0KSB7XG5cdHJlc3VsdC52eCA9IC1iYWxsLnZ4O1xuXHRyZXN1bHQuY2hhbmdlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZnV0dXJlX3kgPiB0YXJnZXR5ICYmXG5cdGZ1dHVyZV95IDwgdGFyZ2V0eSArIHRhcmdldC5oZWlnaHQgJiZcblx0YmFsbC54ID4gdGFyZ2V0eCAmJlxuXHRiYWxsLnggPCB0YXJnZXR4ICsgdGFyZ2V0LndpZHRoKSB7XG5cdHJlc3VsdC52eSA9IC1iYWxsLnZ5O1xuXHRyZXN1bHQuY2hhbmdlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgaWYgKGN0eCkge1xuXHRjdHguY2xlYXJSZWN0KDAsIDAsIDY0MCwgNDgwKTtcblxuXHRiYXQuZHJhdyhjdHgpO1xuXG5cdGJhbGwuZHJhdyhjdHgpO1xuXG5cdGJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuXHQgICAgYmxvY2suZHJhdyhjdHgpO1xuXHR9KTtcblxuXHRjdHguZmlsbFN0eWxlID0gJ3JnYigyNTUsIDI1NSwgMjU1KSc7XG5cdGN0eC5mb250ID0gJzIycHggc2Fucyc7XG5cdGN0eC5maWxsVGV4dCgnU2NvcmU6ICcgKyBzY29yZSwgMjAsIDI1KTtcblx0Ly9kaXNwbGF5IGZwc1xuXHRmcHNEaXNwbGF5LnRleHRDb250ZW50ID0gTWF0aC5yb3VuZChmcHMpICsgJyBGUFMnICsgJyBIaXRjb3VudDogJyArIGhpdGNvdW50ICsgJyB2eCx2eTogJyArIGJhbGwudnggKyAnLCcgKyBiYWxsLnZ5O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0Q2FudmFzKG5ld0NhbnZhcykge1xuICAgIGNhbnZhcyA9IG5ld0NhbnZhcztcblxuICAgIGlmIChjYW52YXMuZ2V0Q29udGV4dCkge1xuXHRjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIsIHsgYWxwaGE6IGZhbHNlIH0pO1xuICAgIH0gZWxzZSB7XG5cdGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZ2V0IDJkIGNvbnRleHQgZnJvbSBjYW52YXNcIik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRNb3ZpbmdMZWZ0KG1vdmUpIHtcbiAgICBtb3ZpbmdMZWZ0ID0gbW92ZTtcbn1cblxuZnVuY3Rpb24gc2V0TW92aW5nUmlnaHQobW92ZSkge1xuICAgIG1vdmluZ1JpZ2h0ID0gbW92ZTtcbn1cblxuZnVuY3Rpb24gbGF1bmNoQmFsbCgpIHtcbiAgICBiYWxsLmluTW90aW9uID0gdHJ1ZTtcbn1cblxuZXhwb3J0IHtzdGFydCwgc3RvcCwgc2V0TW92aW5nTGVmdCwgc2V0TW92aW5nUmlnaHQsIGxhdW5jaEJhbGwsIHNldENhbnZhc307XG4iLCJpbXBvcnQgKiBhcyBCcmVha291dCBmcm9tICcuL2JyZWFrb3V0LmpzJztcblxuKGZ1bmN0aW9uIChicmVha291dCkge1xuICAgIGJyZWFrb3V0LnNldENhbnZhcyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJlYWtvdXQnKSk7XG4gICAgYnJlYWtvdXQuc3RhcnQoKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duSGFuZGxlciwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5VXBIYW5kbGVyLCBmYWxzZSk7XG5cbiAgICBmdW5jdGlvbiBrZXlEb3duSGFuZGxlcihlKSB7XG5cdGlmIChlLmtleUNvZGUgPT0gMzcpIHtcblx0ICAgIGJyZWFrb3V0LnNldE1vdmluZ0xlZnQodHJ1ZSk7XG5cdH0gZWxzZSBpZiAoZS5rZXlDb2RlID09IDM5KSB7XG5cdCAgICBicmVha291dC5zZXRNb3ZpbmdSaWdodCh0cnVlKTtcblx0fSBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzIpIHtcblx0ICAgIGJyZWFrb3V0LmxhdW5jaEJhbGwoKTtcblx0fVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGtleVVwSGFuZGxlcihlKSB7XG5cdGlmIChlLmtleUNvZGUgPT0gMzcpIHtcblx0ICAgIGJyZWFrb3V0LnNldE1vdmluZ0xlZnQoZmFsc2UpO1xuXHR9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzOSkge1xuXHQgICAgYnJlYWtvdXQuc2V0TW92aW5nUmlnaHQoZmFsc2UpO1xuXHR9XG4gICAgfVxufSkoQnJlYWtvdXQpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==