/**
 * @description Server for the application; Uses express
 ******************************************************************************/

var express = require('express');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var http = require('http');
//Connects to Oxford API
var oxford = require('project-oxford');
client = new oxford.Client('f4d97dc46d7644f8ab6c401711ac5287'); //String is API Key

var app = express();
var faceListID = 'list';
var personGroup = 'person_group'
app.use(bodyParser());

app.get('/api/whowas', function(req, res) {

});

app.get('/api/whois', function(req, res) {
});

app.post('/api/whenwas', function(req, res) {

});

app.post('/api/add',function(req, res) {
  var image_path;
  //LOOK AT THIS IAN. MAKE SURE YOU FUCKING REQUEST CORRECTLY.
  var name = req.body.name;
  function add_person(image_path) {
    client.face.person.create(personGroup, name, Date.now()).then(response => {
      client.face.person.addFace(groupID, response.personId, {path:image_path}).then(addedFace => {
      });
    });
  }
  var exec = require('child_process').exec;
  exec('java -cp ./src/java/CamWork', {cwd: './'}, function(err, stdout, stderr) {
    var image_path = stdout;
  });


});



app.listen(process.env.PORT || 8000);
