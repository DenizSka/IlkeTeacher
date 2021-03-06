const express = require('express');

const loginRoutes = express.Router();
const adminRoutes = require('./adminRoutes');
const controller = require('../controllers/loginController');
const views = require('../controllers/viewsController');
const loggedUser = require('../models/loginDB');
const authMiddleware = require('../controllers/authController');

loginRoutes.get('/', controller.loginForm, views.loginFormu);

// loginRoutes.route('/:id/edit')
//  .get(controller.getOne, views.projeEditForm);

// loginRoutes.route('/:id')
//  .get(controller.getLogin, views.loggedIn);
// .put(controller.update, views.projeUpdate)
// .delete(controller.destroy, views.projeDelete);
// authMiddleware.ensureLoggedIn, authMiddleware.allowAccess,

loginRoutes.get('/:id', authMiddleware.requireLogin, (req, res) => {
  console.log('we need req params in login routes', req.params.id);
  if (!isNaN(req.params.id)) {
    loggedUser.findById(req.params.id).then((user) => {
      if (user.role != 'denizskantz') {
        delete user.password;
        console.log('users:', user);
        // res.json(user);
        res.render('./login/login-single', {
          user,
        });
      } else if (user.id === 2 && user.role == 'denizskantz') {
        delete user.password;
        console.log('this is req user', user.role);
        // console.log('this is req Admin', user.role);
        console.log('users:', user);

        res.render('./pages/admin', {
          user,
        });
      } else {
        resError(res, 404, 'User Not Found');
      }
    });
  } else {
    resError(res, 500, 'Invalid ID');
  }
});

// admin pending route
loginRoutes.get('/:id/pending', authMiddleware.requireLogin, (req, res) => {
  console.log('admin routes pending', req.params.id);
  if (!isNaN(req.params.id)) {
    loggedUser.findById(req.params.id).then((user) => {
      if (user.id === 2 && user.role == 'denizskantz') {
        delete user.password;
        loggedUser.findAllPending().then((pendingusers) => {
          console.log('users:', pendingusers);
          res.render('pending/pending-userpage', {
            pendingusers,
          });
        });
      } else {
        resError(res, 404, 'User Not Found');
      }
    });
  } else {
    resError(res, 500, 'Invalid ID');
  }
});

// admin pending route
loginRoutes.get('/:loginid/pending/:pendingid', authMiddleware.requireLogin, (req, res) => {
  if (!isNaN(req.params.loginid)) {
    loggedUser.findById(req.params.loginid).then((user) => {
      if (user.id === 2 && user.role == 'denizskantz') {
        delete user.password;
        loggedUser.findPendingById(req.params.pendingid).then((pendinguser) => {
          console.log(`getOnePending => ${pendinguser}`);
          res.render('pending/single-pending', {
            pendinguser,
          });
        });
      } else {
        resError(res, 404, 'User Not Found');
      }
    });
  } else {
    resError(res, 500, 'Invalid ID');
  }
});
// loginRoutes.use('/:id/pending', adminRoutes);


loginRoutes.put('/:loginid/pending/:pendingid', authMiddleware.requireLogin, (req, res) => {
  if (!isNaN(req.params.loginid)) {
    loggedUser.findById(req.params.loginid).then((user) => {
      if (user.id === 2 && user.role == 'denizskantz') {
        delete user.password;
        const integerId = parseInt(req.params.pendingid);
        loggedUser.save(integerId).then(() => {
          res.render('pending/accepted', {
            integerId,
          });
        });
      } else {
        resError(res, 404, 'User Not Found');
      }
    });
  } else {
    resError(res, 500, 'Invalid ID');
  }
});


loginRoutes.delete('/:loginid/pending/:pendingid', authMiddleware.requireLogin, (req, res) => {
  if (!isNaN(req.params.loginid)) {
    loggedUser.findById(req.params.loginid).then((user) => {
      if (user.id === 2 && user.role == 'denizskantz') {
        delete user.password;
        loggedUser.delete_pending_user(req.params.pendingid).then((pendinguser) => {
          console.log('this is delete pending user', pendinguser);
          pendinguser = pendinguser;
          res.redirect('/login/1/pending/');
        });
      } else {
        resError(res, 404, 'User Not Found');
      }
    });
  } else {
    resError(res, 500, 'Invalid ID');
  }
});

// adminRoutes.route('/:id')
//   .put(controller.saveOnePending, views.acceptedPending)
//   .delete(controller.removePending, views.handlePandingDelete);

loginRoutes.route('/logout')
//   .get(controller.index, views.projeleriGoster)
//   .post(authMiddleware.ensureLoggedIn, controller.getLogin,  views.loggedIn )
  .post(controller.logout, views.logoutPage);

loginRoutes.route('/')
//   .get(controller.index, views.projeleriGoster)
//   .post(authMiddleware.ensureLoggedIn, controller.getLogin,  views.loggedIn )
  .post(controller.getLogin, () => {});

function resError(res, statusCode, message) {
  res.status(statusCode);
  res.json({ message });
}


module.exports = loginRoutes;
