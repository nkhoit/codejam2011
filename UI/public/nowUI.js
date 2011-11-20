function rdiagram(json){
	this.snapData=[];
	this.realData=[];

	this.snapData.push({"BS":"hello","ES":"this is a","Time":"test"});	
	//test json 
	if(typeof json!="undefined")
		this.snapData=json;
	
	//this.d3Setup();
	this.snapSetup(this.snapData);
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

	rdiagram.prototype.snapSetup=function(){
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
				'</tr></thead><tbody id="tcontent"></tbody>');
		this.updateSnap();

	};
	rdiagram.prototype.updateSnap=function(){
		var i=0;
		var content="";
		while(i<this.snapData.length){
			content+='<tr>';
			content+='<th>'+this.snapData[i].Time+'</th>';
			content+='<th>'+this.snapData[i].BS+'</th>';
			content+='<th>'+this.snapData[i].OrN+'</th>';
			content+='<th>'+this.snapData[i].ExID+'</th>';
			content+='<th>'+this.snapData[i].StockA+'</th>';
			content+='<th>'+this.snapData[i].StockS+'</th>';
			content+='<th>'+this.snapData[i].SellId+'</th>';
			content+='<th>'+this.snapData[i].BuyId+'</th>';
			content+='<th>'+this.snapData[i].ParentId+'</th>';
			content+='<th>'+this.snapData[i].Price+'</th>';
			content+='<th>'+this.snapData[i].State+'</th>';
			content+='<th>'+this.snapData[i].CliendT+'</th>';
			content+='</tr>;'
			i++;
		}
		$('#tcontent').html(content);
		
	}
	
	
	$(document).ready(function(){
		var snap=new rdiagram();
		$('#snapB').click(function(){
			$.get('/UI',{},function(data){
				var json=eval('['+data+']');
				json=json[0];
				if(json!='undefined')
					this.snapData=json;
				else
					this.snapData=[];	
			}).error(function(){
			
				console.log('Error with get');
			});
			snap.updateSnap();			
		});


	});
