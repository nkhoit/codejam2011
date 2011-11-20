var http=require('http'),
    express=require('express'),
    router=require('choreographer').router();
		

var app=express.createServer();
var everyone=require('now').initialize(app);

app.configure(function(){
	app.use(express.static(__dirname+'/public'));
	});



everyone.now.distributeMessage=function(msg){

	everyone.now.receiveMessage(this.now.name, msg);

};

router.get('/UI',function(req,res,room){
	res.writeHead(200,{'Content-Type':'application/json'});
	res.end("{BS:test}");

})
/*var io=require('socket.io').listen(app);
var interval_id_by_session_id={};

io.sockets.on('connection',function(socket){
	//socket on
	socket.on('message', function(message){
		//client send back message?


		//send real time update
		interval_id_by_session_id[socket.sessionId]=setInterval(function(){
		try{
		everyone.distributeMessage('exchange','hello');
		socket.emit('message',"hello");
		}catch(err){
			console.log(err);
		
		}
		},1001);

	});//when socket on_


	//socket off
	socket.on('disconnect',function(){
	
		clearInterval(clearInterval(interval_id_by_session_id[socket.sessionId]));
		console.log('disconnect');

	});//disconnect, clean up
});
*/
app.listen(1336);
