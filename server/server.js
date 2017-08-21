const path = require('path');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
// const BearerStrategy = require('passport-http-bearer').Strategy;
// const mongoose = require('mongoose');
// const bodyParser = require ('body-parser');

const app = express();
app.use(express.static(__dirname + '/../client/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('/index.html'));
});

// Configuring the GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    console.log("This is me refreshing the token I hope!");
    console.log("This is the accessToken",accessToken);
    console.log("This is the refreshToken",refreshToken);
    console.log("This is the profile",profile);
    console.log("This is the done",done);
  }
));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// app.get('/auth/github/callback', (req, res) => {
//     res.sendFile(path.resolve('/index.html'));
// });

app.listen(process.env.PORT, function() {
    console.log('App running on port', process.env.PORT);
});