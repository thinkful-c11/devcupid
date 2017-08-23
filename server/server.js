const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');
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

// // Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/api/', (req, res) => {
  res.sendFile(path.resolve('/index.html'));
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
// app.get(/^(?!\/api(\/|$))/, (req, res) => {
//   const index = path.resolve(__dirname + '/../client/dist', 'index.html');
//   res.sendFile(index);
// });

// Configuring the GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback'
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

app.get('/api/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/api/auth/github/callback', 
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
app.put('/api/update-user/:userId', (req, res) => {
  console.log('req.body', req.body);
  Users.findOneAndUpdate(
    { 'gitHub.id': req.params.userId }, 
    { $set: deepUpdate(req.body) }, 
    { new: true }).exec()
  .then(profile => {
    return res.json(profile);
  })
  .catch(err => {
    console.log(err);
  });
});

function updateProfile(ghUser) {
  return JSON.stringify({
      login: ghUser.login,
      avatar_url: ghUser.avatar_url,
      html_url: ghUser.html_url,
      name: ghUser.name,
      company: ghUser.company,
      blog: ghUser.blog,
      location: ghUser.location,
      email: ghUser.email,
      hireable: ghUser.hireable,
      bio: ghUser.bio
  }) 
}

app.get('/profile/:id',
    // passport.authenticate('github', {failureRedirect:'/'}),
    (req, res) => {
    // our database should be 'in sync' with githubs,
    // github object on Users model should update when 
    // github updates.
    // To do that, we will update our database every time a profile is viewed.
    Users.findOne({'gitHub.id': req.params.id})
    .then(user => {
      fetch(`https://api.github.com/users/${user.gitHub.login}`)
      .then(res => res.json())
      .then(ghUser => {
        // res.send({ghUser:ghUser, user: user.gitHub});
        // const currentGithubProfile = updateProfile(ghUser);
        console.log(updateProfile(ghUser))
        fetch(
          `http://kyle-kylerogers334.c9users.io:8080/api/update-user/${ghUser.id}`, 
          {method: 'PUT', body: updateProfile(ghUser)}
        )
        .then(res => {
          return res.json()
        })
        .then(updatedUser => {
          res.json(updatedUser)
        })
        .catch(err => console.log(err));
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Something went wrong oops'});
      });
    })
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
