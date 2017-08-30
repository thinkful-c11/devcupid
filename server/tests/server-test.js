// Chai
const chai = require('chai');
const chaiHttp = require('chai-http');

// Backend requirements and files
const mongoose = require('mongoose');
const { DATABASE_URL } = require('../../config/config');
const { app, runServer, closeServer } = require('../server');
const { Users, Languages } = require('../models');

// HTTP integration for testing with chai
chai.should();
chai.use(chaiHttp);

const tearDownDb = () => {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};

describe('API Tests', function() {
    // Run the server before we test.
  before(function() {
    return runServer();
  });
    // Wipe the db after each test.
  afterEach(function() {
    return tearDownDb();
  });
    // Close the server once we finish testing.
  after(function() {
    return closeServer();
  });

  // Test constants
  const mockGitHubId = 123456;
  const testProfile = {
    profile: {
      avatar_url: 'url string',
      name: 'Something differet to test',
      personalTitle: 'Something differet to test',
      location: 'Something differet to test',
      remoteOk: true,
      company: 'Something differet to test',
      email: 'Something differet to test',
      bio: 'Something different to test',
      personal_website: 'website',
      blog: 'blog',
      linked_in: 'LinkedIn',
      twitter: 'twitter',
      skills: {
        passions: { 'passion': true },
        roles: { 'role': true },
        languages: {
          javascript: {
            _active: true,
            React: true
          }
        },
        speciality: { 'speciality': true },
        softwareTools: { 'tool': true }
      }
    }
  };
  const testSkill = {
    passions: { 'passion': true },
  };

  describe('Serving the Client', function() {
    it('should serve index.html on GET to root', function() {
      return chai.request(app)
      .get('/')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.html;
      });
    });

    it('should serve index.html on GET to any non /api/ endpoint', function() {
      return chai.request(app)
      .get('/thisisnotavalidendpoint')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.html;
      });
    });

    it('should serve index.html on GET to not explicitly defined /api endpoints', function() {
      return chai.request(app)
      .get('/api/thisisabunchofgibberish')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.html;
      });
    });
  });

  describe('The /api/profile/me Endpoint', function() {
    it('should return a formatted user obj from the db after login', function() {
      return chai.request(app)
        /* Making initial call to auth endpoint to set and
           format mock user in the db.
           Assumes the /api/profile/me endpoint will return the
           authorized user.
        */
        .get('/api/auth/github/callback')
        .then(function() {
          return chai.request(app)
            .get('/api/profile/me')
            .then(function(res) {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.have.all.keys('gitHub');
              res.body.gitHub.should.have.all.keys(
                'accessToken',
                'login',
                'avatar_url',
                'html_url',
                'name',
                'company',
                'blog',
                'location',
                'email',
                'hireable',
                'bio',
                'id'
              );
            });
        });
    });
  });

  describe('The /api/update-user/:userId Endpoint', function() {
    it('should find and update the user in the db', function() {
      return chai.request(app)
      /*
        Set's mock user then updates it, expecting response to
        be the updated profile.
      */
      // TODO: figure out where I can test the below req object tests
        .get('/api/auth/github/callback')
        .then(function() {
          return chai.request(app)
            .put(`/api/update-user/${mockGitHubId}`)
            .set('Content-Type', 'application/json')
            .send(testProfile)
            .then(function(res) {
              // req.should.have.param('userId', 123456);
              // req.body.should.be.json;
              res.should.have.status(200);
              res.should.be.json;
              res.body.profile.should.deep.equal(testProfile.profile);
            });
        });
    });
  });

  describe('The /api/update-skills/:skill/:userId Endpoint', function() {
    it('should find and update the specific skills in the db', function() {
      return chai.request(app)
      //TODO: like above, still missing tests for the req obj
        .put(`/api/update-skills/passions/${mockGitHubId}`)
        .set('Content-Type', 'application/json')
        .send(testSkill)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.profile.skills.passions.should.deep.equal(testSkill.passions);
        });
    });
  });
});
