var TwilioClient=require('twilio').Client,
  Twiml=require('twilio').Twiml,
  sys=require('sys');

function call(Phone,ID,EMN,Shares,Price){
	var client=new TwilioClient('AC082c740bab6842838bf9be01cb838827','bc318c8b955a5fd5bba55a5875183b89','test.com');

	var phone = client.getPhoneNumber('+18133815203');

	phone.setup(function(){

	phone.sendSms(Phone,'Your order ' + ID + ' has been executed on for ' +Shares + ' shares. Match number is ' + EMN + '. Execution price is ' + Price + ' per share.',null,function(sms){
});
		
	
	});
}

exports.call=call;
	
