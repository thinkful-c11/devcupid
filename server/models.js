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
      passions: {type: Object},
      roles: {type: Object},
      languages: {type: Object},
      speciality: {type: Object},
      softwareTools: {type: Object}
    }
  },
  personality: {
  },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teams' }]
});

const TeamSchema = mongoose.Schema({
  createdBy: { type: String, required: true },
  admins: [{ type: String, required: true }],
  // Basic info, mostly copied from GitHub org format
  url: String,
  name: { type: String, required: true },
  description: String,
  avatar_url: String,
  company: String,
  location: String,
  email: String,

  // We could consider adding GitHub org integration like this:
  // https://developer.github.com/v3/orgs/
  gitHub: Object,

  // Roles, doubles as roster and may be duplicates of above:
  // TODO: expand this set as needed but try to keep it relatively generic
  developers: [ String ],
  founders: [ String ],
  projectManagers: [ String ],
  designers: [ String ],

  // Team desires, i.e. searchable by users:
  desiredRoles: {
    developers: Boolean,
    founders: Boolean,
    projectManagers: Boolean,
    designers: Boolean
  },

  // The below are possible extensions to the search feature
  // Desired languages will map to the above language schema
  desiredLanguages: {type: Object},
  desiredPassions: {type: Object},
  desiredSpecialty: {type: Object},
  desiredSoftwareTools: {type: Object}
});

module.exports = {
  Users: mongoose.model('Users', UserModel),
  Languages: mongoose.model('Languages', LanguageSchema),
  Teams: mongoose.model('Teams', TeamSchema)
};
