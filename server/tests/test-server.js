// Chai
const chai=require('chai');
const should=require('chai').should();
const chaiHttp=require('chai-http');

// Backend requirements and files
const mongoose=require('mongoose');
const {DATABASE_URL}=require('../../config/config');
const {app,runServer}=require('../server');
const {Users,Languages}=require('../models');

// HTTP integration for testing with chai
chai.use(chaiHttp);

describe('App', function() {

    // Run the server before we test
    before(function() {
        return runServer();
    });

    // Close the server once we finish testing
    after(function() {
        return closeServer();
    });

    // Tests for GET
    describe('GET endpoints', function(){
        // Testing for app.get('/api/profile/me')
        it("Should get the GitHub user profile"){
            // Stuff
        }
    });
});