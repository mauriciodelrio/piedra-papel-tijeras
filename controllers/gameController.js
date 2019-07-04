var Game  = require('../models/game');
var _ = require('lodash');

exports.game_create = function(req, res, next) {
  let params = {
    player_one: req.body.playerOne ? req.body.playerOne : '', 
    player_two: req.body.playerTwo ? req.body.playerTwo : '',  
    winner: req.body.winner ? req.body.winner : '', 
    results: req.body.results ? req.body.results : '' 
  }
  Game.create(params, function(err, newGame){
    if (err) return res.json(err);
    res.json(newGame);
  })
}

exports.game_all = function(req, res, next) {
  Game.count({}).exec((err, total) => {
    Game.find({}).exec(function(err, items){
      if( err ) return res.json(err);
      res.json({total, items});
    });
  })
}