var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/express-dev');
var mongoStore = require('connect-mongo')({session: session});
var app = express();

var routes = require('./app/routes/index');
var users = require('./app/routes/users');
var requests = require('./app/routes/requests');

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
	secret: 'boostrap-node is awesome',
	key: 'SID',
	store: new mongoStore({
		url: 'mongodb://localhost/express-dev',
		collection: 'sessions'
	}),
	cookie: {
		path: '/',
		httpOnly: true,
		expires: (1000 * 60 * 60 )
	}
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/', routes);
app.use('/users', users);
app.use('/requests', requests);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
