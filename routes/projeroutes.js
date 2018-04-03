const express = require('express');
const projeRoutes = express.Router();
const controller = require('../controllers/projeController')
const views = require('../controllers/viewsController');


projeRoutes.get('/new', controller.bosForm, views.eklemeFormu);

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
