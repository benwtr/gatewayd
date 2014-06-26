function bind(action, filename){
  module.exports[action] = require(__dirname+'/'+filename);
}

bind('listIncomingPayments', 'list_incoming_payments.js');
bind('listOutgoingPayments', 'list_outgoing_payments.js');
bind('listQueuedWithdrawals', 'list_queued_withdrawals.js');
bind('clearWithdrawal', 'clear_withdrawal.js');
bind('fundHotWallet', 'fund_hot_wallet.js');
bind('recordDeposit', 'record_deposit.js');
bind('listQueuedDeposits', 'list_queued_deposits.js');
bind('listCleared', 'list_cleared.js');
bind('activateUser', 'activate_user.js');
bind('deactivateUser', 'deactivate_user.js');
bind('listUserExternalAccounts', 'list_user_external_accounts.js');
bind('registerUser', 'register_user.js');
bind('startGateway', 'start_gateway.js');
bind('getDatabaseUrl', 'get_database_url.js');
bind('setDatabaseUrl', 'set_database_url.js');
bind('getRippleRestUrl', 'get_ripple_rest_url.js');
bind('setRippleRestUrl', 'set_ripple_rest_url.js');
bind('getDomain', 'get_domain.js');
bind('setDomain', 'set_domain.js');
bind('generateWallet', 'generate_wallet.js');
bind('setHotWallet', 'set_hot_wallet.js');
bind('getHotWallet', 'get_hot_wallet.js');
bind('setColdWallet', 'set_cold_wallet.js');
bind('getColdWallet', 'get_cold_wallet.js');
bind('fundHotWallet', 'fund_hot_wallet.js');
bind('getKey', 'get_key.js');
bind('setKey', 'set_key.js');
bind('listCurrencies', 'list_currencies.js');
bind('addCurrency', 'add_currency.js');
bind('removeCurrency', 'remove_currency.js');
bind('setTrustLine', 'set_trust_line.js');
bind('getTrustLines', 'get_trust_lines.js');
bind('setLastPaymentHash', 'set_last_payment_hash.js');
bind('getLastPaymentHash', 'get_last_payment_hash.js');
bind('refundColdWallet', 'refund_cold_wallet.js');
bind('listProcesses', 'list_processes.js');
bind('listFailedPayments', 'list_failed_payments.js');
bind('retryFailedPayment', 'retry_failed_payment.js');
bind('getAccountBalance', 'get_balance.js');
bind('getLiabilities', 'get_liabilities.js');
bind('listTrustlines', 'list_trustlines.js');

