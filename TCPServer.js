var net = require('net');
let encoding = 'utf8';
let timeout = 0;
let dev = false;

var server = net.createServer(function(client) {
  if(dev){
    console.log('Client connection: ');
    console.log('   local = %s:%s', client.localAddress, client.localPort);
    console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);
  }
  client.setTimeout(timeout);
  client.setEncoding(encoding);
  client.on('data', function(data) {
      console.log('Received data from client on port %d: %s',
                  client.remotePort, data.toString());
      console.log('  Bytes received: ' + client.bytesRead);
    // writeData(client,data.toString());
      console.log('  Bytes sent: ' + client.bytesWritten);

    //writeData(client,data.toString());
  });
  client.on('end', function() {
    console.log('Client disconnected');
    if(dev){
      server.getConnections(function(err, count){
        console.log('Remaining Connections: ' + count);
      });
    }
    
  });
  client.on('error', function(err) {
    console.log('Socket Error: ', JSON.stringify(err));
  });
  client.on('timeout', function() {
    console.log('Socket Timed out');
  });
});
server.listen({
    port: 8888,
    backlog: 10000
}, function() {
  console.log('Server listening: ' + JSON.stringify(server.address()));
  server.on('close', function(){
    console.log('Server Terminated');
  });
  server.on('error', function(err){
    console.log('Server Error: ', JSON.stringify(err));
  });
});
function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }
}
