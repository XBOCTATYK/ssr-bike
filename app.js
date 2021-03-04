const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('babel-polyfill');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const indexPageRoute = require('./routes/page/index');
const gameListRoute = require('./routes/api/game-list');
const assetsRoute = require('./routes/assets/assets');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages', indexPageRoute);
app.use('/api/game-list', gameListRoute);
app.use('/assets', assetsRoute);

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
  res.render('error');
});

module.exports = app;



// Connection URL
const url = 'mongodb://localhost:27017?poolSize=10&writeConcern=majority';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Use connect method to connect to the Server

const DEFAULT_CONFIG = {
  maxCount: 2
}

client.connect().then(async function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  const config = await db.collection('config').findOne({ _id: 'main' });

  if (!config) {
      await db.collection('config').insertOne({ _id: 'main', ...DEFAULT_CONFIG })
  }

  await client.close();
});

app.listen(3000);
