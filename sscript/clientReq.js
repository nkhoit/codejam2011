module.export = {
    send: function (a,b,c,d,e,f,g,h,i) {
        var cookie = 'something=anything'
        
        var address = g;
        var port = h;
        var endpoint = i;
        
        // + %2B
        var data = "MessageType=" + a + "&OrderReferenceIdentifier=" + b + "&ExecuatedShares=" + c + "&ExecutionPrice=" + d + "&MatchNumber=" + e + "&To=" + f;

        var client = http.createClient(80, 'localhost');

        var headers = {
            'Host': g + ':' + h,
            'Cookie': cookie,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': data.length
        };

        var request = client.request('POST', '/broker/endpoint', headers);
        
        var res_data;

        request.on('response', function(response) {
          response.on('data', function(chunk) {
            res_data += chunk;
          });
          response.on('end', function() {
            // res_data is our response from broker, but dont need to do anything
          });
        });
        request.write(data);
        request.end();
    }
};