const express = require('express');
const signupRoutes = express.Router();
const controller = require('../controllers/signinController');
const views = require('../controllers/viewsController');



signupRoutes.get('/', controller.bosForm, views.signupFormu);

// signupRoutes.route('/:id/edit')
//   .get(controller.getOne);

// signupRoutes.route('/:id')
//   .get(controller.getOne)
//   .put(controller.update)
//   .delete(controller.destroy);



signupRoutes.route('/')
  .post(controller.create, views.addsignup);



module.exports = signupRoutes;
