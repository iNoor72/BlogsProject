const express = require('express');
//const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
var axios = require("axios").default;

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
app.get('/', (req, res, next) => {
  res.redirect('/blogs');
  next()
});

// Middleware example
app.use((res,req,next) => {
console.log("Hello from middleare!");
next();
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/github/:id', (req,res,next) => {
    var options = {
    method: 'GET',
    url: 'https://api.github.com/users/'+req.params.id, 
  };

  axios.request(options).then(function (response) {
    let data;
    data = response.data;
    console.log(data);
  }).catch(function (error) {
    console.error(error);
  });
  res.render('stats', {title: 'Github'});
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});