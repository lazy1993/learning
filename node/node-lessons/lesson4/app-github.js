// 爬取失败
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
// url 模块是 Node.js 标准库里面的
// http://nodejs.org/api/url.html
var url = require('url');

let gitHubUrl = 'https://github.com/search?o=desc&q=node&s=stars&type=Repositories&p=';
const baseUrl = 'https://github.com';
const maxPage = 100;

// 得到一个 eventproxy 的实例
const ep = new eventproxy();

function getPage(i) {
  const pageUrl = gitHubUrl + i;
  superagent.get(pageUrl)
    .end(function(err, res) {
      if (err) {
        return console.error(err);
      }

      const $ = cheerio.load(res.text);
      const results = [];
      // 获取所有的项目
      $('.repo-list .repo-list-item').each(function(idx, element) {
        var $element = $(element);

        const $hrefEle = $element.find('a.v-align-middle');
        const title = $hrefEle.text().trim();
        const href = url.resolve(baseUrl, $hrefEle.attr('href'));
        const descipt = $element.find('p.d-inline-block').text().trim();
        const stars = $element.find('a.muted-link').text().trim();

        results.push({
            title,
            href,
            descipt,
            stars
          });
      });
      
      console.log('fetch' + pageUrl + 'successful');
      ep.emit('page_html', {
        index: i,
        results: results
      });
    });
}

let i = 1;
function loop() {
  setTimeout(() => {
    getPage(i);
    if (++i <= maxPage) {
      loop();
    }
  }, 100);
}

loop();

// 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
ep.after('page_html', maxPage, function(pages) {
  pages = pages.sort((itemA, itemB) => itemA.index - itemB.index);

  const repository = [];
  pages.forEach(item => {
    item.results.forEach(ele => {
      repository.push(ele);
    });
  });

  console.log('final:');
  console.log(repository);
});
