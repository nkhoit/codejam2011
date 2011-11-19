function rdiagram(){
	//this.d3Setup();
	this.snapSetup();
	now.name="client";
	now.receiveMessage=function(name,msg){
		if(name==='client'){
			console.log('this is a client request');
		}else if(name ==='exchange'){
			console.log('this is a server request');
		}
		
	};
}
	rdiagram.prototype.d3Setup=function(json){
	};

	rdiagram.prototype.snapSetup=function(json){
		//test json 
		if(typeof json=="undefined"){
			json={};
}
		}
		$('#snapT').html('<thead><tr>'+
				'<th>Time Stamp</th>'+
				'<th>Buy Sell or Execute</th>'+
				'<th>Order Reference ID</th>'+
				'<th>Execution Match Number</th>'+
				'<th>Stock Amount</th>'+
				'<th>Stock Symbol</th>'+
				'<th>Sell Order Reference ID</th>'+
				'<th>Buy Order Reference ID</th>'+
				'<th>Parent Order Reference ID</th>'+
				'<th>Price</th>'+
				'<th>State(Fill or Unfilled)</th>'+
				'<th>Client Telephone Number</th>'+
				'</tr></thead>');

		var content='<tbody>';
		var i=0;
		while(i<json.length){
			i++;
		}
		content+='</tbody>';

	};
	
	
	$(document).ready(function(){
		new rdiagram();
		$('#snapB').click(function(){
			$('#snapB').toggleClass();	

		});


	});
