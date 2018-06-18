
const signinData = require('../models/loginDB');
const bcrypt = require ('bcrypt');


//this is a function to give some limitations to username and password.
// function validUser(user){
//   // do stuff
//   const validEmail = typeof user.email == 'string' &&
//                     user.email.trim() != '';

//   const validPassword = typeof user.password == 'string' &&
//                      user.password.trim() != '' &&
//                      user.password.trim().length >= 6;

//   return validEmail && validPassword;

// };



module.exports = {

  index(req, res, next) {
    signinData.findAll()
      .then((users) => {
          res.locals.users= users;
          next();
        })
      .catch(err => next(err));
  },

  indexPending(req, res, next) {
    signinData.findAllPending()
      .then((pendingusers) => {
          res.locals.pendingusers= pendingusers;
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



//this function is suppose to take the user input on the signin form and check if the email that client wrote exists in the existing database.
//If it exist it should give an error. And if there is no limitations than client can create their username.

  // getOneEmail(req, res, next) {
  //   console.log(req.body);
  //   if(validUser(req.body)){
  //     // You can fit more (diverse) data in the body than in the url. You can pass any string (special characters)
  //     // best practice would be that you should use params when doing a get, but use body for post, put and delete.
  //     signinData
  //       .findByEmail(req.body.email)
  //       .then((user) => {
  //     if(!user){
  //         bcrypt.hash(req.body.password, 10)
  //         .then((hash) => {
  //           const user = {
  //             password: hash,
  //             repassword: hash,
  //             fullname: req.body.fullname,
  //             // role: 'user',
  //             email: req.body.email
  //           };
  //           res.locals.user = user;
  //           console.log('this is  new user', user);
  //           signinData.save_pending(user)
  //             .then(result => {
  //               // I want to set cookie for the user after signup and redirect that user to login/:id page.
  //               //Below code does not set any cookie. (If you look at login controller it is working perfectly.)
  //               console.log('this is result', result.id);
  //               const userid = result.id;
  //               const expireDate = new Date(Number(new Date()) + 100000)
  //               const isSecure = req.app.get('env') != 'development';
  //               res.cookie('user_id', userid, {
  //                     httpOnly: false,
  //                     expires: expireDate,
  //                     secure: isSecure,
  //                     signed: true
  //                   });
  //               console.log('this is req cookie', req.signedCookies);
  //               // console.log(user);
  //               // res.locals.user = user;
  //               res.redirect(`/login/${userid}`);
  //               // res.render('login/login-single', {
  //               //   user: result,
  //               //   })
  //             })
  //             .catch(error => {
  //               // handle database errors
  //               next(new Error('database error'));
  //             });
  //           });
  //       } else {
  //         //email in use
  //         next(new Error('email in use'));
  //       }
  //     })
  //   } else {
  //     next(new Error('signin not accepted. password must be at least 6 characters'));
  //   }
  // },

  getOneEmail(req, res, next) {
    console.log(req.body);
      // You can fit more (diverse) data in the body than in the url. You can pass any string (special characters)
      // best practice would be that you should use params when doing a get, but use body for post, put and delete.
      signinData
        .findByEmail(req.body.email)
        .then((user) => {
      if(!user){
          bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            const user = {
              password: hash,
              repassword: hash,
              fullname: req.body.fullname,
              // role: 'user',
              email: req.body.email
            };
            res.locals.user = user;
            console.log('this is  new user', user);
            signinData.save_pending(user)
              .then(() => {
                next();
              })
              .catch(error => {
                // handle database errors
                next(new Error('database error'));
              });
            });
        } else {
          //THIS IS NOT WORKING
          next(new Error('email in use'));
        }
      })
  },

  saveOnePending(req, res, next) {
    const integerId = parseInt(req.params.id);
    console.log('this is save one pending', req.params.id);
    signinData.save(integerId)
      .then(() => {
        next();
      })
      .catch(err => next(err));
  },

  getOnePending(req, res, next) {
    console.log('this is get one pending', req.body);
    signinData.findPendingById(req.params.id)
      .then((pendinguser) => {
        console.log('getOnePending => ' + pendinguser);
        res.locals.pendinguser = pendinguser;
        next();
      })
      .catch(err => next(err));
  },
  removePending(req, res, next) {
    console.log('this is  remove pending', req.params.id);
    signinData.delete_pending_user(req.params.id)
      .then((pendinguser) => {
        res.locals.pendinguser = pendinguser;
        console.log(res.locals.pendinguser);
        next();
      })
      .catch(err => next(err));
  },



// route for user logout
  logout(req, res, next) {
    console.log('this is logout');
    res.clearCookie('user_id');
    next();
  },

  emptyForm(req, res, next) {
    const user = {
      id: null,
      password: null,
      repassword: null,
      fullname: null,
      email: null,
    };
    res.locals.user = user;
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
