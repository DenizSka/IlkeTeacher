const express = require('express');
// initialize the app
const app = express();

// const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
// configure the logger: (some other loggers are winston, bunyan,)
const passport = require('passport');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
const escapeHtml = require('escape-html');
const http = require('http');
const url = require('url');

const session = require('client-sessions');
// this is also trying heroku cookie set up
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require('dotenv').config();

const cors = require('cors');

// ENABLING COR REQUESTS
const origins = [
	'http://localhost:3000', // Development
	'http://localhost:5000', // Production Build
	'http://reactjs.herokuapp.com', // Just for debugging reasons
	'https://reactjs.herokuapp.com',
];
app.use(cors({ credentials: true, origin: origins }));


app.use(session({
	cookieName: 'session',
	secret: 'eg[isasa-372373894735;]][]}}{;;to8',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	httpOnly: true,
	secure: true,
	ephemeral: true,
}));

const secret = process.env.COOKIE_SECRET;
// const authMiddleware = require('./controllers/authController');

// when we create forms, the natural method will be post. In order to get the delete function to work we will need this package.
const methodOverride = require('method-override');


// heroku cookie problem
// //allow cookie crossDomain override
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//     // intercept OPTIONS method
//     if ('OPTIONS' == req.method) {
//       res.send(200);
//     }
//     else {
//       next();
//     }
// };
// app.use(allowCrossDomain);

// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://ilkeciritci.com/', true);
// xhr.withCredentials = true;
// xhr.send(null);
// app.use(allowCrossDomain);

// app.use(passport.initialize());
// app.use(passport.session());
// require('./path/to/passport/config/file')(passport);//add this line

app.use(methodOverride('_method'));

// set the port, either from an environmental variable or manually
const port = process.env.PORT || 3000;

/* Views- Telling the app where to look for our templates and the other telling it what kind of template to expect. */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// telling which logger to use.
app.use(logger('dev'));


// parse incoming data
/* we'll be reading the form body and files,
or anything more than text */
app.use(bodyParser.urlencoded({ extended: true }));
/* we'll also be accepting and parsing json  */
app.use(bodyParser.json());
app.use(cookieParser(secret));


const permission = require('permission');
const signupRoutes = require('./routes/signupRoutes');
const examRoutes = require('./routes/examRoutes');
const loginRoutes = require('./routes/loginRoutes');
const publiRoutes = require('./routes/publicationRoutes');
const projeRoutes = require('./routes/projeroutes');


permission.AUTHORIZED === 'authorized'; // true
permission.NOT_AUTHENTICATED === 'notAuthenticated'; // true
permission.NOT_AUTHORIZED === 'notAuthorized'; // true

const notAuthenticated = {
	flashType: 'error',
	message: 'The entered credentials are incorrect',
	redirect: '/login',
};


// static route to public
app.use(express.static('public'));
// This sets a folder called public to be the destination from which any static assets (images,css,etc) will be served.
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(cors({
	origin: 'http://localhost:8080',
	credentials: true,
}));


// login route
app.use('/login', loginRoutes);

// const requiresAdmin = function() {
//   return [
//     function(req, res, next) {
//       if (user == true && user.role != admin)
//         next();
//       else
//         res.send(401, 'Unauthorized');
//     }
//   ]
// };

// app.all('/admin/*', requiresAdmin());
// app.get('/admin/', loginRoutes);

// after login route
// app.use('/user', authMiddleware.ensureLoggedIn, userRoutes);

// signup route
// app.use('/signup', signupRoutes);


// // route for user logout
// app.get('/logout', (req, res) => {
//   console.log('this is logout', req.cookies);
//     if (req.cookies['user_id']) {
//         res.clearCookie('user_id');
//         return res.status(200).render('login/logout');
//     } else {
//         res.redirect('/login');
//     }
// });

// publication route
app.use('/exam-results', examRoutes);

// project route
app.use('/projects', projeRoutes);


// publication route
app.use('/publications', publiRoutes);


// home route
app.get('/', (req, res) => {
	res.render('pages/home');
});


// home route
app.get('/contactme', (req, res) => {
	res.render('pages/contact');
});

// get anything that hasn't already been matched
app.use('*', (req, res) => {
	// send a response with status 404
	res.status(404).send('page not found');
});


app.use('*', (error, req, res) => {
	console.log('this is error', error);
	res.locals.error = error;
	res.render('pages/error');
});


// tell the app where to serve
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

module.exports = app;
