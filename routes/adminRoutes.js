const express = require('express');
const pendinguserRoutes = express.Router();
const controller = require('../controllers/signinController');
const views = require('../controllers/viewsController');
const loggedUser = require('../models/loginDB');

// const authMiddleware = require('../controllers/authController');

pendinguserRoutes.route('/pending')
  .get(controller.indexPending, views.pendingStudent)

pendinguserRoutes.route('/pending/:id')
  .get(controller.getOnePending, views.oneAcceptPending)
  .post(controller.addPending)
  .delete(controller.removePending, views.handlePandingDelete);

// userRoutes.get('/:id', authMiddleware.ensureLoggedIn, userRoutes, authMiddleware.allowAccess, (req, res) => {
//   console.log('we need req params in login routes', req.params.id);
//   if (!isNaN(req.params.id)) {
//     loggedUser.findById(req.params.id).then(user => {
//       if (user) {
//         delete user.password;
//         res.json(user);
//         // res.render('/users/user-single', {
//         //   user: user,
//         // });
//       } else {
//         resError(res, 404, "User Not Found");
//       }
//     });
//   } else {
//     resError(res, 500, "Invalid ID");
//   }
// });
module.exports = pendinguserRoutes;
