/**
 * @description Server for the application; Uses express
 ******************************************************************************/

var express = require('express');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var http = require('http');
var exec = require('child_process').exec;

var app = express();

app.use(bodyParser());

app.get('/api/whowas', function(req, res) {
});

app.get('/api/whois', function(req, res) {
  takePicture((result) => {
    res.send(result);
  });
});

app.post('/api/whenwas', function(req, res) {

});

app.post('/api/add',function(req, res) {
  takePicture((result) => {
    res.send(result);
  });
});

function takePicture(callback) {
  var child = exec('java -cp ./src/java/ CamWork', {cwd: './'}, function(err, stdout, stderr) {
    callback(stdout);
  });
}

app.listen(process.env.PORT || 8000);
