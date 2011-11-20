var filter = require('./filter.js');

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
var i = 0;

module.exports = {
    filter: function (json, callback) {
        i++;
	var mesg="";
	

	callback();
    }
       /* if (status === 'accept') {
            console.log("accept" + i);
            return _accept(i);
        } else {
            return _reject('asd');
        }
    },//end response*/

};
