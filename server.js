var express = require('express');
var app = express();
var api = require('./api');
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());

app.use('/api', api);
app.use(express.static(__dirname + '/public/'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/', function(req, res, next) {
    fs.createReadStream('./public/main.html').pipe(res);
});

app.listen(8008, function() {
    console.log('App is deployed!');
});
