
//Adding modules and Dependencies
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

// Creating an instance of the express app.
var app = express();

// setting the PORT
var PORT = process.env.PORT || 3000;

// Adding express middleware for serving static files
app.use(express.static(__dirname + '/public'));

/// bodyparsers 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

// override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'));

// Setting Handlebars as the default templating engine.
var exphbs = require('express-handlebars');
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// importing the routes
var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

// Initiating the listener with a console log.
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
