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
  whoIs((err, match) => {
    if (err) {
      res.send(err);
      return;
    }
    client.face.person.get(personGroup, match).then((response) => {
      res.send('A match for ' + response.name + ' has been found');
    }).catch((err) => {
      res.send(err.message);
    });
  })
});

app.post('/api/whenwas', function(req, res) {

});

app.post('/api/add',function(req, res) {
  var image_path;
  //LOOK AT THIS IAN. MAKE SURE YOU FUCKING REQUEST CORRECTLY.
  var name = req.body.name;
  takePicture(addPerson);
  function addPerson(imagePath) {
    client.face.person.create(personGroup, name, JSON.stringify('[' + new Date().getTime() + ']')).then(response => {
        client.face.person.addFace(personGroup, response.personId, {url:imagePath}).then(response => {
          client.face.personGroup.trainingStart(personGroup).then(() => {
            res.sendStatus(200);
          }).catch((err) => {
            console.log(err);
          });
        }).catch(err => {
          console.log("FAILED");
          console.log(err);
          res.sendStatus(400);
        });

    });
  }
});
function getNewPicture() {
  takePicture(function(response) {
    
  });
}
// setInterval(getNewPicture, 10000);

function takePicture(callback) {
  var child = exec('java -cp ./src/java/ CamWork', {cwd: './'}, function(err, stdout, stderr) {
    callback(SITE_URL + stdout);
  });
}

function whoIs(callback) {
  takePicture((result) => {
    client.face.detect({url: result, returnFaceId: true}).then((data) => {
      client.face.identify([data[0].faceId], personGroup, 1).then((data) => {
        var match = data[0].candidates[0].personId;
        callback(null, match);
      }).catch((err) => {
        callback(err.message, null);
      });
    }).catch((err) => {
      callback(err.message, null);
    });
  });
}
app.listen(process.env.PORT || 8000);
