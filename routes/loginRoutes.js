const express = require('express');
const loginRoutes = express.Router();
const controller = require('../controllers/loginController');
const views = require('../controllers/viewsController');
const loggedUser = require('../models/loginDb');

const authMiddleware = require('../controllers/authController');

loginRoutes.get('/', controller.loginForm, views.loginFormu);

// loginRoutes.route('/:id/edit')
//   .get(controller.getOne, views.projeEditForm);

// loginRoutes.route('/:id')
//   .get(controller.getLogin, views.loggedIn);
  // .put(controller.update, views.projeUpdate)
  // .delete(controller.destroy, views.projeDelete);

loginRoutes.get('/:id', authMiddleware.allowAccess, (req, res) => {
  if (!isNaN(req.params.id)) {
    loggedUser.findById(req.params.id).then(user => {
      if (user) {
        delete user.password;
        res.json(user);
      } else {
        resError(res, 404, "User Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});



loginRoutes.route('/')
//   .get(controller.index, views.projeleriGoster)
  .post(controller.getLogin, () => {});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
}

module.exports = loginRoutes;
