// import express from our dependencies
const express = require('express');
// initialize the app
const app = express();
const projeRoutes = require('./routes/projeroutes');
const bodyParser = require('body-parser');
//configure the logger: (some other loggers are winston, bunyan,)
const logger = require('morgan');
//telling which logger to use.
const ejs = require('ejs');
const path = require('path');

// set the port, either from an environmental variable or manually
const port = process.env.PORT || 3000;

/* Views */
app.set('view engine', 'ejs');

app.use(logger('dev'));
// parse incoming data
/* we'll be reading the form body, but not accepting files,
or anything more than text*/
app.use( bodyParser.urlencoded({ extended: false }));
/* we'll also be accepting and parsing json  */
app.use(bodyParser.json());

// Setting up the app to sent back an actual index page.
app.use(express.static('public'));


// below the index route
app.use('/projeler', projeRoutes);

// home route
app.get('/', (req,res) => res.render('pages/home', {data: pageTitle}));

// static route to public
// This sets a folder called public to be the destination from which any static assets (images,css,etc) will be served.
app.use( express.static( path.join( __dirname, 'public' )));


// get anything that hasn't already been matched
app.use('*', (req, res) => {
    // send a response with status 404
    res.status(404).send(err);
});



// tell the app where to serve
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
