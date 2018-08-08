
const publiData = require('../models/publicationDB');

module.exports = {


  index(req, res, next) {
    publiData.findAll()
      .then((publications) => {
          res.locals.publications = publications;
          next();
        })
      .catch(err => next(err));
  },


  getOne(req, res, next) {
  publiData.findById(req.params.id)
    .then((publication) => {
      console.log(publication);
      res.locals.publication = publication;
      next();
    })
    .catch(err => next(err));
  },

  bosForm(req, res, next) {
    const yeniPubli = {
      id: null,
      content: null,
      year: null,
      author: null,
      pdf: null,
      image: null,
    };
    res.locals.publication = yeniPubli;
    next();
  },

  create(req, res, next) {
    publiData.save(req.body)
      .then(() => {
        next();
      })
      .catch(err => next(err));
  },

  update(req, res, next) {
    req.body.id = req.params.id;
    publiData.update(req.body)
    .then((publication) => {
      console.log(publication, 'after post');
      res.locals.publication = publication;
      next();
    })
    .catch(err => next(err));
  },

  destroy(req, res, next) {
    publiData.destroy(req.params.id)
      .then((publication) => {
        res.locals.publication = publication;
        next();
      })
      .catch(err => next(err));
  }

}
