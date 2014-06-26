var SqlMqWorker = require('sql-mq-worker');
var WithdrawalProcessor = require(__dirname+'/../lib/core/withdrawal_processor.js');
var gateway = require(__dirname+'/../');

var worker = new SqlMqWorker({
  Class: gateway.data.models.rippleTransactions,
  predicate: { where: {
    state: 'incoming'
  }},
  job: function(incomingPayment, callback) {
    withdrawalProcessor = new WithdrawalProcessor(incomingPayment);
    withdrawalProcessor.processIncomingPayment(callback);
  }
});

worker.start();

