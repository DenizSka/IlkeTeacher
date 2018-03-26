// import express from our dependencies
const express = require('express');
// initialize the app
const app = express();
const projeRoutes = require('./routes/projeroutes');
const bodyParser = require('body-parser');
//configure the logger: (some other loggers are winston, bunyan,)
const logger = require('morgan');
const ejs = require('ejs');
const path = require('path');

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

// static route to public
app.use(express.static('public'));
// This sets a folder called public to be the destination from which any static assets (images,css,etc) will be served.
app.use( '/static', express.static( path.join( __dirname, 'public' )));


// below the index route
app.use('/', projeRoutes);


// get anything that hasn't already been matched
app.use('*', (req, res) => {
    // send a response with status 404
    res.status(404).send('page not found');
});



// tell the app where to serve
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
