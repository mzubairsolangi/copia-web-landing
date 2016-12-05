/**
 * Created by Shahzad on 12/05/2016.
 */

//read http://webapplog.com/express-js-4-node-js-and-mongodb-rest-api-tutorial/

var express = require('express');
var app = express();

var port = process.env.PORT || 7000;

app.set('port', port);
app.use(express.static(__dirname + '/src'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//No Need of an extra API - the static server of express handle the '/' with the 'index.html' by default.
//app.get('/', function(req, res) {
//  res.sendFile( __dirname + '/dist/index.html');
//});

app.listen(port, function() {
  console.log('Copia Node app is running at localhost:' + port);
});
