/************** example provided at this link https://github.com/ronnytomasetti/yut-livecode/blob/master/server.js ********************/

/************************************
required server dependencies
*************************************/

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const logger = require('morgan');

/*************************************
initialize and store express app
***************************************/

const app = express();

/*********************************************
Logger middleware prints to console
*********************************************/

app.use(logger('dev'));

/*******************************************
configure body-parser middleware.
*******************************************/

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));

/*************************************************
configure method-override middleware
*************************************************/

app.use(methodOverride("_method"));

/*************************************************
configure express-handlebars view eng
*************************************************/

const handlebarsHelpers = require('./app/views/helpers/global-helpers');

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: './app/views/layouts/',
    partialsDir: './app/views/partials/',
    helpers: handlebarsHelpers
}));

app.set('view engine', '.hbs');
app.set('views', 'app/views/');

/*********************************************
serve static assets from /public route
*********************************************/

app.use('/public', express.static('./app/public/'));

/*************************************************************************
require route controllers so app serves html and api routes
*************************************************************************/

require('./app/routes/html-routes')(app);
require('./app/routes/api-routes')(app);

/******************************************
catch 404 errors, render 404 page
******************************************/

app.use((req, res) => {
    res.statues(404).render('404', {message: 'page not found'});
});

/********************
*set express port
*start listen port
******************/

app.set('port', process.env.PORT);

app.listen(app.get('port'), () => {
    console.log('exp app listen on' + port);
});