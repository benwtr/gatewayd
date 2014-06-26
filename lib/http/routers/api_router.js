var apiController = require(__dirname+'/../controllers/api/');

function ApiRouter(opts){
  this.passport = opts.passport;
  this.authName = opts.authName;
};

ApiRouter.prototype.bind = function(app){
  var passport = this.passport;
  function auth() {
    return passport.authenticate('adminBasic', {session: false });
  };

  app.get('/v1/payments/incoming', auth(), apiController.listIncomingPayments);
  app.get('/v1/payments/outgoing', auth(), apiController.listOutgoingPayments);
  app.get('/v1/payments/failed', auth(), apiController.listFailedPayments);
  app.post('/v1/payments/failed/:id/retry', auth(), apiController.retryFailedPayment);
  app.get('/v1/withdrawals', auth(), apiController.listQueuedWithdrawals);
  app.post('/v1/withdrawals/:id/clear', auth(), apiController.clearWithdrawal);
  app.post('/v1/wallets/hot/fund', auth(), apiController.fundHotWallet);
  app.post('/v1/deposits', auth(), apiController.recordDeposit);
  app.get('/v1/deposits', auth(), apiController.listQueuedDeposits);
  app.get('/v1/cleared', auth(), apiController.listCleared);
  app.get('/v1/users/:id/external_accounts', auth(), apiController.listUserExternalAccounts);
  app.post('/v1/users/:id/activate', auth(), apiController.activateUser);
  app.post('/v1/users/:id/deactivate', auth(), apiController.deactivateUser);
  app.post('/v1/registrations', auth(), apiController.registerUser);
  app.post('/v1/start', auth(), apiController.startGateway);
  app.get('/v1/config/database', auth(), apiController.getDatabaseUrl);
  app.post('/v1/config/database', auth(), apiController.setDatabaseUrl);
  app.get('/v1/config/ripple/rest', auth(), apiController.getRippleRestUrl);
  app.post('/v1/config/ripple/rest', auth(), apiController.setRippleRestUrl);
  app.get('/v1/config/domain', auth(), apiController.getDomain);
  app.post('/v1/config/domain', auth(), apiController.setDomain);
  app.post('/v1/wallets/generate', auth(), apiController.generateWallet);
  app.post('/v1/config/wallets/hot', auth(), apiController.setHotWallet);
  app.get('/v1/config/wallets/hot', auth(), apiController.getHotWallet);
  app.post('/v1/config/wallets/cold', auth(), apiController.setColdWallet);
  app.get('/v1/config/wallets/cold', auth(), apiController.getColdWallet);
  app.post('/v1/wallets/hot/fund', auth(), apiController.fundHotWallet);
  app.get('/v1/config/key', auth(), apiController.getKey);
  app.post('/v1/config/key', auth(), apiController.setKey);
  app.get('/v1/currencies', auth(), apiController.listCurrencies);
  app.post('/v1/currencies', auth(), apiController.addCurrency);
  app.delete('/v1/currencies/:currency', auth(), apiController.removeCurrency);
  app.post('/v1/trust', auth(), apiController.setTrustLine);
  app.get('/v1/trust', auth(), apiController.getTrustLines);
  app.post('/v1/config/last_payment_hash', auth(), apiController.setLastPaymentHash);
  app.get('/v1/config/last_payment_hash', auth(), apiController.getLastPaymentHash);
  app.post('/v1/wallets/cold/refund', auth(), apiController.refundColdWallet);
  app.get('/v1/processes', auth(), apiController.listProcesses);
  app.get('/v1/balances', auth(), apiController.getAccountBalance);
  app.get('/v1/liabilities', auth(), apiController.getLiabilities);
  app.get('/v1/trustlines/:account', auth(), apiController.listTrustlines);

};

module.exports = ApiRouter;
