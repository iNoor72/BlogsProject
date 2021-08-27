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

// const github_repos = (req,res) => {
//   const userid = req.params.id;

// var options = {
//   method: 'GET',
//   url: 'https://api.github.com/users/' + userid +'/repos',
// };

// axios.request(options).then(function (response) {
//   var userRepos = response;
//   console.log(userRepos);
// }).catch(function (error) {
// 	console.error(error);
// });
// }

module.exports = {
  blog_index, 
  blog_details, 
  blog_create_get, 
  blog_create_post, 
  blog_delete
}