const mongoose = require("mongoose");
const UserModel = mongoose.Schema({
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
    profile: {
        personalTitle: {type: String},
        passions: {type: Array},
        remoteOk: {type: Boolean},
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
    },
    skills: {
        roles: {type: Array},
        languages: {type: Array},
        libraries: {type: Array},
        speciality: {type: Array},
        softwareTools: {type: Array}
    },
    personality: {
        
    }
});

UserModel.methods.apiRepr = function() {
    return {
        id: this._id,

    };
};
const Users = mongoose.model("Users", UserModel);
module.exports = { Users };