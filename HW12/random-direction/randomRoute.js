const fs = require('fs')
const direction = require('./googleDirectionToGeojson.js')

var exports = module.exports = {};


//set some constrains
var lngLast = -122.410582
var latLast = 37.782268

var lngMax = -122.389388
var latMax = 37.799525

var lngMin = -122.441388
var latMin = 37.787029


var file = "lat" + "," + "lng" + "\n";

//d1=1 horizon right d2=1 vertical up
function getRandom(d1,d2){

while(true){
var lngRam = lngLast + Math.random()/20 * d1;
var latRam = latLast + Math.random()/50 * d2;
if(lngRam<lngMin || lngRam>lngMax || latRam<latMin || latRam>latMax){
  continue;
}
lngLast = lngRam;
latLast = latRam;
file += latRam + "," + lngRam + "\n";
return latRam + "," + lngRam;
}

}

exports.getRandomRoute = function(res,APIKey) {

file = "lat" + "," + "lng" + "\n";
var opts = {
  apiKey: APIKey,// Google Maps API key
  fileName: 'public/random.geojson', // The output
  origin: getRandom(-1,1), // Starting location of the directions
  waypoints : [getRandom(-1,1),getRandom(-1,1),
  getRandom(1,1),getRandom(1,1),
  getRandom(-1,-1),getRandom(-1,-1),
  getRandom(1,-1),getRandom(1,-1)
  ],
  destination: latLast + "," + lngLast, // The destination of the directions

}

//1.get direction geojson
direction.directionsToGeoJson(opts,res);

//2.write waypoints to csv
fs.writeFile('public/test.CSV', file, function (err) {
  if (err) throw err;
  console.log(file);
});

}
