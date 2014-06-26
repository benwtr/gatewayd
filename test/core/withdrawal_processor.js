var gateway = require(__dirname+'/../..');
var WithdrawalProcessor = require(__dirname+'/../../lib/core/withdrawal_processor.js');
var assert = require('assert');
var crypto= require('crypto');

var user;
var independentAddress;
var externalAccount
var withdrawal;
var incomingTransaction;
var random = function(){ return crypto.randomBytes(16).toString('hex') };

describe('Withdrawal Processor', function() {
  
  before(function(done) {
    gateway.api.registerUser({
      name: random(),
      password: random(),
      ripple_address: 'r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk'
    }, function(error, registeredUser) {
      user = registeredUser;
      independentAddress = registeredUser.ripple_address;
      hostedAddress = registeredUser.hosted_address;
      externalAccount = registeredUser.external_account;
      done();
    })
  });

  describe('Processing an incoming payment', function() {

    before(function(done) {
      gateway.data.models.rippleTransactions.create({
        to_address_id: hostedAddress.id,
        from_address_id: 99999,
        to_amount: 100,
        to_currency: 'XAG',
        to_issuer: gateway.config.get('COLD_WALLET'),
        from_amount: 100,
        from_currency: 'XAG',
        from_issuer: gateway.config.get('COLD_WALLET'),
        state: 'incoming'
      }).complete(function(error, transaction) {
        incomingTransaction = transaction;
        withdrawalProcessor = new WithdrawalProcessor(incomingTransaction);
        withdrawalProcessor.processIncomingPayment(done);
      });
    });

    it('should create a withdrawal external transaction record', function() {
      assert(withdrawalProcessor.externalTransactionWithdrawal.id);
      assert.strictEqual(withdrawalProcessor.externalTransactionWithdrawal.status, 'queued');
      assert.strictEqual(withdrawalProcessor.externalTransactionWithdrawal.deposit, false);
    });

    it('should have a reference to the ripple transaction', function() {
      assert.strictEqual(withdrawalProcessor.externalTransactionWithdrawal.ripple_transaction_id, incomingTransaction.id);
    });

    it('should charge a configurable fee', function() {
      assert.strictEqual(withdrawalProcessor.externalTransactionWithdrawal.amount, '99');
    });

    it('should use the user external account', function() {
      assert.strictEqual(withdrawalProcessor.externalTransactionWithdrawal.external_account_id, externalAccount.id);
    });

  });
});

