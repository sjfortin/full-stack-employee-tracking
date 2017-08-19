var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.get('/', function(req,res){
    res.send('Hi!');
});

module.exports = router;