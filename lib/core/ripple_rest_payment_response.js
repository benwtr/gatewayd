function RippleRestPaymentResponse(rippleRestPaymentResponseJson) {
  this.responseJson = rippleRestPaymentResponseJson
  this.error = this.responseJson.error
}

RippleRestPaymentResponse.prototype = {
  updateAssociatedRippleTransactionRecord: function(callback) {
    callback();
  }
}

module.exports = RippleRestPaymentResponse

