
const signinData = require('../models/loginDB');
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


//this is the old version just to check if the validuser function is working.
  // getOneEmail(req, res, next) {
  //   if(validUser(req.body)){
  //     signinData.findByEmail(req.body.email)
  //       .then((user) => {
  //       console.log('user', user);
  //     if(!user){
  //         //this is a unique email
  //         res.json ({
  //           user,
  //           message: 'this is a unique email'
  //         });
  //       } else {
  //         //email in use
  //         next(new Error('email in use'));
  //       }
  //     });
  //   } else {
  //     next(new Error('password not accepted'));
  //   }
  // },


//this function is suppose to take the user input on the signin form and check if the email that client wrote exists in the existing database.
//If it exist it should give an error. And if there is no limitations than client can create their username.

  getOneEmail(req, res, next) {
    console.log(req.body);
    if(validUser(req.body)){
      // You can fit more (diverse) data in the body than in the url. You can pass any string (special characters)
      // best practice would be that you should use params when doing a get, but use body for post, put and delete.
      signinData
        .findByEmail(req.body.email)
        .then((user) => {
      if(!user){
          bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            const newuser = {
              password: hash,
              repassword: hash,
              fullname: req.body.fullname,
              email: req.body.email
            };
            res.locals.user = newuser;
            console.log('this is  new user', newuser);
            signinData.save(newuser)
              .then(result => {
                // I want to set cookie for the user after signup and redirect that user to login/:id page.
                //Below code does not set any cookie. (If you look at login controller it is working perfectly.)
                console.log('this is result', result.id);
                const userid = result.id;
                res.cookie('user_id', userid, {
                      expire: new Date() + 9999,
                      secure: isSecure,
                    });
                console.log('this is req cookie', req.signedCookies);
                // console.log(user);
                // res.locals.user = user;
                res.redirect(`/login/${user.id}`);
                // res.render('login/login-single', {
                //   user: result,
                //   })
              })
              .catch(error => {
                // handle database errors
                next(new Error('database error'));
              });
            });
        } else {
          //email in use
          next(new Error('email in use'));
        }
      })
    } else {
      next(new Error('signin not accepted. password must be at least 6 characters'));
    }
  },


  emptyForm(req, res, next) {
    const newuser = {
      id: null,
      password: null,
      repassword: null,
      fullname: null,
      email: null,
    };
    res.locals.user = newuser;
    next();
  },


  // create(req, res, next) {
  //   signinData.save(req.body)
  //     .then(() => {
  //       next();
  //     })
  //     .catch(err => next(err));
  // },


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
