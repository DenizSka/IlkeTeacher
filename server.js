// import express from our dependencies
const express = require('express');
// initialize the app
const app = express();
const projeRoutes = require('./routes/projeroutes');
const publiRoutes = require('./routes/publicationRoutes');
const loginRoutes = require('./routes/loginRoutes');
const signupRoutes = require('./routes/signupRoutes');
const bodyParser = require('body-parser');
//configure the logger: (some other loggers are winston, bunyan,)
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
const escapeHtml = require('escape-html');
const http = require('http');
const url = require('url');
require('dotenv').config();

const cors = require('cors');
const secret = process.env.COOKIE_SECRET;
const authMiddleware = require('./controllers/authController');

//when we create forms, the natural method will be post. In order to get the delete function to work we will need this package.
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// set the port, either from an environmental variable or manually
const port = process.env.PORT || 3000;

/* Views- Telling the app where to look for our templates and the other telling it what kind of template to expect. */
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

//telling which logger to use.
app.use(logger('dev'));

// parse incoming data
/* we'll be reading the form body and files,
or anything more than text*/
app.use( bodyParser.urlencoded({ extended: true }));
/* we'll also be accepting and parsing json  */
app.use(bodyParser.json());
app.use(cookieParser(secret));




// static route to public
app.use(express.static('public'));
// This sets a folder called public to be the destination from which any static assets (images,css,etc) will be served.
app.use( '/static', express.static( path.join( __dirname, 'public' )));

app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

// project route
app.use('/login', authMiddleware.ensureLoggedIn, loginRoutes);

// project route
app.use('/signup', signupRoutes);


// project route
app.use('/projects', projeRoutes);


// publication route
app.use('/publications', publiRoutes);

// home route
app.get('/', (req,res) => {
  res.render('pages/home')
});

// get anything that hasn't already been matched
app.use('*', (req, res) => {
  // send a response with status 404
  res.status(404).send('page not found');
});


// catch 404 and forward to error handler
// app.use('*', (req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use('*', (err, req, res, next) => {
//   res.status(err.status || 500);
//   res.json({
//     message: err.message,
//     error: req.app.get('env') === 'development' ? err : {}
//   });
// });

app.use('*', (error, req, res, next) => {
  // Won't get here, because Express doesn't catch the above error
  console.log('this is error',error);
  res.locals.error = error;
  res.render('pages/error')
});


// tell the app where to serve
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;
