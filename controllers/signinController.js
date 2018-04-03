
const loginData = require('../models/loginDB');

module.exports = {
// the root route,

// userRoutes.get('/', (req, res) => {
//   res.json({
//     message: 'ok',
//     data: users
//   });
// });

  index(req, res, next) {
    loginData.findAll()
      .then((users) => {
          res.locals.users= users;
          next();
        })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    loginData.findById(req.params.id)
      .then((user) => {
        console.log(user);
        res.locals.user = user;
        next();
      })
      .catch(err => next(err));
  },

  create(req, res, next) {
    loginData.save(req.body)
      .then(() => {
        next();
      })
      .catch(err => next(err));
  },


  bosForm(req, res, next) {
    const yeniuser = {
      id: null,
      username: null,
      password: null,
      repassword: null,
      fullname: null,
      email: null,
    };
    res.locals.user = yeniuser;
    next();
  },

  update(req, res, next) {
    req.body.id = req.params.id;
    loginData.update(req.body)
    .then((user) => {
      console.log(user, 'after post');
      res.locals.user = user;
      next();
    })
    .catch(err => next(err));
  },

  destroy(req, res, next) {
    loginData.destroy(req.params.id)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch(err => next(err));
  }
};
