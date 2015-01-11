var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};


module.exports = router;