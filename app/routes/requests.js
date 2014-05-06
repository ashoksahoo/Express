/**
 * Request router
 * */

var express = require('express');
var requests = express.Router();
var path;
var controller  = require('../controllers/requests');
path = require('path');
/* GET Posts listing. */
requests.get('/approved', isLoggedIn, controller.getRequestsOld);
requests.get('/recent', isLoggedIn, controller.getRequestsNew);
requests.get('/list', isLoggedIn, controller.listRequests);
requests.get('/new', isLoggedIn, controller.createRequestPage);
requests.get('/:id', isLoggedIn, controller.getRequestById);
requests.post('/new', isLoggedIn, controller.createRequest);
requests.get('/edit/:id', isLoggedIn, controller.editRequestPage);
requests.post('/edit/:id', isLoggedIn, controller.editRequest);
requests.get('/:id/response', isLoggedIn, controller.getResponseForm);
requests.post('/:id/response', isLoggedIn, controller.createResponseForRequest);
requests.get('/:id/approve/:list', isLoggedIn, controller.approveResponse);


module.exports = requests;

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}