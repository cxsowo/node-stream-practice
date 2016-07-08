var ServerDuplex = require('./src/ServerDuplex.js'),
	ClientDuplex = require('./src/ClientDuplex.js'),
	//fs = require('fs'),
	net = require('net');

server = net.createServer(function(socket){
	socket.pipe(new ServerDuplex())
		.pipe(socket);
});

server.listen(8080, function() {
    console.log('server stated');
});

var client = new net.Socket();
client.connect({port: 8080},function() {
	client.write('hello!\r\n');
	var clientStream = new ClientDuplex();
	//var fsStream = fs.createReadStream('1.txt');
	process.stdin.pipe(client)
		.pipe(clientStream)
		.pipe(client);

	clientStream.on('serverData',function(data){
		console.log("server send to me data : " + data);
	});
});
