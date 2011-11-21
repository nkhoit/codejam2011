function rdiagram(){
	this.snapData=[];

	this.snapData.push({"BS":"hello","ES":"this is a","Time":"test"});	
	//test json 
	
	//this.d3Setup();
	this.snapInit();
	this.graph=new chart();
	this.graph.plotCharts();
	now.name="client";
	now.receiveMessage=function(name,msg){
		if(name==='client'){
			console.log('this is a client request');
		}else if(name ==='exchange'){
			console.log('this is a server request');
		}
		
	};
}
	

	rdiagram.prototype.snapInit=function(){
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
			content+='<th>'+new Date(this.snapData[i].time *1000)+'</th>';
			content+='<th>'+this.snapData[i].BS+'</th>';
			content+='<th>'+this.snapData[i].num+'</th>';
			content+='<th>'+this.snapData[i].EMN+'</th>';
			content+='<th>'+this.snapData[i].shares+'</th>';
			content+='<th>'+this.snapData[i].stock+'</th>';
			content+='<th>'+this.snapData[i].seller+'</th>';
			content+='<th>'+this.snapData[i].buyer+'</th>';
			content+='<th>'+this.snapData[i].parent+'</th>';
			content+='<th>'+this.snapData[i].price+'</th>';
			content+='<th>'+this.snapData[i].state+'</th>';
			content+='<th>'+this.snapData[i].phone+'</th>';
            // content+='<th>'+this.snapData[i].Time+'</th>';
			// content+='<th>'+this.snapData[i].BS+'</th>';
			// content+='<th>'+this.snapData[i].OrN+'</th>';
			// content+='<th>'+this.snapData[i].ExID+'</th>';
			// content+='<th>'+this.snapData[i].StockA+'</th>';
			// content+='<th>'+this.snapData[i].StockS+'</th>';
			// content+='<th>'+this.snapData[i].SellId+'</th>';
			// content+='<th>'+this.snapData[i].BuyId+'</th>';
			// content+='<th>'+this.snapData[i].ParentId+'</th>';
			// content+='<th>'+this.snapData[i].Price+'</th>';
			// content+='<th>'+this.snapData[i].State+'</th>';
			// content+='<th>'+this.snapData[i].CliendT+'</th>';
			content+='</tr>;'
			i++;
		}
		$('#tcontent').html(content);
		
	}
	
	
	$(document).ready(function(){
		var dia=new rdiagram();
		$('#snapB').click(function(){
			$.post('/UI',{},function(data){
				dia.snapData=data;
				console.log("dia"+dia.snapData);
				dia.updateSnap();			
				
			}).error(function(){
				console.log('Error with get');
			});
		});
		

		
		$('#reset').click(function(){
			$.post('/reset',{},function(){
					

				dia.snapData=[];
				dia.realData=[];
				dia.updateSnap();
				console.log("client side reset");
				//redraw for real time data		
			}).error(function(){
				console.log('error with reset');
			});
			
		});
		
		$('#searchB').click(function(){
			
			var sym={};

			if($('#searchI').val()!=''){
				sym.symbol=$('#searchI').val();
			$.post('/search',sym,function(data){
				console.log(sym);
				var json=eval(data);
				console.log(data);
				dia.graph.update(json);		
			}).error(function(){

				console.log('problem with search');
				//need to update graph here 
			});
			}
		});
		
		$('#charB').click(function(){


		});

		$('#silanis').click(function(){
			$.post('/silanis',{},function(data){
				console.log('testing');
			}).error(function(){

				console.log('problem from getting json from nodeserver');
			});
				

		});
		

	});
