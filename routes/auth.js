var express = require('express');
var router = express.Router();

const user = {
  id: 'test',
  password: 'test1',
  name: 'testname'
}

router.get('/login', function(req, res){
  res.render('auth/login');  
});

router.post('/login_process', function(req, res){
  const body = req.body;
  if (body.id === user.id && body.password === user.password) {
    req.session.user = user;
    res.redirect('/');
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
