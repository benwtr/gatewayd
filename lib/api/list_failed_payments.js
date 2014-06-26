var data = require(__dirname+'/../data/');

/**
 * @requires data
 * @function listFailedPayments
 *
 * @description Lists failed payments from the rippleTransaction table.
 * @param {callback} fn - handles query results.
 */

function listFailedPayments(fn){
  data.models.rippleTransactions.findAll({ where: { state: 'failed' }}).complete(fn);
}

module.exports = listFailedPayments;

