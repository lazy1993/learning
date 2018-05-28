const tls = require('tls');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./client.key'),
  cert: fs.readFileSync('./client.crt'),
  ca: [fs.readFileSync('./ca.crt')],
};

const stream = tls.connect(8000, options, () => {
  console.log('client connected', stream.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(stream);
})

stream.setEncoding('utf8');

// stream.on('data', (data) => {
//   console.log(data);
// });

// stream.on('end', () => {
//   // FIXME:server未定义
//   server.close();
// });

// FIXME:文件无法正常执行

stream.on('data', function (data) {
  console.log(data);
  stream.write('Hello,this message is come from client!');
  stream.end();
});
stream.on('end', function () {
  console.log('disconnected');
});
stream.on('error', function (exception) {
  console.log(exception);
}); 