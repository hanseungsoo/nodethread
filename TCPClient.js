var net = require('net');

let encoding = 'utf8';
let timeout = 2000;
let port = 4444;
//let host = '127.0.0.1';
let host = '192.168.56.101';
let dev = false;

module.exports.getConnection = function(connName, callName) {
  var client = net.connect({port: port, host: host}, function() {
    if(dev){
      console.log(connName + ' Connected: ');
//    console.log('   local = %s:%s', this.localAddress, this.localPort);\
//    console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
}
    this.setTimeout(timeout);
    this.setEncoding(encoding);
    this.on('data', function(data) {
      if(dev)
        console.log(connName + " From Server: " + data.toString());
      this.end();
    });
    this.on('end', function() {
      if(dev)
        console.log(connName + ' Client disconnected');
    });
    this.on('error', function(err) {

      console.log('Socket Error: ', JSON.stringify(err));
//      this.end();
    });
    this.on('timeout', function() {
      console.log('Socket Timed Out');
      this.end();
    });
    this.on('close', function() {
      if(dev)
        console.log('Socket Closed');
      //call(null, callName);
    });
  });
  return client;
};

module.exports.writeData = function (socket, startTime,data, callback){

  var success = !socket.write(data, function(){
    if(dev)
      console.log('write closed!!!!!');
    let finishTime = new Date().getTime();
    let temp = finishTime - startTime;
    // console.log('# startTime : '+startTime +'\n# finishTime : ' + finishTime );
//    console.log('# - Send Finish : ' + temp.toString() + 'ms');
    socket.end();
    callback(null);
  });
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);

  }
};
