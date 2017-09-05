const path = require('path');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const faker = require('faker');
const bodyParser = require ('body-parser');
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
    const accessen = req.user.gitHub.accessToken;
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
    return res.json(req.user);
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

// Alternate Profile Endpoint
app.get('/api/profile/me',
  passport.authenticate('bearer', {session: false}), (req, res) => {
    return res.json(req.user);
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

// TODO: Technically the below should probably be a PATCH.
app.put('/api/update-skills/:skill/:userId',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    const skill = req.params.skill;
    const key = `profile.skills.${skill}`;
    
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
    'profile.name': qry.name,
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

function delay(t) {
  // delay function used to delay a promise
  // initially used to test SearchLoadingNotifier component
   return new Promise(function(resolve) { 
       setTimeout(resolve, t);
   });
}

function regexFix(param) {
  // ignore non selected queries
  if (!param) return /.*?/;
  return new RegExp('^' + param, 'i');
}

// Search endpoint to use the queryFilter function
app.get('/api/search', (req, res) => {
  const q = req.query;
  console.log(q);
  Users.find()
  .where({ 'gitHub.login': { $regex : regexFix(q.login) } })
  .where({ 'profile.name': { $regex : regexFix(q.name) } })
  .where({[`${!q.languages ? 'onboarded' : [`profile.skills.languages.${q.languages}._active`]}`]: true })
  .where({[`${!q.roles ? 'onboarded' : [`profile.skills.roles.${q.roles}`]}`]: true })
  .where({ onboarded: true })
  .then(user => {
    res.json(user);
  });
});

app.get('/api/search/all', (req, res) => {
  Users.find()
  .then(allUsers => {
    delay(1000).then(() => {
      res.json(allUsers);
    });
  });
});

app.get('/api/fake-users', (req, res) => {
  const fakeUsers = [];
  for (let i = 0; i < 100; i++) {
    fakeUsers.push({
    onboarded: true,
    profile: {
            twitter: faker.internet.url(),
            linked_in: faker.internet.url(),
            blog: faker.internet.url(),
            personal_website: faker.internet.url(),
            bio: faker.lorem.paragraph(),
            email: faker.internet.email(),
            company: faker.company.companyName(),
            remoteOk: faker.random.boolean(),
            location: faker.address.state(),
            personalTitle: faker.hacker.noun(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            avatar_url: faker.image.image(),
            skills: {
                softwareTools: [faker.hacker.noun(), faker.hacker.noun(), faker.hacker.noun()],
                speciality: {
                    Mobile: faker.random.boolean(),
                    CRM: faker.random.boolean(),
                    Blog: faker.random.boolean(),
                    Web: faker.random.boolean(),
                    UI: faker.random.boolean(),
                    UX: faker.random.boolean()
                },
                roles: {
                    'Front-End Web Developer': faker.random.boolean(),
                    'Back-End Web Developer': faker.random.boolean(),
                    'Full-Stack Web Developer': faker.random.boolean(),
                    'Web Designer': faker.random.boolean(),
                    'UI Engineer': faker.random.boolean(),
                    'UX Engineer': faker.random.boolean(),
                    'Database Architect': faker.random.boolean(),
                    Founder: faker.random.boolean(),
                    Investor: faker.random.boolean(),
                    DevOps: faker.random.boolean(),
                    Developer: faker.random.boolean(),
                    Designer: faker.random.boolean()
                },
                passions: {
                    'Ed Tech': faker.random.boolean(),
                    'Machine Learning': faker.random.boolean(),
                    Design: faker.random.boolean(),
                    UI: faker.random.boolean(),
                    UX: faker.random.boolean(),
                    'Fin Tech': faker.random.boolean(),
                    'Social Media': faker.random.boolean(),
                    'Big Data': faker.random.boolean(),
                    'Data Science': faker.random.boolean(),
                    B2B: faker.random.boolean(),
                    'Internet of Things': faker.random.boolean(),
                    Linux: faker.random.boolean()
                },
                languages: {
                    JavaScript: {
                        _active: faker.random.boolean(),
                        React: faker.random.boolean(),
                        Redux: faker.random.boolean(),
                        Angular: faker.random.boolean(),
                        "Angular 2/4": faker.random.boolean(),
                        Mongoose: faker.random.boolean(),
                        JQuery: faker.random.boolean(),
                        Vue: faker.random.boolean(),
                        Node: faker.random.boolean()
                    },
                    HTML5: {
                        _active: faker.random.boolean(),
                        Pug: faker.random.boolean()
                    },
                    CSS3: {
                        _active: faker.random.boolean(),
                        SASS: faker.random.boolean(),
                        LESS: faker.random.boolean(),
                        Bootstrap: faker.random.boolean(),
                        Foundation: faker.random.boolean(),
                        Materialize: faker.random.boolean(),
                        'CSS Grid': faker.random.boolean(),
                        'Responsive Design': faker.random.boolean(),
                        'Mobile First': faker.random.boolean()
                    },
                    C: {
                        _active: faker.random.boolean()
                    },
                    'C++': {
                        _active: faker.random.boolean()
                    },
                    'C#': {
                        _active: faker.random.boolean()
                    },
                    Java: {
                        _active: faker.random.boolean(),
                        Swing: faker.random.boolean(),
                        'Spring Boot': faker.random.boolean(),
                        Guava: faker.random.boolean()
                    },
                    PHP: {
                        _active: faker.random.boolean(),
                        Laravel: faker.random.boolean(),
                        Dispatch: faker.random.boolean()
                    },
                    Python: {
                        _active: faker.random.boolean(),
                        Django: faker.random.boolean(),
                        Flask: faker.random.boolean()
                    },
                    Perl: {
                        _active: faker.random.boolean()
                    },
                    Ruby: {
                        _active: faker.random.boolean(),
                        Rails: faker.random.boolean(),
                        Sinatra: faker.random.boolean()
                    },
                    Go: {
                        _active: faker.random.boolean()
                    },
                    Rust: {
                        _active: faker.random.boolean()
                    },
                    Scala: {
                        _active: faker.random.boolean()
                    },
                    Clojure: {
                        _active: faker.random.boolean(),
                        Leiningen: faker.random.boolean(),
                        Ring: faker.random.boolean(),
                        Om: faker.random.boolean()
                    },
                    'Swift/Objective-C': {
                        _active: faker.random.boolean()
                    },
                    Elm: {
                        _active: faker.random.boolean()
                    },
                    'F#': {
                        _active: faker.random.boolean()
                    }
                }
            }
        },
    gitHub: {
      id: faker.random.number(),
      bio: faker.lorem.paragraph(),
      hireable: faker.random.boolean(),
      email: faker.internet.email(),
      location: faker.address.state(),
      blog: faker.internet.url(),
      company: faker.company.companyName(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      html_url: faker.internet.url(),
      avatar_url: faker.image.image(),
      login: faker.internet.userName()
    }
  })
  }
  
  Users.create(fakeUsers)
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    console.log(err);
  });
});

// Teams Endpoints
// TODO: Look at the /api/teams eps and maybe reconfig as some take a userId from the body and others from queries.

// Creates a team, setting the current user as admin and creator
app.post('/api/teams',
  // Only authenticated users can create teams
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    let team;
    Teams
      .create(
      {
        createdBy: req.body.userId,
        admins: [req.body.userId],
        url: '',
        name: req.body.teamName,
        description: req.body.teamDescription || '',
        avatar_url: req.body.teamAvatarUrl || '',
        company: req.body.teamCompany || '',
        location: req.body.teamLocation || '',
        email: req.body.teamEmail || ''
      })
      .then(_team => {
        team = _team;
        Users
          .findOneAndUpdate(
            { 'gitHub.id': req.body.userId },
            { $push: { teams: _team._id } },
            { new: true })
          .exec()
          .then(() => {
            res.status(201).json(team);
          });
      })
      .catch(error => {
        console.error(error);
        res.sendStatus(500);
      });
  });

// Returns a list of a single users teams
app.get('/api/teams',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    Users
      .findOne({ 'gitHub.id': req.query.userId })
      .populate('teams')
      .exec()
      .then(user => {
        res.json(user.teams);
      })
      .catch(error => {
        console.error(error);
        res.status(500);
      });
  });

// Return a single team by id.
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

// Updates a team
// TODO: make sure there is data validation on the front endpoint
// to check that a user is only updating his/her own team.
// TODO: Ensure client is only using this for [url, name, description, avatar_url, company, location, email, and possibly GitHub]
app.patch('/api/teams/:teamId',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    const key = req.body.key;
    const value = req.body.value;
    Teams
      .findOneAndUpdate(
        { _id: req.params.teamId },
        { $set: { [key]: value } },
        {new: true})
      .exec()
      .then(team => {
        res.status(201).json(team);
      })
      .catch(error => {
        console.error(error);
        res.status(500);
      });
  });

