var http = require('http');
var index=require('./script1')
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(function(){
  	var mainpage=new index.main();
  	mainpage.init();
  });
}).listen(1336);
console.log('Server running at 1336');
