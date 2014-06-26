var gateway = require(__dirname+'/../../');
var assert = require('assert');
var crypto = require('crypto');
var random = function(){ return crypto.randomBytes(16).toString('hex') }
var _ = require('underscore-node');

var newFailedPayment;

describe('List Failed Payments', function(){

  before(function(done) {
    gateway.data.models.rippleTransactions.create({
      to_address_id: 1,
      from_address_id: 2,
      to_amount: 101,
      from_amount: 101,
      to_currency: 'XAG',
      from_currency: 'XAG',
      to_issuer: 1,
      from_issuer: 1,
      state: 'failed'
    }).complete(function(error, rippleTransaction){
      newFailedPayment = rippleTransaction;
      done();
    }); 
  });

  it('should return payments in the "failed" state', function(done){
    gateway.api.listFailedPayments(function(error, payments) {
      failedPayment = _.filter(payments, function(payment) {
        assert.strictEqual(payment.state, 'failed');
        return newFailedPayment.id === payment.id;
      })[0];
      assert.strictEqual(failedPayment.id, newFailedPayment.id);
      assert.strictEqual(failedPayment.to_currency, 'XAG');
      assert.strictEqual(parseFloat(failedPayment.to_amount), 101)
      done();
    });
  });

  after(function(done) {
    newFailedPayment.destroy().complete(done);
  });

});

