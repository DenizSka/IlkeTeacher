
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


// home route
projeRoutes.get('/', (req,res) => res.render('pages/home', {data: 'Hello'}));



projeRoutes.route('/projeler/:id')
  .get(controller.getOne, views.showOne)
  .put(controller.update)
  .delete(controller.destroy);


projeRoutes.route('/projeler')
  .get(controller.index, views.projeleriGoster)
  .post(controller.create);


//export file:

module.exports = projeRoutes;
