var app = {
  map: L.map('map', {center: [34.7900, -109.7706], zoom: 10, minZoom: 10, maxZoom: 14, maxBounds: new L.LatLngBounds([34.0441,-110.8322],[35.7604,-108.6514])}),
  baseLayer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.mapbox.com/about/maps/">Terms & Feedback</a>'
  }),
  landUseLayer: L.tileLayer('http://{s}.tiles.usgin.org/potash/{z}/{x}/{y}.png'),
  wellsLayer: L.geoJson(null, {pointToLayer: pointToLayer, onEachFeature: onEachFeature})
};

app.baseLayer.addTo(app.map);
app.landUseLayer.addTo(app.map);
app.wellsLayer.addTo(app.map);
L.geocoderControl().addTo(app.map);

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
	if (feature.properties.statlab == "Drilled")
		return L.marker(latlng, {icon: L.icon({iconUrl: 'style/img/circle-18.png'})});
	else
		return L.marker(latlng, {icon: L.icon({iconUrl: 'style/img/circle-stroked-18.png'})});
}

// Create the text for the popup which is shown when a well is clicked
function onEachFeature(feature, layer) {
	var popupText = "<center><b>Well: " + feature.properties.lease_no + "</b></center>";
	popupText += "<br><b>API Number: </b>" + feature.properties.api_number;
	popupText += "<br><b>Permit Number: </b>" + feature.properties.permit;
	popupText += "<br><b>Operator: </b>" + feature.properties.operator;
	popupText += "<br><b>Township-Range, Section: </b>" + feature.properties.twp + "-" + feature.properties.rge + ", " + feature.properties.section;
	popupText += "<br><b>Depth: </b>" + feature.properties.total_dept;
	popupText += "<br><b>Formation: </b>" + feature.properties.fm_at_td;
	popupText += "<br><b>Year Drilled: </b>" + feature.properties.compldate;
	popupText += "<br><b>Status: </b>" + feature.properties.statlab;
	popupText += "<br>Click <a href=\"" + feature.properties.url + "\" target=\"_blank\">" + "<i>here</i>" + "</a> to see a copy of the permit.";
	layer.bindPopup(popupText);
	
	return;
}