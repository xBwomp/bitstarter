#!/usr/bin/env node

var fs = require('fs');
var express = require('express');

var inFile = "index.html";

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
   outX = buffer.toString('utc 8', fs.readFileSync('index.html'));
   response.send(outX);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
