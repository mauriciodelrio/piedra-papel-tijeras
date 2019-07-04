var express = require('express');
var cors = require('cors');
var hsts = require('hsts')
var sslRedirect = require('heroku-ssl-redirect');
var rateLimit = require("express-rate-limit");
var helmet = require('helmet')
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

var app      = express();
var http     = require('http');
var server   = http.createServer(app);

//Import the mongoose module
var mongoose = require('mongoose');
//Set up default mongoose connection
var mongoDB = (process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/db_desafio');
console.log('Connecting to: ' + mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true });
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

if( process.env.NODE_ENV === 'production' ){

  // Use helmet
  app.use(helmet())

  // Enable CORS
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8080', 
  ];
  app.use(cors({
    origin: function(origin, callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true // This is required so OPTIONS requests are resolved
  }))
  // Enable HTTP -> HTTPS on production ENVs
  app.use(sslRedirect())
  // Enable HTTP Strict Transport Security
  app.use(hsts({
    maxAge: 15552000  // 180 days in seconds
  })) 
  // apply to all requests
  app.use(limiter);
}else{ // Development
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials:  true
  }));
}
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Import Routes
var users      = require('./routes/users');
var game       = require('./routes/game');

// Use routes
app.use('/users', users);
app.use('/game', game);

// Default
app.get('*', function(req, res, next) {
  res.sendFile(__dirname + '/public/index.html')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});


// LAUNCH THE APP
var port     = process.env.PORT || 8080;
server.listen(port, function(){
  console.log('Current NODE_ENV: ' + process.env.NODE_ENV);
  console.log('The magic happens on port ' + port);
});

module.exports = app;
