var fs= require('fs'),
	http = require('http');

server=http.createServer(function (req, res) {
  fs.readFile("./content/ndex.html",function(err, data){
  		res.writeHead(200,{'Content-Type':'text/html'});
  		res.write(data);
  		res.end();
  });
});

server.listen(1336);
console.log('Server running at 1336');


//Now.js
//all clients 
var everyone = require('now').initialize(server);

everyone.now.distributMessage=function(msg){
	everyone.now.receiveMessage(this.now.name,msg);
};

