var User = require('./../models/user');
var reqManager = require('./../models/request');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	_ = require('underscore');

exports.listUserPage = function(req,res){
	User.find({},'role profile local.email').exec(function(err,obj){
		if(err){
			console.error(err)
		}
		if(req.user.role == "admin")
		res.render('users/list', {title: "Users List", user: req.user, users:obj})
		else
		res.render('404',{user : req.user});

	})

};
exports.createUserPage = function(req,res){
	if(req.user.role == "admin")
	res.render('users/create', {title: "New User", user: req.user})
	else
	res.render('404',{user : req.user});
};

