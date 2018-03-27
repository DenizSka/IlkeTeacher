const express = require('express');
const publiRoutes = express.Router();
const controller = require('../controllers/publicationController')
const views = require('../controllers/viewsController');


publiRoutes.get('/new', controller.bosForm, views.publiFormu);

publiRoutes.route('/:id')
  .get(controller.getOne, views.onePubli);

publiRoutes.route('/')
  .get(controller.index, views.publiGoster)
  .post(controller.create, views.publiEkle);




module.exports = publiRoutes;
