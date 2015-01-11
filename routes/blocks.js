var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false});

var blocks = {
    'Fixed': 'Fastened securely in position',
    'Movable': 'Capable of being moved',
    'Rotating': 'Moving in a circle around its center'
};

router.route('/')
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

router.route('/:name')
    .all(function(request,response, next) {
        var name = request.params.name;
        var titleizedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
        request.titleizedName = titleizedName;

        next();
    })
    .get(function(request, response) {
        var description = blocks[request.titleizedName];
        if(description){
            response.json(description);
        }else{
            response.status(404).json("Uh oh. Can't find anything here for " + request.params.name);
        }
    })
    .delete(function(request, response){
        if(blocks[request.titleizedName]) {
            var deleted = delete blocks[request.titleizedName];
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

module.exports = router;