// BASE SETUP
// =============================================================================
'use strict';

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var server = express();
var morgan = require('morgan');

// // Apply Gzip
// var compression = require('compression');
// server.use(compression({
//     threshold: 0
// }));

// configure server
server.use(morgan('dev')); // log requests to the console

// configure body parser
server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

// configure header
server.use(function(req, res, next) {
    //res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    //res.set('Pragma', 'no-cache');
    //res.set('Expires', '0');
    //res.type('application/json');

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With');
    next();
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// set our environment
var environment = process.env.ENV || 'development';
console.log('environment:', environment);

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// Logging Routing
var LoggingController = require('./api/logging.controller');
router.post('/logging/log', LoggingController.log);

server.use(express.static(__dirname + '/app'));
server.use('/api', router);

// START THE SERVER
// =============================================================================
var app = server.listen( server_port, server_ip_address, function () {
    var host = app.address().address;
    var port = app.address().port;
    console.log( 'Listening at http://%s:%s', host, port );
} );
