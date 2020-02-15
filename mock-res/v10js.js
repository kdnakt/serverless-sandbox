var uglify = require('uglify-js');
var fs = require('fs');
var jsFile = fs.readFileSync('./v10.js', 'utf8');
var opt = {
  mangle: {
    toplevel: true,
  },
};
var minifiedJs = uglify.minify(jsFile, opt).code;
module.exports.js = () => {
  return minifiedJs;
}