const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.listen(3000);

app.use(cookieParser());

app.get('/', (req, res) => {
  if (req.cookies.isVisit) {
    console.log(req.cookies);
    res.cookie('isVisit', +req.cookies.isVisit + 1, { maxAge: 60 * 1000 });
    res.send(`欢迎第${req.cookies.isVisit}次访问`);
  } else {
    res.cookie('isVisit', 2, { maxAge: 60*1000 });
    res.send('欢迎第1次访问');
  }
});