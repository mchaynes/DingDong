
var exec = require('child_process').exec;
var oxford = require('project-oxford');
client = new oxford.Client('f4d97dc46d7644f8ab6c401711ac5287'); //String is API Key
var faceListID = 'list';
var personGroup = 'person_group'
takePicture(addPerson);
function addPerson(imagePath) {
  client.face.person.create(personGroup, 'name', Date.now()).then(response => {
      console.log(response);
      client.face.person.addFace(personGroup, response.personId, {path:imagePath}).then(response => {
        console.log("SHIT ACTUALLY WORKED");
        console.log(response);
      }).catch(err => {
        console.log("FUCK FUCK FUCK FUCK");
        console.log(err);
      });

  });
}
  function takePicture(callback) {
    var child = exec('java -cp ./src/java/ CamWork', {cwd: './'}, function(err, stdout, stderr) {
      callback(stdout);
    });
  }
