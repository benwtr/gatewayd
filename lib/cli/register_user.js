var gateway = require(__dirname+'/../../');
var PrettyPrintTable = require(__dirname+'/../views/text/');

/**
* Register a User
* - creates external account named "default"
* - creates ripple address as provided
*
* @param {string} name
* @param {string} rippleAddress 
* @param {string} password
* @returns {User}, {ExternalAccount}, {RippleAddress}
*/

function registerUser(username, password, rippleAddress){

  var opts = {
    name: username,
    password: password,
    ripple_address: rippleAddress
  };

  gateway.api.registerUser(opts, function(err, user) {
    if (err) {
      console.log('error reigstering user, changes rollback back');
      console.log(err);
    } else {
      console.log("### CREATED USER ###");
      PrettyPrintTable.users([user]);
      console.log("### CREATED RIPPLE ADDRESSES ###");
      PrettyPrintTable.rippleAddresses([user.hosted_address, user.ripple_address]);
      console.log("### CREATED EXTERNAL ACCOUNT ###");
      PrettyPrintTable.externalAccounts([user.external_account]);
      console.log();
    }
  });

};

module.exports = registerUser;

