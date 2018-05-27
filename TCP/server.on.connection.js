const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
  // 新的连接
  socket.on('data', (data) => {
    socket.write('2你好！');
  });

  socket.on('end', () => {
    console.log('连接2断开！');
  });

  socket.write('欢迎光临《深入迁出 Node.js》示例2： \n');
});

server.listen(8125, () => {
  console.log('server2 bound on 8125');
});