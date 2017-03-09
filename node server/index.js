// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://ishaydahan:12661266@ds141118.mlab.com:41118/pirsomat');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

// Models
var Request = mongoose.model('points', {
    _id: String,
    points: Number,
    used: Array,
});

// Routes

// Get reviews
app.post('/api/profile', function(req, res) {

  Request.findById(req.body.userid, function(err, p) {
    if (!p){
      //create
      Request.create({
        _id: req.body.userid,
        points: 0,
        used: [],
      }, function(err, request) {
          if (err){
            console.log('errorrrr')
          }else{
            res.json("0"); // return all reviews in JSON format

          }
      });

    } else {
      res.json(p.points); // return all reviews in JSON format

    }
  });
});


    // create review and send back all reviews after creation
    app.post('/api/posts', function(req, res) {
      Request.findById(req.body.userid, function(err, p) {
        if (!p){
          //create
          Request.create({
            _id: req.body.userid,
            points: req.body.points,
            used: [req.body.postid],
          }, function(err, request) {
              if (err){
                console.log('errorrrr')
              }else{
                res.end("1");
              }
          });

        } else {
          if (p.used.find(o => o === req.body.postid)){
            res.json("0"); // return all reviews in JSON format
          }else{
            // do your updates here
            p.points = p.points + parseInt(req.body.points);
            p.used.push(req.body.postid);
            p.save(function(err) {
              if (err){
                console.log('errorrrr')
              }
              else{
                res.json(p); // return all reviews in JSON format
              }
            });
          }
        }
      });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
