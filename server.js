var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src')));


// Run index.html file from public
app.get('/', function(request, response){
  response.sendfile("index.html")
});



/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
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

var config = {
  production: {
    baseUrl: "https://copia.herokuapp.com/",
    mongodbURL: "mongodb://schoolsystem:schoolsystem@ds015750.mlab.com:15750/schoolsystem"
  },
  development: {
    baseUrl: "http://localhost:3000/",
    //mongodbURL: "mongodb://localhost/scrubs"
    mongodbURL: "mongodb://localhost/schoolManagementSystem"
    //mongodbURL: "mongodb://scrubs:scrubs@ds061621.mongolab.com:61621/scrubs"
  }
};

process.env.NODE_ENV = process.env.NODE_ENV || "production";
 //process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log("Node Environment = " + process.env.NODE_ENV);

app.config = config[process.env.NODE_ENV];

//app.listen(3000, function () {
app.listen(process.env.NODE_ENV || 3000, function () {
  console.log('Example app listening on port 3000!')
});




module.exports = app;
