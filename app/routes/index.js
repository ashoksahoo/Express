var express = require('express');
var controller = require('../controllers/index');
var passport = require('passport');
var router = express.Router();

	router.get('/',isLoggedIn, function(req, res) {
	  res.render('index', { title: 'Dashboard', user: req.user });
	});

	router.get('/login', function(req, res) {
		if (req.isAuthenticated())
			res.redirect('/profile');
		res.render('profile/login', { message: req.flash('loginMessage')} );
	});
	router.get('/register', function(req, res) {
		if (req.isAuthenticated())
			res.redirect('/profile');
		res.render('profile/register');
	});

	router.post('/login', passport.authenticate('local-login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true
		}));

	router.post('/register', passport.authenticate('local-register', {
		successRedirect : '/profile/edit',
		failureRedirect : '/register',
		failureFlash : true
	}));

	router.get('/logout', controller.logoutUser);


	router.get('/profile', 	isLoggedIn, controller.getUserProfilePage);
	router.get('/profile/edit', 	isLoggedIn, controller.editUserProfilePage);
	router.post('/profile/edit', 	isLoggedIn, controller.editUserProfile);


	router.get('/notifications', isLoggedIn, controller.getNotificationPage);

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/login');
	}

module.exports = router;
