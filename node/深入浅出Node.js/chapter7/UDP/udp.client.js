const dgram = require('dgram');

const message = new Buffer('深入浅出 Node.js');
const client = dgram.createSocket('udp4');

client.send(message, 0, message.length, 41234, 'localhost', (err, bytes) => {
  client.close();
});