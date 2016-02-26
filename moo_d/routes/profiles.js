var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');

profiles.post('/', db.createUser, function(req, res){
  res.redirect('/profile/' + res.rows[0].profile_id)
})

profiles.get('/profile', function(req, res){
  res.render('pages/profile');
});

profiles.post('/login', db.loginUser, function(req, res){
  // eval(pry.it)
  req.session.user = res.rows;
  // res.render('/pages/profile')

  // redirect for cookie to stay in sync
  req.session.save(function(){
    res.redirect('/profile')
  })
})


module.exports = profiles;
