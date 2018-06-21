const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHeader(200, {'Content-Type': 'text/plain'});
  res.end('handled by child, pid is' + process.pid + '\n');
});

process.on('message', function(m, tcp) {
  if (m === 'server') {
    tcp.on('connection', function (socket) {
      server.emit('connection', socket);
    });
  }
});