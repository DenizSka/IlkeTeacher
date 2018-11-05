const express = require('express');
const publiRoutes = express.Router();
const controller = require('../controllers/publicationController');
const views = require('../controllers/viewsController');
const authMiddleware = require('../controllers/authController');



publiRoutes.get('/admin/new', authMiddleware.requireLogin, controller.bosForm, views.publiFormu);

publiRoutes.get('/admin',authMiddleware.requireLogin, controller.index, views.publiAdminGoster);

publiRoutes.get('/admin/:id/edit', authMiddleware.requireLogin, controller.getOne, views.publiEditForm);

publiRoutes.get('/admin/:id', authMiddleware.requireLogin, controller.getOne, views.oneAdminPubli);

publiRoutes.put('/admin/:id', authMiddleware.requireLogin, controller.update, views.publiUpdate);

publiRoutes.delete('/admin/:id', authMiddleware.requireLogin, controller.destroy, views.handleDelete);

publiRoutes.route('/:id')
  .get(controller.getOne, views.onePubli);



publiRoutes.route('/')
  .get(controller.index, views.publiGoster)
  .post(controller.create, views.publiEkle);



module.exports = publiRoutes;
