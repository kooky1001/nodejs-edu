const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const ssh = require('./lib/ssh');
const topic = require('./lib/topic');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('/', function(req, res){
  topic.home(req, res);
});

app.get('/page/:pageId', function(req, res){
  topic.page(req, res);
});

app.get('/create', function(req, res){
  topic.create(req, res);
});

app.post('/create_process', function(req, res){
  topic.create_process(req, res);
});

app.get('/update/page/:pageId', function(req, res){
  topic.update(req, res);
});

app.post('/update_process', function(req, res){
  topic.update_process(req, res);
});

app.post('/delete_process', function(req, res){
  topic.delete_process(req, res);
});

app.listen(3000);
