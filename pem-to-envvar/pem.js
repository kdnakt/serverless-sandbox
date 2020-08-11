var fs = require('fs');
var pemFile = fs.readFileSync('public.pem', 'utf8');
pemFile = pemFile.replace(/[\r\n]/g, '');
pemFile = pemFile.replace('-----BEGIN PUBLIC KEY-----', '');
pemFile = pemFile.replace('-----END PUBLIC KEY-----', '');
console.log('pemFile', pemFile);
module.exports.pem = () => {
    return pemFile;
}