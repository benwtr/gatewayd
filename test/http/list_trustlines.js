var request = require('supertest');
var app = require(__dirname+'/../../lib/app.js');
var gateway = require(__dirname+'/../../');
var assert = require('assert');
var account = gateway.config.get('HOT_WALLET').address;

describe('list trust lines', function(){

  it('should return unauthorized without credentials', function(done){
    request(app)
      .get('/v1/trustlines/'+account)
      .expect(401)
      .end(function(err, res){
        if (err) throw err;
        done();
      });
  });

  it('should return successfully with credentials', function(done){
    request(app)
      .get('/v1/trustlines/'+account)
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(200)
      .end(function(error, response){
        assert(response.body.success);
        assert(response.body.trustlines);
        done();
      });
  });

  it('should fail with an invalid ripple account', function(done){
    request(app)
      .get('/v1/trustlines/12353344ddre')
      .auth('admin@'+gateway.config.get('DOMAIN'), gateway.config.get('KEY'))
      .expect(500)
      .end(function(error, response){
        assert(!response.body.success);
        assert.strictEqual(response.body.error.account, 'invalid ripple address');
        done();
      });
  });

});

