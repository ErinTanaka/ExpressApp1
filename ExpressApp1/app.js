'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var mssql = require('mssql');
var morgan = require('morgan');


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'somerandonstuffs'}));
// Authentication and Authorization Middleware
//var auth = function (req, res, next) {
//    if (req.session && req.session.user === "amy" && req.session.admin)
//        return next();
//    else
//        return res.sendStatus(401);
//};
//app.use((req, res, next) => {
//    if (req.cookies.user_sid && !req.session.user) {
//        res.clearCookie('user_sid');
//    }
//    next();
//});

//app.use('/', routes);
app.all('/', routes);
app.use('/users', users);

app.use('/login', require('./public/javascripts/login.js'));
app.use('/signup', require('./public/javascripts/signup.js'));
app.use('/welcome', require('./public/javascripts/welcome.js'));
app.use('/networkaccess', require('./public/javascripts/networkaccess.js'));
app.use('/admin', require('./public/javascripts/admin'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
