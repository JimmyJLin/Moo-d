var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');

users.post('/', db.createUser, function(req, res){
  res.redirect('/users/profile')

})

users.get('/signup', function(req, res){
  res.render('users/signup');
});

users.get('/login', function(req, res){
  res.render('users/login');
});

users.get('/profile', function(req, res){
  res.render('users/profile');
});

users.post('/login', db.loginUser, function(req, res){
  // eval(pry.it)
  req.session.user = res.rows;
  // redirect for cookie to stay in sync
  req.session.save(function(){
    res.redirect('/users/profile')
  })

})

users.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/');
  })
})



module.exports = users;
