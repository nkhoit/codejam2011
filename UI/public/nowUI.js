function rdiagram(){
	this.setup();

	now.name=prompt('what is you name?',"");
	now.receiveMessage=function(name,msg){
		$('<div/>').text(name+":"+msg).appendTo('#msg');

	};

	$('#sendb').click(function(){
		now.distributeMessage($('#textI').val());
		$('#textI').val("");
	});



}
	rdiagram.prototype.setup=function(){

	};
	
	$(document).ready(function(){
		console.log('seems working');
		new rdiagram();


	});
