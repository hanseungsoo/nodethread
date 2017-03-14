var net = require('net');

let encoding = 'utf8';
let timeout = 2000;
let port = 8888;
//let host = '127.0.0.1';
let host = '192.168.0.8';
let dev = false;

module.exports.getConnection = function(connName, callback) {
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

    let client_json = {};
    client_json.client = client;
    client_json.Name = connName;
    callback(client_json);
  });

};

module.exports.writeData = function (client_json, data, callback){

  var success = !client_json.client.write(data, function(){
    if(dev)
      console.log('write closed!!!!!');

    client_json.client.end();

    callback(new Date().getTime());
  });

};
