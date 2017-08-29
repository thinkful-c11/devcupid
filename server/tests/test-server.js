// Chai
const chai = require('chai');
const should = require('chai').should();
const chaiHttp = require('chai-http');

// Backend requirements and files
const mongoose = require('mongoose');
const { DATABASE_URL } = require('../../config/config');
const { app, runServer } = require('../server');
const { Users, Languages } = require('../models');

// HTTP integration for testing with chai
chai.use(chaiHttp);

describe('Blog Posts', () => {

    // Run the server before we test
  before(() => {
    return runServer();
  });

    // Close the server once we finish testing
  after(() => {
    return closeServer();
  });
});
