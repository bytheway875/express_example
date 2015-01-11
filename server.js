var express = require('express');
var app = express();

var logger = require('./logger');
var blocks = require('./routes/blocks');

app.use(express.static('public'));
app.use(logger);
app.use('/blocks', blocks);

// Point route directly to specific file

//app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/public/index.html')
//});





//app.get('/array', function(request, response) {
//    var blocks = ['Fixed', 'Movable', 'Rotating'];
//    response.send(blocks); // serializes array as json
//    // or!
//    response.json(blocks); // same thing, more clear
//});
//
//app.get('/old_path', function(request, response) {
//    // redirect. Default status code 302 -- temporary redirect
//    response.redirect('/temporary_path');
//    // redirect. Override with status 301 -- Moved Permanently
//    response.redirect(301, '/permanent_path');
//});

app.listen(1137, function() {
    console.log('Listening on Port 1137')
});
