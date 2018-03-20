const express = require('express');
const projeRoutes = express.Router();

const projeData = require('../models/projeDB');

module.exports = {
// the root route,

// projeRoutes.get('/', (req, res) => {
//   res.json({
//     message: 'ok',
//     data: projeler
//   });
// });

  index(req, res, next) {
    projeData.findAll()
      .then((projeler) => {
        res.locals.projeler = projeler;
        next();
      })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    projeData.findById(req.params.id)
      .then((proje) => {
        console.log(proje);
        res.locals.proje = proje;
        next();
      })
      .catch(err => next(err));
  },

  create(req, res) {
    projeData.save(req.body)
      .then((proje) => {
        res.json({
          message: 'OK',
          data: proje
        })
      })
      .catch(err => res.status(500).json(err));
  },

  update(req, res) {
    req.body.id = req.params.id;
    projeData.update(req.body)
      .then((proje) => {
        res.json({
          message: 'OK',
          data: proje
        });
      })
      .catch(err => res.status(500).json(err));
  },

  destroy(req, res) {
    quoteDB.destroy(req.params.id)
      .then(() => {
        res.json({
          message: 'Quote deleted successfully'
        })
      })
      .catch(err => res.status(500).json(err));
  }
};
