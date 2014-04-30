var express = require('express');
var posts = express.Router();
var path;
var controller  = require('../controllers/requests')
path = require('path');
/* GET Posts listing. */
posts.get('/', function(req, res) {
	res.send('respond with a post');
});



module.exports = posts;
