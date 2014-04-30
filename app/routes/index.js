var express = require('express');
var controller = require('../controllers/index')
var passport = require('passport');
var router = express.Router();

/* GET home page. */
	router.get('/', function(req, res) {
	  res.render('index', { title: 'Express' });
	});

//	router.get('/tpl/:module/:name',controller.getAngularTemplate);
//	router.get('/tpl/:name',controller.getAngularTemplate);

	router.get('/login', function(req, res) {
		res.render('login');
	});
	router.get('/register', function(req, res) {
		res.render('register');
	});

	router.post('/login', passport.authenticate('local', { successRedirect: '/',
		failureRedirect: '/login' }));

	router.post('/register', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/register' // redirect back to the signup page if there is an error
	}));


router.get('/profile', controller.getUserProfilePage);

module.exports = router;
