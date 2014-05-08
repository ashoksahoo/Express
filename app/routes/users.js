var express = require('express');
var users = express.Router();
var controller = require('../controllers/users')
var path;
path = require('path');
/* GET users listing. */
users.get('/', isLoggedIn,	controller.listUserPage);
users.get('/create', isLoggedIn,	controller.createUserPage);

//users.post('/api/register', controller.createUser);
//users.post('/api/forgot-password', controller.forgotPassword);
//users.get('/retrieve-password/:id', controller.openResetLink);
//users.post('/api/logout', controller.logoutUser);
//users.post('/api/change-password', isLoggedInUser, controller.changePassword);
//users.post('/api/change-password/:id', controller.changePassword);

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}



module.exports = users;


