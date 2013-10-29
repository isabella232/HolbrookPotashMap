var app = {
  map: L.map('map', {center: [34.7900, -109.7706], zoom: 11, minZoom: 10, maxZoom: 14, maxBounds: new L.LatLngBounds([34.0441,-110.8322],[35.7604,-108.6514])}),
  //baseLayer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  baseLayer: L.tileLayer('http://a.tiles.mapbox.com/v3/azgs.map-kxqopd01/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.mapbox.com/about/maps/">Terms & Feedback</a>'
  }),
  landUseLayer: L.tileLayer('http://{s}.tiles.usgin.org/potash/{z}/{x}/{y}.png'),
  roadsAndLabelsLayer: L.tileLayer('http://a.tiles.mapbox.com/v3/azgs.map-0owroizd/{z}/{x}/{y}.png'),
  wellsLayer: L.geoJson(null, {pointToLayer: pointToLayer, onEachFeature: onEachFeature})
};

app.baseLayer.addTo(app.map);
app.landUseLayer.addTo(app.map);
app.roadsAndLabelsLayer.addTo(app.map);
app.wellsLayer.addTo(app.map);

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
  var drilled = feature.properties.statlab === "Drilled",
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
  var popupText = '<table class="table table-striped table-bordered">';
  [ 
    ['Well: ', feature.properties.lease_no],
    ['API Number: ', feature.properties.api_number],
    ['Permit Number: ', feature.properties.permit],
    ['Operator: ', feature.properties.operator],
    ['Township-Range, Section: ', feature.properties.twp + "-" + feature.properties.rge + ", " + feature.properties.section],
    ['Depth: ', feature.properties.total_dept],
    ['Formation: ', feature.properties.fm_at_td],
    ['Year Drilled: ', feature.properties.compldate],
    ['Status: ', feature.properties.statlab],
    ['Permit File: ', '<a href="' + feature.properties.url + '">Download PDF</a>']
  ].forEach(function (row) {
    popupText += '<tr><th>' + row[0] + '</th><td>' + row[1] + '</td></tr>';
  });
	popupText += "</table>";
  layer.bindPopup(popupText);
}