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
app.use(require('body-parser').json());
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
        // console.log(user)
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
    Users.findOne({ 'gitHub.id': githubUser.id }).exec()
    .then(user => {
      if (!user) {
        Users.create({
          onboarded: false,
          gitHub: {
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
          }
        }).then(newUser => res.json(newUser));
      } else {
        res.json(user);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }
);

function deepUpdate(update) {
   const setObject = {};
   Object.keys(update).forEach((key) => {
    if (typeof update[key] === 'object') {
      Object.keys(update[key]).forEach((subkey) => {
        setObject[`${key}.${subkey}`] = update[key][subkey];
      });
    } else {
      setObject[key] = update[key];
    }
  });
  return setObject;
}

// passport.authenticate('github', { failureRedirect: '/' }
app.put('/update-user/:userId', (req, res) => {
    Users.findOneAndUpdate(
      { 'gitHub.id': req.params.userId }, 
      { $set: deepUpdate(req.body) }, 
      { new: true }).exec()
    .then(profile => {
      res.json(profile);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/profile', (req, res) => {
  // our database should be 'in sync' with githubs,
  // github object on Users model should update when 
  // github updates.
  // To do that, we will update our database every time a profile is viewed.
});

(function runServer(dbUrl = process.env.TEST_DATABASE_URL, port = process.env.PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUrl, err => {
      if (err) {
        return reject(err);
      }
      app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
})();