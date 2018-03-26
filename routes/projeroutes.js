const express = require('express');
const projeRoutes = express.Router();
const controller = require('../controllers/projeController')
const views = require('../controllers/viewsController');

// the root route,

// projeRoutes.get('/', (req, res) => {
//   res.json({
//     message: 'ok',
//     data: projeler
//   });
// });

projeRoutes.route('/dashboard/:id')
  .get(controller.getOne,views.showOne, views.show404)
  .put(controller.update)
  .delete(controller.destroy);


projeRoutes.route('/dashboard')
  .get(controller.index, views.projeleriGoster, views.show404)
  .post(controller.create);



//export file:

module.exports = projeRoutes;


