# DingDong
Created at DefHacks in Seattle 
## About
This project provides an API that interacts with the Microsoft Cognitive Services API. It integrates with a Webcam to tell users who can be seen, what can be seen, when the last time a person was seen, and if their package is there. It also allows user to manage known people. It utilizes the Alexa Skill as seen here: https://github.com/ihoegen/alexa-ding-dong

## Getting Started

### Requirements
1. Node.js
2. NPM
3. Java

### Setup
1. Clone repo via git.
2. Install npm packages using `npm i`
3. Start server using `npm start`
4. Navigate to `https://localhost:8000/api/ENDPOINT` in your browser.

## API

### Endpoint
`https://DingDong.localtunnel.me/api`

### Add
Adds a person to the list of known people.

### Update
Updates the name of a known person.

### WhoWas
Returns a list of people who were seen in one day, along with the times they were seen at.

### WhoIs
Takes a picture and attempts to match it to known people. To match with unknown users, try `What`

### What
Takes a picture and describes what it sees, along with some relevant tags.

### WhenWas
Returns when the last time a queried person was seen.

### Package
Whether or not a package can be found.
