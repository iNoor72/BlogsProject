const Blog = require('../models/blog');
var axios = require("axios").default;

const blog_index = (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
      res.render('404', { title: 'Blog not found' });
    });
}

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

const blog_delete = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
}

const player_stats = (req,res) => {
  const id = req.params.pid;

var options = {
  method: 'GET',
  url: 'https://apex-legends.p.rapidapi.com/stats/PS4/i__Noor', //Needs to be edited to /PS4/entered ID
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
}

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete,
  player_stats
}