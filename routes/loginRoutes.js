const express = require('express');
const loginRoutes = express.Router();
const controller = require('../controllers/loginController');
const views = require('../controllers/viewsController');


loginRoutes.get('/', controller.loginForm, views.loginFormu);

// loginRoutes.route('/:id/edit')
//   .get(controller.getOne, views.projeEditForm);

// loginRoutes.route('/:id')
//   .get(controller.getOne, views.showOne)
//   .put(controller.update, views.projeUpdate)
//   .delete(controller.destroy, views.projeDelete);


// loginRoutes.route('/')
//   .get(controller.index, views.projeleriGoster)
//   .post(controller.create, views.ekle);




module.exports = loginRoutes;
