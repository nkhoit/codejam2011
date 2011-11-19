var PORT = 8000;

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
	//console.log(data);
        parser.megParser(data);
        //parser.toDataS(currJ);	
	res.writeHead(200, {'Content-Type': 'text/xml'});
        setTimeout(function () {
            res.end(parser.response('accept'));
        }, 10);
    });
})
.get('/', function(req, res, room) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  res.end('Posted message to ' + room + '.\n');
})
.notFound(function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404: This server is just a skeleton for a chat server.\n' +
    'I\'m afraid ' + req.url + ' cannot be found here.\n');
});

http.createServer(router).listen(PORT);
console.log("running on " + PORT);


//http://journal.paul.querna.org/articles/2010/09/04/limiting-concurrency-node-js/
