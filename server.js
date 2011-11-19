//var querystring = require('querystring');
var http = require('http');
//var fs = require('fs');


var server = http.createServer(function (req, res) {
    switch(req.url) {
        case '/':
              console.log("[501] " + req.method + " to " + req.url);
              res.writeHead(501, "Not implemented", {'Content-Type': 'text/html'});
              res.end('<html><head><title>501 - Not implemented</title></head><body><h1>Not implemented!</h1></body></html>');
              break;
        case '/exchange/incoming/':
        case '/exchange/incoming':
            console.log("[SERVER] " + req.method + " to " + req.url);
            if (req.method == 'POST') {
                //parse POST REQUEST body 
            
                //process data
                
                //
                
                //trade execution messages on this order should be sent to /broker/endpoint
                //via HTTP POST
                
                
                //HTTP response - accept or reject
                
                
                
                //example
                    req.on('data', function(chunk) {
                        console.log("Received body data:");
                        console.log(chunk.toString());
                    });
                    
                    req.on('end', function() {
                        // empty 200 OK response for now
                        res.writeHead(200, "OK", {'Content-Type': 'text/html'});
                        res.end("Got your message");
                    });
            } else {
                console.log("Not a post");
            }
            break;
        default:
              res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
              res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
              console.log("[404] " + req.method + " to " + req.url);
    };
}).listen(8000);

/*
var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
});

post_req.write(post_data);
*/

console.log('Server running at 8000');