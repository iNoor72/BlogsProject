const express = require('express');
//const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://iNoor:noor123@cluster0.ttlwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/stats/:pid', (req, res) => {
  var player = req.params.pid;
  const url = 'https://apex-legends.p.rapidapi.com/stats/PS4/' + player;
  var options = {
    method: 'GET',
    url: url, //Needs to be edited to /PS4/entered ID
    headers: {
      'x-rapidapi-host': 'apex-legends.p.rapidapi.com',
      'x-rapidapi-key': '3db43a4741msh0b1aa85c131e75fp173cebjsndb70a59f20c1'
    }
  };

  axios.request(options).then(function (response) {
    var player = response;
  }).catch(function (error) {
    console.error(error);
  });

  res.render('stats', {title: 'Stats', player});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});