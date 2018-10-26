
const loginData = require('../models/loginDB');
const bcrypt = require ('bcrypt');
const views = require('../controllers/viewsController');

module.exports = {

  index(req, res, next) {
    loginData.findAll()
      .then((users) => {
          res.locals.users= users;
          next();
        })
      .catch(err => next(err));
  },


  getLogin(req, res, next) {
    console.log(req.body);
      loginData
        .findByExistingEmail(req.body.email)
        .then((user) => {
          if(user){
              //compare pasword with hashed password. Comparing password they entered in with password in db.
              bcrypt.compare(req.body.password, user.password)
                .then((result) => {
                //if the passwords matched
                if(result){

                const cookie = req.cookies['user_id'];
                  if (cookie === undefined) {
                  //setting the 'set-cookie' header
                    const isSecure = req.app.get('env') != 'development';
                    res.cookie('user_id', user.id, {
                      httpOnly: false,
                      maxAge : 100000,
                      secure: isSecure,
                      signed: true
                    });
                    console.log('cookie created successfully. Signed cookie: ', req.signedCookies);
                    console.log('users:', user);
                    //How can I have the logged in users info rendered on the page?
                    // res.render('login/login-single', {
                    //   user: user,
                    // });
                    // user = res.user;
                    res.locals.user = user;

                    console.log('id:', user.id);
                    res.redirect(`/login/${user.id}`);
                    // res.json({
                    //   id: user.id,
                    //   message: 'logged in!'
                    // });
                  //   res.json({
                  //   user: { user },
                  // });
                    // next();
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
  },

  // create(req, res, next) {
  //   loginData.save(req.body)
  //     .then(() => {
  //       next();
  //     })
  //     .catch(err => next(err));
  // },

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.


// route for user logout
  // logout(req, res, next) {
  //   console.log('this is logout', req.cookies.user_id);
  //       if (req.cookies.user_id && !req.session.user) {
  //       res.clearCookie('user_id');
  //   }
  //   next();
  // },
  logout(req, res, next) {
      console.log('this is logout');
    res.clearCookie('user_id');
    next();
  },

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
