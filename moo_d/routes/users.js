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
      res.redirect(303, '/profile')
  })

users.route('/showAll')
  .get(db.showAllProfile, function(req, res){
    res.render('pages/profileAll', {
      profileAll: res.rows})
  })

users.route('/profile')
  .get(db.showOneProfile, function(req, res){
    res.render('users/profile', {
      user: req.session.user,
      profileData: res.rows})
  })

  .post(db.updateProfile, db.showOneProfile, function(req, res){
    res.render('users/profile', {
      user: req.session.user,
      profileData: res.rows})
  })

users.route('/profile/update')
  .get(db.showOneProfile, function(req, res){
    res.render('users/updateProfile', {
      user: req.session.user,
      profileData: res.rows})
  })


users.route('/login')
  .get(function(req, res){
    res.render('users/login');
  })
  .post(db.loginUser, function(req, res){
    req.session.user = res.rows;
    console.log(req.session.user)
    req.session.save(function(){
      res.render('users/updateProfile', {
      user: req.session.user}) // need to add profile_id when displaying
    })
  })

users.route('/logout')
  .delete(function(req, res){
    req.session.destroy(function(err){
      res.redirect('/');
    })
  })



module.exports = users;
