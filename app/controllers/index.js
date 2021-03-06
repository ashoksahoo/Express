var User = require('./../models/user');
var reqManager = require('./../models/request');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	_ = require('underscore');

exports.getAngularTemplate = function(req,res){
	var module, templateFolder, templateName;
//	templateFolder = '';
	module = req.params.module;
	templateName = req.params.name;
	if (module) {
		templateName = module + '/' + templateName;
	}
//	templateName = templateFolder + templateName;
	return res.render(templateName, {
		layout: false
	});
};


passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if (err) { return done(err); }
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}
));
exports.getUserProfilePage = function(req, res) {
	res.render('profile/profile', {
		user : req.user,
		title: "Profile"
		 // get the user out of session and pass to template
	});
};
exports.editUserProfilePage = function(req, res) {
	res.render('profile/editprofile', {
		user : req.user,
		title: 'Edit Profile'
		 // get the user out of session and pass to template
	});
};
exports.editUserProfile = function(req, res) {
	var id=req.user._id;

	var updateRecord = {
		name :req.param('name'),
		card :req.param('card'),
		phone :req.param('phone'),
		location :req.param('location'),
		type :req.param('type'),
		contact :req.param('contact'),
		details :req.param('details'),
		timings :req.param('timings'),
		account :req.param('account')
	};
	var callback = function(obj){
		res.redirect( '/profile',301 );
	};
	User.findById(id,function(err,obj){
		obj.profile = updateRecord;
		obj.save(function(err,obj){
			if(err){
				console.error(err);
			}
			callback(obj);
		});
	});
};

exports.logoutUser = function(req, res) {
	req.logout();
	res.redirect('/profile', 301);
};

exports.getNotificationPage = function (req,res){
	var callback = function(err,obj) {
		if (req.user.role == "client") {
			res.render('notification', {title: "Notification", user: req.user, notifications: obj,len:obj.length })
		}
		else if (req.user.role == "business") {
			var notifications = [];
			_.map(obj, function (request) {
				notifications.push(request.response)
			});
			notifications = _.flatten(notifications);
//			res.send(obj);
			res.render('notification', {title: "Notification", user: req.user, notifications: obj,len:notifications.length })
		}else{

		}
	};
	reqManager.createNotifications(req.user, callback)
};

