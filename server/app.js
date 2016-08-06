'use strict'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

//default mongo promise is deprecated.
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.uri, config.mongo.options);

if(config.seedDB){
  require('./config/seed');
}

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

exports = module.exports = app;
