var PORT = 8000;
var funqueue = [];

var http = require('http'),
    parser = require('./sscript/parser'),
    handler = require('./sscript/handler'),
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
		    json.Shares=parseInt(req.body.Shares);
		    json.Price=parseInt(req.body.Price);
		    json.BrokenPort=parseInt(req.body.BrokerPort);
		    
		//1. first send back to broker 
		//parser add to queue		
		parser.response(json, function(msg){
			res.send(msg);
		});
		

});	

app.get('/UI', function(req,res){
	var tjson={};
	res.send(tjson);

});

app.listen(PORT);
console.log("running on " + PORT);


