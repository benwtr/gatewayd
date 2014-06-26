var depositCallbackJob = require(__dirname+'/../jobs/deposit_completion_callback.js');
var gateway = require(__dirname+'/../../');
var uuid = require('node-uuid');
var RippleRestClient = require('ripple-rest-client');

function OutgoingPaymentProcessor(payment) {
  this.outgoingPayment = payment;
}


OutgoingPaymentProcessor.prototype = {

  processOutgoingPayment: function(callback) {
    var self = this;
    var transaction = self.outgoingPayment;
    gateway.data.rippleAddresses.read(transaction.to_address_id, function(err, address) {
      processOutgoingPayment(transaction, address, function(error, resp){
        if (error) {
          switch(error)
          {
            case 'retry':
              transaction.state = 'outgoing';
              break;
            case 'noPathFound':
              transaction.transaction_state = 'tecPATH_DRY';
              transaction.state = 'failed';
              break;
            default:
              transaction.state = 'failed';
          }
          transaction.save().complete(function(){
            depositCallbackJob.perform([transaction.id], console.log);
            callback();
          }); 
        } else {
          var statusUrl = resp.status_url;
          transaction.state = 'sent';
          transaction.uid = resp.client_resource_id;
          transaction.save().complete(function(){
            rippleRestClient.pollPaymentStatus(statusUrl, function(err, payment){
              transaction.transaction_state = payment.result;
              transaction.transaction_hash = payment.hash;
              switch(payment.result) {
              case 'tesSUCCESS':
                transaction.state = 'succeeded';
                break;
              default:
                transcation.state = 'failed';
              }
              transaction.save().complete(function(){
                depositCallbackJob.perform([transaction.id], console.log);
                callback();
              });
            });
          });
        }
      });
    });
  }
};

var rippleRestClient = new RippleRestClient({
  account: gateway.config.get('HOT_WALLET').address,
  secret: ''
})

function processOutgoingPayment(transaction, address, callback){

  rippleRestClient.buildPayment({
    amount: transaction.to_amount,
    currency: transaction.to_currency,
    issuer: gateway.config.get('COLD_WALLET'),
    account: gateway.config.get('HOT_WALLET').account,
    recipient: address.address
  }, function(error, response) {
    if (error) { handleError(error, callback); return; }
    if (!response.success) {
      return handleError(response.message, callback);
    }
    var payment = response.payments[0];
    payment.partial_payment = false;
    payment.no_direct_ripple = false;
    rippleRestClient.sendPayment({
      payment: payment,
      client_resource_id: uuid.v4(),
      secret: gateway.config.get('HOT_WALLET').secret
    }, function(err, resp){
      if (err || !resp.success) {
        handleError(err, callback);
      } else {
        callback(null, resp);
      }
    });
  });

  function handleError(err, callback) {
    if (typeof err === 'string' && err.match('No paths found')){
      callback('noPathFound', null);
    } else {
      callback('retry', null);
    }
  }
}

module.exports = OutgoingPaymentProcessor;

