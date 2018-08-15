var express = require('express');
var router = require('./routes/router.js');
var bodyParser = require('body-parser');
var path = require('path');
var dbConnection = require('./mongoConnect.js');

var app = express();
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../client'));

app.use(express.static(path.join(__dirname,'../client'))); // try making it ../client

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: false}));


app.use('/', router);

module.exports = app;
