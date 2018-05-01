const express = require('express');
const signupRoutes = express.Router();
const controller = require('../controllers/signinController');
const views = require('../controllers/viewsController');
const signedUser = require('../models/loginDb');


// signupRoutes.get('/', controller.getOneEmail, views.signupFormu);
signupRoutes.get('/', controller.emptyForm, views.signupFormu);

// signupRoutes.route('/:id/edit')
//   .get(controller.getOne);

// signupRoutes.route('/:id')
//   .get(controller.getOne)
//   .put(controller.update)
//   .delete(controller.destroy);

signupRoutes.get('/:id', (req, res) => {
  console.log('we need req params in signup routes', req.params.id);
  if (!isNaN(req.params.id)) {
    signedUser.findById(req.params.id).then(user => {
      if (user) {
        delete user.password;
        console.log('users:', user);
        // res.json(user);
        res.render('./login/login-single', {
          user: user,
        });
      } else {
        resError(res, 404, "User Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});


signupRoutes.route('/')
  // .post(controller.getOneEmail, views.addsignup);
  .post(controller.getOneEmail, () => {});






module.exports = signupRoutes;
