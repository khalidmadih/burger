// require modules and file necessary for routing
var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

// adding '/' endpoint that redirects to the /index route
router.get('/', function (req, res) {
	res.redirect('/index');
});

// adding an '/index/' endpoint that gets all the burgers and passing them
// as an object for handlebars to use
router.get('/index', function (req, res) {
	burger.selectAll(function (data) {
		var hbsObject = { burgers: data };
		console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

// adding a '/burgers/insertOne' endpoint that posts the burger name the user entered 
router.post('/burgers/insertOne', function (req, res) {
	burger.insertOne(['burger_name', 'devoured'], [req.body.name, false], function () {
		res.redirect('/index');
	});
});

// adding a '/burgers/updateOne/:id' route that updates  the status of the burger
router.put('/burgers/updateOne/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;
	console.log('condition', condition);

	burger.updateOne({ devoured: req.body.devoured }, condition, function () {
		res.redirect('/index');
	});
});

// exporting the router 
module.exports = router;