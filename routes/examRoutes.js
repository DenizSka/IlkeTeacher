const express = require('express');
const examRoutes = express.Router();
const controller = require('../controllers/studentController');
const views = require('../controllers/viewsController');
const authMiddleware = require('../controllers/authController');



examRoutes.get('/new', authMiddleware.requireLogin, controller.bosForm, views.addForm);

examRoutes.get('/admin/:id/edit', authMiddleware.requireLogin, controller.getOne, views.studentEditForm);

examRoutes.put('/admin/:id', authMiddleware.requireLogin, controller.update, views.studentUpdate)
examRoutes.delete('/admin/:id', authMiddleware.requireLogin, controller.destroy, views.studentDelete);


examRoutes.route('/')
  .get(controller.index, views.showExams)

examRoutes.get('/admin', authMiddleware.requireLogin, controller.index, views.showAdmin)
examRoutes.post('/admin', authMiddleware.requireLogin, controller.create, views.showAdminEkle);




//export file:

module.exports = examRoutes;
