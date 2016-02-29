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
var papercut = require('papercut');
var dotenv = require('dotenv');
var db = require('./db/pg');
var app = express();
var AWS = require('aws-sdk');

var userRoutes = require(path.join(__dirname, '/routes/users'));
// var profileRoutes = require(path.join(__dirname, '/routes/profile'));

// var client = s3.createClient({
//   maxAsyncS3: 20,     // this is the default
// s3RetryCount: 3,    // this is the default
// s3RetryDelay: 1000, // this is the default
// multipartUploadThreshold: 20971520, // this is the default (20 MB)
// multipartUploadSize: 15728640, // this is the default (15 MB)
// s3Options: {
//   accessKeyId: "AKIAJX7NX5Z2GD5EF4NA",
//   secretAccessKey: "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",
//   region: "N. Virginia",
//   },
// })

// var s3 = new AWS.S3();
//  s3.createBucket({Bucket: 'myBucket'}, function() {
//   var params = {Bucket: 'myBucket', Key: 'AKIAJX7NX5Z2GD5EF4NA', Body: 'Hello!'};
//   s3.putObject(params, function(err, data) {
//       if (err)
//           console.log(err)
//       else       console.log("Successfully uploaded data to myBucket/myKey");
//    });
// });

// AWS.config.update({
//     accessKeyId: "AKIAJX7NX5Z2GD5EF4NA",
//     secretAccessKey: "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",
//     "region": "Oregon"
// });
// AWS.config.loadFromPath('/aws/AwsConfig.json');
// AWS.config = new AWS.Config();
// AWS.config.accessKeyId = "AKIAJX7NX5Z2GD5EF4NA";
// AWS.config.secretAccessKey = "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";
// AWS.config.region = "us-east-1";
// AWS.config.endpoint = "storagegateway.us-east-1.amazonaws.com";
// AWS.config.credentials = "credentials";



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
dotenv.load();

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
