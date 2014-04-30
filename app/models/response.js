mongoose = require("mongoose");
Schema = mongoose.Schema;


var ResponseSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true
	},
	response_type: {
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
var Response = mongoose.model('Response', ResponseSchema);

exports.findResponsebyId =function(responseId,callback){
	Response.find({_id:responseId}, function(err, obj){
		if (err){
			callback(err.message);
			console.log(err);
		}else{
			callback(obj)
		}
	});
};


exports.createResponse = function(record, callback){
	Response.create(record, function(err, obj){
		if (err){
			callback(err.message);
			console.log(err);
		}else{
			callback(obj);
		}
	})
};

exports.findResponses=function(callback){
	Response.find().populate('user', 'name').exec((function(err, obj) {
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

exports.updateResponse=function(responseId,response,callback){
	Response.update({_id: responseId}, {$set:response},function(err, obj){
		if(err)
		{
			console.error(err);
			callback( 'Error while updating the company record', true);
		}
		else
			callback(obj);
	});
};

exports.destroyResponse=function(responseId,callback){
	Response.delete({_id: responseId},function(err, obj){
		if(err)
		{
			console.error(err);
			callback( 'Error while updating the company record', true);
		}
		else
			callback(obj);
	});
};