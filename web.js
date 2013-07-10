var fs = require('fs');
var express = require('express');

var inFile = "index.html";

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
   outX = fs.readFileSync(inFile);
   response.send(outX);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
