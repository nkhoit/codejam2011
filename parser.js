var filter = require('./filter');
var querystring = require("querystring");
var ff=filter.init();
function _accept(ref) {
    return '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' +
            '<Response>\n' +
            '<Exchange><Accept OrderRefId=\"' + ref + '\"/></Exchange>\n' +
            '</Response>\n';        
}


function _reject(reason) {
    return '<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n' +
            '<Response>\n' +
            '<Exchange><Reject Reason=\"' + reason + '\"/></Exchange>\n' +
            '</Response>\n';
}

var i = 0;

module.exports = {
    response: function (status) {
        i++;
        if (status === 'accept') {
            console.log("accept" + i);
            return _accept(i);
        } else {
            return _reject('asd');
        }
    },//end response
    
    megParser: function (msg) {
        var obj=querystring.parse(msg);
	obj.Shares=parseInt(obj.Shares);
	obj.Price=parseInt(obj.Price);
	obj.BrokerPort=parseInt(obj.BrokerPort);

        console.log(obj);
	
	var f=ff.getFilteredData(obj);
        var results = f.flag;  //filter check will read the json and filter it. 
	console.log(results);
        if (results === "V") {
            // add to database
            _accept(results);
        } else {
            // dont add to database
	    console.log(typeof f.BrokerEndpoint);
            _reject(results);
        }
      }

}; 
