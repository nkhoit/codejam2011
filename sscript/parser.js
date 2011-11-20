var filter = require('./filter').init();

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
    
    response: function (msg) {

	//pass through filter	
	var f=filter.evaluate(msg);
	console.log(f);
        
	if (f.flag==='V') {
            // add to database
		i++;
           return _accept(i);
        } else {
            // dont add to database
	    console.log(typeof f.BrokerEndpoint);
            return _reject(i);
        }
      }

}; 
