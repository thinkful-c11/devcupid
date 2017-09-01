const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const faker = require('faker');
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {Users,Languages} = require('./models');

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

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('/index.html'));
});

// GitHub Auth (automatically updates user in DB on login)
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: '/api/auth/github/callback'
},
  (accessToken, refreshToken, user, cb) => {
    user = user._json;
    Users
      .findOneAndUpdate({ 'gitHub.id': user.id },
      {$set: {
        onboarded: false,
        'gitHub.accessToken': accessToken,
        'gitHub.id': user.id,
        'gitHub.login': user.login,
        'gitHub.avatar_url': user.avatar_url || '',
        'gitHub.html_url': user.html_url,
        'gitHub.name': user.name || '',
        'gitHub.company': user.company || '',
        'gitHub.blog': user.blog || '',
        'gitHub.location': user.location || '',
        'gitHub.email': user.email || '',
        'gitHub.hireable': user.hireable || '',
        'gitHub.bio': user.bio || ''}
      },
        {new: true, upsert: true}, (error, user) => {
          return cb(error, user);
        }
      );
  }));

// Bearer strategy
passport.use (
  new BearerStrategy (
    (token, done) => {
      Users.findOne({ 'gitHub.accessToken': token }, (err, user) => {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user, { scope: 'all'} );
      });
    }
  )
);

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
  // console.log('REQ.BODY:', req.body);
  // console.log('languages: ', req.body.profile.skills.languages)
  // console.log('deepUpdate: ', deepUpdate(req.body))
  // console.log(req.param.userId);
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
    // console.log('REQ.BODY:', req.body);
  // console.log('languages: ', req.body.profile.skills.languages)
  // console.log('req body:', req.body);
  const skill = req.params.skill;
  const key = `profile.skills.${skill}`;
  console.log(req.body);
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

app.get('/api/fake-users', (req, res) => {
  const randomUserSchema = {
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
  };
  const fakeUsers = Array(100).fill(randomUserSchema);
  
  Users.create(fakeUsers)
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    console.log(err);
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

// RUN SERVER
function runServer(dbUrl = process.env.TEST_DATABASE_URL, port = process.env.PORT) {
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
module.exports = {app, runServer, closeServer};
