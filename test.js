
var exec = require('child_process').exec;
var oxford = require('project-oxford');
client = new oxford.Client('f4d97dc46d7644f8ab6c401711ac5287'); //String is API Key
var faceListID = 'list';
var personGroup = 'person_group'


name = 'in';
client.face.person.list(personGroup).then((response) => {
  for(i in response) {
    console.log(response[i].name + "      " + response[i].userData);
    client.face.person.update(personGroup, response[i].personId, response[i].name, "TEST!");
  }
}).catch(err => {
  console.log(err);
});
