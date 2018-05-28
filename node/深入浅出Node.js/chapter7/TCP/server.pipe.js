const net = require('net');

const server = net.createServer((socket) => {
  socket.write('Echo server on 8126 \r\n');
  socket.pipe(socket);
});

server.listen(8126, '127.0.0.1');