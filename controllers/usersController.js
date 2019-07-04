var User  = require('../models/user');

exports.user_update = function(req, res, next) {

  User.findOne({ nickname: req.body.nickname }).exec(function(err, item){
    if( err ) return res.json(err);
    if (item === null || item === undefined) {
      User.create({ nickname: req.body.nickname }, function(err, newUser){
        res.json(newUser);
      })
    } else {
      if(req.body.win === true) {
        item.winners = item.winners + 1;  
        item.save(function(err){
          if( err ) return res.json(err);
        });
      }
      res.json(item); 
    }
  });
}

exports.users_all = function(req, res, next) {
  User.count({}).exec((err, total) => {
    User.find({}).exec(function(err, items){
      if( err ) return res.json(err);
      res.json({total, items});
    });
  })
}

exports.users_count = function(req, res, next) {
  User.find({}).count().exec((total, err) => {
    if( err ) return res.json(err);
      res.json({total});
  })
}
