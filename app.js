var PORT = 8000;
var funqueue = [];

var http = require('http'),
    parser = require('./sscript/parser'),
    handler = require('./sscript/handler'),
    express=require('express'),
    db = require('./sscript/DBHandler');

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
		//1. first send back to broker 
		//parser add to queue		
		var msg=parser.response(req.body);
		console.log(msg);
		res.send(msg);
});	

app.post('/UI', function(req,res){
    console.log('going to take a snapshot!');
    db.snapshot(function(results) {
        res.send(results);
    });
});

app.post('/search',function(req,res){
    console.log('going to search' + req.body.symbol);
    db.searchStock(req.body.symbol, function(results) {
        res.send(results);
    });
});

app.post('/reset',function(req,res){
	//clear stock transaction
    db.clearTables();
	res.send("success in reset");
});

app.post('/silanis', function(req,res){
  	var sjson={"name":"team nullpointer test",
                   "description":"trading snapshot test",
                   "owner":{name:"Team Null pointer", email:"castlewithwings@gmail.com"},
                   "signer":{name:"Judge Judy",email:"codejamjudge@mcgill.ca"},
                   "transaction":{descript:"this is a test"}
        };
    var surl="ec2-184-73-166-185.compute-1.amazonaws.com/aws/rest/services/codejam/processes";
    //var cmd="curl -X 'POST' -H 'Authorization: Basic Y29kZWphbTpzZWNyZXQ=' -H 'Content-Type:application/json' -d  '"+JSON.stringify(sjson)+"' http://ec2-184-73-166-185.compute-1.amazonaws.com/aws/rest/services/codejam/processess";

	var site=http.createClient(80,surl);
	var headers={
		url:surl,
		'Content-Type':'application/json',
		"Authorization":"Basic Y29kZWphbTpzZWNyZXQ="
	};
	var request=site.request('POST','/',headers);
	request.write(JSON.stringify(sjson));
	request.end();	
	res.send("hello");
	/*request.on('response',function(response){
		console.log(response);
	});*/
});//end

app.listen(PORT);
console.log("running on " + PORT);


