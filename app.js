var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '103017060410392';
var FACEBOOK_APP_SECRET = 'e38de1b6cfa8fc433df6a005277bf1eb';

var routes = require('./routes/index');
var users = require('./routes/users');
var hello = require('./routes/hello');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
)); 

// connect to MongoDB server and provide the collection schema
app.use(function(req, res, next) {
  if (typeof app.db !== 'undefined')
    next();

  mongoose.connect('mongodb://test:123456@ds151242.mlab.com:51242/vcard');
  var db = mongoose.connection;

  var userSchema = mongoose.Schema({
      Name: String,
      Phone: String,
      Email: String,
      Address: String,
      Age: Number
  });

  db.once('open', function callback () {
    console.log('MongoDB: connected.');

    app.db = {
      model: {
        User: mongoose.model('User', userSchema)
      }
    };

    next();
  });
});

app.use('/', routes);
app.get('/login',
  passport.authenticate('facebook', { failureRedirect: '/login/fail' }),
  function(req, res, next) {
    res.redirect('/');
});
app.use('/users', function(req, res, next) {
  if (req.isAuthenticated())
    next();
  res.redirect('/login');
});
app.use('/users', users);
app.use('/jollen', hello);

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