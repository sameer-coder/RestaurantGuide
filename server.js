// server.js
var path = require('path');
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var routes = require('./server/routes');
var MongoClient = require('mongodb').MongoClient
global.mongoDb = null; //global object to share db instance across different files


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(path.join(__dirname, 'client'));
app.use(express.static(path.join(__dirname, 'client'))); //should be before using the routes
app.use(routes);

// Connection URL
var url = 'mongodb://warp:warp123@ds143221.mlab.com:43221/warp';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log(err);
        db.close();
    }
    else {
        mongoDb = db;
        console.log("Connected successfully to database");
    }
});

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Magic happens on port ' + port);