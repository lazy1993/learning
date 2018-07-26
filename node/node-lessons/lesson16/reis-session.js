const express = require('express');
const session = require('express-session');
// 首先需要有个redis
const RedisStore = require('connect-redis')(session);
const app = express();

app.listen(5000);

app.use(session({
  // 假如你不想使用 redis 而想要使用 memcached 的话，代码改动也不会超过 5 行。
  // 这些 store 都遵循着统一的接口，凡是实现了那些接口的库，都可以作为 session 的 store 使用，比如都需要实现 .get(keyString) 和 .set(keyString, value) 方法。
  // 编写自己的 store 也很简单
  store: new RedisStore(),
  secret: 'catch_me_if_you_can',
}));

app.get('/', (req, res) => {
  if (!req.session) {
    res.send('oh no');
    return new Error('oh no'); // handle error
  }
  if (req.session.isVisit) {
    res.send('<p>第 ' + ++req.session.isVisit + '次来到此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send('欢迎第一次来这里');
  }
});