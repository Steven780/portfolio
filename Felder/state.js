/** -*- compile-command: "jslint-cli state.js" -*-
 *
 * Copyright (C) 2011 Cedric Pinson
 *
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Authors:
 *  Cedric Pinson <cedric.pinson@plopbyte.net>
 *
 */

var targetOrigin = '*'; // This will be the gallery url, but for testing '*' is easier
var DemoState = {
    running: false
};
var Viewer;

var AutoStart = (window.top == window); // if it's an not in an iframe, autostart.
var DisableWave = true;

window.addEventListener("message", function(e) {
    if ("start_demo" == e.data) {
        DemoState.running = true;
        Viewer.setScene(createScene());
        Viewer.run();

		// Arvid-add: disable network.
		// startNetwork();

        //DemoState.demoLoop();

    } else if ("stop_demo" == e.data) {
        DemoState.running = false;
        if (Socket !== undefined) {
            Socket.disconnect();
        }
        window.parent.postMessage('finished_exit', targetOrigin);

    } else if ("auto_play_mode" == e.data) {
        /* OPTIONAL PART OF THE PROTOCOL! HARDCODED FOR TESTING */
        setTimeout(function () {
            window.parent.postMessage('show_exit_ui', targetOrigin);
        }, 5000);
    }
}, false);

function getWindowSize() {
	var myWidth = 0, myHeight = 0;
	
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
		} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
		} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	// return { 'w': myWidth, 'h': myHeight };
	// Arvid-add: force dimensions here
	return { 'w': 590, 'h': 590 };
}

function initGlobe() {
	
    var size = getWindowSize();

    var canvas = document.getElementById("3DView");

    canvas.width = size.w; /*Setting the 3DView width to valyues set in function getWindowSize()*/
    canvas.height = size.h;
    var ratio = canvas.width/canvas.height;

    try {
    var viewer = new osgViewer.Viewer(document.getElementById("3DView"));
    Viewer = viewer;
    viewer.init();
    viewer.setupManipulator(new osgGA.OrbitManipulator2());
    viewer.view.setProjectionMatrix(osg.Matrix.makePerspective(60, ratio, 1000.0, 100000000.0));
    viewer.manipulator.setDistance(2.05*6378137);
    viewer.manipulator.setMaxDistance(2.5*6378137);
    viewer.manipulator.setMinDistance(6378137);

    Viewer.run = function() {
        if (this.scene === undefined) {
            this.scene = new osg.Node();
        }
        this.view.addChild(this.scene);
        var that = this;
        var render = function() { 
            if (DemoState.running) {
                window.requestAnimationFrame(render, that.canvas);
                that.frame();
            } else {
            }
        };
        render();
    };

    //  viewer.setScene(createScene());
    //  viewer.run();

    window.parent.postMessage('loaded', targetOrigin);
    if (AutoStart === true) {
        window.postMessage('start_demo', targetOrigin);
    }
    } catch (er) {
        osg.log("exception in osgViewer " + er);
	jQuery(canvas).replaceWith(jQuery(canvas).children());
    }
}
