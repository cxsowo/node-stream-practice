var ServerDuplex = require('./src/ServerDuplex.js'),
	ClientDuplex = require('./src/ClientDuplex.js'),
	net = require('net');

server = net.createServer(function(socket){
  socket.pipe(new ServerDuplex())
    .pipe(socket);
});
// server = net.createServer();

// server.on('connect',function(socket){
// 	socket.pipe(new ServerDuplex())
//     	.pipe(socket);
// });

server.listen(8080, function() { // 'listening' 监听器
    console.log('server stated');
});

var client = new net.Socket();
client.connect({port: 8080},function() { //'connect' 监听器
  client.write('hello!');
  var clientStream = new ClientDuplex();
  process.stdin.pipe(client)
    .pipe(clientStream)
    .pipe(client);

  clientStream.on('serverData',function(data){
  	console.log("server send to me data : " + data);
  });
});
