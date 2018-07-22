const fibonacci = function fibonacci(n) {
  if (typeof n !== 'number') {
    throw new Error('n 必须为数字！');
  }
  if (n > 10) {
    throw new Error('n 必须小于10');
  }
  if (n < 0) {
    throw new Error('n 必须大于0');
  }

  if (n < 2) {
    return n;
  }

  return fibonacci(n-1) + fibonacci(n-2);
}

if (require.main === module) {
  // 如果是直接执行 main.js，则进入此处
  // 如果 main.js 被其他文件 require，则此处不会执行。
  const n = Number(process.argv[2]);
  console.log('fibonacci(' + n + ') is', fibonacci(n));
}

exports.fibonacci = fibonacci;