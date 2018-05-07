const express = require('express');
const homeRoutes = express.Router();
const controller = require('../controllers/publicationController');
const views = require('../controllers/viewsController');



homeRoutes.route('/')
  .get(controller.index, views.homePubli)


//export file:

module.exports = homeRoutes;
