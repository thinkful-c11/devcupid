const mongoose = require("mongoose");
const LanguageSchema = mongoose.Schema({
    ".NET": {type:Boolean},
    C: {type:Boolean},
    "C#": {type:Boolean},
    "C++": {type:Boolean},
    CSS3:{
        SASS: {type:Boolean},
        LESS: {type:Boolean},
        Bootstrap: {type:Boolean},
        Foundation: {type:Boolean},
        Materialize: {type:Boolean},
        "CSS Grid": {type:Boolean},
        "Responsive Design": {type:Boolean},
        "Mobile First": {type:Boolean}
    },
    Clojure: {
        Leiningen: {type:Boolean},
        Ring: {type:Boolean},
        Om: {type:Boolean}
    },
    Elm: {type:Boolean},
    "F#": {type:Boolean},
    Go: {type:Boolean},
    HTML5:{
        Pug: {type:Boolean}
    },
    Java:{
        Swing: {type:Boolean},
        "Spring Boot": {type:Boolean},
        Guava: {type:Boolean}
    },
    javascript: {
        Angular: {type:Boolean},
        "Angular 2/4": {type:Boolean},
        jQuery: {type:Boolean},
        Mongoose: {type:Boolean},
        NodeJS: {type:Boolean},
        React: {type:Boolean},
        Redux: {type:Boolean},
        Vue: {type:Boolean}
    },
    Perl: {type:Boolean},
    PHP: {
        Laravel: {type:Boolean},
        Dispatch: {type:Boolean}
    },
    Python: {
        Django: {type:Boolean},
        Flask: {type:Boolean}
    },
    Ruby: {
        Rails: {type:Boolean},
        Sinatra: {type:Boolean}
    },
    Rust: {type:Boolean},
    Scala: {type:Boolean},
    "Swift/Objective-C": {type:Boolean}
});
const UserModel = mongoose.Schema({
    onboarded: {type: String},
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
        skills: {
            roles: {type: Array},
            languages: [LanguageSchema],
            speciality: {type: Array},
            softwareTools: {type: Array}
        },
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
    personality: {  
    }
});

// UserModel.methods.apiRepr = function() {
//     return {
//         firstName: this.name.split(' ')[0],
//         lastName: this.name.split(' ')[1],
//     };
// };

module.exports = {
    Users: mongoose.model("Users", UserModel),
    Languages: mongoose.model("Languages", LanguageSchema)
}