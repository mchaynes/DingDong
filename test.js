
var exec = require('child_process').exec;
var oxford = require('project-oxford');
client = new oxford.Client('f4d97dc46d7644f8ab6c401711ac5287'); //String is API Key
var faceListID = 'list';
var personGroup = 'person_group'


name = 'in';
client.face.person.list(personGroup).then((response) => {
  response.map(x=> {
    console.log(x);
    // client.face.person.delete(personGroup, x.personId).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err);
    // })
  });
}).catch(err => {
  console.log(err);
});
