
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

projeRoutes.route('/:id')
  .get(controller.getOne)
  .put(controller.update)
  .delete(controller.destroy);


projeRoutes.route('/')
  .get(controller.index)
  .post(controller.create);


//export file:

module.exports = projeRoutes;
