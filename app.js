const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog'); //Import routes for "catalog" area of site

const app = express();

// Set up default mongoose connection
const mongoDB =
  'mongodb+srv://awa-local-library:aJ73WzW*L8Nd1F@cluster0.omkirdt.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to erro event (to get notif of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// mongodb+srv://awa-local-library:aJ73WzW*L8Nd1F@cluster0.omkirdt.mongodb.net/?retryWrites=true&w=majority
// Set up default mongoose connection
// const mongoDB = 'mongodb+srv://awa-local-library:aJ73WzW*L8Nd1F@cluster0.omkirdt.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// // Get the default connection
// const db = mongoose.connection;

// // Bind connection to erro event (to get notif of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error'));

// // const Schema = mongoose.Scheema;

// // const SomeModelSchema = new Schema({
// //   name: String,
// //   binary: Buffer,
// //   living: Boolean,
// //   updated: { type: Date, default: Date.now() },
// //   age: { type: Number, min: 18, max: 65, required: true },
// //   mixed: Schema.Types.Mixed,
// //   _someId: Schema.Types.ObjectId,
// //   array: [],
// //   ofString: [String], // You can also have an array of each of the other types too.
// //   nested: { stuff: { type: String, lowercase: true, trim: true } },
// // });
