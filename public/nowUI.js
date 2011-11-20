function rdiagram(json){
	this.snapData=[];
	this.realData=[];

	this.snapData.push({"BS":"hello","ES":"this is a","Time":"test"});	
	//test json 
	if(typeof json!="undefined")
		this.snapData=json;
	
	//this.d3Setup();
	this.snapInit();
	this.realInit();

	now.name="client";
	now.receiveMessage=function(name,msg){
		if(name==='client'){
			console.log('this is a client request');
		}else if(name ==='exchange'){
			console.log('this is a server request');
		}
		
	};
}
	function processData(json){
		var set={};
		set.t=[];
		set.d1=[];
		set.d2=[];
		return set;

	}
	rdiagram.prototype.realInit=function(){
		
		var set=processData(this.realData);
		var data1=[],
		    data2=[];
		i=0;
		while(i<set.t.length){
			data1[i]=[set.t[i],set.d1[i]];
			data2[i]=[set.t[i],set.d2[i]];
		}
		$('#placeholder1').css({height:'300'});
		$('#placeholder2').css({height:'300'});
		$.plot("#placeholder1",[{color:"blue",data:data1}],{xaxis:{mode:"time",timeformat:"%h:%M:%S"}});
		$.plot("#placeholder2",[{color:"red",data:data2}],{xaxis:{mode:"time",timeformat:"%h:%M:%S"}});
	};
	

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
				console.log(data);
				this.snapData=eval('['+data+']');
			}).error(function(){
				console.log('Error with get');
			});
			snap.updateSnap();			
		});
		

	});
