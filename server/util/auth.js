const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const MockStrategy = require('./mock-strategy').Strategy;
const { Users } = require('../models');

const strategyCallback = (accessToken, refreshToken, user, cb) => {
  user = user._json;
  Users
    .findOneAndUpdate({ 'gitHub.id': user.id },
    {$set:
    {
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
      'gitHub.bio': user.bio || ''
    } },
  { new: true, upsert: true }, (error, user) => {
    return cb(error, user);
  });
};

// Defines a mock strategy to be used for testing
const strategyForEnv = () => {
  let strategy;
  switch (process.env.NODE_ENV) {
  case 'production':
    strategy = new GitHubStrategy({
      clientID: process.enf.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback'
    }, strategyCallback);
    break;

  default:
    strategy = new MockStrategy('github', strategyCallback);
  }

  return strategy;
};
