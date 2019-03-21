// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  var eqdata = createFeatures(data.features);
console.log(eqdata)


function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake

var result = [];
for (var i = 0; i < earthquakeData.length; i++) {
  // function onEachFeature(feature) {
    result.push({
      "place": earthquakeData[i].properties.place,
      "time": earthquakeData[i].properties.time,
      "mag": earthquakeData[i].properties.mag,
      "location": [earthquakeData[i].geometry.coordinates[0],earthquakeData[i].geometry.coordinates[1]]
    });   
  }

return result;
};



// Loop through the cities array and create one marker for each city object
for (var i = 0; i < eqdata.length; i++) {

  // Conditionals for earthquake magnitude
  var color = "";
  if (eqdata[i].mag > 5) {
    color = "red";
  }
  else if (eqdata[i].mag > 4) {
    color = "orange";
  }
  else if (eqdata[i].mag > 3) {
    color = "yellow";
  }
  else if (eqdata[i].mag > 2) {
    color = "lightyellow";
  }
  else if (eqdata[i].mag > 1) {
    color = "palegreen";
  }
  else {
    color = "lime";
  }

  // Add circles to map
  L.circle(eqdata[i].location, {
    fillOpacity: 0.75,
    color: "black",
    fillColor: color,
    // Adjust radius
    radius: eqdata[i].mag * 50000
  }).bindPopup("<h1>" + eqdata[i].place + "</h1> <hr> <h3>Time: " + new Date(eqdata[i].time) + "</h3> <hr> <h3>Magnitude: "
  +eqdata[i].mag + "</h3>").addTo(myMap);
}

});