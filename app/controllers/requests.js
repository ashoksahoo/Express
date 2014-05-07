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
		res.render('requests/list', { title: 'Recent Requests', requests:obj, user: req.user});
	};
	manager.findRequestsNew(req.user, callback);
};

exports.getRequestsOld = function(req,res){
	var callback=function(err, obj)
	{
		if(err)
		{
			res.send(err);
		}
		res.render('requests/list', { title: 'Approved Requests', requests:obj, user: req.user});
	};
	manager.findRequestsApproved(callback);
};

exports.getRequestById = function(req,res){
	var id=req.param('id');
	var callback=function(err,obj){
		if(err)
		{
			res.status(404);
			res.render("404");
		}
		else
		res.render('requests/view',{title:'Request Details',request:obj, user: req.user});
	};
	manager.findRequestById(id,req.user, callback);
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
		var callback = function(err,obj){
			if(err){
				res.status(404);
				res.render("404");
			}
			res.redirect('/requests/recent');
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
		res.send(obj);
	};
	manager.findRequestsAll(callback);
};

exports.editRequestPage = function(req,res){
	var id=req.param('id');
	var callback=function(err,obj){
		if(err){
			console.error(err)
		}
		res.render('requests/edit',{title:'Edit Request Details',request:obj, user: req.user});
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
		res.redirect( '/requests/recent',301 );
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

	var approveCallback = function(obj, err){
	if(err){
		res.status(405);
		res.render("404");
	}
	if(obj)
	res.redirect( '/requests/'+obj._id,301 );
	};
	var request = req.param('id');
	var list = req.param('list');
	manager.approveResponse(request, list,approveCallback)

};