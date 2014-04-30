/**
 * Request Model
 * Created by Ashok on 4/30/2014.
 */
mongoose = require("mongoose");
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
	response: {
		type: Schema.ObjectId,
		ref: 'Response'
	}
});
var Request = mongoose.model('Request', RequestSchema);

exports.findRequestById =function(requestId,callback){
	Request.findOne({_id:requestId}, function(err, obj){
		if (err){
			callback(err.message);
			console.log(err);
		}else{
			callback(null,obj)
		}
	});
};


exports.createRequest = function(record, callback){
	Request.create(record, function(err, obj){
		if (err){
			callback(err.message);
			console.log(err);
		}else{
			callback(obj);
		}
	})
};

exports.findRequests=function(callback){
	Request.find().populate('user', 'name').exec((function(err, obj) {
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
			callback( 'Error while updating the company record', true);
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
			callback( 'Error while updating the company record', true);
		}
		else
			callback(obj);
	});
};