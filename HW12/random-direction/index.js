const http = require('http');
const randomRoute = require('./randomRoute.js')


//run local web server on port 8000
//https://stackoverflow.com/questions/48304513/backend-and-frontend-on-same-port
const express = require('express')
const app = express()

var apiKey = process.argv[2]; 

app.use('/', express.static('public'))
app.get('/backend', (req, res) => {
    randomRoute.getRandomRoute(res,apiKey);
})

app.listen(8000, () => {
  console.log('Listening on port 8000!');
})
