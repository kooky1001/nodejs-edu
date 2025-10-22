const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const router = express.Router();

const user = {
  id: 'test',
  password: 'test1',
  name: 'testname'
}

passport.use(new LocalStrategy((username, password, done) => {
  if (username !== user.id) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (password !== user.password) {
    return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
}));

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    done(null, {id: user.id});
  });
});

passport.deserializeUser(function(userid, done) {
  process.nextTick(function() {
    return done(null, user);
  });
});

router.get('/login', function(req, res){
  res.render('auth/login');  
});

router.post('/login_process', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/auth/login',
  failureMessage: true
}));

router.post('/logout_process', function(req, res) {
  req.logout((err) => {
    if (err) throw err;
    res.redirect('/');
  });
  
  // req.session.destroy((err) => {
  //   if (err) throw err;
  //   res.redirect('/');
  // });
});

module.exports = router;
