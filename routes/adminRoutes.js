const express = require('express');
const adminRoutes = express.Router();

const controller = require('../controllers/signinController');
// const publiController = require('../controllers/publicationController');
const views = require('../controllers/viewsController');
const loggedUser = require('../models/loginDB');



adminRoutes.get('/ ', (req, res, id) => {
  console.log('admin routes for pending', req.params);
  console.log('admin routes for pending checking cookie', req.signedCookies.user_id);
  if (!isNaN(req.params.id)) {
    loggedUser.findById(req.params.id).then(user => {
      if ((user.id === 2 && user.role == "denizskantz") && (req.signedCookies.user_id == req.params.id) ) {
        delete user.password;
        loggedUser.findAllPending().then((pendingusers) => {
          console.log('users:', pendingusers);
          res.render ('pending/pending-userpage', {
            pendingusers: pendingusers,
          });
        });
        // .get(controller.indexPending, views.pendingStudent)
      } else {
        resError(res, 404, "User Not Found");
      }
    });
  } else {
    resError(res, 500, "Invalid ID");
  }
});


// adminRoutes.route('/:id')
//   .get(controller.getOnePending, views.oneAcceptPending)
//   .put(controller.saveOnePending, views.acceptedPending)
//   .delete(controller.removePending, views.handlePandingDelete);


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

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
};

module.exports = adminRoutes;
