/**
 * Request Model
 * Created by Ashok on 4/30/2014.
 */
mongoose = require("mongoose");
var _ = require("underscore")
Schema = mongoose.Schema;

var RequestSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	location: {
		type: String,
		default: '',
		trim: true
	},
	request_type: {
		type: String
	},
	created_by: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	approved: {
		type: Boolean,
		default: false
	},
	response: [{
		created: {
			type: Date,
			default: Date.now
		},
		eta: {
			type: Date
		},
		amount: {
			type: String,
			default: '',
			trim: true
		},
		approved: {
			type: Boolean,
			default: false
		},
		created_by: {
			type: Schema.ObjectId,
			ref: 'User'
		}
	}]
});
var Request = mongoose.model('Request', RequestSchema);

exports.findRequestById = function(requestId, user,callback){
	if(user.role == "client"){
		Request.findOne({_id:requestId}).populate('response.created_by', 'profile.name').exec(function(err, obj){

			if (err){
				callback(err.message);
				console.error(err);
			}
			else{
				var response = obj.response;

				obj.response = response.filter(function(resp){
					return resp.created_by._id.toString() == user._id.toString()
				});
				callback(null,obj)
			}
		});
	}
//	if(user.role == "admin"){
//	}
//	if(user.role == "business"){
//	}
	else{
		Request.findOne({_id:requestId}).populate('response.created_by', 'profile.name').exec(function(err, obj){

			if (err){
				callback(err.message);
				console.error(err);
			}
			else{
				callback(null,obj)
			}
		});
	}

};


exports.createRequest = function(record, callback){
	Request.create(record, function(err, obj){
		if (err){
			callback(err.message);
			console.error(err);
		}else{
			callback(null, obj);
		}
	})
};

exports.findRequestsNew = function(user, callback){
	if(user.role == "business") {
		Request.find({ approved: false, created_by:user._id}).populate('created_by', 'profile.name').exec(function (err, obj) {
			if (err) {
				callback(err);
			}
			else {
				callback(null, obj);
			}
		})
	}
	else{

		Request.find({ approved: false}).populate('created_by', 'profile.name').exec(function (err, obj) {
			if (err) {
				callback(err);
			}
			else {
				callback(null, obj);
			}
		})
	}
};
exports.findRequestsAll = function(callback){
	Request.find().populate('created_by','profile.name').exec(function(err, obj) {
		if (err)
		{
			callback(err);
		}
		else
		{
			callback(null, obj);
		}
	})
};
exports.findRequestsApproved = function(user,callback){
	if(user.role == "business") {
		console.log(user._id);
		Request.find({ approved: true,created_by:user._id}).populate('created_by response.created_by','profile.name profile.name').exec(function(err, obj) {
			if (err)
			{
				callback(err);
			}
			else
			{
				callback(null, obj);
			}
		})
	}
	else {
		Request.find({ approved: true}).populate('created_by response.created_by', 'profile.name profile.name').exec(function (err, obj) {
			if (err) {
				callback(err);
			}
			else {
				callback(null, obj);
			}
		})
	}
};

exports.updateRequest=function(requestId,request,callback){
	Request.update({_id: requestId}, {$set:request},function(err, obj){
		if(err)
		{
			console.error(err);
			callback( 'Error while updating the record', true);
		}
		else
			callback(obj);
	});
};

exports.destroyRequest=function(requestId,callback){
	Request.delete({_id: requestId},function(err, obj){
		if(err)
		{
			console.error(err);
			callback( 'Error while deleting the record', true);
		}
		else
			callback(obj);
	});
};

exports.addResponse = function(request, response, callback){
Request.findById(request,function(err,obj){
	obj.response.push(response);
	obj.save(function (err,obj) {
		if(err)
		{
			console.error(err);
			callback( 'Error while updating the record', true);
		}
		else
			callback(obj);
	});
})
};


exports.approveResponse = function(request, list, callback){
Request.findById(request,function(err,obj){
	if(obj.approved || list > obj.response.length-1){
		console.error("User trying to Click invalid link");
		return callback(null, "User trying to Click invalid link")
	}
	obj.approved = true;
	obj.response[list].approved = true;
	obj.save(function (err,obj) {
		if(err)
		{
			callback( 'Error while updating the record', true);
		}
		else
			callback(obj);
	});
})
};

exports.createNotifications = function(user,callback){
	if(user.role == "client"){
		Request.find({approved:false},null,{sort:{created: 1}}).populate('created_by','._id profile.name').exec(function(err,obj){
			callback(err,obj)
		})
	}
	else if(user.role == "business"){
		Request.find({approved:false,created_by:user._id },null,{sort:{created: 1}}).populate('created_by response.created_by','profile.name profile.name').exec(function(err,obj){
			callback(err,obj)
		})
	}
	else{
		callback(null,null)
	}

};