const express = require('express');
const loginRoutes = express.Router();
const adminRoutes = require('./adminRoutes');
const controller = require('../controllers/loginController');
// const scontroller = require('../controllers/signinController');
const views = require('../controllers/viewsController');
const loggedUser = require('../models/loginDB');
const project = require('../models/projeDB');
// const passport = require('passport');
const authMiddleware = require('../controllers/authController');



// loginRoutes.post('/', passport.authenticate('local', {
//   successRedirect: '/', failureRedirect: '/login'
// }));


loginRoutes.get('/', controller.loginForm, views.loginFormu);



// loginRoutes.route('/:id/edit')
//   .get(controller.getOne, views.projeEditForm);

// loginRoutes.route('/:id')
//   .get(controller.getLogin, views.loggedIn);
  // .put(controller.update, views.projeUpdate)
  // .delete(controller.destroy, views.projeDelete);

loginRoutes.get('/:id', authMiddleware.ensureLoggedIn, authMiddleware.allowAccess, (req, res) => {
  console.log('we need req params in login routes', req.params.id);
  if (!isNaN(req.params.id)) {
    loggedUser.findById(req.params.id).then(user => {
      if (user == true && user.role != "admin") {
        delete user.password;
        console.log('users:', user);
        // res.json(user);
        res.render('./login/login-single', {
          user: user,
        });
      } else if (user.id === 1 && user.role == "admin" ) {
        delete user.password;
        console.log('this is req user', user.role);
        // console.log('this is req Admin', user.role);
        console.log('users:', user);
        // res.json(user);
        res.render('./pages/admin', {
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


// admin pending route
loginRoutes.get('/:id/pending', (req, res) => {
    console.log('admin routes pending', req.params.id);
    console.log('admin routes pending chekcing cookie', req.signedCookies.user_id);
    if (!isNaN(req.params.id)) {
      loggedUser.findById(req.params.id).then(user => {
        if ((user.id === 1 && user.role == "admin") && (req.signedCookies.user_id == req.params.id) ) {
          delete user.password;
          loggedUser.findAllPending().then((pendingusers) => {
            console.log('users:', pendingusers);
            res.render ('pending/pending-userpage', {
              pendingusers: pendingusers,
            })
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



// loginRoutes.get('/:id/projects', (req,res)=>{
//   if (!isNaN(req.params.id)) {
//     project.getByUser(req.params.id).then(projects=> {
//       res.json(projects);
//     });
//   } else {
//     resError(res, 500, "Invalid ID");
//   }
// });

loginRoutes.route('/logout')
//   .get(controller.index, views.projeleriGoster)
  // .post(authMiddleware.ensureLoggedIn, controller.getLogin,  views.loggedIn )
  .post(controller.logout, views.logoutPage);

loginRoutes.route('/')
//   .get(controller.index, views.projeleriGoster)
  // .post(authMiddleware.ensureLoggedIn, controller.getLogin,  views.loggedIn )
  .post(controller.getLogin, () => {});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({message});
};



module.exports = loginRoutes;
