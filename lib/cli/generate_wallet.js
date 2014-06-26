var gateway = require(__dirname+'/../../');

module.exports = function() {
  gateway.api.generateWallet(function(error, wallet) {
    if (error) {
      throw new Error(error);
    } else {
      console.log(wallet);
    }
  });
}

