var gateway = require(__dirname+'/../..');
var DepositProcessor = require(__dirname+'/../../lib/core/deposit_processor.js');
var assert = require('assert');
var crypto= require('crypto');

var user;
var independentAddress;
var externalAccount
var deposit;
var random = function(){ return crypto.randomBytes(16).toString('hex') };

describe('Deposit Processor', function() {
  
  before(function(done) {
    gateway.api.registerUser({
      name: random(),
      password: random(),
      ripple_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    }, function(error, registeredUser) {
      user = registeredUser;
      independentAddress = registeredUser.ripple_address;
      externalAccount = registeredUser.external_account;
      done();
    })
  });

  describe('Enqueuing a payment to ripple', function() {

    before(function(done) {
      gateway.api.recordDeposit({
        external_account_id: externalAccount.id,
        amount: 5,
        currency: 'XAG'
      }, function(error, depositRecord) {
        deposit = depositRecord
        gateway.config.set('DEPOSIT_FEE', 0.02);
        depositProcessor = new DepositProcessor(deposit);
        depositProcessor.processDeposit(done);
      });
    });

    it('should create an outgoing payment record', function() {
      assert(depositProcessor.outgoingPayment.id);
      assert.strictEqual(depositProcessor.outgoingPayment.state, 'outgoing');
    });

    it('should have a reference to the deposit', function() {
      assert.strictEqual(depositProcessor.outgoingPayment.external_transaction_id, deposit.id);
    });

    it('should charge a configurable fee', function() {
      assert.strictEqual(depositProcessor.outgoingPayment.to_amount, '4.9');
    });

    it('should use the user independent address', function() {
      assert.strictEqual(depositProcessor.outgoingPayment.to_address_id, independentAddress.id);
    });

  });
});

