/**
 * @description Server for the application; Uses express
 ******************************************************************************/

var express = require('express');
var fs = require('fs-extra');
var bodyParser = require('body-parser');
var http = require('http');


var app = express();

app.use(bodyParser());

//Handles main application
app.get('/', function(req, res) {
  $(function() {
       var params = {
           // Request parameters
           "returnFaceId": "true",
           "returnFaceLandmarks": "false",
           "returnFaceAttributes": "{string}",
       };

       $.ajax({
           url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
           beforeSend: function(xhrObj){
               // Request headers
               xhrObj.setRequestHeader("Content-Type","application/json");
               xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","{subscription key}");
           },
           type: "POST",
           // Request body
           data: "{body}",
       })
       .done(function(data) {
           alert("success");
       })
       .fail(function() {
           alert("error");
       });
   });
});



app.listen(process.env.PORT || 8000);