// Adds a team to a user and a user to a team.
// TODO: Ensure client validation of user permission
app.patch('/api/teams/:teamId/members',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    const key = req.body.key;
    const newMember = req.body.newMember;
    Users
      .findOneAndUpdate(
        { 'gitHub.id': newMember.gitHub.id },
        { $push: { teams: req.params.teamId } })
      .exec()
      .then(() => {
        Teams
          .findOneAndUpdate(
            { _id: req.params.teamId },
            { $push: { key: newMember } },
            { new: true })
          .exec()
          .then(team => {
            res.status(201).json(team);
          });
      })
      .catch(error => {
        console.error(error);
        res.status(500);
      });
  });

// Removes a team from a user doc and a user from a team.
app.delete('/api/teams/:teamId/members',
  passport.authenticate('bearer', {session: false}),
  (req, res) => {
    // Key is the field from which the member is being deleted
    const key = req.body.key;
    const deleteMember = req.body.deleteMember;
    Users
      .findOneAndUpdate(
        { 'gitHub.id': deleteMember.gitHub.id },
        // Essentially the member to be deleted should be updated on client and sent over to db to update there.
        { $pull: { teams: req.params.teamId } })
      .exec()
      .then(() => {
        Teams
          .findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { key: deleteMember.gitHub.id } },
            { new: true})
          .exec()
          .then(team => {
            res.status(201).json(team);
          });
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
  console.log('INVALID ENDPOINT', req.url);
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
