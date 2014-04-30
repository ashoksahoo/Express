/**
 * Request router
 * */

var express = require('express');
var requests = express.Router();
var path;
var controller  = require('../controllers/requests');
path = require('path');
/* GET Posts listing. */
requests.get('/', controller.getRequests);
requests.get('/new', controller.createRequestPage);
requests.get('/:id', controller.getRequestById);
requests.post('/new', controller.createRequest);
requests.get('/edit/:id', controller.editRequestPage);
requests.post('/edit/:id', controller.editRequest);



module.exports = requests;
