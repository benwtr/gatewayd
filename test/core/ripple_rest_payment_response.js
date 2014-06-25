var RippleRestPaymentResponse = require(__dirname+'/../../lib/core/ripple_rest_payment_response.js');
var assert = require('assert');

var successfulPaymentResponseJson;
var failedPaymentResponseJson;

describe('A Payment Response from Ripple Rest', function() {

  describe('the response to a successful payment', function() {
    it('should have no errors', function() {
      var paymentResponse = new RippleRestPaymentResponse(successfulPaymentResponseJson);
      assert(!paymentResponse.error);
    });
  });

  describe('the response to a failed payment', function() {
    it('should have an error', function() {
      var paymentResponse = new RippleRestPaymentResponse(failedPaymentResponseJson);
      assert.strictEqual(paymentResponse.error, 'temBAD_PATH');
    });
  });

  describe('handling the ripple rest payment response', function() {
    it.skip('should record a successful response in the database', function(done) {
      var successfulPaymentResponse = new RippleRestPaymentResponse(successfulPaymentResponseJson);
      successfulPaymentResponse.updateAssociatedRippleTransactionRecord(done);
    });

    it.skip('should record a failed response in the database', function(done) {
      var failedPaymentResponse = new RippleRestPaymentResponse(failedPaymentResponseJson);
      failedPaymentResponse.updateAssociatedRippleTransactionRecord(done);
    });
  });

  before(function() {
    // Example JSON data is from the github wiki for Ripple REST
    // https://github.com/ripple/ripple-rest/blob/develop/docs/api-reference.md#submit-a-payment
    successfulPaymentResponseJson = {
      "success": false,
      "client_resource_id": "f2f811b7-dc3b-4078-a2c2-e4ca9e453981",
      "error": "Some Error",
      "message": "Some explanation of the error"
    };
    failedPaymentResponseJson = {
      "success": true,
      "client_resource_id": "f2f811b7-dc3b-4078-a2c2-e4ca9e453981",
      "status_url": ".../v1/accounts/r1.../payments/f2f811b7-dc3b-4078-a2c2-e4ca9e453981"
    };
  });
});

