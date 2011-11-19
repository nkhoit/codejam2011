var fs=require('fs'),
    http = require('http');

server = http.createServer(function (req, res) {

	fs.readFile(__dirname+'/index.html', function(err,data){
		res.writeHead(200,{'Content-Type':'text/html'})
		res.write(data);
		
		fs.readFile(__dirname+'/nowUI.js',function(err1,data1){
			res.write(data1);
			res.end();		

		});	
	});

});
server.listen(1336);

console.log('now on 1336');


var everyone=require("now").initialize(server);
everyone.now.distributMessage=function(msg){
	everyone.now.receiveMessage(this.now.name,msg);
};
