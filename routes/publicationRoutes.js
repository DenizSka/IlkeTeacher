const express = require('express');
const publiRoutes = express.Router();
const controller = require('../controllers/publicationController');
const views = require('../controllers/viewsController');
const authMiddleware = require('../controllers/authController');



publiRoutes.get('/new', authMiddleware.requireLogin, controller.bosForm, views.publiFormu);

publiRoutes.get('/admin',authMiddleware.requireLogin, controller.index, views.publiAdminGoster);

publiRoutes.get('/admin/:id/edit', authMiddleware.requireLogin, controller.getOne, views.publiEditForm);

publiRoutes.route('/:id')
  .get(controller.getOne, views.onePubli)
  .put(controller.update, views.publiUpdate)
  .delete(controller.destroy, views.handleDelete);



publiRoutes.route('/')
  .get(controller.index, views.publiGoster)
  .post(controller.create, views.publiEkle);



module.exports = publiRoutes;
