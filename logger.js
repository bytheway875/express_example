module.exports = function(request, response, next) {
    var start = +new Date();
    var stream = process.stdout;
    var request = request;

    response.on('finish', function(){
        var duration = +new Date() - start;
        var message =  request.method + ' to ' + request.url + '\ntook ' + duration + ' ms \n\n';
        stream.write(message);
    });



    next();
};