function chart()
{
}

chart.prototype.plotCharts = function(t, d1, d2)
{
		var data1 = [];
		var data2 = [];
		var i = 0;
				
		for(i = 0; i < t.length - 1; i++)
		{
			data1[i] = [t[i] , d1[i]];
			data2[i] = [t[i] , d2[i]];
		}
		
		$.plot($("#placeholder1"), [{color: "blue", data : data1}], { xaxis: { mode: "time", timeformat: "%h:%M:%S" }});
		$.plot($("#placeholder2"), [{color: "red" , data:  data2}], { xaxis: { mode: "time", timeformat: "%h:%M:%S" }});
}




