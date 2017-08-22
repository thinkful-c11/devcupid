const path = require('path');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
// const BearerStrategy = require('passport-http-bearer').Strategy;
// const mongoose = require('mongoose');
// const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Users = require('./models');

const secret = {
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  PORT: process.env.PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
};

const app = express();
app.use(express.static(__dirname + '/../client/dist'));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve('/index.html'));
});

// Configuring the GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  },
  (accessToken, refreshToken, user, cb) => {
        // const githubId = profile.id
            // githubId: ,
            // accessToken: accessToken
        // };
        return cb(null, user);
    }
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    const githubUser = req.user._json;
    // githubUser.id might be a number
    console.log('1')
    console.log('githubUser', githubUser)
    Users.findOne({ 'gitHub.id': githubUser.id }).exec()
    .then(user => {
      console.log('2')
      if (!user) {
        console.log('3')
        Users.create({
          id: githubUser.id,
          login: githubUser.login,
          avatar_url: githubUser.avatar_url,
          html_url: githubUser.html_url,
          name: githubUser.name,
          company: githubUser.company,
          blog: githubUser.blog,
          location: githubUser.location,
          email: githubUser.email,
          hireable: githubUser.hireable,
          bio: githubUser.bio
        }).then(newUser => {console.log('4'); return res.json(newUser)});
      } else {
        console.log('5')
        res.json(user);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
);

app.get('/login-success', (req, res) => {
  
});

app.listen(process.env.PORT, function() {
    console.log('App running on port', process.env.PORT);
});