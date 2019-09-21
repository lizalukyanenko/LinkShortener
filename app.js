var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const hjs = require('hogan-express');

mongoose.connect('mongodb://localhost:27017/LinkShortener');
mongoose.promise = global.Promise;
fs.readdirSync(path.join(__dirname, '/models')).forEach((
	filename) => {
	require(path.join(__dirname, '/models/', filename));
});

const index = require('./routes/index');
const address = require('./routes/address');

var app = express();

// view engine setup
app.engine('hjs', hjs);
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/address', address);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{
    message: err.message,
    status: err.status,
  });
});

module.exports = app;