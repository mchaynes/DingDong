/**
 * @description Server for the application; Uses express
 ******************************************************************************/

var express = require('express');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();

app.use(bodyParser());

app.get('/api/whowas', function(req, res) {

});

app.get('/api/whois', function(req, res) {
});

app.post('/api/whenwas', function(req, res) {

});

app.post('/api/add',function(req, res) {
  var exec = require('child_process').exec;
  var child = exec('java -cp ./src/java/CamWork', {cwd: './'}, function(err, stdout, stderr) {
    var result = stdout;
  });
})


app.listen(process.env.PORT || 8000);
