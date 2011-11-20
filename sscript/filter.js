function filter() {

}

//This methods sets the flag value of the order object and return it
filter.prototype.evaluate = function(data) {
	var currentOrder = data;
	currentOrder.flag = "V";
	//testing purposes, delete asap
	//var currentOrder = new order("O", "+5-555-55", "B", 50, "test", 100, "Y", "192.168.0.1", 800, "www.google.com");
	//Check message type
	if(currentOrder.flag == "V") {
		this.checkMessageID(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkShares(currentOrder);
	}
	
	if(currentOrder.flag ==  "V") {
		this.checkStock(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkPrice(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkBS(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkTwilio(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkBrokerPort(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkBrokerAddress(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkBrokerEndPoint(currentOrder);
	}
	
	if(currentOrder.flag == "V") {
		this.checkPhone(currentOrder);
	}
	
	return currentOrder;
};

//Return M if message type is missing or invalid
filter.prototype.checkMessageID = function(e) {
	if(e.MessageType != "O" || typeof e.MessageType != "string") {
		e.flag = "M";	
	}
};

//Return Z if number of shares is missing or invalid
filter.prototype.checkShares = function(e) {
	if((e.Shares <= 0 || e.Shares >= 1000000) || typeof e.Shares != "number") {
		e.flag = "Z";
	}
};

//Return S if invalid
filter.prototype.checkStock = function(e) {
	if(e.Stock.length > 8 || typeof e.Stock != "string") {
		e.flag = "S";
	}
};

filter.prototype.checkPrice = function(e) {
	if((e.Price < 1 || e.Price > 100000) || typeof e.Price != "number")
	{
		e.flag = "X";
	}
}

filter.prototype.checkBS = function(e) {
	if(e.BS != "B" && e.BS != "S" || typeof e.BS != "string")
	{
		e.flag = "I";
	}
}

filter.prototype.checkTwilio = function(e) {
	if(e.Twilio != "Y" && e.Twilio != "N" || typeof e.Twilio != "string")
	{
		e.flag = "T";
	}
}

filter.prototype.checkBrokerPort = function(e) {
	if(e.BrokerPort < 10 || e.BrokerPort > 99999)
	{
		e.flag = "P";
	}
}

filter.prototype.checkBrokerAddress = function(e) {
	if(typeof e.BrokerAddress != "string") {
		e.flag = "A";
	}
}

filter.prototype.checkBrokerEndPoint = function(e) {
	if(typeof e.BrokerEndpoint != "string")	{
		e.flag = "E";
	}
}

filter.prototype.checkPhone = function(e) {
	var i = 0;
	if(e.From[0] != "+") {
		e.flag = "F";
	} else if (e.flag != "F") {
		for( i = 1; i < e.From.length; i++) {
			if((e.From[i] < '0' || e.From[i] > '9')) {
				e.flag = "F";
			}
		}
	}
}

module.exports={
	init: function() {
	    return new filter();
	}
};
