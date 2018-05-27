const http = require('http');
const agent = new http.Agent({
  maxSockets: 10,
});

const options = {
  hostname: '127.0.0.1',
  port: 1337,
  path: '/',
  method: 'GET',
  agent: agent,
};

const req = http.request(options, (res) => {
  console.log('STATUS：' + res.statusCode);
  console.log('HEADERS：' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(chunk);
  });
});

req.end();