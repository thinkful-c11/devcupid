const mongoose = require('mongoose');

const LanguageSchema = mongoose.Schema({
  javascript: {
    _active: {type:Boolean},
    React: {type:Boolean},
    Redux: {type:Boolean},
    Angular: {type:Boolean},
    'Angular 2/4': {type:Boolean},
    Mongoose: {type:Boolean},
    JQuery: {type:Boolean},
    Vue: {type:Boolean},
    'Node.js': {type:Boolean},
  },
  HTML5: {
    _active: {type:Boolean},
    Pug: {type:Boolean}
  },
  CSS3: {
    _active: {type:Boolean},
    SASS: {type:Boolean},
    LESS: {type:Boolean},
    Bootstrap: {type:Boolean},
    Foundation: {type:Boolean},
    Materialize: {type:Boolean},
    'CSS Grid': {type:Boolean},
    'Responsive Design': {type:Boolean},
    'Mobile First': {type:Boolean}
  },
  C: {_active: {type:Boolean}},
  'C++': {_active: {type:Boolean}},
  'C#': {_active: {type:Boolean}},
  Java: {
    _active: {type:Boolean},
    Swing: {type:Boolean},
    'Spring Boot': {type:Boolean},
    Guava: {type:Boolean}
  },
  PHP: {
    _active: {type:Boolean},
    Laravel: {type:Boolean},
    Dispatch: {type:Boolean}
  },
  Python: {
    _active: {type:Boolean},
    Django: {type:Boolean},
    Flask: {type:Boolean}
  },
  Perl: {_active: {type:Boolean}},
  Ruby: {
    _active: {type:Boolean},
    Rails: {type:Boolean},
    Sinatra: {type:Boolean}
  },
  '.NET': {_active: {type:Boolean}},
  Go: {_active: {type:Boolean}},
  Rust: {_active: {type:Boolean}},
  Scala: {_active: {type:Boolean}},
  Clojure: {
    _active: {type:Boolean},
    Leiningen: {type:Boolean},
    Ring: {type:Boolean},
    Om: {type:Boolean}
  },
  'Swift/Objective-C': {_active: {type:Boolean}},
  Elm: {_active: {type:Boolean}},
  'F#': {_active: {type:Boolean}},
});
const UserModel = mongoose.Schema({
  onboarded: {type: String},
  gitHub: {
    accessToken: {type: String},
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
    remoteOk: {type: Boolean},
    avatar_url: {type: String},
    name: {type: String},
    company: {type: String},
    personal_website: {type: String},
    location: {type: String},
    email: {type: String},
    bio: {type: String},
    linked_in: {type: String},
    twitter: {type: String},
    blog: {type: String},
    skills: {
      passions: {type: Array},
      roles: {type: Array},
      languages: [LanguageSchema],
      speciality: {type: Array},
      softwareTools: {type: Array}
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
  Users: mongoose.model('Users', UserModel),
  Languages: mongoose.model('Languages', LanguageSchema)
};
