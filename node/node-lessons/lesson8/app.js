const express = require('express');

const fibonacci = function (n) {
  // typeof NaN === 'number' 是成立的，所以要判断 NaN
  if (typeof n !== 'number' || isNaN(n)) {
    throw new Error('n should be a Number');
  }
  if (n < 0) {
    throw new Error('n should >= 0')
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
};

const app = express();

app.get('/fib', (req, res) => {
  const n = +req.query.n;
  try {
    res.send(String(fibonacci(n)));
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3000, () => console.log('app is listening at port 3000'));

module.exports = app;
