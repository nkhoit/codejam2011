var mysql = require('mysql');
var DATABASE = 'exchange';
var TEST_TABLE = 'order';

var clientReq = require('./clientReq');

var client = mysql.createClient({
    user: 'root',
    password: 'Earlhaig07',
});

var countOB=3;		//Order Book table counter
var countTrade=1; 	//Trade table counter
var countDS=1; 		//data snaphsot table counter
var Bcount=3; 		//used for num field, counter
var Scount=4;		//used for num field, counter
var Ocount=1;		//used for num field, counter

// create 3 tables, only once at begining. place in a function initilaise() ?

/*CREATE TABLE 'codejam'.'OBTable' (
'id' INT UNSIGNED NOT NULL PRIMARY KEY ,
'time' TIMESTAMP,				//time received
'from' VARCHAR( 20 ) NOT NULL, 	//phone number	
'BS' VARCHAR NOT NULL,			//B or S
'num' VARCHAR(8) NOT NULL,		//reference id, ex. B32
'stock' VARCHAR(8) NOT NULL,	//stock name
'shares' INTEGER,				//number of shares
'price' INTEGER,				//share price
'twilio' VARCHAR(5) NOT NULL, 	//true or false
'state' VARCHAR,				// F, U, - filled or unfilled 
'parent' VARCHAR(8),			//for residual transactions
'address' VARCHAR(20),			//broker address
'port' INTEGER					//broker porT number	
'endpoint' VARCHAR(20),			//broker url
) ENGINE = MYISAM ; 
*/
/* THE TWO OTHER TABLES
CREATE TABLE 'NodeSample'.'TradesTable' (
'id' INT UNSIGNED NOT NULLPRIMARY KEY ,

) ENGINE = MYISAM ; 

CREATE TABLE 'NodeSample'.'DSTable' (
'id' INT UNSIGNED NOT NULL PRIMARY KEY ,

) ENGINE = MYISAM ; 
*/

function _ISODateString(d) {
    function pad(n) {
        return (n<10 ? '0'+n : n);
    }
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z'
}


function _makeTimestamp( dateobj ) {
	var date = new Date( dateobj );
	var yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var min = date.getMinutes();
    var ss = date.getSeconds();
	
	var mysqlDateTime = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss;
       
    return mysqlDateTime;
}

function retrieveB(sell_price, sell_stock, callback) {
    var b_results = [];
    var curr_time = new Date();
    var results;
    console.log(_ISODateString(curr_time));
    console.log("niside retrieveB" + sell_price + " " + sell_stock);
    client.query('USE ' + DATABASE);
    client.query('SELECT * FROM data WHERE dirty=0 AND BS = "B" AND STOCK = "' + sell_stock + '" AND price >= ' + sell_price + ' AND time < "' + _ISODateString(curr_time) + '" ORDER BY price DESC')
    .on('row', function(row) {
        b_results.push(row);
    }).on('end', function(row) {
        console.log(b_results);
        callback(b_results);
    });
}




function retrieveS(sell_price, sell_stock, callback) {
    var s_results = [];
    var curr_time = new Date();
    var results;
    console.log("niside retrieveS" + sell_price + " " + sell_stock);
    console.log(_ISODateString(curr_time));
    client.query('USE ' + DATABASE);
    client.query('SELECT * FROM data WHERE dirty=0 AND BS = "S" AND STOCK = "' + sell_stock + '" AND price <= ' + sell_price + ' AND time < "' + _ISODateString(curr_time) + '" ORDER BY price ASC')
    .on('row', function(row) {
        s_results.push(row);
    })
    .on('end', function(row) {
        callback(s_results);
    });
}



