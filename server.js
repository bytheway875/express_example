var express = require('express');
var app = express();

var logger = require('./logger');
app.use(logger);

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

// Point route directly to specific file

//app.get('/', function(req, res) {
//    res.sendFile(__dirname + '/public/index.html')
//});

var blocks = {
    'Fixed' : 'Fastened securely in position',
    'Movable' : 'Capable of being moved',
    'Rotating' : 'Moving in a circle around its center'
};

app.use(express.static('public'));


app.param('name', function(request, response, next){
    var name = request.params.name
    var titleizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.titleizedName = titleizedName;

    next();
});

app.route('/blocks')
    .get(function(request, response) {
        var blockNames = Object.keys(blocks);
        if (request.query.limit >= 0) {
            response.json(blockNames.slice(0, request.query.limit));
        } else if(request.query.search) {
            response.send(blockSearch(request.query.search));
        }
        else {
            blockNames = Object.keys(blocks);
            response.json(blockNames);
        }
    })
    .post(parseUrlencoded, function(request, response){
        var newBlock = request.body;
        blocks[newBlock.name] = newBlock.description;

        response.status(201).json(newBlock.name);

    });

app.route('/blocks/:name')
    .get(function(request, response) {
        var description = blocks[request.titleizedName];
        if(description){
            response.json(description);
        }else{
            response.status(404).json("Uh oh. Can't find anything here for " + request.params.name);
        }
    })
    .delete(function(request, response){
        if(blocks[request.blockName]) {
            var deleted = delete blocks[request.blockName];
            if (deleted === true) {
                response.sendStatus(200);
            } else {
                response.sendStatus(500);
            }
        }else{
            response.sendStatus(404);
        }
    });



function blockSearch (keyword) {
    var regexp = RegExp(keyword, 'i');
    var result = blockNames.filter(function (block) {
        return block.match(regexp);
    });

    return result;
}

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
