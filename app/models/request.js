/**
 * Request Model
 * Created by Ashok on 4/30/2014.
 */
mongoose = require("mongoose");
Schema = mongoose.Schema;
var ObjectId = require('mongoose').Types.ObjectId;


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

exports.findRequestById = function(requestId,callback){
	Request.findOne({_id:requestId}).populate('response.created_by', 'profile.name').exec(function(err, obj){
		if (err){
			callback(err.message);
			console.error(err);
		}else{
			callback(null,obj)
		}
	});
};


exports.createRequest = function(record, callback){
	Request.create(record, function(err, obj){
		if (err){
			callback(err.message);
			console.error(err);
		}else{
			callback(obj);
		}
	})
};

exports.findRequestsNew = function(callback){
	Request.find({ approved: false} ).populate('created_by','profile.name').exec((function(err, obj) {
		if (err)
		{
			callback(err);
		}
		else
		{
			callback(null, obj);
		}
	}))
};
exports.findRequestsApproved = function(callback){
	Request.find({ approved: true} ).populate('created_by','profile.name').exec((function(err, obj) {
		if (err)
		{
			callback(err);
		}
		else
		{
			callback(null, obj);
		}
	}))
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
	obj.approved = true;
	obj.response[list].approved = true;
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
