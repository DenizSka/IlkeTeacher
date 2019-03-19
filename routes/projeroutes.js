const express = require('express');

const projeRoutes = express.Router();
const controller = require('../controllers/projeController');
const views = require('../controllers/viewsController');
const authMiddleware = require('../controllers/authController');

projeRoutes.get('/admin/new', authMiddleware.requireLogin, controller.bosForm, views.eklemeFormu);

projeRoutes.get('/admin', authMiddleware.requireLogin, controller.index, views.projeleriAdminGoster);

projeRoutes.get('/admin/:id/edit', authMiddleware.requireLogin, controller.getOne, views.projeEditForm);

projeRoutes.get('/admin/:id', authMiddleware.requireLogin, controller.getOne, views.showAdminOne);
projeRoutes.put('/admin/:id', authMiddleware.requireLogin, controller.update, views.projeUpdate);
projeRoutes.delete('/admin/:id', authMiddleware.requireLogin, controller.destroy, views.projeDelete);

projeRoutes.route('/:id')
  .get(controller.getOne, views.showOne);

projeRoutes.route('/')
  .get(controller.index, views.projeleriGoster)
  .post(controller.create, views.proEkle);


// export file:

module.exports = projeRoutes;
