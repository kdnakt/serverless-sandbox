var fs = require('fs');
var imgFile = fs.readFileSync('./ka.jpg');
module.exports.img = () => {
  return imgFile.toString('Base64');
}