const express = require('express');
const projeRoutes = express.Router();
const controller = require('../controllers/projeController');
const views = require('../controllers/viewsController');

function isAuthenticated(req, res, next) {
  // do any checks you want to in here
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


projeRoutes.get('/new', isAuthenticated, controller.bosForm, views.eklemeFormu);

projeRoutes.route('/:id/edit')
  .get(controller.getOne, views.projeEditForm);

projeRoutes.route('/:id')
  .get(controller.getOne, views.showOne)
  .put(controller.update, views.projeUpdate)
  .delete(controller.destroy, views.projeDelete);


projeRoutes.route('/')
  .get(controller.index, views.projeleriGoster)
  .post(controller.create, views.ekle);




//export file:

module.exports = projeRoutes;
