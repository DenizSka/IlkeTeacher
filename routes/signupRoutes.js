const express = require('express');
const signupRoutes = express.Router();
const controller = require('../controllers/signinController');
const views = require('../controllers/viewsController');


// signupRoutes.get('/', controller.getOneEmail, views.signupFormu);
signupRoutes.get('/', controller.emptyForm, views.signupFormu);

// signupRoutes.route('/:id/edit')
//   .get(controller.getOne);

// signupRoutes.route('/:id')
//   .get(controller.getOne)
//   .put(controller.update)
//   .delete(controller.destroy);


signupRoutes.route('/')
  .post(controller.getOneEmail, views.addsignup);






module.exports = signupRoutes;
