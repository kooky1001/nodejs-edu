const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const db = require('../lib/db');
const bcrypt = require('bcrypt');

const router = express.Router();

passport.use(new LocalStrategy((username, password, done) => {
  db.get(`select * from member where member_id = ?`, [username], async (err, result) => {
    if (err) throw err;
    if (!result) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    const isTrue = await bcrypt.compare(password, result.password);
    if (isTrue) {
      return done(null, result);
    } else {
      return done(null, false, { message: 'Incorrect password.' });
    }
  });
}));

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    done(null, user.id);
  });
});

passport.deserializeUser(function(id, done) {
  process.nextTick(function() {
    db.get(`select id, member_id, name from member where id = ?`, [id], (err, result) => {
      if (err) throw err;
      return done(null, result);
    });
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

router.get('/register', function(req, res){
  res.render('auth/register');  
});

router.post('/register_process', (req, res) => {
  const body = req.body;
  if (!body.username || !body.password1 || !body.password2 || !body.name) {
    return res.redirect('/auth/register');
  }
  if (body.password1 !== body.password2) {
    return res.redirect('/auth/register');
  }
  db.get(`select id from member where member_id = ?`, [body.username], async (err, result) => {
    if (err) throw err;
    if (result) {
      return res.redirect('/');
    }
    const password = await bcrypt.hash(body.password1, 10);

    db.run(`insert into member(member_id, name, password) values(?, ?, ?)`, 
      [body.username, body.name, password], function(err, result) {
      if (err) {
        throw err;
      }
      // res.redirect('/');
      const user = {id: this.lastID}
      req.login(user, (err) => {
        if (err) throw err;
        res.redirect('/');
      });
    });
  });
});

module.exports = router;