module.exports = {
    placeOrder: function (dataobject) {
        client.query('USE ' + DATABASE);
        
        this_phone= dataobject.From;
        this_BS = dataobject.BS; 
        if( this_BS == "B") {
            this_num = "B" + Bcount;
            Bcount++;
        } else {
            this_num = "S" + Scount;
            Scount++;
        }
        this_stock= dataobject.Stock;
        this_shares= dataobject.Shares;
        this_price= dataobject.Price;
        this_twilio= dataobject.Twilio;
        this_state= '';
        this_parent= '';
        this_address= dataobject.BrokerAddress;
        this_port= dataobject.BrokerPort;
        this_endpoint= dataobject.BrokerEndpoint;
        
        continueFlag = true; //for the while loop

        //source http://www.giantflyingsaucer.com/blog/?p=2596
        
        //Connecting to MySQL with NodeJS with node.mysql:

        
        
        client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?', [this_phone, this_BS, this_num, this_stock, this_shares, this_price, this_twilio, this_state ]);
        client.query('UPDATE data SET parent=?, address=?, port=?, endpoint=?, time=? WHERE num = "' + this_num + '"', [this_parent, this_address, this_port, this_endpoint, _ISODateString(new Date())]);
        console.log("insert data");
        //client.query('SELECT * FROM data WHERE num = "' + this_num + '"').on('row', function (row) {
        //    console.log(row);
        //});
        
        
        console.log('OBJECT ADDED');
        
        if (this_BS == "B") //match sells
        {
            retrieveS(this_price, this_stock, function(results) {
            
                console.log("what is s_results? " + results);
                
                if (results.length>0) //there are matches
                {
                    initial_shares = this_shares;
                    ind= 0;
                    continueFlag=true;
                    
                    while(continueFlag)
                    {
                        
                        if(this_shares>results[ind].shares) // must continue to match buy entry
                        {
                           
							
                            this_shares = this_shares - results[ind].shares;  //remaining shares
                        
                            //filleld seller, buyer incomplete
                            client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + results[ind].num + '"' );
                            client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + this_num + '"' );
                        
                           //to add only after all matching
                           // client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?, parent=?, address=?', [this_phone, this_BS, this_num, this_stock, this_shares, this_price, this_twilio, this_state, this_parent, this_address ]);
                            
                            //SET sell is complete, buy incomplete
                            
                            //	updateOB (key, "F");
                            //updateOB (sellKey, "");
                            
                            //new entry for remaining buy
							
							
							
							client.query('INSERT INTO exec SET  BS= ?, num= ?, stock= ?, shares=?, price=?, time=?, seller=?, buyer=?, EMN=?', ["E", "E" + Ocount, this_stock, results[ind].shares, this_price, _ISODateString(new Date()), results[ind].num, this_num, Ocount]);
							clientReq.send("E" , this_num, this_shares, results[ind].price, Ocount, result[0].address, result[0].port, result[0].endpoint); //the buy
                            clientReq.send("E" , result[0].num, this_shares, results[ind].price, Ocount, this_address, this_port, this_endpoint); // the sell
                            Ocount++;
                        }
                        else
                        if(this_shares<results[ind].shares) //all matched, must stop, add residue entry
                        {
                            continueFlag =false; //all shares were matched
                            
                            this_num="O"+Ocount;
                            Ocount++;
                            
                            remaining_shares = results[ind].shares - this_shares;  //remaining shares
                           
                           client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + results[ind].num + '"');
                           client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + this_num + '"');
                           
                            this_shares=0;
                            //insert rezidual into data 
                            client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?, parent=?, address=?', [results[ind].phone, results[ind].BS, this_num, results[ind].stock, remaining_shares, results[ind].price, results[ind].twilio, "U", results[ind].num, results[ind].address ]);
                            console.log("insert rezidual into data ");
                            //make exchange

                            //SET buy is complete, sell incomplete	
                            //updateOB (key, "U");
                            //updateOB (sellKey, "F");
                            
                            //new entry for remaining sell
							
							client.query('INSERT INTO exec SET  BS= ?, num= ?, stock= ?, shares=?, price=?, time=?, seller=?, buyer=?, EMN=?', ["E", "E" + Ocount, this_stock, this_shares, this_price, _ISODateString(new Date()),  results[ind].num, this_num, Ocount]);
							clientReq.send("E" , this_num, this_shares, results[ind].price, Ocount, result[0].address, result[0].port, result[0].endpoint); //the buy
                            clientReq.send("E" , result[0].num, this_shares, results[ind].price, Ocount, this_address, this_port, this_endpoint); // the sell
                            
                            Ocount++;
                            
                        }
                        else
                        if(this_shares==results[ind].shares) //must stop, nothing to add 
                        {
                            //both filled
                             client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + results[ind].num + '"');
                             client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + this_num + '"');
                        
                            continueFlag =false;
                            this.shares=0;
                            //make exchange
                            
                            //SET both sell and buy complete
                            //updateOB (key, "F");
                            //updateOB (sellKey, "F");
							client.query('INSERT INTO exec SET  BS= ?, num= ?, stock= ?, shares=?, price=?, time=?, seller=?, buyer=?, EMN=?', ["E", "E" + Ocount, this_stock, this_shares, this_price, _ISODateString(new Date()),  results[ind].num, this_num, Ocount]);
							clientReq.send("E" , this_num, this_shares, results[ind].price, Ocount, result[0].address, result[0].port, result[0].endpoint); //the buy
                            clientReq.send("E" , result[0].num, this_shares, results[ind].price, Ocount, this_address, this_port, this_endpoint); // the sell
                            Ocount++;
                            
                        }
                        ind++;
                        if(ind>results.length)
                             continueFlag =false; // no more shares to check         
                    }
                    if (initial_shares!=this_shares && this_shares>0)
                    {
                    
                        //only some shares sold
                         this_num="O"+Ocount;
                            Ocount++;
                            console.log("11");
                         client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?, parent=?, address=?', [this_phone, this_BS, this_num, this_stock, this_shares, this_price, this_twilio, "U", this_parent, this_address ]);
                         console.log("only some shares sold");
                    }
                }
                
            });
        } else { //match buys
        
            retrieveB(this_price, this_stock, function(results) {
        
                console.log("what is s_results? " + results);
                
                if (results.length>0) //there are matches
                {
                    initial_shares = this_shares;
                    ind= 0;
                    continueFlag=true;
                    
                    console.log(this_shares+ " " + results[ind].shares);
                    
                    while(continueFlag)
                    {
                        console.log("loop nr"+ind+" "+results[ind].shares);
                        if(this_shares>results[ind].shares) // must continue to match buy entry
                        {
                           
                        
                            this_shares = this_shares - results[ind].shares;  //remaining shares
                        
                            //filleld seller, buyer incomplete
                            client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + results[ind].num + '"' );
                            client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + this_num + '"' );
                        
                           //to add only after all matching
                           // client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?, parent=?, address=?', [this_phone, this_BS, this_num, this_stock, this_shares, this_price, this_twilio, this_state, this_parent, this_address ]);
                            
                            //SET sell is complete, buy incomplete
                            
                            //	updateOB (key, "F");
                            //updateOB (sellKey, "");
                            
                            //new entry for remaining buy
							client.query('INSERT INTO exec SET  BS= ?, num= ?, stock= ?, shares=?, price=?, time=?, seller=?, buyer=?, EMN=?', ["E", "E" + Ocount, this_stock, results[ind].shares, this_price, _ISODateString(new Date()),  this_num, results[ind].num, Ocount]);
							clientReq.send("E" , this_num, this_shares, results[ind].price, Ocount, result[0].address, result[0].port, result[0].endpoint); //the buy
                            clientReq.send("E" , result[0].num, this_shares, results[ind].price, Ocount, this_address, this_port, this_endpoint); // the sell
                            Ocount++;
                        }
                        else
                        if(this_shares<results[ind].shares) //all matched, must stop, add residue entry
                        {
                            continueFlag =false; //all shares were matched
                            
                            this_num="O"+Ocount;
                            Ocount++;
                            
                            remaining_shares = results[ind].shares - this_shares;  //remaining shares
                           
                           client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + results[ind].num + '"');
                           client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + this_num + '"');
                           
                            this_shares=0;
                            //insert rezidual into data 
                            client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?, parent=?, address=?, time=?', [results[ind].phone, results[ind].BS, this_num, results[ind].stock, remaining_shares, results[ind].price, results[ind].twilio, "U", results[ind].num, results[ind].address, _ISODateString(new Date())]);
                            console.log("insert rezidual into data ");
                            //make exchange

                            //SET buy is complete, sell incomplete	
                            //updateOB (key, "U");
                            //updateOB (sellKey, "F");
                            
                            //new entry for remaining sell
                            client.query('INSERT INTO exec SET  BS= ?, num= ?, stock= ?, shares=?, price=?, time=?, seller=?, buyer=?, EMN=?', ["E", "E" + Ocount, this_stock, this_shares, this_price, _ISODateString(new Date()),  this_num, results[ind].num, Ocount]);
							clientReq.send("E" , this_num, this_shares, results[ind].price, Ocount, result[0].address, result[0].port, result[0].endpoint); //the buy
                            clientReq.send("E" , result[0].num, this_shares, results[ind].price, Ocount, this_address, this_port, this_endpoint); // the sell
                            Ocount++;
                        }
                        else
                        if(this_shares==results[ind].shares) //must stop, nothing to add 
                        {
                            //both filled
                             client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + results[ind].num + '"');
                             client.query('UPDATE data SET state = "F", dirty=1 WHERE num = "' + this_num + '"');
                        
                            continueFlag =false;
                            this.shares=0;
                            //make exchange
                            
                            //SET both sell and buy complete
                            //updateOB (key, "F");
                            //updateOB (sellKey, "F");
							client.query('INSERT INTO exec SET  BS= ?, num= ?, stock= ?, shares=?, price=?, time=?, seller=?, buyer=?, EMN=?', ["E", "E" + Ocount, this_stock, this_shares, this_price, _ISODateString(new Date()),  this_num, results[ind].num, Ocount]);
							clientReq.send("E" , this_num, this_shares, results[ind].price, Ocount, result[0].address, result[0].port, result[0].endpoint); //the buy
                            clientReq.send("E" , result[0].num, this_shares, results[ind].price, Ocount, this_address, this_port, this_endpoint); // the sell
                            Ocount++;
                            
                        }
                        ind++;
                        if(ind>=results.length)
                             continueFlag =false; // no more shares to check         
                    }
                    if (initial_shares!=this_shares && this_shares>0)
                    {
                    
                        //only some shares sold
                        safe_num=this_num;
                         this_num="O"+Ocount;
                            Ocount++;
                            console.log("11");
                         client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?, parent=?, address=?, time=?', [this_phone, this_BS, this_num, this_stock, this_shares, this_price, this_twilio, "U", safe_num, this_address, _ISODateString(new Date())]);
                         console.log("only some shares sold");
                    }
                }
            
            });
        }
        //ADD add entry to the last row of OrderBook table
        
       

    },
   
    snapshot: function (callback) {
        var results = [];
        client.query('USE ' + DATABASE);
        client.query('SELECT phone, BS, num, stock, shares, price, twilio, state, parent, address, port, endpoint, UNIX_TIMESTAMP(time) as time, dirty,  "" AS seller,  "" AS buyer,  "" AS EMN ' +
        'FROM data ' +
        'UNION ALL ' +
        'SELECT  "", BS, num, stock, shares, price,  "",  "",  "",  "",  "",  "", UNIX_TIMESTAMP(time) as time,  "", seller, buyer, EMN ' +
        'FROM exec ' +
        'ORDER BY time ASC')
        .on('row', function(row) {
            results.push(row);
        })
        .on('end', function() {
            callback(results);
        });
    },
    
    
    searchStock: function (stock, callback) {
        var results = [];
        client.query('USE ' + DATABASE);
        client.query('SELECT price, shares, UNIX_TIMESTAMP(time) as time FROM exec WHERE stock = "' + stock + '" ORDER BY time ASC')
        .on('row', function (row) {
            results.push(row);
        })
        .on('end', function() {
            console.log(results);
            callback(results);
        });
    },
    
    clearTables: function () {
        client.query('USE ' + DATABASE);
        client.query('DELETE * FROM data');
        client.query('DELETE * FROM exec');
    }
};

/*
var obj={};

obj.From='zulu';
obj.BS="S"; 
obj.Stock='XYZ';
obj.Shares=323;
obj.Price=8000;
obj.Twilio='Y';
obj.BrokerAddress='zulu';
obj.BrokerPort='8080';
obj.BrokerEndpoint='zulu';



*/
//db.placeOrder(obj);
/*
var db = require('./DBHandler');
db.snapshot(function (results) {
    console.log(results);
});
*/

//db.retrieveS(90000, "XYZ");

