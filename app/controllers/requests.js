/**
 * Request controller
 * Created by Ashok on 4/30/2014.
 */
manager = require('./../models/request');

exports.getRequestsNew = function(req,res){
	var callback=function(err, obj)
	{
		if(err)
		{
			res.send(err);
		}
		console.warn(obj);
		res.render('requests/list', { title: 'All Requests', requests:obj});
	};
	manager.findRequestsNew(callback);
};

exports.getRequestsOld = function(req,res){
	var callback=function(err, obj)
	{
		if(err)
		{
			res.send(err);
		}
		console.warn(obj);
		res.render('requests/list', { title: 'All Requests', requests:obj});
	};
	manager.findRequestsApproved(callback);
};

exports.getRequestById = function(req,res){
	var id=req.param('id');
	var callback=function(err,obj){
		if(err)
		{
			console.log(err);
		}
		res.render('requests/view',{title:'Request Details',request:obj});
	};
	manager.findRequestById(id,callback);
};

exports.createRequestPage = function(req,res){

	res.render('requests/create', { title: 'New Request' });
};

exports.createRequest = function(req,res){
		var newRecord = {
			title : req.param('title'),
			location :req.param('location'),
			created_by : req.user._id
		};
		var callback = function(obj){
			res.redirect('/requests');
		};
		manager.createRequest(newRecord,callback);
};

exports.listRequests = function(req,res){
	var callback=function(err, obj)
	{
		if(err)
		{
			res.send(err);
		}
		for (var i = 0, name = [], len = obj.length; i < len; ++i) {
			name[i] = obj[i].title;
		}
		res.send(name);
	};
	manager.findRequests(callback);
};

exports.editRequestPage = function(req,res){
	var id=req.param('id');
	var callback=function(err,obj){
		if(err){
			console.error(err)
		}
		res.render('requests/edit',{title:'Edit Request Details',request:obj});
	};
	manager.findRequestById(id,callback);
};

exports.editRequest = function(req,res){
	var id=req.param('id');

	var updateRecord = {
		title : req.param('title'),
		location :req.param('location')
	};
	var callback = function(obj){
		res.redirect( '/requests',301 );
	};
	manager.updateRequest(id,updateRecord,callback);
};

exports.createResponseForRequest = function(req,res){
	var response = {
		amount : req.param('amount'),
		eta :req.param('eta'),
		created_by : req.user._id
	};
	var request = req.param('id');
	var responseCallback = function(obj){

	res.redirect( '/requests/'+obj._id,301 );
	};
	manager.addResponse(request, response, responseCallback);
};


exports.getResponseForm = function(req, res){
	res.render('responses/create', { title: 'New Response' });
};
exports.approveResponse = function(req,res){

	var approveCallback = function(obj){

	res.redirect( '/requests/'+obj._id,301 );
	};
	var request = req.param('id');
	var list = req.param('list');
	manager.approveResponse(request, list,approveCallback)

};