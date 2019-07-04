var express = require('express');
var router  = express.Router();

/// CONTROLLERS ///
var users_controller = require('../controllers/usersController');

  /* POST create users */
  router.post('/',
   users_controller.user_update);

  
  /* GET returns all users */
  router.get('/all', 
    users_controller.users_all);

  
  /* returns LENGTH of users */
  router.get('/count', 
    users_controller.users_count);

  
  module.exports = router;
