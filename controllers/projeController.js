
const projeData = require('../models/projeDB');

module.exports = {

  index(req, res, next) {
    projeData.findAll()
      .then((projeler) => {
          res.locals.projeler= projeler;
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


  create(req, res, next) {
    projeData.save(req.body)
      .then(() => {
        next();
      })
      .catch(err => next(err));
  },


  bosForm(req, res, next) {
    const yeniProje = {
      id: null,
      content: null,
      year: null,
      author: null,
      pdf: null
    };
    res.locals.proje = yeniProje;
    next();
  },

  update(req, res, next) {
    req.body.id = req.params.id;
    projeData.update(req.body)
    .then((proje) => {
      console.log(proje, 'after post');
      res.locals.proje = proje;
      next();
    })
    .catch(err => next(err));
  },

  destroy(req, res, next) {
    projeData.destroy(req.params.id)
      .then((proje) => {
        res.locals.proje = proje;
        next();
      })
      .catch(err => next(err));
  }
};
