/**
 * @description Server for the application; Uses express
 ******************************************************************************/
var app = require('express');
var fs = require('fs');
var oxford = require('project-oxford');
client = new oxford.Client('f4d97dc46d7644f8ab6c401711ac5287');

print_everyone();
var people;
function initAllPeople() {
  people = JSON.parse(fs.readFileSync('test/people.json').toString());
  console.log(people);
}


function createPerson() {
  client.face.person.create('home', 'Ian Hoegen',"DATA!"
  ).then(function(response) {
    people.push(response);
    fs.writeFileSync('test/people.json', JSON.stringify(people));
  }).catch(function(err) {
    console.log(err);
  })
}

function print_everyone() {
  people = JSON.parse(fs.readFileSync('test/people.json'));
  for(i in people) {
    client.face.person.get('home',people[i].personId).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    })
  }
}


function getPeople() {
  people = JSON.parse(fs.readFileSync('test/people.json'));
  console.log("PEOPLE=" + people.personId);
  client.face.person.get('home', people.personId).then(
    function(response) {
      console.log(response);
    }
  ).catch(function(err) {
    console.log(err);
  })
}
