const express = require('express');
const session = require('express-session');
const app = express();

app.listen(5000);
app.use(session({
  //  通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
  secret: 'recommand 128 bytes random string',
  cookie: { maxAge: 60 * 1000 },
}));

app.get('/', (req, res) => {
  if (req.session.isVisit) {
    res.send('<p>第' + ++req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send('欢迎第1次来这里');
    console.log(req.session);
  }
})