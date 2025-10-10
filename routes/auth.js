var express = require('express');
var router = express.Router();

router.get('/login', function(req, res){
  res.render('auth/login');
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
