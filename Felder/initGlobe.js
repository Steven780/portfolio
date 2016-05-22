var Viewer;
head.js(

	// translate country codes to names 
	//"code.js",
	// translate country codes to flags 
	//"flag.js",
	// simple abstraction layer around webgl 
	"Felder/webgl-utils.js",

	// OSGJS is a WebGL framework based on OpenSceneGraph concepts 
	"Felder/osg.js",
	"Felder/osgGA.js",
	"Felder/osgUtil.js",
	"Felder/osgAnimation.js",
	"Felder/osgViewer.js",

	// demo code. contains shaders, some colors constants etc 
	"Felder/demo2.js",
	// handles rotating and moving of globe 
	"Felder/manipulator.js",
	// handles tweets: geocodes and displays them on globe 
	//"twitter.js",

	// Models: world, countries, coastline? 
	"Felder/world.js",
	"Felder/country.js",
	"Felder/coast.js",

	// Renders text 
	"Felder/text.js",
	// Renders wave animation 
	"Felder/wave.js",
	// Convert between latlon / xyz 
	"Felder/coordinate.js",


	// handles network between client and tweetserver 
	// "app.js", 
	// instructions for the user 
	// "instructions.js", 

	// global application state machine, start, stop etc. 
	"Felder/state.js",


	// all done
	function() {
             
            /*Test to see if browser supports webGL*/
		function hasGL() {
			try {
				return !!window.WebGLRenderingContext /*true if browser supports webGL*/
					&& !!document.createElement('canvas').getContext('experimental-webgl');
			} catch(e) {
				return false;
			}
		}

		if(hasGL() && jQuery.isFunction(window.initGlobe) && jQuery('#3DView').length > 0) {
			// load globe
                        initGlobe();
                      //initMap();
		} else if(jQuery.isFunction(window.initMap) && jQuery('body').hasClass('home')) { /**/
			// load map
			initMap();
		}
	}
);




