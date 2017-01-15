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
visionClient = new oxford.Client('23785433bd9442c892727726231933e7');
var app = express();
var Clarifai = require('clarifai');
var clApp = new Clarifai.App(
  'qoguCr9rhUSI1K_o9E7wQtvBTPp2lAnKK_6pfi8I',
  'xj_Oc04TynR_AbDbmJqEaLklQGGfXjEEuNQ4_mxG'
);
var SITE_URL = "http://dingdong.localtunnel.me/";

var faceListID = 'list';
var personGroup = 'person_group';
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
      var name = response.name;
      if (name === 'in') {
        name = 'Ian';
      }
      res.send('A match for ' + name + ' has been found');
    }).catch((err) => {
      res.send(err.message);
    });
  })
});

app.get('/api/what', function(req, res) {
  takePicture(function (response) {
    visionClient.vision.analyzeImage({url: response, Description: true}).then((data) => {
      var spokenResponse = "I see " + data.description.captions[0].text + ". I also see the following tags: "
      for (var i = 0; i < 5; i++) {
        spokenResponse += data.description.tags[i] + ", ";
      }
      res.send(spokenResponse);
    }).catch((err) => {
      res.send(err);
    });
  });
});

app.get('/api/package', function(req, res) {
  takePicture(function(response) {
    clApp.models.predict(Clarifai.GENERAL_MODEL, response.trim()).then(
        function(response) {
          var responseData = response.outputs[0].data.concepts;
          for (var i in responseData) {
            if (responseData[i].name === 'box' || responseData[i].name === 'package') {
              res.send('Your package is here');
              return;
            }
          }
          res.send('No package has been found');
        },
        function(err) {
          res.send(err);
        }
      );
  });
});

app.post('/api/whenwas', function(req, res) {
  name = req.body.name;
  client.face.person.list(personGroup).then((response) => {
    for(i in response) {
      if(response[0].name == name || (name == 'Ian' && response[0].name == 'in')) {
        var date = new Date(parseInt(response[0].userData));
        res.send(date.toDateString());
        return;
      }
    }
    res.send('never');
  })
});

app.post('/api/add',function(req, res) {
  var image_path;
  var name = req.body.name;
  takePicture(addPerson);
  function addPerson(imagePath) {
    client.face.person.create(personGroup, name, JSON.stringify(new Date().getTime())).then(response => {
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
  function update(err, data) {
    if(data) {
      client.face.person.update(data, new Date().getTime()).then(response => {
        console.log(response);
      }).catch(err => {
        console.log(err);
      })
    }
  }
  whoIs(update);
}
// setInterval(getNewPicture, 300000);



function takePicture(callback) {
  var child = exec('java -cp ./src/java/ CamWork', {cwd: './'}, function(err, stdout, stderr) {
    callback(SITE_URL + stdout);
  });
}

function whoIs(callback) {
  takePicture((result) => {
    client.face.detect({url: result, returnFaceId: true}).then((data) => {
      if(data[0]) {
        client.face.identify([data[0].faceId], personGroup, 1).then((data) => {
          var match = data[0].candidates[0].personId;
          callback(null, match);
        }).catch((err) => {
          callback(err.message, null);
        });
      } else {
        callback("no face detected", null);
      }
    }
  ).catch((err) => {
      callback(err.message, null);
    });

  });
}
app.listen(process.env.PORT || 8000);
