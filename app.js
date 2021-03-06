const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const debug = require('debug')(`m2-0118-passport-auth:${path.basename(__filename).split('.')[0]}`)
const passportConfig = require('./passport')
const expressLayouts = require('express-ejs-layouts');
const {dbURL} = require('./config');
const nodemailer = require('nodemailer')

mongoose.connect(dbURL)
        .then(() => debug(`Connected to ${dbURL}`))
        .catch(e => console.log(e))

const index = require('./routes/index');
const auth = require('./routes/auth');
const profile = require('./routes/profile');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main-layout');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));
passportConfig(app);

app.use((req,res,next) => {
  res.locals.user = req.user;
  res.locals.title = 'Offensity';
  next();
}) 

app.use('/', index);
app.use('/', profile);
app.use('/', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
