const express = require('express');
const projeRoutes = express.Router();
const controller = require('../controllers/projeController');
const views = require('../controllers/viewsController');
const authMiddleware = require('../controllers/authController');

projeRoutes.get('/new', authMiddleware.requireLogin, controller.bosForm, views.eklemeFormu);

projeRoutes.get('/admin/:id/edit', authMiddleware.requireLogin, controller.getOne, views.projeEditForm);

projeRoutes.get('/admin/:id', authMiddleware.requireLogin, controller.getOne, views.showAdminOne);
projeRoutes.put('/admin/:id', authMiddleware.requireLogin, controller.update, views.projeUpdate);
projeRoutes.delete('/admin/:id', authMiddleware.requireLogin, controller.destroy, views.projeDelete);

projeRoutes.get('/admin', authMiddleware.requireLogin, controller.index, views.projeleriAdminGoster);
projeRoutes.post('/admin', authMiddleware.requireLogin, controller.create, views.ekle);


projeRoutes.route('/:id')
  .get(controller.getOne, views.showOne);



projeRoutes.route('/')
  .get(controller.index, views.projeleriGoster)





//export file:

module.exports = projeRoutes;
