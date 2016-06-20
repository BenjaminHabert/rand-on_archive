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
	}

	p.draw = function() {
		p.noStroke();
		p.fill(200, 100, 100, 50);
		p.ellipse(p.mouseX, p.mouseY, 10, 10);
	}

	
	// SETTING UP DEFAULT BEHAVIOR FOR MOBILE
	
};

// wait for DOM to load and then create p5 sketch
var timer_test_sketch = setInterval( function () {
     if ( document.readyState !== 'complete' ) return;
     clearInterval( timer_test_sketch ); 
     
     // new p5(<function that takes p5 as arg>, <"id of the div to use">);
     var temp = new p5(sketch,"canvas_div");
 }, 100 );
