var SqlMqWorker = require('sql-mq-worker');
var OutgoingPaymentProcessor = require(__dirname+'/../lib/core/outgoing_payment_processor.js');
var gateway = require(__dirname+'/../');

var worker = new SqlMqWorker({
  Class: gateway.data.models.rippleTransactions,
  predicate: { where: {
    state: 'outgoing'
  }},
  job: function(outgoingPayment, callback) {
    outgoingPaymentProcessor = new OutgoingPaymentProcessor(outgoingPayment);
    outgoingPaymentProcessor.processOutgoingPayment(callback);
  }
});

worker.start();

