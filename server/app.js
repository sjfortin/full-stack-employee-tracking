var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var employees = require('./routes/employees');

var port = 5000;

app.use(bodyParser.json());

app.use(express.static('public'));

// app.use('/employees', employees);

app.listen(port, function(){
    console.log('Running on port', port); 
});