var fs= require('fs'),
	http = require('http');

server=http.createServer(function (req, res) {
  fs.readFile("index.html",function(err, data){
  		res.writeHead(200,{'Content-Type':'text/html'});
  		res.write(data);
  		res.end();
  });
});

server.listen(1336);
console.log('Server running at 1336');
