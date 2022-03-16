var express = require('express');
const template = require('../lib/template');
var router = express.Router();

router.get('/login', function(req, res){
  var title = 'Web - login';
  var html = template.HTML(title, null, `
  <form action="/auth/login_process" method="post">
  <p><input type="text" name="email" placeholder="email"></p>
  <p><input type="password" name="pwd" placeholder="password"></p>
  <p><input type="submit" value="login"></p>
  </form>
  `, '');
  res.send(html);
});
/*
router.get('/', function(req, res){
  topic.home(req, res);
});

router.get('/create', function(req, res){
  topic.create(req, res);
});

router.post('/create_process', function(req, res){
  topic.create_process(req, res);
});

router.get('/update/:pageId', function(req, res){
  topic.update(req, res);
});

router.post('/update_process', function(req, res){
  topic.update_process(req, res);
});

router.post('/delete_process', function(req, res){
  topic.delete_process(req, res);
});

router.get('/:pageId', function(req, res){
  topic.page(req, res);
});
*/

module.exports = router;
