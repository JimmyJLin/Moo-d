var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');

//new codes
users.route('/')
  .get(db.createUser, function(req, res){
    res.redirect('/users/profile')
  })

users.route('/signup')
  .get(function(req, res){
  res.render('users/signup');
})

users.route('/profile')
  .get(function(req, res){
    res.render('users/profile');
  })

users.route('/login')
  .get(function(req, res){
    res.render('users/login');
  })
  .post(db.loginUser, function(req, res){
    req.session.user = res.rows;
    req.session.save(function(){
      res.redirect('/users/profile')
    })
  })

users.route('/logout')
  .delete(function(req, res){
    req.session.destroy(function(err){
      res.redirect('/');
    })
  })



module.exports = users;
