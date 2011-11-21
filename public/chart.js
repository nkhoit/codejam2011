 
function chart()
{
	this.data1=[];
	this.data2=[];
	this.plot1;
	this.plot2;
	
}

chart.prototype.plotCharts = function()
{		
	this.plot1 = $.plot($("#placeholder1"), [{color: "blue", data : this.data1}], {xaxis: {mode : "time", timeformat: "%h:%M:%S"}});
	this.plot2 = $.plot($("#placeholder2"), [{color: "red" , data :  this.data2}], {xaxis: {mode : "time", timeformat: "%h:%M:%S"}});
}

chart.prototype.update = function(json)
{
	var i = 0;
	var time = [];
	var price = [];
	var stock = [];
	var jsonObj;
	
	jsonObj=json;
	console.log('jsonOb:'+jsonObj);
	
	/*
	time = parseInt(jsonObj.time); 
	price = parseInt(jsonObj.price);
	stock = parseInt(jsonObj.stock);
	*/
	for( i=0;i<json.length;i++){
		time.push(parseInt(jsonObj[i].time));
		price.push(parseInt(jsonObj[i].price));
		stock.push(parseInt(jsonObj[i].shares));	
	}
	console.log(time);
	console.log(price);
	console.log(stock);

	this.data1=[];
	this.data2=[];	
	for( i = 0; i < time.length; i++ )
	{
		this.data1.push([time[i],price[i]]);
		this.data2.push([time[i],stock[i]]);
	}
	console.log('should draw');
		console.log(this.data1);
		console.log(this.data2);
	
	this.plot1 = $.plot($("#placeholder1"), [{color: "blue", data : this.data1}], {xaxis: {mode : "time", timeformat: "%h:%M:%S"}});
	this.plot2 = $.plot($("#placeholder2"), [{color: "red" , data:  this.data2}], {xaxis: {mode : "time", timeformat: "%h:%M:%S"}});
}
