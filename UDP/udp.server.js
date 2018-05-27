const dgram = require('dgram');

const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
  console.log('server got：' + msg + ' from ' + rinfo.address + '：' +
    rinfo.port);
});

server.on('listening', () => {
  const address = server.address();
  console.log('server listenting ' + address.address
    + '：' + address.port);
});

server.bind(41234);