const express = require('express');
const examRoutes = express.Router();
const controller = require('../controllers/studentController');
const views = require('../controllers/viewsController');

function isAuthenticated(req, res, next) {
  // do any checks you want to in here
  console.log('HELLOOOOO for pending checking deniz cookie')
  console.log('checking if auth for pending checking deniz cookie', req.signedCookies);
  // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
  // you can do this however you want with whatever variables you set up
  if (req.signedCookies.user_id){
      return next();
  }else{
  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
  res.redirect('/');
  }
}


examRoutes.get('/new', isAuthenticated, controller.bosForm, views.addForm);

examRoutes.get('/admin/:id/edit', isAuthenticated, controller.getOne, views.studentEditForm);

examRoutes.put('/admin/:id', isAuthenticated, controller.update, views.studentUpdate)
examRoutes.delete('/admin/:id', isAuthenticated, controller.destroy, views.studentDelete);


examRoutes.route('/')
  .get(controller.index, views.showExams)

examRoutes.get('/admin', isAuthenticated, controller.index, views.showAdmin)
examRoutes.post('/admin', isAuthenticated, controller.create, views.showAdminEkle);




//export file:

module.exports = examRoutes;
