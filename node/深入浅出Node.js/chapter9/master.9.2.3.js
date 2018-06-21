const child = require('child_process').fork(__dirname + '/child.9.2.3.js');

const server = require('net').createServer();
server.on('connection', (socket) => {
  socket.end('handled by parent \n');
});

server.listen(1337, () => {
  child.send('server', server);
});