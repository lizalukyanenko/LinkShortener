var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const hjs = require('hogan-express');
const i18n = require("i18n-express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('./config');

//database
mongoose.connect('mongodb://localhost:27017/LinkShortener');
mongoose.promise = global.Promise;
fs.readdirSync(path.join(__dirname, '/models')).forEach((
	filename) => {
	require(path.join(__dirname, '/models/', filename));
});

const index = require('./routes/index');
const address = require('./routes/address');
const user = require('./routes/user');

var app = express();

//sessions
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// view engine setup
app.engine('hjs', hjs);
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(i18n({
  translationsPath: path.join(__dirname, 'i18n'),
  siteLangs: ['en', 'ru'],
  textsVarName: 'texts',
}));

app.use('/', index);
app.use('/address', address);
app.use('/user', user);

//routes
app.get('/', (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  res.render('index', {
    user: {
      id,
      login
    }
  });
});

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