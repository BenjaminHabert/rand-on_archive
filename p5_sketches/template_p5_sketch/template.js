var sketch = function(p) {
	/*
	Author: Benjamin Habert
	Date: 2016/06/13
	File: template.js

	DESCRIPTION

	requires:
		- p5.js
	*/

	p.setup = function() {
	  	p.createCanvas(400, 400);
	  	p.background(0);
	  	p.ellipseMode(p.CENTER);
	};

	p.draw = function() {
		p.noStroke();
		p.fill(200, 100, 100, 50);
		p.ellipse(p.mouseX, p.mouseY, 10, 10);
	};

	// MOUSE EVENTS
	p.mousePressed = function(mouseEvent){
	    if(p.isInside(p.mouseX, p.mouseY)) {
	      	// do something
	      	// return mouseEvent;
	    }
	};

	p.mouseMoved = function() {
	};

	// MOBILE EVENTS
  	p.touchStarted = function(touchEvent){
    	// if two fingers touch: reset
    	if (p.touchep.length > 1) {
      		// check that one of them is inside
      		for (var i=0; i<p.touchep.length; i++){
        		var touch = p.touches[i];
        		if (p.isInside(touch.x, touch.y)) {
          		// restart the sketch ? 
          			return;
        		}
      		}
    	}
  	};

  	p.touchMoved = function(touchEvent){
    	if (p.isInside(p.touchX, p.touchY)) {
      		// if the user is not moving a lot: do the processing
      		if (p.dist(p.touchX, p.touchY, p.ptouchX, p.ptouchY) < 10){
        		return false; //THIS PREVENTS THE USER FROM SCROLLING
      		}
    	}
  	};

	// UTILITY FUNCTIONS
  	p.decideMainWidth = function(max_width){
	    // decide on sketch width
	    var disp = p.min(p.displayWidth, p.displayHeight);
	    // var win  = p.min(p.windowWidth , p.windowWidth);
	    var main_width = p.min(disp, max_width);
	    return main_width;
  	};

  	p.isInside = function(x, y){
    	return x >= 0 && x <= p.width && y >= 0 && y <= p.height;
  	};
};

// wait for DOM to load and then create p5 sketch
var timer_test_sketch = setInterval( function () {
     if ( document.readyState !== 'complete' ) return;
     clearInterval( timer_test_sketch ); 
     
     // new p5(<function that takes p5 as arg>, <"id of the div to use">);
     var temp = new p5(sketch,"sketch_div");
 }, 100 );
