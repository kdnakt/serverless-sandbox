var csso = require('csso');
var fs = require('fs');
var cssFile = fs.readFileSync('./v8.css', 'utf8');
var minifiedCss = csso.minify(cssFile).css;
module.exports.css = () => {
  return minifiedCss;
};