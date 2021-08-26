/*var net = require('net');
let sockets = []; // array of sockets

var server = net.createServer(function(socket) {
	console.log('CONNECTED: ' + socket.remoteAddress +':'+ socket.remotePort);
    sockets.push(socket);

	//socket.write('Echo server\r\n');
	
	//socket.on('error', (error)=>{ console.log(error);	});
	
	socket.on('close', ()=>{ 
		console.log('DISCONNECTED: ');
		
		let index = sockets.indexOf(socket);
        if (index !== -1) {
            sockets.splice(index, 1);
        }
	});
	
	setInterval(function() {
		sockets.forEach((client) => {
			client.write('Echo server\r\n');
		});
	}, 2000);

});


server.listen(1337, '127.0.0.1');*/

let sockets = [];

const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');

const io = new socketIO.Server(server, {
	cors: {
		origins: ["*"], 
		handlePreflightRequest: (req, res) => {
			const headers = {
				"Access-Control-Allow-Origin": '*', 
				"Access-Control-Allow-Headers": "Content-Type, Authorization",				
				"Access-Control-Allow-Credentials": true
			};
			res.writeHead(200, headers);
			res.end();
		}		
	}
});

io.on('connection', (socket) => {
	sockets.push(socket);
	
    console.log('CONNECTED: ' + socket.handshake.address);
	
	socket.on("disconnect", () => {
		console.log('DISCONNECTED: ' + socket.handshake.address);
		
		let index = sockets.indexOf(socket);
        if (index !== -1) {
            sockets.splice(index, 1);
        }
	});	
	
})

server.listen(3000, '127.0.0.1', () => {
    console.log(`started on port: 3000`);
});

let servers = 0;

setInterval(function() {
	io.emit('data', '{"message": "Server ' + (servers + 1) + '", "status": true, "datetime": "' + new Date() +  '"}');
	
	servers = (servers + 1) % 4;
}, 10000);
