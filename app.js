var PORT = 8000;
var funqueue = [];

var http = require('http'),
    router = require('choreographer').router(),
    parser = require('./parser'),
    handler = require('./handler');
    
router.post('/exchange/endpoint', function(req, res) {
    var data = '';
    req.on('data', function (chunk) {
        data += chunk;
    });
    
    req.on('end', function() {
        parser.megParser(data);
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(parser.response('accept'));
    });
})
.get('/UI', function(req, res, room) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Posted message to ' + room + '.\n');
})
.notFound(function(req, res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404');
});

http.createServer(router).listen(PORT);
console.log("running on " + PORT);


//http://journal.paul.querna.org/articles/2010/09/04/limiting-concurrency-node-js/
