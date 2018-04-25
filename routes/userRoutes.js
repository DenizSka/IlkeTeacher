// const express = require('express');
// const userRoutes = express.Router();
// const controller = require('../controllers/loginController');
// const views = require('../controllers/viewsController');
// const loggedUser = require('../models/loginDb');

// const authMiddleware = require('../controllers/authController');



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
// module.exports = userRoutes;
