var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');

users.route('/')
  .post(db.createUser, function(req, res){
    res.redirect('/')
  })

users.get('/signup', function(req, res){
    res.render('users/signup')
  })

// users.get('/login', function(req, res){
//     res.render('users/login')
//   })

users.route('/login')
  .get(function(req, res){
    res.render('users/login')
  })

  .post(db.loginUser, function(req, res){
    req.session.user = res.rows;
    req.session.save(function(){
      console.log("hi")
      res.redirect('/' + res.rows[0].profile_id)
    })
  })

users.route('/:profileid')
  .get(function(req, res){
    var pID = req.params.profileid
    res.render('users/profile')
  })

users.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/');
  })
})


module.exports = users;
