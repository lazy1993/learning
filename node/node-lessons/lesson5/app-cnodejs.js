const async = require('async');
const superagent = require('superagent');
const cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
const url = require('url');
const cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    let concurrencyCount = 0;
    
    const fetchUrl = function (url, callback) {
      const start = new Date();
      concurrencyCount ++;
      superagent.get(url)
        .end(function(err, res) {
          const end = new Date();
          const delay = end - start;
          console.log('现在的并发数是', concurrencyCount, ',正在抓取的是', url, '，耗时' + delay + '毫秒');

          concurrencyCount--;
          
          const $ = cheerio.load(res.text);
          const resultObj = {
            title: $('.topic_full_title').text().trim(),
            href: url,
            comment1: $('.reply_content').eq(0).text().trim(),
          };
          
          callback(null ,resultObj);
        });
    }

    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each(function (idx, element) {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    // console.log(topicUrls);
    // 得到 topicUrls 之后

    // 使用async控制并发数为5
    async.mapLimit(topicUrls, 10, function (url, callback) {
      fetchUrl(url, callback);
    }, function (err, result) {
      console.log('final:');
      console.log(result);
    })
  });
