const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
// const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Users, Languages } = require('./models');

const secret = {
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  PORT: process.env.PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
};

const app = express();
app.use(require('body-parser').json());
app.use(express.static(__dirname + '/../client/dist'));
require('./util/auth');
app.use(passport.initialize());
app.use(passport.session());


// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('/index.html'));
});

// Authenticate into GitHub
app.get('/api/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/api/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    const accessToken = req.user.gitHub.accessToken;
    res.cookie('accessToken', accessToken, {expires: 0});
    res.redirect('/');
  }
);
// Log user out of GitHub
app.get('/api/auth/github/logout', (req, res) => {
  req.logout();
  res.clearCookie('accessToken');
  res.redirect('/');
});

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
  Users.findOneAndUpdate(
    { 'gitHub.id': req.params.userId },
    { $set: deepUpdate(req.body) },
    { new: true })
  .exec()
  .then(profile => {
    return res.json(profile);
  })
  .catch(err => {
    console.log(err);
  });
});

app.put('/api/update-skills/:skill/:userId', (req, res) => {
  const skill = req.params.skill;
  const key = `profile.skills.${skill}`;
  Users.findOneAndUpdate(
    { 'gitHub.id': req.params.userId },
    { $set: {[key]: req.body[skill]}},
    { new: true }).exec()
  .then(profile => {
    return res.json(profile);
  })
  .catch(err => {
    console.log(err);
  });
});

function updateProfile(ghUser) {
  return {
    gitHub: {
      id: ghUser.id,
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
    }
  };
}

// Alternate Profile Endpoint
app.get('/api/profile/me',
  passport.authenticate('bearer', {session: false}), (req, res) => {
    return res.json({
      gitHub: req.user.gitHub
    });
  }
);

// app.get('/api/profile/:id',
//     // passport.authenticate('bearer', {session: false}),
//     (req, res) => {
//       console.log('/API/PROFILE/:ID');
//     // our database should be 'in sync' with githubs,
//     // github object on Users model should update when
//     // github updates.
//     // To do that, we will update our database every time a profile is viewed.
//       Users.findOne({'gitHub.id': req.params.id})
//     .then(user => {
//       fetch(`https://api.github.com/users/${user.gitHub.login}`)
//       .then(res => res.json())
//       .then(ghUser => {
//         // Currently hard coded in local host, replace later with HTTP or something else
//         fetch(
//           `http://localhost:8080/api/update-user/${ghUser.id}`,
//           { // options
//             method: 'PUT',
//             body: updateProfile(ghUser),
//             headers: {'Content-Type': 'application/json'}
//           }
//         )
//         .then(res => res.json())
//         .then(updatedUser => {
//           res.json(updatedUser);
//         })
//         .catch(err => console.log(err));
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({error: 'Something went wrong oops'});
//       });
//     });
//     });

// Create query entries for searching other developers and designers
function queryFilter(qry) {
  // Create queries from profile keys
  const validQueries = {
    'gitHub.login': qry.login,
    'profile.skills.languages': qry.languages,
    'profile.skills.roles': qry.roles,
    'gitHub.name': qry.name,
    'profile.linked_in': qry.linked_in,
    'profile.twitter': qry.twitter,
    'profile.email': qry.email,
    'profile.location': qry.location,
    'profile.company': qry.company
  };

  // Get the results of the search from the queries
  const result = {};
  for (let key in validQueries) {
    if (validQueries[key] !== undefined) {
      // case insensitive query
      result[key] = { $regex : new RegExp(validQueries[key], 'i') };
    }
  }
  return result;
}

// Search endpoint to use the queryFilter function
app.get('/api/search', (req, res) => {
  const searchableParams = queryFilter(req.query);
  Users.find(searchableParams)
  .then(user => {
    res.json(user);
  });
});

app.get('/api/search/all', (req, res) => {
  Users.find()
  .then(allUsers => {
    res.json(allUsers);
  });
});

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
// app.get(/^(?!\/api(\/|$))/, (req, res) => {
//   const index = path.resolve(__dirname + '/../client/dist', 'index.html');
//   res.sendFile(index);
// });
app.get('/*', (req, res) => {
  const index = path.resolve(__dirname + '/../client/dist', 'index.html');
  res.sendFile(index);
});

let server;
// RUN SERVER
function runServer(dbUrl = process.env.TEST_DATABASE_URL, port = process.env.PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbUrl, {
      useMongoClient: true }, err => {
        if (err) {
          return reject(err);
        }
        server = app.listen(port, () => {
          console.log(`Your app is listening on port ${port}`);
          resolve(server);
        })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
      });
  });
}

// CLOSE SERVER
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

// Export out for tests
module.exports = { app, runServer, closeServer };
