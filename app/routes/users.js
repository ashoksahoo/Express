var express = require('express');
var users = express.Router();
var controller = require('../controllers/users')
var path;
path = require('path');
/* GET users listing. */
users.get('/', function(req, res) {
	res.send('respond with a resource');
users.get('/register', controller.signupPage);
users.post('/register', controller.signupUser);
users.post('/api/register', controller.createUser);
users.post('/api/forgot-password', controller.forgotPassword);
users.get('/retrieve-password/:id', controller.openResetLink);
users.post('/api/logout', controller.logoutUser);
users.post('/api/change-password', isLoggedInUser, controller.changePassword);
users.post('/api/change-password/:id', controller.changePassword);
});



module.exports = users;


module.exports = function(app, passport) {
	var controller, isLoggedInUser;
	controller = require('./controller');
	isLoggedInUser = require('../../../config/role_moderator').isLoggedInUser;
	app.get('/', function(req, res) {
		if (req.session && req.session.user) {
			return res.redirect('/dashboard');
		} else {
			return res.redirect('/store/login');
		}
	});

	return require('./passport_router')(app, passport);
};