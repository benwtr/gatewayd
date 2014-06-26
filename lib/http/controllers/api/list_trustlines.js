var listTrustlines = require(__dirname+'/../../../ripple/lines.js');
var config = require(__dirname+'/../../../../config/config.js');
var validator = require(__dirname+'/../../../validator.js');

module.exports = function(req, res){
  var account = req.params.account;
  if (!validator.isRippleAddress(account)) {
    return res.send(500, {
      success: false,
      error: { account: 'invalid ripple address' }
    });
  }
  var trustOptions = {
    toAccount: config.get('COLD_WALLET'),
    fromAccount: account
  };
  listTrustlines(trustOptions, function(error, trustlines){
    if (error){
      res.send(500, {
        success: false,
        error: error
      });
    } else {
      res.send({
        success: true,
        trustlines: trustlines
      });
    }
  });
};
