// const express = require('express');
// const routes = express.Router();
// const session = require('express-session');
// const User = require('./models/user');
// // const env = require('dotenv').load();
// const expressValidator = require('express-validator');
// const passport = require('passport');

// // middleware function to check for logged-in users
// const sessionChecker = (req, res, next) => {
//     if (req.session.user && req.cookies.user_sid) {
//         res.redirect('/dashboard');
//     } else {
//         next();
//     }
// };

// // route for user signup
// routes.route('/signup')
//     .get(sessionChecker, (req, res) => {
//         res.render('pages/signup');
//     })
//     .post((req, res) => {
//         if (!req.body.username || !req.body.email || !req.body.password) {
//           return res.status(400).send('Missing username or password');
//         } else {
//           User.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password
//         })
//         .then(user => {
//             req.session.user = user.dataValues;
//             console.log(req.session.user);
//             res.redirect('/dashboard');
//         })
//         .catch(error => {
//             res.redirect('/signup');
//         })};
//     });



// module.exports = routes;
