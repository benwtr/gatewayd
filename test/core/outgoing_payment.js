var outgoingTransactionRecord;

describe('Outgoing Payment', function() {

  describe('Sending a queued payment to ripple', function() {

    it('should send a payment to ripple rest', function() {

    });

    it('should confirm the success of a payment', function() {

    });

    it('should handle the failure of a payment', function() {

    });

    it('should determine whether a payment has failed', function() {

    });

    it('should retry a payment', function() {

    });

    before(function(done) {
      outgoingPayment = new OutgoingPayment(outgoingTransactionRecord);
    });

  });

  before(function(done) {
    gateway.data.models.rippleTransactions.create({
      
    }).complete(function(error, rippleTransaction) {
      outgoingTransactionRecord = rippleTransaction;
      done();
    });
  });

  after(function(done) {
    outgoingTransactionRecord.destroy().complete(done);
  });

});
