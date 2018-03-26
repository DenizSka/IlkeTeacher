// import express from our dependencies
const express = require('express');
// initialize the app
const app = express();
const bodyParser = require('body-parser');
//configure the logger: (some other loggers are winston, bunyan,)
const logger = require('morgan');
//telling which logger to use.
const ejs = require('ejs');
const path = require('path');
const bcrypt = require('bcrypt');
// const flash = require ('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/user');
const Message = require('./models/message');
// const env = require('dotenv').load();
const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const projeRoutes = require('./routes/projeroutes');
// const passport = require('passport');
// set the port, either from an environmental variable or manually
const port = process.env.PORT || 3000;

/* Views */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressValidator())

// middleware
app.use(logger('dev'));
app.use(express.static('public'));
// parse incoming data
/* we'll be reading the form body and accepting files,
or anything more than text*/
app.use( bodyParser.urlencoded({ extended: true}));
/* we'll also be accepting and parsing json  */
app.use(bodyParser.json());


// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());



/// static route to public
// This sets a folder called public to be the destination from which any static assets (images,css,etc) will be served.
app.use('/static', express.static(path.join(__dirname, 'public')));



// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'victoriassecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        // secure: true,
        // domain: 'example.com',
        path: '/',
        expires: new Date( Date.now() + 60 * 60 * 1000 )
    }
}));


// app.use(passport.initialize());
// app.use(passport.session());

// //initialize validator:
// app.use(expressValidator({
//   errorFormatter: function (param, msg, value){
//     const namespace = param.split('.')
//     , root = namespace.shift()
//     , formParam = root;

//     while(namespace.length){
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param: formParam,
//       msg: msg,
//       value: value
//     };
//   }
// }));

//connect flash
// app.use(flash());

//Global Vars
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg');
//   res.locals.error_msg = req.flash('error_msg');
//   res.locals.error = req.flash('error');
//   next();
// });

// home route
// app.get('/', (req,res) => res.render('pages/home',
//  {
//     message: 'Hello world!',
//     documentTitle: 'This is HAMILTON quotes!!',
//     subTitle: 'Read some of the coolest quotes around.',
//     showMore: true,
//     quoteAuthors: ['Yoda', 'CS Lewis', 'Frank Chimero', 'Pablo Picasso', 'Italo Calvino', 'T. S. Eliot', 'Samuel Beckett', 'Hunter S. Thompson'],
//   })
// );




// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});


// middleware function to check for logged-in users
const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }
};


// route for Home-Page
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
});


// route for user signup
app.get('/signup', sessionChecker, (req, res) => {
    res.render('pages/signup');
});

app.post( '/signup', [
  // check('username').exists().withMessage('must have a username'),
  check('email').isEmail().withMessage('must be email'),
  check('password').isLength({ min: 5 }).matches(/\d/).withMessage('passwords must be at least 5 characters and contain one number')
  ], (req, res, next) => {
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.mapped() });
        }

        // if (!req.body.username || !req.body.email || !req.body.password) {
        //   return res.status(400).send('Missing username or password');
        // };

          User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        })
        .then(user => {
            req.session.user = user.dataValues;
            console.log(req.session.user);
            res.redirect('/dashboard');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

// route for user Login
app.route('/login')
    .get(sessionChecker, (req, res) => {
        res.render('pages/login');
    })
    .post((req, res) => {
        const username = req.body.username,
              password = req.body.password;
        User.prototype.validPassword = function(password) {
          return bcrypt.compareSync(password,this.password)
        };
        if (!username || !password) {
          return res.status(400).send('Missing username or password');
        };

        User.findOne({ where: { username: username } }).then(function (user) {
            if (!user) {
                res.redirect('/login')
                console.log( 'Wrong Credentials');
            } else if (!user.validPassword(password)) {
                console.log( 'Wrong Credentials');
                res.render('pages/login');
            } else {
                req.session.user = user.dataValues;
                console.log(req.session.user)
                res.redirect('/dashboard');
            }
        });
    });

// app.use('/dashboard', projeRoutes);
// route for user's dashboard
app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.render('pages/dashboard');
    } else {
        res.redirect('/login');
    }
});



// route for user logout
app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// get anything that hasn't already been matched
app.use('*', (req, res) => {
    // send a response with status 404
    res.status(404).send('page not found!');
});



// tell the app where to serve
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
