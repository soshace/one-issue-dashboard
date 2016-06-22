var express = require('express');
var api = express.Router();

// Mapping for api implementation
require('./issues')(api);
module.exports = api;