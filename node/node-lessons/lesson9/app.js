const web_development = "python php ruby javascript jsonp perhapsphpisoutdated";
const words = web_development.split(' ');
const result = words.filter(item => {
  return item.indexOf('p') > -1 && item.indexOf('ph') < 0;
});
console.log(result);