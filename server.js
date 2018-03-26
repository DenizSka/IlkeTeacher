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
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// set the port, either from an environmental variable or manually
const port = process.env.PORT || 3000;

/* Views */
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static('public'));
// parse incoming data
/* we'll be reading the form body, but not accepting files,
or anything more than text*/
app.use( bodyParser.urlencoded({ extended: true }));
/* we'll also be accepting and parsing json  */
app.use(bodyParser.json());

// static route to public
// This sets a folder called public to be the destination from which any static assets (images,css,etc) will be served.
app.use( '/static', express.static( path.join( __dirname, 'public' )));


// below the index route
app.use('/projeler', projeRoutes);

// home route
app.get('/', (req,res) => res.render('pages/home', {data: 'Hello'}));


// get anything that hasn't already been matched
app.use('*', (req, res) => {
    // send a response with status 404
    res.status(404).send('page not found');
});



// tell the app where to serve
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
