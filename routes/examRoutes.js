const express = require('express');
const examRoutes = express.Router();
const controller = require('../controllers/studentController');
const views = require('../controllers/viewsController');

function isAuthenticated(req, res, next) {
  // do any checks you want to in here
  console.log('HELLOOOOO for pending checking deniz cookie')
  console.log('admin checking in exam routes?', req.params);
  console.log('checking if auth for pending checking deniz cookie', req.signedCookies);
  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.user.authenticated)
      return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
}

// adminRoutes.get('/ ', (req, res, id) => {
//   console.log('admin routes for pending', req.params);
//   console.log('admin routes for pending checking cookie', req.signedCookies.user_id);
//   if (!isNaN(req.params.id)) {
//     loggedUser.findById(req.params.id).then(user => {
//       if ((user.id === 1 && user.role == "admin") && (req.signedCookies.user_id == req.params.id) ) {
//         delete user.password;
//         loggedUser.findAllPending().then((pendingusers) => {
//           console.log('users:', pendingusers);
//           res.render ('pending/pending-userpage', {
//             pendingusers: pendingusers,
//           });
//         });
//         // .get(controller.indexPending, views.pendingStudent)
//       } else {
//         resError(res, 404, "User Not Found");
//       }
//     });
//   } else {
//     resError(res, 500, "Invalid ID");
//   }
// });

examRoutes.get('/new', controller.bosForm, views.addForm);

examRoutes.get('/admin/:id/edit', isAuthenticated, controller.getOne, views.studentEditForm);

examRoutes.route('/admin/:id', isAuthenticated)
  .put(controller.update, views.studentUpdate)
  .delete(controller.destroy, views.studentDelete);


examRoutes.route('/')
  .get(controller.index, views.showExams)

examRoutes.route('/admin', isAuthenticated)
  .get(controller.index, views.showAdmin)
  .post(controller.create, views.showAdminEkle);




//export file:

module.exports = examRoutes;
