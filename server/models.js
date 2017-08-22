// 'use strict';
const express = require("express");
const mongoose = require("mongoose");
const devCupid = mongoose.Schema({

});
devCupid.methods.apiRepr = function() {
    return {
        id: this._id,

    };
};
const fillerHere = mongoose.model("DevCupid", devCupid);
module.exports = { DevCupid };