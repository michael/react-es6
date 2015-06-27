var fs = require("fs");
var babelify = require("babelify");
var browserify = require("browserify");

var http = require('http');
var express = require('express');
var path = require('path');
var Substance = require("substance");
var fs = require('fs');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();
var port = process.env.PORT || 5005;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json({limit: '3mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname)));

// Backend
// --------------------

app.get('/app.js', function (req, res, next) {
  browserify({ debug: true })
    .transform(babelify)
    .require("./script.js", { entry: true })
    .bundle()
    .on("error", function (err) { console.log("Error: " + err.message); })
    .pipe(res);

});

var handleError = function(err, res) {
  console.error(err);
  res.status(400).json(err);
};


app.listen(port, function() {
  console.log("Lens running on port " + port);
  console.log("http://127.0.0.1:"+port+"/");
});

// Export app for requiring in test files
module.exports = app;