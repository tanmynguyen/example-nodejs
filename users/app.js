//var FileStreamRotator = require('file-stream-rotator')
var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var uuid = require('node-uuid');

var index = require('./routes/index');
var users = require('./custom_modules/users/index');


//logger.token('id', function getId(req) {
//  return req.id
//})

var app = express();

//logger

//var logDirectory = __dirname + '/logs';

// create a rotating write stream
//var accessLogStream = fs.createWriteStream(logDirectory + '/access.log', {flags: 'a'})
//var accessLogStream = FileStreamRotator.getStream({
//  filename: logDirectory + '/access-%DATE%.log',
//  frequency: 'daily',
//  verbose: false
//})

//function assignId(req, res, next) {
//  req.id = uuid.v1();
//  next();
//}

//app.use(assignId);
app.use(logger(':remote-addr method[:method] url[:url] res_time[:response-time ms] date[:date[iso]]'));
//app.use(logger('short'));
//app.use(logger('combined', {stream: accessLogStream}));

// view engine setup
app.set('view cache', true);
app.set('x-powered-by', false);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); --> include favicon
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // include dir public

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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
