var SqlMqWorker = require('sql-mq-worker');
var DepositProcessor = require(__dirname+'/../lib/core/deposit_processor.js');
var gateway = require(__dirname+'/../');

var worker = new SqlMqWorker({
  Class: gateway.data.models.externalTransactions,
  predicate: { where: {
    deposit: true,
    status: 'queued'
  }},
  job: function(deposit, callback) {
    depositProcessor = new DepositProcessor(deposit);
    depositProcessor.processDeposit(callback);
  }
});

worker.start();

