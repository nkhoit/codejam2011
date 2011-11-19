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
        var json = '{';
        var s = msg.split('&');
        var i = 0;
        //console.log(msg);
        var v;
        while (i<s.length) {
            v=s[i].split('=');
            json+=(i!=s.length-1)?" "+v[0]+" : "+v[1]+",":" "+v[0]+" : "+v[1];
            i++;
        }
        json+=" }";
       // console.log('json: ' + json);
        
        /*var obj=json.evalJson(true);
        console.log(obj);    
        return obj;
        */
        
	
    }//end megParser
};
