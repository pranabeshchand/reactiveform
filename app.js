'use strict';

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
// var bodyParser = require('body-parser');
var app = express();
module.exports = app; // for testing
var server = require('http').createServer(app);
app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/', function (req, res, next) {
//     res.sendFile(path.join(__dirname, 'VvvebJs/editor.html'));
// });

// All api requests
  

    var port = process.env.PORT || 3210; // Local server
    // var port = process.env.PORT || 80; // Staging server  
    // app.listen(port);
    server.listen(port, function(){
        console.log('Server Started on port '+port);
    });