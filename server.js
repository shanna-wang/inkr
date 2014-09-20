// server.js

// BASE SETUP
// =============================================================================

// add references to models
var User     = require('./app/models/user');
var Comic     = require('./app/models/comic');
var Strip     = require('./app/models/strip');

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'jade');
var port = process.env.PORT || 80; 		// set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	console.log("it works");
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

// more routes for our API will happen here

// routing to users
router.route('/api/users')

	// create users
	.post(function(req, res) {
		console.dir(req);	
		var user = new User(); 		// create a new instance of the Bear model
		user.username = req.body.username;  // set the bears name (comes from the request)
		user.password = req.body.password;
		user.email = req.body.email;
		user.description = req.body.description;
		user.subscriptions = req.body.subscriptions;
		user.favourites = req.body.favourites;


		//save the bear and check for errors
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'User created!' });
		})
		
	 })

	// get users
	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
		});
	});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);