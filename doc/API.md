`gatewayd : v3.19.0`

## Gatewayd API ##


## Available API Routes ##

* [`POST /v1/registrations`](#registering-a-user)
* [`POST /v1/users/{:id}/activate`](#activating-a-user)
* [`POST /v1/users/{:id}`](#deactivating-a-user)
* [`POST /v1/deposits/`](#creating-a-deposit)
* [`GET /v1/deposits`](#listing-deposits)
* [`GET /v1/payments/outgoing`](#listing-outgoing-payments)
* [`GET /v1/payments/failed`](#listing-failed-payments)
* [`POST /v1/payments/failed/{:id}/retry`](#retrying-a-failed-payment)
* [`GET /v1/payments/incoming`](#listing-incoming-payments)
* [`GET /v1/withdrawals`](#listing-withdrawals)
* [`POST /v1/withdrawals/{:id}/clear`](#clearing-a-withdrawal)
* [`GET /v1/cleared`](#listing-cleared-external-transactions)
* [`GET /v1/balances`](#listing-hot-wallet-balances)
* [`GET /v1/liabilities`](#listing-cold-wallet-liabilities)

## User-Auth API Routes

* [`POST /v1/register`](#registering-a-user)
* [`POST /v1/users/login`](#logging-in-a-user)
* [`GET /v1/users/{:id}`](#showing-a-user)
* [`GET /v1/users/{:id}/external_accounts`](#listing-user-external-accounts)
* [`GET /v1/users/{:id}/external_transactions`](#listing-user-external-transactions)
* [`GET /v1/users/{:id}/ripple_addresses`](#listing-user-ripple-addresses)
* [`GET /v1/users/{:id}/ripple_transactions`](#listing-user-ripple-transactions)

## Admin Configuration API Routes

* [`POST /v1/wallets/hot/fund`](#funding-the-hot-wallet)
* [`POST /v1/config/database`](#setting-the-database-url)
* [`GET /v1/config/database`](#showing-the-database-url)
* [`POST /v1/config/ripple/rest`](#setting-the-ripple-rest-url)
* [`GET /v1/config/ripple/rest`](#showing-the-ripple-rest-url)
* [`POST /v1/config/wallets/cold`](#setting-the-cold-wallet)
* [`GET /v1/config/wallets/cold`](#showing-the-cold-wallet)
* [`POST /v1/config/wallets/generate`](#generating-a-ripple-wallet)
* [`POST /v1/config/wallets/hot`](#setting-the-hot-wallet)
* [`GET /v1/config/wallets/hot`](#showing-the-hot-wallet)
* [`POST /v1/trust`](#setting-trust-from-hot-wallet-to-cold-wallet)
* [`GET /v1/trust`](#listing-trust-from-hot-wallet-to-cold-wallet)
* [`POST /v1/wallets/hot/fund`](#funding-the-hot-wallet)
* [`POST /v1/config/last_payment_hash`](#setting-the-last-payment-hash)
* [`GET /v1/config/last_payment_hash`](#showing-the-last-payment-hash)
* [`POST /v1/config/domin`](#setting-the-domain)
* [`GET /v1/config/domain`](#showing-the-domain)
* [`POST /v1/config/key`](#setting-the-api-key)
* [`GET /v1/config/key`](#showing-the-api-key)
* [`POST /v1/currencies`](#setting-currencies)
* [`GET /v1/currencies`](#listing-currencies)
* [`POST /v1/wallets/cold/refund`](#sending-funds-from-hot-wallet-to-cold-wallet)
* [`POST /v1/start`](#starting-worker-processes)
* [`POST /v1/processes`](#listing-current-processes)

## API Overview ##

## Registering A User ##
__`POST /v1/registrations`__
Register a user with the gatewayd. A username, password, and ripple address are required. Upon
registration several records are created in the gatewayd database, including a user record,
a "independent" ripple address record with the address provided, a "hosted" ripple address
record for making withdrawals, and a "default" external account for recording deposits and
withdrawals.

    REQUEST:
    {
      "name": "steven@ripple.com",
      "password": "s0m3supe&$3cretp@s$w0r*",
      "ripple_address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk"
    }

    RESPONSE:
    {
      "user": {
        "name": "steven@ripple.com",
        "salt": "63a5f6fc48addb712ec8940ff591d742f57f0c4f7058d2040714bd260c4d93e0",
        "password_hash": "86e3b615a72b6f6c56f36dc6657d3133c747a59e8da8e6304c20f3229098f21e",
        "active": false,
        "updatedAt": "2014-06-12T00:43:17.572Z",
        "createdAt": "2014-06-12T00:43:17.572Z",
        "id": 508,
        "federation_tag": null,
        "admin": null,
        "federation_name": null,
        "bank_account_id": null,
        "kyc_id": null,
        "external_id": null,
        "data": null,
        "uid": null,
        "ripple_address": {
          "data": null,
          "user_id": 508,
          "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "managed": false,
          "type": "independent",
          "updatedAt": "2014-06-12T00:43:17.613Z",
          "createdAt": "2014-06-12T00:43:17.613Z",
          "id": 647,
          "tag": null,
          "secret": null,
          "previous_transaction_hash": null,
          "uid": null
        },
        "external_account": {
          "data": null,
          "name": "default",
          "user_id": 508,
          "updatedAt": "2014-06-12T00:43:17.620Z",
          "createdAt": "2014-06-12T00:43:17.620Z",
          "id": 307,
          "uid": null
        },
        "hosted_address": {
          "data": null,
          "user_id": 508,
          "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "managed": true,
          "type": "hosted",
          "tag": 307,
          "updatedAt": "2014-06-12T00:43:17.627Z",
          "createdAt": "2014-06-12T00:43:17.627Z",
          "id": 648,
          "secret": null,
          "previous_transaction_hash": null,
          "uid": null
        }
      }
    }

## Activating A User ##
__`POST /v1/users/{:id}/activate`__

By default a user is marked as "inactive", and to activate the user run this
command. No separate action is taken by gatewayd to prevent inactive users from
operating, and for now it is simply informational.

    RESPONSE:
    {
      "user": {
        "id": 508,
        "name": "steven@ripple.com",
        "salt": "63a5f6fc48addb712ec8940ff591d742f57f0c4f7058d2040714bd260c4d93e0",
        "federation_tag": null,
        "admin": null,
        "federation_name": null,
        "password_hash": "86e3b615a72b6f6c56f36dc6657d3133c747a59e8da8e6304c20f3229098f21e",
        "bank_account_id": null,
        "kyc_id": null,
        "createdAt": "2014-06-12T07:43:17.572Z",
        "updatedAt": "2014-06-12T00:44:05.786Z",
        "external_id": null,
        "data": null,
        "uid": null,
        "active": true
      }
    }

## Deactivating A User ##
__`POST /v1/users/{:id}/deactivate`__

Mark a user an "inactive", which is a flag purely for informational purposes and has no
explicit effect on the user's interaction with gatewayd.

    RESPONSE:
    {
      "user": {
        "id": 508,
        "name": "steven@ripple.com",
        "salt": "63a5f6fc48addb712ec8940ff591d742f57f0c4f7058d2040714bd260c4d93e0",
        "federation_tag": null,
        "admin": null,
        "federation_name": null,
        "password_hash": "86e3b615a72b6f6c56f36dc6657d3133c747a59e8da8e6304c20f3229098f21e",
        "bank_account_id": null,
        "kyc_id": null,
        "createdAt": "2014-06-12T14:43:17.572Z",
        "updatedAt": "2014-06-12T00:44:52.919Z",
        "external_id": null,
        "data": null,
        "uid": null,
        "active": false
      }
    }

## Creating A Deposit ##
__`POST /v1/deposits`__

Upon receipt of an asset from a user, record the asset in gatewayd's database with
a "deposit" record, which creates an entry in the external transactions database
table. By default a deposit is marked as "queued", and the gatewayd "deposit" process
will take the queued deposit, apply fees, and enqueue a corresponding outbound ripple
payment.

    REQUEST:
    {
      "external_account_id": 307,
      "currency": "BTC"
      "amount": "10.7"
    }

    RESPONSE:
    {
      "deposit": {
        "data": null,
        "external_account_id": 307,
        "currency": "BTC",
        "amount": "10.7",
        "deposit": true,
        "status": "queued",
        "updatedAt": "2014-06-12T00:46:02.080Z",
        "createdAt": "2014-06-12T00:46:02.080Z",
        "id": 1,
        "ripple_transaction_id": null,
        "uid": null
      }
    }

## Listing Deposits ##
__`GET /v1/deposits`__

List all deposits that are currently queued, ie they have not been processed
yet nor sent to ripple.

    RESPONSE:
    {
      "deposits": [
        {
          "data": null,
          "id": 1,
          "amount": "10.7",
          "currency": "BTC",
          "deposit": true,
          "external_account_id": 307,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-06-12T00:46:02.080Z",
          "updatedAt": "2014-06-12T00:46:02.080Z",
          "uid": null
        },
        {
          "data": null,
          "id": 2,
          "amount": "281.2",
          "currency": "XAG",
          "deposit": true,
          "external_account_id": 307,
          "status": "queued",
          "ripple_transaction_id": null,
          "createdAt": "2014-06-12T00:47:24.754Z",
          "updatedAt": "2014-06-12T00:47:24.754Z",
          "uid": null
        }
      ]
    }

## Listing Outgoing Payments ##
__`GET /v1/payments/outgoing`__

Ripple transaction records that are marked as "outgoing" are picked up
and sent to the ripple network. List Outoing Payments returns a list of the
queued "outgoing" payments. All deposit records are eventually placed in the
outgoing payments queue after fees are subtracted.

    RESPONSE:
    {
      "payments": [
        {
          "data": null,
          "id": 1,
          "to_address_id": 647,
          "from_address_id": 623,
          "transaction_state": null,
          "transaction_hash": null,
          "to_amount": "10.593",
          "to_currency": "BTC",
          "to_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "from_amount": "10.593",
          "from_currency": "BTC",
          "from_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "createdAt": "2014-06-12T00:48:02.302Z",
          "updatedAt": "2014-06-12T00:48:02.302Z",
          "uid": null,
          "client_resource_id": "false",
          "state": "outgoing",
          "external_transaction_id": 1
        },
        {
          "data": null,
          "id": 2,
          "to_address_id": 647,
          "from_address_id": 623,
          "transaction_state": null,
          "transaction_hash": null,
          "to_amount": "278.388",
          "to_currency": "XAG",
          "to_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "from_amount": "278.388",
          "from_currency": "XAG",
          "from_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "createdAt": "2014-06-12T00:48:02.324Z",
          "updatedAt": "2014-06-12T00:48:02.324Z",
          "uid": null,
          "client_resource_id": "false",
          "state": "outgoing",
          "external_transaction_id": 2
        }
      ]
    }

## Listing Failed Payments ##
__`GET /v1/payments/failed`__

Outgoing payments are often rejected from ripple, such as when there is
insufficient trust from the recipient account to the gateway account, or
when the gateway hot wallet account has insufficient funds to process the
payment. In the case that a payment will never make it into the ripple
ledger the outgoing payment is marked as "failed".

    RESPONSE:
    {
      "payments": [
        {
          "data": null,
          "id": 2,
          "to_address_id": 647,
          "from_address_id": 623,
          "transaction_state": null,
          "transaction_hash": null,
          "to_amount": "278.388",
          "to_currency": "XAG",
          "to_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "from_amount": "278.388",
          "from_currency": "XAG",
          "from_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "createdAt": "2014-07-28T02:48:02.324Z",
          "updatedAt": "2014-06-13T00:38:03.086Z",
          "uid": null,
          "client_resource_id": "false",
          "state": "failed",
          "external_transaction_id": 2
        },
        {
          "data": null,
          "id": 3,
          "to_address_id": 25,
          "from_address_id": 623,
          "transaction_state": null,
          "transaction_hash": null,
          "to_amount": "9899999999.01",
          "to_currency": "XAG",
          "to_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "from_amount": "9899999999.01",
          "from_currency": "XAG",
          "from_issuer": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "createdAt": "2014-06-16T12:37:39.985Z",
          "updatedAt": "2014-06-13T00:38:04.184Z",
          "uid": null,
          "client_resource_id": "false",
          "state": "failed",
          "external_transaction_id": 3
        }
      ]
    }

## Retrying A Failed Payment ##
__`POST /v1/payments/failed/{:id}/retry`__

A payment that failed due to insufficient funds or lack of trust lines
may be successfully retried once funds are increased or an appropriate
line of trust is established. Retrying a payment simply changes the 
payment's state from "failed" to "outgoing", effectively enqueueing the 
transaction to be re-submitted to ripple.

    RESPONSE:
    {
      "payment": {
        "data": null,
        "id": 6,
        "to_address_id": 1,
        "from_address_id": 2,
        "transaction_state": null,
        "transaction_hash": null,
        "to_amount": "100",
        "to_currency": "XAG",
        "to_issuer": "1",
        "from_amount": "100",
        "from_currency": "XAG",
        "from_issuer": "1",
        "createdAt": "2014-06-13T07:46:07.190Z",
        "updatedAt": "2014-06-13T02:33:26.772Z",
        "uid": null,
        "client_resource_id": "false",
        "state": "outgoing",
        "external_transaction_id": null
      }
    }

## Listing Incoming Payments ##
__`GET /v1/payments/incoming`__

Gatewayd monitors the gateway's account for inbound payments made to the gateway,
and records the payments in the Ripple Transactions database table. Newly recorded
incoming ripple transactions are always marked as "incoming" until the gatewayd
"withdrawals" process picks them up and, after applying fees, enqueues a withdrawal
record in the external transactions table.

    RESPONSE:
    {
      "incoming_payments": [
        {
          "data": null,
          "id": 90,
          "to_address_id": 0,
          "from_address_id": 13,
          "transaction_state": "tesSUCCESS",
          "transaction_hash": "12AE1B1843D886D7D6783DA02AB5F43C32579212853CF3CEFD6DBDF29F03BC80",
          "to_amount": "5.12",
          "to_currency": "SWD",
          "to_issuer": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "from_amount": "5.12",
          "from_currency": "SWD",
          "from_issuer": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "createdAt": "2014-06-12T19:59:52.642Z",
          "updatedAt": "2014-06-12T19:59:52.642Z",
          "uid": null,
          "client_resource_id": "false",
          "state": "incoming",
          "external_transaction_id": null
        }
      ]
    }

## Listing Withdrawals ##
__`GET /v1/withdrawals`__

To retrieve assets from the gateway a user sends funds back to the gateway's account.
Once the incoming payment has been received and processed (fees subtracted) it is
placed in the pending withdrawals queue, which is a list of external transaction withdrawal
records with a state of "pending". If the gateway administrator has registered a withdrawal 
callback url, the withdrawal callbacks process will read withdrawals from this list and
POST their data to the callback url provided.

    RESPONSE:
    {
      "withdrawals": [
        {
          "data": null,
          "id": 79,
          "amount": "1001",
          "currency": "SWD",
          "deposit": false,
          "external_account_id": 6,
          "status": "queued",
          "ripple_transaction_id": 80,
          "createdAt": "2014-05-30T19:23:48.390Z",
          "updatedAt": "2014-05-30T19:23:48.390Z",
          "uid": null
        },
        {
          "data": null,
          "id": 84,
          "amount": "8.5",
          "currency": "SWD",
          "deposit": false,
          "external_account_id": 6,
          "status": "queued",
          "ripple_transaction_id": 85,
          "createdAt": "2014-06-11T00:23:56.992Z",
          "updatedAt": "2014-06-11T00:23:56.992Z",
          "uid": null
        }
      ]
    }

## Clearing A Withdrawal ##
__`POST /v1/withdrawals/{:id}/clear`__

A pending withdrawal record indicates to the gateway operator that a
user wishes to withdraw a given asset. Once the operator processes the withdrawal
by sending the asset to the user, mark the withdrawal as "cleared".

    RESPONSE:
    {
      "withdrawal": {
        "data": null,
        "id": 84,
        "amount": "8.5",
        "currency": "SWD",
        "deposit": false,
        "external_account_id": 6,
        "status": "cleared",
        "ripple_transaction_id": 85,
        "createdAt": "2014-06-11T00:23:56.992Z",
        "updatedAt": "2014-06-12T20:01:29.663Z",
        "uid": null
      }
    }

## Listing Cleared External Transactions ##
__`GET /v1/cleared`__

List all deposits and withdrawals that have been completed, ie are no longer pending.

    {
      "deposits": [
        {
          "data": null,
          "id": 3,
          "amount": "4.95",
          "currency": "SWD",
          "deposit": false,
          "external_account_id": 1,
          "status": "cleared",
          "ripple_transaction_id": 3,
          "createdAt": "2014-05-13T23:10:20.803Z",
          "updatedAt": "2014-05-13T23:11:26.323Z",
          "uid": null
        },
        {
          "data": null,
          "id": 5,
          "amount": "2.9699999999999998",
          "currency": "SWD",
          "deposit": false,
          "external_account_id": 1,
          "status": "cleared",
          "ripple_transaction_id": 5,
          "createdAt": "2014-05-14T19:45:05.244Z",
          "updatedAt": "2014-05-14T21:19:54.231Z",
          "uid": null
        }
      ]
    }


## Listing Hot Wallet Balances ##
__`GET /v1/balances`__

The hot wallet holds limited funds issued by the cold wallet, and the current
balance thereof is represented as hot wallet balances.

    RESPONSE:
    {
      "success": true,
      "balances": [
        {
          "value": "29.999358",
          "currency": "XRP",
          "counterparty": ""
        },
        {
          "value": "8776.3012",
          "currency": "SWD",
          "counterparty": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6"
        },
        {
          "value": "0",
          "currency": "USD",
          "counterparty": "rNoc7mZg54TkSd1mENAtEi65c9afYMBuTu"
        }
      ]
    }

## Listing Cold Wallet Liabilities ##
__`GET /v1/liabilities`__

Every asset that the gateway holds and for which it issues currency is
a liability of the gateway. Listed here are the total gateway liabilities
for each asset type.

    RESPONSE:
    {
      "success": true,
      "balances": [
        {
          "value": "29.999985",
          "currency": "XRP",
          "counterparty": ""
        },
        {
          "value": "-8776.3012",
          "currency": "SWD",
          "counterparty": "rEmFrbcZvNR9i2fkBkLxDzB4X85aB4qwyZ"
        },
        {
          "value": "-63.1843",
          "currency": "SWD",
          "counterparty": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk"
        },
        {
          "value": "0",
          "currency": "SWD",
          "counterparty": "rNoc7mZg54TkSd1mENAtEi65c9afYMBuTu"
        },
        {
          "value": "0",
          "currency": "SWD",
          "counterparty": "rwNJY1jnzXHCyfKRyCyVyt8UcSZfAo7z68"
        },
        {
          "value": "0",
          "currency": "SWD",
          "counterparty": "raj7HbHuG4da8bm5eNA8dAD19t8Kj8G4NR"
        }
      ]
    }

## Logging In A User ##
__`POST /v1/users/login`__

Verifies that a user has the correct username and password combination. Used
for the web application and requires user credentials in place of an API key.

## Showing A User ##
__`GET /v1/users/{:id}`__

Return the database record for a given user.

    RESPONSE:
    {
      "success": true,
      "users": {
        "id": 8,
        "name": "steven@ripple.com",
        "salt": "1366f14307850818afddd1509f329fdc1a73fb93919d92d5b44c91f07560c999",
        "federation_tag": null,
        "admin": null,
        "federation_name": null,
        "password_hash": "dd1d5a0ba63c63a117ff811f14040fa87dcbfedd7e37b5df506bfc4e8014c8e5",
        "bank_account_id": null,
        "kyc_id": null,
        "createdAt": "2014-06-10T22:37:19.647Z",
        "updatedAt": "2014-06-10T22:37:19.647Z",
        "external_id": null,
        "data": null,
        "uid": null,
        "active": false
      }
    }

## Listing User External Accounts ##
__`GET /v1/users/{:id}/external_accounts`__

List all external account records for a given user.
  
    RESPONSE:
    {
      "external_accounts": [
        {
          "data": null,
          "id": 8,
          "name": "default",
          "user_id": 8,
          "createdAt": "2014-06-10T22:37:19.835Z",
          "updatedAt": "2014-06-10T22:37:19.835Z",
          "uid": null
        }
      ]
    }

## Listing User External Transactions ##
__`GET /v1/users/{:id}/external_transactions`__

List all external transaction records for a given user. Withdrawals and 
deposits are the two types of external transaction records.

    RESPONSE:
    {
      "externalTransactions": [
        {
          "id": 80,
          "currency": "SWD",
          "amount": "1",
          "deposit": true,
          "ripple_transaction_id": 81,
          "external_account_id": 8,
          "status": "processed"
        },
        {
          "id": 81,
          "currency": "SWD",
          "amount": "1.5999",
          "deposit": true,
          "ripple_transaction_id": 82,
          "external_account_id": 8,
          "status": "processed"
        }
      ]
    }

## Listing User Ripple Addresses ##
__`GET /v1/users/{:id}/ripple_addresses`__

List all ripple addresses for a given user. Most users will have at least one
independent address and one hosted address.

    RESPONSE:
    {
      "rippleAddresses": [
        {
          "data": null,
          "id": 16,
          "managed": false,
          "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "type": "independent",
          "user_id": 8,
          "tag": null,
          "secret": null,
          "previous_transaction_hash": null,
          "createdAt": "2014-06-10T22:37:19.825Z",
          "updatedAt": "2014-06-10T22:37:19.825Z",
          "uid": null
        },
        {
          "data": null,
          "id": 17,
          "managed": true,
          "address": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "type": "hosted",
          "user_id": 8,
          "tag": 8,
          "secret": null,
          "previous_transaction_hash": null,
          "createdAt": "2014-06-10T22:37:19.844Z",
          "updatedAt": "2014-06-10T22:37:19.844Z",
          "uid": null
        }
      ]
    }

## Listing User Ripple Transactions ##
__`GET /v1/users/{:id}/ripple_transactions`__

List all ripple transactions for a given user, which represent transactions
made to or from all of the users's ripple addresses.

    RESPONSE:
    {
      "rippleTransactions": [
        {
          "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "tag": null,
          "ripple_address_id": 16,
          "id": 81,
          "to_address_id": 16,
          "from_address_id": 1,
          "transaction_state": "tesSUCCESS",
          "transaction_hash": "F0737576A4E7D064BF00145FAD6E6BAD19115C7739A3C8CDB6D1FD38888C8364",
          "to_amount": "1",
          "to_currency": "SWD",
          "to_issuer": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "from_amount": "1",
          "from_currency": "SWD",
          "from_issuer": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "createdAt": "2014-06-10T22:41:14.258Z",
          "updatedAt": "2014-06-10T22:41:16.717Z",
          "uid": "505a336f-4ff9-473d-862b-164b3ad63b73",
          "data": null,
          "client_resource_id": "false",
          "state": "succeeded",
          "external_transaction_id": 80
        },
        {
          "address": "r4EwBWxrx5HxYRyisfGzMto3AT8FZiYdWk",
          "tag": null,
          "ripple_address_id": 16,
          "id": 82,
          "to_address_id": 16,
          "from_address_id": 1,
          "transaction_state": "tesSUCCESS",
          "transaction_hash": "7DEEF3BBAEEA3FEECF7819D3FAA53C580ED4A790A98DD2E761E8D747EAFB1969",
          "to_amount": "1.5999",
          "to_currency": "SWD",
          "to_issuer": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "from_amount": "1.5999",
          "from_currency": "SWD",
          "from_issuer": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "createdAt": "2014-06-10T22:43:57.090Z",
          "updatedAt": "2014-06-10T22:43:59.364Z",
          "uid": "5205d9b4-f1c2-4273-b656-78e908e94210",
          "data": null,
          "client_resource_id": "false",
          "state": "succeeded",
          "external_transaction_id": 81
        }
      ]
    }

## Funding The Hot Wallet ##
__`POST /v1/wallets/hot/fund`__

Issue funds from the cold wallet to the hot wallet, specifying the amount, currency, and
the cold wallet secret key.

## Setting The Database Url ##
__`POST /v1/config/database`__

Set the database url for in gatewayd configuration.

## Showing The Database Url ##
__`GET /v1/config/database`__

Show the database url from the gatewayd configuration.

    RESPONSE:
    {
      "DATABASE_URL": "postgres://postgres:password@localhost:5432/ripple_gateway"
    }

## Setting The Ripple Rest Url ##
__`POST /v1/config/ripple/rest`__

Set the ripple rest url in the gatewayd configuration.

## Showing The Ripple Rest Url ##
__`GET /v1/config/ripple/rest`__

Show the ripple rest url from the gatewayd configuration.

    RESPONSE:
    {
      "RIPPLE_REST_API": "http://localhost:5990/"
    }

## Setting The Cold Wallet ##
__`POST /v1/config/wallets/cold`__

Set the gateway cold wallet, from which funds are issued.

## Showing The Cold Wallet ##
__`GET /v1/config/wallets/cold`__

Show the gatewayd cold wallet, from which funds are issued.

## Generating A Ripple Wallet ##
__`POST /v1/config/wallets/generate`__

Generate a random ripple address and secret key pair, which
represents an unfunded ripple account.

## Setting The Hot Wallet ##
__`POST /v1/config/wallets/cold`__

Set the gatewayd hot wallet, which is used to automatically send
funds, and which maintains trust to and balances of the cold wallet.

## Showing The Hot Wallet ##
__`POST /v1/config/wallets/cold`__

Show the gatewayd hot wallet, which is used to automatically send
funds, and which maintains trust to and balances of the cold wallet.


## Setting Trust From Hot Wallet To Cold Wallet ##
__`POST /v1/trust`__

Set a line of trust from the gateway hot wallet to the gateway cold
wallet. The line of trust represents the total amount of each asset
that gatewayd can hold and automatically send out without a manual
refunding by a gateway operator.

## Listing Trust From Hot Wallet To Cold Wallet ##
__`GET /v1/trust`__


List lines of trust from the gateway hot wallet to the gateway cold
wallet. The line of trust represents the total amount of each asset
that gatewayd can hold and automatically send out without a manual
refunding by a gateway operator.

    RESPONSE:
    {
      "lines": [
        {
          "account": "rDNP5C7Vjt2mLushCmUPwm6dvwNzNiuND6",
          "balance": "8776.3012",
          "currency": "SWD",
          "limit": "10000",
          "limit_peer": "0",
          "quality_in": 0,
          "quality_out": 0
        }
      ]
    }

## Funding The Hot Wallet ##
__`POST /v1/wallets/hot/fund`__

Issue funds from the cold wallet to the hot wallet. The cold wallet secret
is required.

## Setting The Last Payment Hash ##
__`POST /v1/config/last_payment_hash`__

Gatewayd polls the ripple network for notifications of inbound and outbound
payments beginning with the last known transaction hash. Manually set that hash.

## Showing The Last Payment Hash ##
__`GET /v1/config/last_payment_hash`__

Gatewayd polls the ripple network for notifications of inbound and outbound
payments beginning with the last known transaction hash. Returns that hash.

    RESPONSE:
    {
      "LAST_PAYMENT_HASH": "12AE1B1843D886D7D6783DA02AB5F43C32579212853CF3CEFD6DBDF29F03BC80"
    }

## Setting The Domain ##
__`POST /v1/config/domain`__

Set the domain of the gateway, which is automatically added to the gateway's ripple.txt.

## Showing The Domain ##
__`GET /v1/config/domain`__

Show the domain of the gateway, which is shown in the gateway's ripple.txt.

    RESPONSE:
    {
      "DOMAIN": "stroopgate.com"
    }

## Setting The Api Key ##
__`POST /v1/config/key`__

Reset the gateway api key, which generates, saves, and returns a new api key.

## Showing The Api Key ##
__`GET /v1/config/key`__

Show the current api key.

    RESPONSE:
    {
      "KEY": "ebdb883d5723a71c59fb8ecefbb65476a6923f2a69b49b53cffe212c817cab92"
    }


## Setting Currencies ##
__`POST /v1/currencies`__

Add a currency to be supported by the gateway. This currency is shown in the gateway's
ripple.txt manifest file.

## Listing Currencies ##
__`GET /v1/currencies`__

List currencies supported by the gateway, which are shown in the gateway's ripple.txt
manifest file.

    RESPONSE:
    {
      "CURRENCIES": {
        "SWD": 10000
      }
    }

## Sending Funds From Hot Wallet To Cold Wallet ##
__`POST /v1/wallets/cold/refund`__

If a hot wallet is potentially compromised, send the remaining funds back to the cold wallet.

## Starting Worker Processes ##
__`POST /v1/start`__

Start one or more gateway processes, including but not limited to "deposits", "outgoing",
"incoming", "withdrawals", "callbacks", etc.

## Listing Current Processes ##
__`GET /v1/processes`__

List information about the currently-running gateway daemon processes.

    RESPONSE:
    [ { pid: 26269,
        name: 'ripplerest',
        pm2_env: 
         { name: 'ripplerest',
           exec_mode: 'cluster_mode',
           exec_interpreter: 'node',
           env: [Object],
           pm_exec_path: '/home/ubuntu/ripple-rest/server.js',
           pm_out_log_path: '/home/ubuntu/.pm2/logs/ripplerest-out-0.log',
           pm_err_log_path: '/home/ubuntu/.pm2/logs/ripplerest-err-0.log',
           pm_pid_path: '/home/ubuntu/.pm2/pids/ripplerest.pid',
           LESSOPEN: '| /usr/bin/lesspipe %s',
           MAIL: '/var/mail/ubuntu',
           SSH_CLIENT: '208.90.215.186 61957 22',
           USER: 'ubuntu',
           DATABASE_URL: 'postgres://postgres:password@localhost:5432/ripple_gateway',
           SHLVL: '1',
           HOME: '/home/ubuntu',
           OLDPWD: '/home/ubuntu/gatewayd',
           SSH_TTY: '/dev/pts/0',
           LOGNAME: 'ubuntu',
           _: '/usr/bin/pm2',
           TERM: 'xterm-256color',
           PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games',
           LANG: 'en_US.UTF-8',
           LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:',
           SHELL: '/bin/bash',
           NODE_PATH: '/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript',
           LESSCLOSE: '/usr/bin/lesspipe %s %s',
           PWD: '/home/ubuntu/ripple-rest',
           SSH_CONNECTION: '208.90.215.186 61957 10.151.118.93 22',
           pm_cwd: '/home/ubuntu/ripple-rest',
           pm_id: 0,
           restart_time: 0,
           unstable_restarts: 0,
           created_at: 1402602962147,
           pm_uptime: 1402602962147,
           status: 'online' },
        pm_id: 0,
        monit: { memory: 142966784, cpu: 4 } },
      { pid: 27633,
        name: 'deposits',
        pm2_env: 
         { name: 'deposits',
           cron_restart: '0 * * * *',
           exec_mode: 'cluster_mode',
           exec_interpreter: 'node',
           env: [Object],
           pm_exec_path: '/home/ubuntu/gatewayd/processes/deposits.js',
           pm_out_log_path: '/home/ubuntu/.pm2/logs/deposits-out-1.log',
           pm_err_log_path: '/home/ubuntu/.pm2/logs/deposits-err-1.log',
           pm_pid_path: '/home/ubuntu/.pm2/pids/deposits.pid',
           LESSOPEN: '| /usr/bin/lesspipe %s',
           MAIL: '/var/mail/ubuntu',
           SSH_CLIENT: '208.90.215.186 61957 22',
           USER: 'ubuntu',
           DATABASE_URL: 'postgres://postgres:password@localhost:5432/ripple_gateway',
           SHLVL: '1',
           HOME: '/home/ubuntu',
           OLDPWD: '/home/ubuntu/ripple-rest',
           SSH_TTY: '/dev/pts/0',
           LOGNAME: 'ubuntu',
           _: 'bin/gateway',
           TERM: 'xterm-256color',
           PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games',
           LANG: 'en_US.UTF-8',
           LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:',
           SHELL: '/bin/bash',
           NODE_PATH: '/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript',
           LESSCLOSE: '/usr/bin/lesspipe %s %s',
           PWD: '/home/ubuntu/gatewayd',
           SSH_CONNECTION: '208.90.215.186 61957 10.151.118.93 22',
           pm_cwd: '/home/ubuntu/gatewayd',
           pm_id: 1,
           restart_time: 1,
           unstable_restarts: 0,
           created_at: 1402602983124,
           pm_uptime: 1402603201351,
           status: 'online' },
        pm_id: 1,
        monit: { memory: 78327808, cpu: 0 } },
      { pid: 27628,
        name: 'outgoing',
        pm2_env: 
         { name: 'outgoing',
           cron_restart: '0 * * * *',
           exec_mode: 'cluster_mode',
           exec_interpreter: 'node',
           env: [Object],
           pm_exec_path: '/home/ubuntu/gatewayd/processes/outgoing.js',
           pm_out_log_path: '/home/ubuntu/.pm2/logs/outgoing-out-2.log',
           pm_err_log_path: '/home/ubuntu/.pm2/logs/outgoing-err-2.log',
           pm_pid_path: '/home/ubuntu/.pm2/pids/outgoing.pid',
           LESSOPEN: '| /usr/bin/lesspipe %s',
           MAIL: '/var/mail/ubuntu',
           SSH_CLIENT: '208.90.215.186 61957 22',
           USER: 'ubuntu',
           DATABASE_URL: 'postgres://postgres:password@localhost:5432/ripple_gateway',
           SHLVL: '1',
           HOME: '/home/ubuntu',
           OLDPWD: '/home/ubuntu/ripple-rest',
           SSH_TTY: '/dev/pts/0',
           LOGNAME: 'ubuntu',
           _: 'bin/gateway',
           TERM: 'xterm-256color',
           PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games',
           LANG: 'en_US.UTF-8',
           LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:',
           SHELL: '/bin/bash',
           NODE_PATH: '/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript',
           LESSCLOSE: '/usr/bin/lesspipe %s %s',
           PWD: '/home/ubuntu/gatewayd',
           SSH_CONNECTION: '208.90.215.186 61957 10.151.118.93 22',
           pm_cwd: '/home/ubuntu/gatewayd',
           pm_id: 2,
           restart_time: 1,
           unstable_restarts: 0,
           created_at: 1402602985180,
           pm_uptime: 1402603200575,
           status: 'online' },
        pm_id: 2,
        monit: { memory: 79495168, cpu: 1 } },
      { pid: 27621,
        name: 'incoming',
        pm2_env: 
         { name: 'incoming',
           cron_restart: '0 * * * *',
           exec_mode: 'cluster_mode',
           exec_interpreter: 'node',
           env: [Object],
           pm_exec_path: '/home/ubuntu/gatewayd/processes/incoming.js',
           pm_out_log_path: '/home/ubuntu/.pm2/logs/incoming-out-3.log',
           pm_err_log_path: '/home/ubuntu/.pm2/logs/incoming-err-3.log',
           pm_pid_path: '/home/ubuntu/.pm2/pids/incoming.pid',
           LESSOPEN: '| /usr/bin/lesspipe %s',
           MAIL: '/var/mail/ubuntu',
           SSH_CLIENT: '208.90.215.186 61957 22',
           USER: 'ubuntu',
           DATABASE_URL: 'postgres://postgres:password@localhost:5432/ripple_gateway',
           SHLVL: '1',
           HOME: '/home/ubuntu',
           OLDPWD: '/home/ubuntu/ripple-rest',
           SSH_TTY: '/dev/pts/0',
           LOGNAME: 'ubuntu',
           _: 'bin/gateway',
           TERM: 'xterm-256color',
           PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games',
           LANG: 'en_US.UTF-8',
           LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:',
           SHELL: '/bin/bash',
           NODE_PATH: '/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript',
           LESSCLOSE: '/usr/bin/lesspipe %s %s',
           PWD: '/home/ubuntu/gatewayd',
           SSH_CONNECTION: '208.90.215.186 61957 10.151.118.93 22',
           pm_cwd: '/home/ubuntu/gatewayd',
           pm_id: 3,
           restart_time: 1,
           unstable_restarts: 0,
           created_at: 1402602985949,
           pm_uptime: 1402603200180,
           status: 'online' },
        pm_id: 3,
        monit: { memory: 79024128, cpu: 0 } },
      { pid: 29812,
        name: 'server',
        pm2_env: 
         { name: 'server',
           cron_restart: '0 * * * *',
           exec_mode: 'cluster_mode',
           exec_interpreter: 'node',
           env: [Object],
           pm_exec_path: '/home/ubuntu/gatewayd/processes/server.js',
           pm_out_log_path: '/home/ubuntu/.pm2/logs/server-out-4.log',
           pm_err_log_path: '/home/ubuntu/.pm2/logs/server-err-4.log',
           pm_pid_path: '/home/ubuntu/.pm2/pids/server.pid',
           LESSOPEN: '| /usr/bin/lesspipe %s',
           MAIL: '/var/mail/ubuntu',
           SSH_CLIENT: '208.90.215.186 61957 22',
           USER: 'ubuntu',
           DATABASE_URL: 'postgres://postgres:password@localhost:5432/ripple_gateway',
           SHLVL: '1',
           HOME: '/home/ubuntu',
           OLDPWD: '/home/ubuntu/ripple-rest',
           SSH_TTY: '/dev/pts/0',
           LOGNAME: 'ubuntu',
           _: 'bin/gateway',
           TERM: 'xterm-256color',
           PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games',
           LANG: 'en_US.UTF-8',
           LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:',
           SHELL: '/bin/bash',
           NODE_PATH: '/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript',
           LESSCLOSE: '/usr/bin/lesspipe %s %s',
           PWD: '/home/ubuntu/gatewayd',
           SSH_CONNECTION: '208.90.215.186 61957 10.151.118.93 22',
           pm_cwd: '/home/ubuntu/gatewayd',
           pm_id: 4,
           restart_time: 2,
           unstable_restarts: 0,
           created_at: 1402602986623,
           pm_uptime: 1402603773423,
           status: 'online' },
        pm_id: 4,
        monit: { memory: 78049280, cpu: 0 } },
      { pid: 0,
        name: 'withdrawals',
        pm2_env: 
         { name: 'withdrawals',
           cron_restart: '0 * * * *',
           exec_mode: 'cluster_mode',
           exec_interpreter: 'node',
           env: [Object],
           pm_exec_path: '/home/ubuntu/gatewayd/processes/withdrawals.js',
           pm_out_log_path: '/home/ubuntu/.pm2/logs/withdrawals-out-5.log',
           pm_err_log_path: '/home/ubuntu/.pm2/logs/withdrawals-err-5.log',
           pm_pid_path: '/home/ubuntu/.pm2/pids/withdrawals.pid',
           LESSOPEN: '| /usr/bin/lesspipe %s',
           MAIL: '/var/mail/ubuntu',
           SSH_CLIENT: '208.90.215.186 61957 22',
           USER: 'ubuntu',
           DATABASE_URL: 'postgres://postgres:password@localhost:5432/ripple_gateway',
           SHLVL: '1',
           HOME: '/home/ubuntu',
           OLDPWD: '/home/ubuntu/ripple-rest',
           SSH_TTY: '/dev/pts/0',
           LOGNAME: 'ubuntu',
           _: 'bin/gateway',
           TERM: 'xterm-256color',
           PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games',
           LANG: 'en_US.UTF-8',
           LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arj=01;31:*.taz=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lz=01;31:*.xz=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.jpg=01;35:*.jpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.axv=01;35:*.anx=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.axa=00;36:*.oga=00;36:*.spx=00;36:*.xspf=00;36:',
           SHELL: '/bin/bash',
           NODE_PATH: '/usr/lib/nodejs:/usr/lib/node_modules:/usr/share/javascript',
           LESSCLOSE: '/usr/bin/lesspipe %s %s',
           PWD: '/home/ubuntu/gatewayd',
           SSH_CONNECTION: '208.90.215.186 61957 10.151.118.93 22',
           pm_cwd: '/home/ubuntu/gatewayd',
           pm_id: 5,
           restart_time: 0,
           unstable_restarts: 0,
           created_at: 1402602987366,
           pm_uptime: 1402602987366,
           status: 'stopped' },
        pm_id: 5,
        monit: { memory: 0, cpu: 0 } } ]


