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
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

const middleware = function(req,res,next)  {

  //parse data

//save to db
  const user = new UserInfo(req.body);
  user.save()
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

app.get('/github/:id', (req,res) => {
    var options = {
    method: 'GET',
    url: 'https://api.github.com/users/'+req.params.id,
  };

  axios.request(options).then(function (response) {
    user = response.data;
    console.log(user);
    
  }).catch(function (error) {
    console.error(error);
  });

  res.render('stats', {title: 'Github'}, user);
});

//app.use(middleware);

//Add midlleware here to parse data and save to db.

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});