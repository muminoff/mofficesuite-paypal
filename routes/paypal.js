var conn = require('../config')
, paypal_api = require('paypal-rest-sdk');

var config_opts = {
  'host': 'api.sandbox.paypal.com',
  'port': '',
  'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
  'clietn_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http:\/\/localhost:3456\/success",
        "cancel_url": "http:\/\/localhost:3456\/cancel"
    },
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};

// Create Payment URL
exports.create = function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  var connection = conn.index
  , plan = req.body.plan
  , name = req.body.manager
  , company = req.body.company
  , email = req.body.email
  , country = req.body.country
  , phone = req.body.phone
  , users = req.body.users
  , amount = req.body.amount
  , domain = req.body.domain;
  if(plan && name && company && email && country && phone && users && amount && domain) {

  var insertQuery = "INSERT INTO `paypal`.`purchased_services` (`plan`, `name`, `company`, `email`, `country`, `phone`, `users`, `amount`, `domain`, `paid`) VALUES (";
  insertQuery += '"' + plan + '", "' + name + '", "' + company + '", "' + email + '", ';
  insertQuery += '"' + country + '", "' + phone + '", "' + users + '", "' + amount + '", "' + domain + '", 0);';
  connection.query(insertQuery, function(err, rows) {
	  if(err)throw err;
      res.json({result: true});
    });
  } else {
      res.json({result: false});
  }
};

// Execute URL
exports.execute = function(req, res){
  res.send('This is success page');
};

// Cancel URL
exports.cancel = function(req, res){
  res.send('This is cancel page');
};

