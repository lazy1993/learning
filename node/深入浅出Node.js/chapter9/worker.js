const http = require('http');

http.createServer((req, res) => {
  res.writeHeader(200, {'Content-Type': 'text/plain'});
  res.end('Hello World');
}).listen(Math.round((1 + Math.random()) * 1000), '127.0.0.1');