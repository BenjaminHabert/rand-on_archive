# rand-on

This repository contains an ensemble of scripts that are usually either visual experiences of data-related stuff. The results can be seen at [rand-on.com](http://www.rand-on.com).

## Squarespace related issues

The website is hosted by Squarespace and built using their tool. This imposes a set of constraints on the way the scripts have to be embedded. Here is a list of tricks that I use. Most of this will focus on the exemples of p5 sketches.

### Where to import the libraries ?

With squarespace, you can access the header in several ways. The page I use is an [Index](https://support.squarespace.com/hc/en-us/articles/206543817-Using-the-Index-Page) containing several other pages that are loaded dynamically. In this situation, it is better to include the libraries in the header of this Index page.

### How to include the script ?

There are two things to take into account in the javascript code in order to embed the script easyly:

 - create your sketch as a function
 - call your sketch function when dom is done loading:

```javascript
// sketch as a function
var mySketch = function(p) {
	// in this context, p is the p5 object

	p.setup = function(){
		// notice that all the functions are called on p
		p.createCanvas(400, 400);
	  	p.background(0);
	}

	p.draw = function(){
		...
	}
}

// call it when dom ready
var timer_test_sketch = setInterval( 
	function () {
		// if not ready : nothing
	    if ( document.readyState !== 'complete' ) return;

	    // else: clear interval + create sketch
	    clearInterval( timer_test_sketch ); 
	     // new p5(<function that takes p5 as arg>, <"id of the div to use">);
	     new p5(mySketch,"sketch_div");
	},
	100
);
```

You also need to include some HTML in the Squarespace page. Here is what I usually add. In this case the source code is located on the Squarespace server. Notice the `sketch_div` element: it will later contain the canvas created by the sketch function. 

```HTML
<center id="sketch_div"></center>
<script type="text/javascript" scr="assets/template_p5_sketch/template.js"></script>
```

Another possibility is to host the source code directly on Github and source it from your page. In order to load it:
 
 - Locate the file on Github, click on **raw**. You get the script as a text file, copy the URL, for instance:

> https://raw.githubusercontent.com/BenjaminHabert/rand-on/master/p5_sketches/random_moire_1/random_moire_1.js

 - In the URL, replace the domain by **rawgit.com**:

> https://rawgit.com/BenjaminHabert/rand-on/master/p5_sketches/random_moire_1/random_moire_1.js

Now you can source it in your HTML document.

 ```HTML
<center id="sketch_div"></center>
<script  type="text/javascript" src="https://rawgit.com/BenjaminHabert/rand-on/master/p5_sketches/random_moire_1/random_moire_1.js"></script>
```

### How to show the source code ?

I like to embed the source code directly in the page. Github has a service that allows you to embed a syntaxically-higlighted script in your page: Gist.

- Step 1: create a new Gist and copy your source code. Save it and locate the embeding script provided. For exemple:

```HTML
<script src="https://gist.github.com/BenjaminHabert/efb34543ed6b829abd42c77ee64d3aa2.js"></script>
```

- Step 2: notice that this will not work. At the moment the gist script uses `document.write()` to embed the source code. This fails in my case as the document is considred fully written when this script is called. 

- Step 3: create an aweful work-around. Other people have implemented similarly hideous solutions on the web. Basically you temporily replace `document.write()` with your own code. This is code I am using and the HTML I am finally adding to the Squarespace page:

```javascript
function createGist(src, containerID) {
	var divNode = Y.one(containerID);  // Squarespace uses the YUI library
  	
  	var oldWrite = document.write;  
    document.write = function(htmltext) {  // Please don't judge me!
        divNode.append(htmltext);
      };
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
  	s.onload = function() {
  	  // when the script is done, give document.write its original value
      document.write = oldWrite;
    };
	divNode.append(s);
	divNode.hide();

	// add toggleable text to hide / show the source code
	var textButton = Y.Node.create("<b style='cursor:pointer;'>Show/hide code:</b>");
	textButton.on('click',function(e) {divNode.toggleView();});
	divNode.get('parentNode').insert(textButton,divNode);
}
```

```HTML
<div id="code_div"> </div>
<script type="text/javascript">
    createGist(
    	"https://gist.github.com/BenjaminHabert/efb34543ed6b829abd42c77ee64d3aa2.js",
    	"#code_div");
</script>
```













