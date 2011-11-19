var journey = require('journey'),
    util = require('util');

//
// Create a Router
//
var router = new(journey.Router);

// Create the routing table
router.map(function () {
    this.root.bind(function (req, res) { res.send("Welcome") });
    this.get(/^trolls\/([0-9]+)$/).bind(function (req, res, id) {
        database('trolls').get(id, function (doc) {
            res.send(200, {}, doc);
        });
    });
    this.post('/trolls').bind(function (req, res, data) {
        console.log("123"); // "Cave-Troll"
        res.send(200);
        
        req.on('data', function(chunk) {
            console.log("Received body data:");
            console.log(chunk.toString());
        });
        
        req.on('end', function() {
            // empty 200 OK response for now
            res.writeHead(200, "OK", {'Content-Type': 'text/html'});
            res.end("Got your message");
        });
    });
});

require('http').createServer(function (request, response) {
    var body = "";

    request.addListener('data', function (chunk) { body += chunk });
    request.addListener('end', function () {
        //
        // Dispatch the request to the router
        //
        router.handle(request, body, function (result) {
            response.writeHead(result.status, result.headers);
            response.end(result.body);
        });
    });
}).listen(8080);