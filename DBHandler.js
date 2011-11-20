var mysql = require('mysql');
var TEST_DATABASE = 'exchange';
var TEST_TABLE = 'order';

var client = mysql.createClient({
    user: 'root',
    password: 'Earlhaig07',
});

client.query('USE '+TEST_DATABASE);
    
    
var countOB=1;		//Order Book table counter
var countTrade=0; 	//Trade table counter
var countDS=0; 		//data snaphsot table counter
var Bcount=1; 		//used for num field, counter
var Scount=1;		//used for num field, counter
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


module.exports = {
    placeOrder: function (dataobject) {
        //get data from object
        //this_time= new Date().getTime(); //not sure how to get time in timestamp format
        this_phone= dataobject.phone;
        this_BS= dataobject.BS; 
        if(this_BS="B")
        {
            this_num="B"+Bcount;
            Bcount++;
        }
        else
        {
            this_num="S"+Scount;
            Scount++;
        }
        this_stock= dataobject.Stock;
        this_shares= dataobject.Shares;
        this_price= dataobject.Price;
        this_twilio= dataobject.Twilio;
        this_state= 'asd';
        this_parent= 'asd';
        this_address= dataobject.BrokerAddress;
        this_port= dataobject.BrokerPort;
        this_endpoint= dataobject.BrokerEndpoint;
        
        continueFlag = true //for the while loop

        //source http://www.giantflyingsaucer.com/blog/?p=2596
        
        //Connecting to MySQL with NodeJS with node.mysql:

        
        
        client.query('INSERT INTO data SET phone=?, BS= ?, num= ?, stock= ?, shares=?, price=?, twilio=?, state=?, parent=?, address=?', [this_phone, this_BS, this_num, this_stock, this_shares, this_price, this_twilio, this_state, this_parent, this_address ]);
        client.query('UPDATE data SET port=?, endpoint=?, time=? WHERE num = "' + this_num + '"', [this_port, this_endpoint, new Date()]);
        
        client.query('SELECT * FROM data WHERE num = "' + this_num + '"').on('row', function (row) {
            console.log(row);
        });
        
        
        console.log('OBJECT ADDED');
        
        //ADD add entry to the last row of OrderBook table
        
        ////while (continueFlag)
        ////{
        ////	continueFlag=false
            /*
            theReturn=NULL;
            
            // a buy must match sells
            if (BS = "S")
            {
                //QUERY - GET FIRST SELL THAT MATCHES
                SELECT * FROM OBTable where MAX price, price>this_price, BS="B", stock=this_stock , 
            
                
                if(results.length > 0) //if found a match, then do exchange
                {
                    if(share>sellShares) // must continue to match buy entry
                    {
                        //make exchange
                        
                        //SET sell is complete, buy incomplete
                        updateOB (key, "F");
                        updateOB (sellKey, "U");
                        
                        //new entry for remaining buy
                    }
                    if(share<sellShares) //all matched, must stop, add residue entry
                    {
                        continueFlag =false;
                        
                        //make exchange

                        //SET buy is complete, sell incomplete	
                        updateOB (key, "U");
                        updateOB (sellKey, "F");
                        
                        //new entry for remaining sell
                    }
                    if(share == sellShares) //must stop, nothing to add 
                    {
                        continueFlag =false;
                        
                        //make exchange
                        
                        //SET both sell and buy complete
                        updateOB (key, "F");
                        updateOB (sellKey, "F");
                        
                    }
                }
                //no match found, nothing to do, just stop
                else
                {
                    continueFlag= false;
                }
            }
            //sell must match the lowest buy
            else
            {
                //QUERY - GET FIRST BUY THAT MATCHES 
            }
            */
        ////}

    }
};

/*
var obj={};

obj.phone='zulu';
obj.BS="B"; 
obj.Stock='XYZ';
obj.Shares=3232;
obj.Price=123;
obj.Twilio='Y';
obj.BrokerAddress='zulu';
obj.BrokerPort='8080';
obj.BrokerEndpoint='zulu';

var db = require('./DBHandler');
db.placeOrder(obj);

function updateOB (key, newstate)
{
	//SET changestate
}
*/