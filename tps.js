let async = require('async');
let myTCP =  require('./TCPClient.js');

let str_data = "aaaaaaaaaabbbbbbbbbbccccccccccdddddddddd";

let temp = 0;
let startTime = new Date().getTime();
let endTime = 0;
let duration = 1;
//((endTime - startTime)/1000) < duration

while(((endTime - startTime)/500) < duration){
  myTCP.getConnection(temp, function(client_json){
    myTCP.writeData(client_json, str_data, function(endDate){
      console.log(endDate);

    });
  });
  endTime = new Date().getTime();
  console.log((endTime - startTime)/1000);
}

console.log('FIN');
