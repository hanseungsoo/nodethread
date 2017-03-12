let async = require('async');
let myTCP =  require('./TCPClient.js');
let functions = [];

let sessionCount = 1;
let loop = 1;
let str_data = "aaaaaaaaaabbbbbbbbbbccccccccccdddddddddd";
let startTime = null;
let finishTime = null;
let dev = false;
let flags = true;
let count = 0;

for(let i = 0; i < sessionCount; i++){
  functions.push(function(callback){

    startTime = new Date().getTime();
    var obj = {};
    obj.startTime = startTime;
    //console.log('# '+i+' startTime : '+startTime);
    let client = myTCP.getConnection(i, 'result'+i);
    if(false)
       console.log('Send : ' + str_data)

    myTCP.writeData(client, startTime,str_data, function() {
      obj.endDate = new Date().getTime();
      obj.time = obj.endDate - obj.startTime;
    obj.name = "result" + i

      callback(null,obj);

    });
  });
}
// for(let i = 0; i < loop; i++){
//   async.parallel(functions,
//                function(err,results){
//                          if(err) console.log(err);
//                          //console.log('Result : ' + results);
//                         //  finishTime = new Date().getTime();
//                         //  let temp = finishTime - startTime;
//                         //  console.log('# - Loop Finish : ' + temp.toString() + 'ms');
//                                // handle resultC
//                     }
//   );
// }
// while(true){
//   if(flags){
//     flags = false;
//     async.parallel(functions,
//                  function(err,results){
//                            if(err) console.log(err);
//                            flags = true;
//                            //console.log('Result : ' + results);
//                           //  finishTime = new Date().getTime();
//                           //  let temp = finishTime - startTime;
//                           //  console.log('# - Loop Finish : ' + temp.toString() + 'ms');
//                                  // handle resultC
//                           loop = loop + 1;
//                       }
//     );
//   }
//   if(loop == count){
//     break;
//   }
// }

async.waterfall([
  function(callback){
    async.parallel(functions,
                 function(err,results){
                           if(err) console.log(err);
                           //console.log('Result : ' + results);

                           console.log(results);
                           callback(null);
                                 // handle resultC
                      }
    );
  }
], function(err){
  console.log('waterfall Finished!!');
});
