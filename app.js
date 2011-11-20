var PORT = 8000;
var funqueue = [];

var http = require('http'),
    parser = require('./parser'),
    handler = require('./handler'),
    express=require('express');

var app=express.createServer();
var everyone=require('now').initialize(app);

app.configure(function(){
	app.use(express.static(__dirname+'/public'));
	});
everyone.now.distributeMessage=function(msg){
	everyone.now.receiveMessage(this.now.name,msg);
};


app.use(express.bodyParser());    
var counter=0;
app.post('/exchange/endpoint', function(req, res) { 
		//parsing 		
		var json=req.body;
		json.Shares=parseInt(obj.Shares);
        	json.Price=parseInt(obj.Price);
        	json.BrokerPort=parseInt(obj.BrokerPort);

		//1. first send back to broker		
		parser.filter(json,function(response){
			res.send(response);
		});

});	

app.listen(PORT);
console.log("running on " + PORT);


