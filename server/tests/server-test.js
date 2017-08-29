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

describe('The Built Client', function() {
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
