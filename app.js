'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var constant = require('./api/lib/constants.js');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
module.exports = app; // for testing

// process.env.TZ = 'Australia/Sydney';

// app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.ico')));
// app.use(favicon(path.join(__dirname, 'public/assets/images', 'favicon.png'))); 

//custom files
require('./config/db');

var utils = require('./api/lib/util');
app.use('/media', express.static(path.join(__dirname, 'media')));

app.use(express.static(path.join(__dirname, 'dist')));
// app.use(express.static(path.join(__dirname, 'public/admin'))); 

var config = {
    appRoot: __dirname // required config
};

app.get('/', function (req, res, next) {
    // res.sendFile(path.join(__dirname, 'public/user/index.html'));
});
var cron_jobs = require('./api/cron/cron-jobs');

SwaggerExpress.create(config, function (err, swaggerExpress) {
    if (err) {
        throw err;
    }

    // All api requests
    app.use(function (req, res, next) {
        // CORS headers
        res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        // Set custom headers for CORS
        res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization');
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (req.method == 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    // app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));

    app.use(bodyParser.json({
        limit: '50mb',
        type: 'application/json'
    }));

    app.use('/api/facilityCreateOrUpdate', upload.array('facility_image'), function (req, res, next) {
        next();
    });

    // app.use('/api/mobile_poolGallery', upload.array('pool_img'), function (req, res, next) {
    //     next();
    // });

    //Check to call web services where token is not required//
    app.use('/api/*', function (req, res, next) {
        console.log("using");
        var freeAuthPath = [
            '/api/addCompany',
            '/api/login',
            '/api/forgotpassword',
            '/api/logout',
            '/api/updateUserImage',
            '/api/userActivation',
            '/api/updateImage',
            '/api/sendRequest',
            '/api/getCountryList',
            '/api/mobile_getCountryList',
            '/api/checktoken',
            '/api/changePassword',
            '/api/updateuserImage',
            '/api/mobile_login',
            '/api/mobile_forgotpassword',
            '/api/addLifeguard',
            '/api/lifeguardClassesLinkinSignup'
            // '/api/tokentest'
            // required Login
            /*'/api/getStatesListByCountryId',
            '/api/getProfileDetail',
            '/api/getUserDataById',
            '/api/userChangePassword', 
            '/api/addUserType',
            '/api/updateuser',
            '/api/resetPassword',
            '/api/customerList',
            '/api/facilityNames',
            '/api/addCustomer',
            '/api/getNoteList', 
            '/api/getProfileUpdateLogByUserId',
            '/api/editCustomerInfo',
            '/api/deleteCustomer',
            '/api/getSwimTestReportListByUserId',
            '/api/viewNote',
            '/api/addAndEditNote',
            '/api/deleteNote',
            '/api/addandEditFixitRequest',
            '/api/deleteFixitRequest'*/
        ];
        var available = false;
        for (var i = 0; i < freeAuthPath.length; i++) {
            if (freeAuthPath[i] == req.baseUrl) {
                available = true;
                break;
            }
        }
        if (!available) {
            utils.ensureAuthorized(req, res, next);
        } else {
            next();
        }
    });

    /*var http = require('http');
    var server = require("http").createServer(app);
    var io = require('socket.io')(server); 
    var usernames = {};
    var showusernames = {};
    var usersmessages = [];
    // set up our socket server
    require('./api/lib/chat.js')(io);*/
    var server = require('http').createServer(app),
        io = require('socket.io')(server);

    // Socket
    // var server = require('http').createServer(app);  
    // var io = require('socket.io')(server);
    // server.listen(process.env.PORT || 3000);
    var usernames = {};
    var users = [];
    var connections = [];
    require('./api/lib/chat.js')(io, usernames);
    console.log("usernames :: ", usernames);
    // io.sockets.on('connection', function(socket) {  
    //     connections.push(socket);
    //     console.log('Client connected...', socket.id);
    //     console.log('Client connected...', connections.length);

    //     //Disconnect
    //     socket.on('disconnect', function(data){
    //         // if(!socket.username){return;}
    //         users.splice(users.indexOf(socket.username), 1);
    //         updateUsernames();
    //         connections.splice(connections.indexOf(socket), 1);
    //         console.log('Disconnect...', connections.length);
    //     });
    //     //send msg
    //     socket.on('send message', function(data){
    //         console.log("Msg Recived : ",data);
    //         io.sockets.emit('new message', data);
    //     });
    //     //new users
    //     socket.on('new user', function(data, callback){
    //         callback(true);
    //         socket.username = data;
    //         users.push(socket.username);
    //         updateUsernames();
    //     })
    // });
    // function updateUsernames(){
    //     io.sockets.emit('get users', users);
    // }
    // Socket End


    // enable SwaggerUI
    app.use(swaggerExpress.runner.swaggerTools.swaggerUi());

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 6052; // Local server
    // var port = process.env.PORT || 80; // Staging server   
    // app.listen(port);
    server.listen(port);


    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl http://127.0.0.1:' + port);
    }

    app.use(function (req, res, next) {
        res.redirect(constant.config.baseUrl + '#/page-not-found');
    });


});