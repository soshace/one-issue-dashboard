var express = require('express');
var app = express();
var api = require('./api');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', api);

app.listen(8008, function() {
    console.log('App is deployed!');
});
