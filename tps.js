let async = require('async');
let myTCP =  require('./TCPClient.js');

let str_data = "aaaaaaaaaabbbbbbbbbbccccccccccdddddddddd";

let duration = 1;
let functions = [];
let sessionCount = 0;
//((endTime - startTime)/1000) < duration

let FConnection = function(sessionCount){
  myTCP.getConnection('0', function(client_json){
    myTCP.writeData(client_json, str_data, function(endTime){
      console.log((endTime - startTime)/1000);
      if(((endTime - startTime)/1000) < duration){

        sessionCount = sessionCount + 1;
        FConnection(sessionCount);
      }else{
        console.log(sessionCount);
      }
    });
  });
}

let startTime = new Date().getTime();

FConnection(sessionCount);
