const fs = require('fs')
const polyline = require('@mapbox/polyline')
const request = require('request')

function directionsToGeoJson (opts,res) {
  opts.apiKey = opts.apiKey || null
  opts.stroke = opts.stroke || null
  opts.fileName = opts.fileName || null
  opts.origin = opts.origin || null
  opts.destination = opts.destination || null
  opts.waypoints = opts.waypoints || []

  const waypoints = opts.waypoints.join('|')

  const url = `https://maps.googleapis.com/maps/api/directions/json?key=${opts.apiKey}&origin=%22${opts.origin}%22&destination=%22${opts.destination}%22&waypoints=${waypoints}`

  let obj = {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'properties': {
          'stroke': opts.stroke
        }
      }
    ]
  }

  request({
    url: url,
    json: true
  }, function (error, response, body) {
    console.log(`Response: ${response.statusCode}`)
    if (!error && response.statusCode === 200) {
      const poly = body.routes[0].overview_polyline.points
      const data = polyline.toGeoJSON(poly)
      obj.features[0].geometry = data

      fs.writeFile(opts.fileName, JSON.stringify(obj), function () {
        console.log(`Written ${opts.fileName}`)
        res.send('Get Random finished');
      })
    }
  })
}

module.exports = directionsToGeoJson
//


var http = require('http');

//https://maps.googleapis.com/maps/api/directions/json?origin=-122.39478682078568,37.846352173154735&destination=-122.39830497595605,37.876415055145884&key=AIzaSyCPVHX_eC6Cp5TKty2kW20GKmAg0zEnEFI
//https://maps.googleapis.com/maps/api/directions/json?origin=37.846352178,-122.39478682&destination=37.877352178,-122.39478682&key=AIzaSyCPVHX_eC6Cp5TKty2kW20GKmAg0zEnEFI
//directionsToGeoJson(opts)

var lngLast = -122.410582
var latLast = 37.782268
var file = "lat" + "," + "lng" + "\n";
//d1=1 horizon right d2=1 vertical up
function getRandom(d1,d2){
var lngMax = -122.389388
var latMax = 37.799525

//37.767029, -122.389388
var lngMin = -122.441388
var latMin = 37.787029

while(true){
var lngRam = lngLast + Math.random()/20 * d1;
var latRam = latLast + Math.random()/50 * d2;
if(lngRam<lngMin || lngRam>lngMax || latRam<latMin || latRam>latMax){
  continue;
}
lngLast = lngRam;
latLast = latRam;
//console.log("[" + latRam + "," + lngRam + "],");
file += latRam + "," + lngRam + "\n";
return latRam + "," + lngRam;
}

}


//https://stackoverflow.com/questions/48304513/backend-and-frontend-on-same-port
const express = require('express')
const app = express()

app.use('/', express.static('public'))
app.get('/backend', (req, res) => {
//res.send('Get Random');

file = "lat" + "," + "lng" + "\n";
var opts = {
  apiKey: 'AIzaSyCPVHX_eC6Cp5TKty2kW20GKmAg0zEnEFI', // Google Maps API key
  stroke: '#ff1800', // Color of line
  fileName: 'public/random.geojson', // The output
  origin: getRandom(-1,1),// Starting location of the directions
  waypoints : [getRandom(-1,1),getRandom(-1,1),
  getRandom(1,1),getRandom(1,1),
  getRandom(-1,-1),getRandom(-1,-1),
  getRandom(1,-1),getRandom(1,-1)
  ],
  destination: latLast + "," + lngLast, // The destination of the directions

/**
  waypoints: [ // The locations between the beginning and destination
    'San Francisco,California',
    'San Rafael,California',
    'Novato,California',
    'Sonoma,California',
    'Napa,California',
    //'Fairfield,California',
    'Vallejo,California',
    'Richmond,California',
    'Hayward,California',
    'San Jose, California'
  ]
**/
}

directionsToGeoJson(opts,res);


//var fs = require('fs');

fs.writeFile('public/test.CSV', file, function (err) {
  if (err) throw err;
  console.log(file);
});



})

app.listen(8000, () => {
console.log('Example app listening on port 8000!');
console.log('Say hi!');
})
