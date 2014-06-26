var gateway = require(__dirname+'/../../../../');

module.exports = function(req, res){
  gateway.config.set('KEY', req.body.key);
  gateway.config.save(function(error){
    if(error){
      res.send(500, {
        success: true,
        error: error
      });
    } else {
      res.send({
        success: true,
        KEY: gateway.config.get('KEY')
      });
    }
  })

};
