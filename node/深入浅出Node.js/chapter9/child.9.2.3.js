process.on('message', function(m, server) {
  if (m === 'server') {
    // TODO:实际发起请求会报错，不知道为什么
    server.on('connection', function(socket) {
      socket.end('handled by child\n');
    });
  }
});