var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

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
	res.render('user/profile', {
		user : req.user
		 // get the user out of session and pass to template
	});
};
exports.logoutUser = function(req, res) {
	req.logout();
	res.redirect('/');
};