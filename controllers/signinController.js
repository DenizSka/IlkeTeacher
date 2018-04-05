
const signinData = require('../models/loginDB');

function validUser(user){
  //do stuff
  const validEmail = typeof user.email == 'string' &&
                    user.email.trim() != '' &&
                    user.email.trim().length >= 6;

  const validPassword = typeof user.password == 'string' &&
                     user.password.trim() != '' &&
                     user.password.trim().length >= 6;

  return validEmail && validPassword;

};

module.exports = {
// the root route,

// userRoutes.get('/', (req, res) => {
//   res.json({
//     message: 'ok',
//     data: users
//   });
// });

  index(req, res, next) {
    signinData.findAll()
      .then((users) => {
          res.locals.users= users;
          next();
        })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    signinData.findById(req.params.id)
      .then((user) => {
        console.log(user);
        res.locals.user = user;
        next();
      })
      .catch(err => next(err));
  },


  getOneEmail(req, res, next) {
    console.log(req.body);
    if(validUser(req.body)){
      signinData.findByEmail(req.params.email)
        .then((user) => {
        console.log('user', user);
      if(!user){
          //this is a unique email
          res.json ({
            user,
            message: 'this is a unique email'
          });
        } else {
          //email in use
          next(new Error('email in use'));
        }
      });
    } else {
      next(new Error('signin not accepted. password must be at least 6 characters'));
    }
  },

  create(req, res, next) {
    signinData.save(req.body)
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
    signinData.update(req.body)
    .then((user) => {
      console.log(user, 'after post');
      res.locals.user = user;
      next();
    })
    .catch(err => next(err));
  },

  destroy(req, res, next) {
    signinData.destroy(req.params.id)
      .then((user) => {
        res.locals.user = user;
        next();
      })
      .catch(err => next(err));
  }
};
