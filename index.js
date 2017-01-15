/**
 * @description Server for the application; Uses express
 ******************************************************************************/

var express = require('express');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var http = require('http');
var exec = require('child_process').exec;
//Connects to Oxford API
var oxford = require('project-oxford');
client = new oxford.Client('f4d97dc46d7644f8ab6c401711ac5287'); //String is API Key
var app = express();
var SITE_URL = "http://dingdong.localtunnel.me/";

var faceListID = 'list';
var personGroup = 'person_group'
app.use(bodyParser());
app.use(express.static('public'));

app.get('/api/whowas', function(req, res) {

});

app.get('/api/whois', function(req, res) {
  takePicture((result) => {
    client.face.detect({url: result, returnFaceId: true}).then((data) => {
      client.face.identify([data[0].faceId], personGroup, 5).then((data) => {
        res.send(data);
      }).catch((err) => {
        res.send(err.message);
      });
    }).catch((err) => {
      res.send(err.message);
    });
  });
});

app.post('/api/whenwas', function(req, res) {

});

app.post('/api/add',function(req, res) {
  var image_path;
  //LOOK AT THIS IAN. MAKE SURE YOU FUCKING REQUEST CORRECTLY.
  var name = req.body.name;
  takePicture(addPerson);
  function addPerson(imagePath) {
    client.face.person.create(personGroup, name, Date.now()).then(response => {
        client.face.person.addFace(groupID, response.personId, {url:imagePath}).then(response => {
          console.log("IT ACTUALLY WORKED");
          console.log(response);
        }).catch(err => {
          console.log("FAILED");
          console.log(err);
        });

    });
  }
});
function getNewPicture() {
  takePicture(function(response) {
    
  });
}
setInterval(getNewPicture, 10000);

function takePicture(callback) {
  var child = exec('java -cp ./src/java/ CamWork', {cwd: './'}, function(err, stdout, stderr) {
    callback(SITE_URL + stdout);
  });
}

app.listen(process.env.PORT || 8000);
