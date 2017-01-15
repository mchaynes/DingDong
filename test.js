
var exec = require('child_process').exec;
var oxford = require('project-oxford');
client = new oxford.Client('f4d97dc46d7644f8ab6c401711ac5287'); //String is API Key
var faceListID = 'list';
var personGroup = 'person_group'


client.face.person.update(, 'Ian', new Date().getTime()).then(response => {
  console.log(response);
}).catch(err => {
  console.log(err);
})
