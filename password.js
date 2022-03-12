var db = {
  host : '',
  user : '',
  password : '',
  database : ''
}
var ssh = {
  username : '',
  privateKey : require('fs').readFileSync(''),
  host : '',
  port : 22,
  dstPort : 3306
}
module.exports = {
  db : db,
  ssh : ssh
}
