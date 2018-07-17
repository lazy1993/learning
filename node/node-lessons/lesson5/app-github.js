const async = require('async');
const superagent = require('superagent');
const cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
const url = require('url');

let gitHubUrl = 'https://github.com/search?o=desc&q=node&s=stars&type=Repositories&p=';
const baseUrl = 'https://github.com';

// 超过10个请求就容易被拒绝
var urls = [];
for (let i = 1; i < 31; i++) {
  urls.push('https://github.com/search?o=desc&q=node&s=stars&type=Repositories&p=' + i);
}

let concurrencyCount = 0;
const fetchUrl = function (pageUrl, callback) {
  const start = new Date();
  concurrencyCount++;
  superagent.get(pageUrl)
    .end(function (err, res) {
      const end = new Date();
      const delay = end - start;
      console.log('现在的并发数是', concurrencyCount, ',正在抓取的是', pageUrl, '，耗时' + delay + '毫秒');

      concurrencyCount--;

      if (err) {
        return console.error(err);
      }

      const $ = cheerio.load(res.text);

      const results = [];
      // 获取所有的项目
      $('.repo-list .repo-list-item').each(function (idx, element) {
        var $element = $(element);

        const $hrefEle = $element.find('a.v-align-middle');

        const title = $hrefEle.text().trim();
        var href = url.resolve(baseUrl, $hrefEle.attr('href'));
        const descipt = $element.find('p.d-inline-block').text().trim();
        const stars = $element.find('div.col-2>a.muted-link').text().trim();

        results.push({
          title,
          href,
          descipt,
          stars
        });
      });

      const resultObj = {
        url: pageUrl,
        results: results
      };

      callback(null, resultObj);
    });
}

// 使用async控制并发数为5
async.mapLimit(urls, 10, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  result = result.sort((itemA, itemB) => {
    const indexA = +itemA.url.split('https://github.com/search?o=desc&q=node&s=stars&type=Repositories&p=')[1];
    const indexB = +itemB.url.split('https://github.com/search?o=desc&q=node&s=stars&type=Repositories&p=')[1];
    return indexA - indexB;
  });

  const repository = [];
  result.forEach(item => {
    item.results.forEach(element => {
      repository.push(element);
    });
  });
  
  console.log('final:');
  console.log(repository);
});
