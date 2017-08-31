const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const { Users, Languages, Teams } = require('./models');

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

// Pull the user profile off of the db after auth.
app.get('/api/profile/me',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    return res.json({
      gitHub: req.user.gitHub
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

app.put('/api/update-user/:userId',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    Users
      .findOneAndUpdate(
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

app.put('/api/update-skills/:skill/:userId',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    const skill = req.params.skill;
    const key = `profile.skills.${skill}`;
    console.log('SKILL', req.body);
    Users
      .findOneAndUpdate(
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

// Teams Endpoints
app.get('/api/teams/:teamId',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    Teams
      .findOne({ _id: req.params.teamId })
      .then(team => {
        res.json(team);
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  });

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get('/*', (req, res) => {
  const index = path.resolve(__dirname + '/../client/dist', 'index.html');
  console.log('INVALID ENDPOINT');
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
