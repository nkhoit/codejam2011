function rdiagram(){
//	this.setup();

	now.name=prompt('what is you name?',"");
	now.receiveMessage=function(name,msg){
		$('<div/>').text(name+":"+msg).appendTo('#msg');

	};

	$('#sendb').click(function(){
		now.distributeMessage($('#textI').val());
		$('#textI').val("");
	});



}
	rdiagram.prototype.setup=function(json){
		var n=1,	
		    m=30,
		    data=d3.layout.stack()(stream_layers(n,m,.1)),
		    color=d3.interpolateRgb("#aad","#556");
		
		var p=20,
		    w=960,
		    h=500-.5-p,
		    mx=m,
		    my=d3.max(data,function(d){
			return d3.max(d,function(d){
				return d.y0+d.y;
			});
		    }),
		    mz=d3.max(d,function(d){
		    	return d3.max(d,function(d){
				return d.y;
			});
		    }),
		    x=function(d){return d.x*w/mx;},
		    y0=function(d){return h-d.y0*h/my;};
		
		var vis=d3.select('#chart')
			.append("svg:svg")
			 .attr("width",w)
			 .attr("height",h+p);
	};
	
	$(document).ready(function(){
		console.log('seems working');
		new rdiagram();


	});
