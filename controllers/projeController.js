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

  index(req, res) {
    projeData.findAll()
      .then((projeler) => {
        res.json({
          message: 'OK',
          data: projeler
        });
      })
      .catch(err => res.status(500).json(err));
  },

  getOne(req, res) {
    projeData.findById(req.params.id)
      .then((proje) => {
        console.log(proje);
        res.json({
          message: 'OK',
          data: proje
        })
      })
      .catch(err => res.status(500).json(err));
  },

  create(req, res) {
    quoteDB.save(req.body)
      .then((quote) => {
        res.json({
          message: 'OK',
          data: quote
        })
      })
      .catch(err => res.status(500).json(err));
  },

  update(req, res) {
    req.body.id = req.params.id;
    quoteDB.update(req.body)
      .then((quote) => {
        res.json({
          message: 'OK',
          data: quote
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
