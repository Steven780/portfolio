var styles = [
	{
		featureType: 'water',
		elementType: 'all',
		stylers: [
			{ hue: '#ffffff' },
			{ saturation: -100 },
			{ lightness: 100 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'poi',
		elementType: 'geometry',
		stylers: [
			{ hue: '#ff6600' },
			{ saturation: 19 },
			{ lightness: -50 },
			{ visibility: 'on' }
		]
	},{
		featureType: 'transit',
		elementType: 'all',
		stylers: [
		   { hue: '#ff6600' },
		   { saturation: 54 },
		   { lightness: -48 },
		   { visibility: 'off' }
		]
	},{
		featureType: 'road',
		elementType: 'all',
		stylers: [
		   { hue: '#6600ff' },
		   { saturation: -46 },
		   { lightness: -39 },
		   { visibility: 'off' }
		]
	},{
		featureType: 'administrative',
		elementType: 'all',
		stylers: [
		   { hue: '#6600ff' },
		   { saturation: 54 },
		   { lightness: -23 },
		   { visibility: 'off' }
		]
	},{
		featureType: 'administrative.country',
		elementType: 'geometry',
		stylers: [
		   { hue: '#6600ff' },
		   { saturation: 54 },
		   { lightness: -23 },
		   { visibility: 'on' }
		]
	},{
		featureType: 'landscape.man_made',
		elementType: 'all',
		stylers: [
		   { hue: '#6600ff' },
		   { saturation: 37 },
		   { lightness: -56 },
		   { visibility: 'off' }
		]
	},{
		featureType: 'landscape.natural',
		elementType: 'all',
		stylers: [
		   { hue: '#6600ff' },
		   { saturation: 46 },
		   { lightness: -59 },
		   { visibility: 'on' }
		]
	}
];

var map, mapDiv, markersArray = [];

function initMap() {
        
	/*jQuery('#ViewContainer').css({width: 800, height: 600 });*/

        /*IF 3d globe not supported, then introduce a 2D map or message to map page*/
        document.getElementById('dropdown').innerHTML = "Please view map here";
	document.getElementById('ViewContainer').innerHTML = "";
	
        
        
        
/*
	map = new google.maps.Map(mapDiv, {
		mapTypeControlOptions: {
			mapTypeIds: ['Styled']
		},
		center: new google.maps.LatLng(46.920255, 1),
		zoom: 2,
		
		 mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	
	var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
	map.mapTypes.set('Styled', styledMapType);
	
	/* Create select box
	jQuery('select#country').selectbox({
		onChange: function(val, inst) {
			var latitude = countries[val].latitude;
			var longitude = countries[val].longitude;
			var zoom = countries[val].zoom;

			// Show info popup
			displayHtmlTweetContent(countries[val]);

			// Clear markers
			clearOverlays();
		
			map.panTo(new google.maps.LatLng(latitude, longitude));
			addMarker(new google.maps.LatLng(latitude, longitude));
			map.setZoom(zoom)
		}
	});
      */  
        
}

// Function for adding a marker to the page.
function addMarker(location) {
	var image = 'Felder/maps-marker.png';
	marker = new google.maps.Marker({
		position: location,
		map: map,
		icon: image
	});
	markersArray.push(marker);
}

function clearOverlays() {
	jQuery.each(markersArray, function() {
		this.setMap(null);
	});
}

//google.maps.event.addDomListener(window, 'load', initialize);


