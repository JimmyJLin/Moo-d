var express = require('express');
var users = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');

//new codes
users.route('/')
  .get(function(req, res){
    res.redirect('/users/profile')
  })

users.route('/signup')
  .get(function(req, res){
  res.render('users/signup');
})
  .post(db.createUser, function(req, res){
    req.session.user = res.rows;
    req.session.save(function(){
      res.redirect(303, '/users/profile')
    })
  })

users.route('/showAll')
  .get(db.showAllProfile, function(req, res){
    res.render('pages/profileAll', {
      profileAll: res.rows})
  })

users.route('/profile')
  .get(function(req, res){
    res.render('users/profile');
  })
  .post(db.updateProfile, function(req, res){
    res.render('pages/profileOne', {
      profileData: res.rows})
  })

users.route('/profile/:id/edit', function(req, res){
  res.render('pages/profileOne', {
    profileOneData: res.rows})
    console.log(profileOneData)
})

users.route('/profile/:id')
  .get(db.showOneProfile, function(req, res){
    res.render('pages/profileOne', {
        profileOneData: res.rows})
  })

users.route('/login')
  .get(function(req, res){
    res.render('users/login');
  })
  .post(db.loginUser, function(req, res){
    req.session.user = res.rows;
    req.session.save(function(){
      res.redirect('/users/profile') // need to add profile_id when displaying
    })
  })

users.route('/logout')
  .delete(function(req, res){
    req.session.destroy(function(err){
      res.redirect('/');
    })
  })



module.exports = users;
