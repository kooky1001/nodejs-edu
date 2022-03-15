const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const ssh = require('./lib/ssh');

// Routers
var topicRouter = require('./routes/topics');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use('/topic', topicRouter);

app.get('/', function(req, res){
  res.redirect('/topic');
});

app.listen(3000);
