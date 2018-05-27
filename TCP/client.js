const net = require('net');

// const  client = net.connect({ port: 8124 }, () => {
//   console.log('client connected');
//   client.write('world! \r\n');
// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });

// client.on('end', () => {
//   console.log('client disconnected');
// });

// const client1 = net.connect({ port: 8125 }, () => {
//   console.log('client1 connected');
//   client1.write('world! \r\n');
// });

// client1.on('data', (data) => {
//   console.log(data.toString());
//   client1.end();
// });

// client1.on('end', () => {
//   console.log('client1 disconnected');
// });

const client2 = net.connect({ port: 8126 }, () => {
  console.log('client2 connected');
  client2.write('world! \r\n');
});

client2.on('data', (data) => {
  console.log(data.toString());
  client2.end();
});

client2.on('end', () => {
  console.log('client2 disconnected');
});