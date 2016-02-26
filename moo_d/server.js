pry = require('pryjs');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var pg = require('pg');
var connectionString = "postgres://jimmylin:desertprince69@localhost/moo_d";
var session = require('express-session');
var pgSession = require('connect-pg-simple')(session);
var path = require('path');
var methodOverride = require('method-override');

var db = require('./db/pg');
var app = express();

var userRoutes = require(path.join(__dirname, '/routes/users'));
// var profileRoutes = require(path.join(__dirname, '/routes/profile'));

// allow express to use session
app.use(session({
  store: new pgSession({
    pg : pg,
    conString : connectionString,
    tableName : 'session'
  }),
  secret : 'sooosecreetttt',
  resave : false,
  cookie : { maxAge : 30 * 24 * 60 * 60 * 1000 } // 30 days
}))

// parse incoming forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('short'));


// override with POST having ?_method=xxxx
app.use(methodOverride('_method'))

// static route to public
app.use(express.static(path.join(__dirname, './public/')));

/*Views*/
app.set('views', './views');
app.set('view engine', 'ejs');

/* ROUTES */
// Home route
app.get('/', function(req, res){
  res.render('./pages/home', {
    user : req.session.user
  });
});

app.use('/users', userRoutes);
// app.use('/profiles', profileRoutes)

// app setting
var port = process.env.PORT || 3000;
app.listen(port,() => console.log('Sever up!'));
