var app = {
  map: L.map('map', {center: [34.7900, -109.7706], zoom: 11, minZoom: 10, maxZoom: 14, maxBounds: new L.LatLngBounds([32.9286,-112.3538],[36.9746,-107.1078])}),
  //baseLayer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {							// OpenLayers map for development
  baseLayer: L.tileLayer('http://a.tiles.mapbox.com/v3/azgs.map-kxqopd01/{z}/{x}/{y}.png', {				// path to MapBox hosted tiles (max 10k hits)
    attribution: '<a href="https://www.mapbox.com/about/maps/">Terms & Feedback</a>', detectRetina: true
  }),
  //landUseLayer: L.tileLayer('tile-mill-project/export/explodedMbtiles/{z}/{x}/{y}.png', {detectRetina: true}), // path to local exploded mbtiles
  //landUseLayer: L.tileLayer('http://localhost/3000/{z}/{x}/{y}.png', {detectRetina: true}), 					 // path to mbtiles locally served with mbtiles-server
  landUseLayer: L.tileLayer('http://{s}.tiles.usgin.org/potash/{z}/{x}/{y}.png', {detectRetina: true}),			 // path to AZGS hosted tiles
  roadsAndLabelsLayer: L.tileLayer('http://a.tiles.mapbox.com/v3/azgs.map-0owroizd/{z}/{x}/{y}.png', {detectRetina: true}),  // path to MapBox hosted tiles (max 10k hits)
  wellsLayer: L.geoJson(null, {pointToLayer: pointToLayer, onEachFeature: onEachFeature})
};

app.baseLayer.addTo(app.map);
app.landUseLayer.addTo(app.map);
app.roadsAndLabelsLayer.addTo(app.map);
app.wellsLayer.addTo(app.map);
L.control.scale({position: 'bottomright'}).addTo(app.map);

// Add click effect to the legend toggler
d3.select('#toggle-info').on('click', function () {
  var enabled = d3.select('#info').classed('hidden');
  d3.select('#info').classed('hidden', !enabled);
});

// Load the well data asynchronously
d3.json('wells.json', function (err, data) {
  if (err) return console.log(err);
  app.wellsLayer.addData(data);
});

// Define the symbology for the different well types
function pointToLayer(feature, latlng) {
  var drilled = feature.properties.STATUS === "S",
      marker = {
        radius: 6.5,
        fillColor: '#444',
        opacity: 1
      };
  marker.radius = drilled ? 6.5: 5.5;
  marker.color = drilled ? '#fff': '#444';
  marker.fillOpacity = drilled ? 1 : 0;
  marker.weight = drilled ? 0.5 : 1.5;
  return L.circleMarker(latlng, marker);
}

// Create the text for the popup which is shown when a well is clicked
function onEachFeature(feature, layer) {
	
	// Get the well status
	var status = "Unknown";
	if (feature.properties.STATUS == "S")
		status = "Stratigraphic Well Drilled";
	else if (feature.properties.STATUS == "loc")
		status = "Location Not Yet Drilled";
	else if (feature.properties.STATUS == "TA")
		status = "Temporarily Abandoned (well drilled but not yet finished)";
  
	// Create the popup text as a table
	var popupText = '<table class="table table-striped table-bordered">';
	  [ 
		['Well: ', feature.properties.LEASE_NO],
		['API Number: ', feature.properties.API_NUMBER],
		['Permit Number: ', feature.properties.PERMIT],
		['Operator: ', feature.properties.OPERATOR],
		['Township-Range, Section: ', feature.properties.TWP + "-" + feature.properties.RGE + ", " + feature.properties.SECTION],
		['Depth: ', feature.properties.TOTAL_DEPT],
		['Formation: ', feature.properties.FM_AT_TD],
		['Year Drilled: ', feature.properties.COMPLDATE],
		['Status: ', status],
		['Permit File: ', '<a href="' + feature.properties.URL + '">Download PDF</a>']
	  ].forEach(function (row) {
		popupText += '<tr><th>' + row[0] + '</th><td>' + row[1] + '</td></tr>';
	  });
  
	popupText += "</table>";
	layer.bindPopup(popupText);
}