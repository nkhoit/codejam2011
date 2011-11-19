

(function(){
	
	$(document).ready(function(){
		now.name=promp("what is your name?", "");
		now.receiveMessage=function(name,msg){
			$("<div/>").text(name+" : "+msg).appendTo("#msg");
		};
		
		$("#sendb").click(function(){
			now.distributeMessage($("#textI").val());
			$("#textI").val("");
		});
		
	});
	
})();
