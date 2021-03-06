const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const MockStrategy = require('./mock-strategy').Strategy;
const { Users } = require('../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((user, done) => {
  done(null, user.id);
});

// Default cb function for authing a user, finding and updating in db.
const strategyCallback = (accessToken, refreshToken, user, cb) => {
  user = user._json;
  Users
    .findOneAndUpdate({ 'gitHub.id': user.id },
    {$set:
    {
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
      'gitHub.bio': user.bio || ''
    } },
  { new: true, upsert: true }, (error, user) => {
    return cb(error, user);
  });
};

// Defines a mock strategy to be used for testing
const strategyForEnv = () => {
  let authStrategy;
  let bearerStrategy;
  console.log('CURRENT ENV IS:', process.env.NODE_ENV);
  switch (process.env.NODE_ENV) {
  case 'production':
  case 'development':
    authStrategy = new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback'
    }, strategyCallback);
    bearerStrategy = new BearerStrategy (
      (token, done) => {
        Users.findOne({ 'gitHub.accessToken': token }, (err, user) => {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          return done(null, user, { scope: 'all'} );
        });
      }
    );
    break;

  default:
    authStrategy = new MockStrategy('github', strategyCallback);
    bearerStrategy = new MockStrategy('bearer', strategyCallback);
    break;
  }

  passport.use(authStrategy);
  passport.use(bearerStrategy);
  return;
};

strategyForEnv();
