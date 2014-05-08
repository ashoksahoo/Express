var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

	local            : {
		email        : String,
		password     : String
	},
	active: {
		type: Boolean,
		default: true
	},
	profile 		: {
		name 		: {
			type: String,
			default: '',
			trim: true
		},
		card 		: {
			type: String,
			default: '',
			trim: true
		},
		phone 		: {
			type: String,
			default: '',
			trim: true
		},
		location 	: {
			type: String,
			default: '',
			trim: true
		},
		type 		: {
			type: String,
			default: '',
			trim: true
		},
		contact 	: {
			type: String,
			default: '',
			trim: true
		},
		details 	: {
			type: String,
			default: '',
			trim: true
		},
		timings 	: {
			type: String,
			default: '',
			trim: true
		},
		account 	: {
			type: String,
			default: '',
			trim: true
		}
	},
	role : String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

