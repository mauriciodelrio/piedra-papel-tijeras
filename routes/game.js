var express = require('express');
var router  = express.Router();

/// CONTROLLERS ///
var game_controller = require('../controllers/gameController');

  /* POST create games */
  router.post('/',
   game_controller.game_create);

  
  /* GET returns all games */
  router.get('/all', 
    game_controller.game_all);
  module.exports = router;
