
const loginData = require('../models/loginDB');
const bcrypt = require ('bcrypt');

//this is a function to give some limitations to username and password.
function validUser(user){
  // do stuff
  const validEmail = typeof user.email == 'string' &&
                    user.email.trim() != '';

  const validPassword = typeof user.password == 'string' &&
                     user.password.trim() != '' &&
                     user.password.trim().length >= 6;

  return validEmail && validPassword;

};

module.exports = {


  index(req, res, next) {
    loginData.findAll()
      .then((users) => {
          res.locals.users= users;
          next();
        })
      .catch(err => next(err));
  },

  // getOne(req, res, next) {
  //   loginData.findById(req.params.id)
  //     .then((user) => {
  //       console.log(user);
  //       res.locals.user = user;
  //       next();
  //     })
  //     .catch(err => next(err));
  // },

  getLogin(req, res, next) {
    console.log(req.body);
    if(validUser(req.body)){
      loginData
        .findByEmail(req.body.email)
        .then((user) => {
        console.log('user', res.locals.user);
          if(user){
              //compare pasword with hashed password. Comparing password they entered in with password in db.
              bcrypt.compare(req.body.password, user.password)
                .then((result) => {
              //if the passwords matched
                if(result){
                const cookie = req.cookies.cookieName;
                  if (cookie === undefined) {
                  //setting the 'set-cookie' header
                  // let cookie = req.cookies['user_id'];
                  // console.log(cookie);
                    const isSecure = req.app.get('env') != 'development';
                    res.cookie('user_id', user.id, {
                      httpOnly: true,
                      maxAge: 900000,
                      secure: isSecure,
                      signed: true
                    });
                    console.log('cookie created successfully');
                    res.json({
                      id: user.id,
                      message: 'logged in!'
                    });
                    } else {
                      // yes, cookie was already present
                      console.log('cookie exists', cookie);
                    }
                    next(); // <-- important!
                } else {
                  next (new Error('password or username you entered is incorrect'));
                }
              });
          } else {
            next (new Error('login does not exist'));
          }
        });
    }else {
      next (new Error('please re-enter your username and password'));
    }
},

  // create(req, res, next) {
  //   loginData.save(req.body)
  //     .then(() => {
  //       next();
  //     })
  //     .catch(err => next(err));
  // },


  loginForm(req, res, next) {
    const logginguser = {
      id: null,
      email: null,
      password: null,
    };
    res.locals.user = logginguser;
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
