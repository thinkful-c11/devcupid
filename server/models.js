// 'use strict';
const express = require("express");
const mongoose = require("mongoose");
const userModel = mongoose.Schema({
    gitHub: {
        id: {type: String},
        login: {type: String},
        avatar_url: {type: String},
        html_url: {type: String},
        name: {type: String},
        company: {type: String},
        blog: {type: String},
        location: {type: String},
        email: {type: String},
        hireable: {type: Boolean},
        bio: {type: String}
    },
    userInput: {
        avatar_url: {type: String},
        name: {type: String},
        company: {type: String},
        personal_website: {type: String},
        location: {type: String},
        email: {type: String},
        bio: {type: String},
        social: {
            linked_in: {type: String},
            twitter: {type: String},
            blog: {type: String}
        }
    }
});
const techQuestions = mongoose.Schema({

});
const personality = mongoose.Schema({

});
userModel.methods.apiRepr = function() {
    return {
        id: this._id,

    };
};
const fillerHere = mongoose.model("UserModel", userModel);
module.exports = { DevCupid };