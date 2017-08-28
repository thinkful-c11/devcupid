import * as actions from '../actions/actions';
import * as ref from '../actions/refs';

const initialState = {
  loading: false,
  error: null,
  user: false,
  onboarded:false,
  gitHub: {},
  profile: {
    avatar_url: 'http://findicons.com/files/icons/85/kids/128/thumbnail.png',
    name: 'William',
    personalTitle: 'cool dude',
    location: 'ATL',
    remoteOk: 'yes',
    company: 'Myself',

    email: 'me@butt.co',

    bio: 'I was born then i went vegan',

    personal_website: 'profile.com',
    blog: 'blog.profile.com',
    linked_in: 'linkedin.com/profile',
    twitter: 'twitter.com/profile',

    skills: {
      passions: {},
      roles: [],
      languages: {},
      libraries: [],
      speciality: [],
      softwareTools: []
    },
  },
  onboardingQuestions: [
    {
      text: 'We pulled some info from GitHub. If you\'d like to, go ahead and update it:',
      type: 'signup', //enumerated value 'multiple choice', etc.
      choices: [
        {
          key: 'remoteOk',
          label: 'Are you willing to work remotely?'
        },
        {
          key: 'avatar_url',
          label: 'What\'s your avatar url?'
        },
        {
          key: 'name',
          label: 'What\'s your name?'
        },
        {
          key: 'company',
          label: 'What company do you work for?'
        },
        {
          key: 'personal_website',
          label: 'Do you have a personal website?'
        },
        {
          key: 'location',
          label: 'Where are you located?'
        },
        {
          key: 'email',
          label: 'What\'s your email?'
        },
        {
          key: 'linked_in',
          label: 'Do you have a LinkedIn account?'
        },
        {
          key: 'twitter',
          label: 'Do you have a Twitter?'
        },
        {
          key: 'blog',
          label: 'Do you have a personal blog?'
        },
      ]
    },
    {
      text: 'How would you describe yourself?',
      type: 'textInput', //enumerated value 'multiple choice', etc.
      choices: [
        {
          key: 'personalTitle',
          label: 'Personal Title'
        },
      ],
    },
    {
      text: 'Please write a short bio about yourself (to help us help you find great collaborators).',
      type: 'textInput', //enumerated value 'multiple choice', etc.
      choices: [
        {
          key: 'bio',
          label: 'Personal Bio'
        },
      ],
    },
    {
      text: 'Select some of the things you are passionate about.',
      type: 'checkbox',
      key: 'passions',
      choices: [
        'Ed Tech', 'Machine Learning', 'Design', 'UI', 'UX', 'Fin Tech', 'Social Media', 'Big Data', 'Data Science', 'B2B', 'Internet of Things', 'Linux'
      ]
    },
    {
      text: 'Select some of the roles you can perform.',
      type: 'checkbox',
      key: 'roles',
      choices: [
        'Front-End Web Developer', 'Back-End Web Developer', 'Full-Stack Web Developer', 'Web Designer', 'UI Engineer',
        'UX Engineer', 'Database Architect', 'Founder', 'Investor', 'DevOps', 'Developer', 'Designer'
      ]
    },
    {
      text: 'What (if any) languages and libraries are you competent with?',
      type: 'checkbox-nested',
      key: 'languages',
      choices: [
        {
          language: 'JavaScript',
          libraries: ['React', 'Redux', 'Angular', 'Angular 2/4', 'Mongoose', 'JQuery', 'Vue', 'Node']
        },
        {
          language: 'HTML5',
          libraries: ['Pug']
        },
        {
          language: 'CSS3',
          libraries: ['SASS', 'LESS', 'Bootstrap', 'Foundation', 'Materialize', 'CSS Grid', 'Responsive Design', 'Mobile First']
        },
        {
          language: 'C',
          libraries: []
        },
        {
          language: 'C++',
          libraries: []
        },
        {
          language: 'C#',
          libraries: []
        },
        {
          language: 'Java',
          libraries: ['Swing', 'Spring Boot', 'Guava']
        },
        {
          language: 'PHP',
          libraries: ['Laravel', 'Dispatch']
        },
        {
          language: 'Python',
          libraries: ['Django', 'Flask']
        },
        {
          language: 'Perl',
          libraries: []
        },
        {
          language: 'Ruby',
          libraries: ['Rails', 'Sinatra']
        },
        {
          language: 'Go',
          libraries: []
        },
        {
          language: 'Rust',
          libraries: []
        },
        {
          language: 'Scala',
          libraries: []
        },
        {
          language: 'Clojure',
          libraries: ['Leiningen', 'Ring', 'Om']
        },
        {
          language: 'Swift/Objective-C',
          libraries: []
        },
        {
          language: 'Elm',
          libraries: []
        },
        {
          language: 'F#',
          libraries: []
        },
      ]
    },
    {
      text: 'What are some of your design specialties?',
      type: 'checkbox',
      key: 'speciality',
      choices: [
        'Mobile', 'CRM', 'Blog', 'Web', 'UI', 'UX'
      ]
    },
    {
      text: 'What software tools do you have experience with?',
      type: 'checkbox',
      key: 'softwareTools',
      choices: [
        'Sketch3', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe XD', 'XCode', 'Eclipse', 'Visual Studio', 'Trello', 'GitHub', 'Git', 'Postman', 'Slack', 'Git Kraken'
      ]
    },
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

  case ref.SIGNUP_HANDLER:
    return Object.assign( {}, state, {
      profile: Object.assign( {}, state.profile, {
        [action.key]: action.value
      })
    });

  case ref.TEXTINPUT_HANDLER:
    return Object.assign( {}, state, {
      profile: Object.assign( {}, state.profile, {
        [action.key]: action.value
      })
    });

  //Login User Reducers
  case ref.LOGIN_REQUEST:
    return Object.assign({}, state, {
      loading: true
    });
  //TODO: figure out a way to handle nulls in action.gitHub
  case ref.LOGIN_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      user: true,
      gitHub: action.gitHub
    });
  case ref.LOGIN_ERROR:
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });

  //Update Profile Reducers
  case ref.UPDATE_REQUEST:
    return Object.assign({}, state, {
      loading: true
    });

  case ref.UPDATE_SUCCESS:
    return Object.assign({}, state, {
      loading: false,
      profile: action.profile
    });

  case ref.UPDATE_ERROR:
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });

  case ref.CHECKBOX_HANDLER:
    return Object.assign( {}, state, {
      profile: Object.assign( {}, state.profile, {
        skills: Object.assign( {}, state.profile.skills, {
          [action.key]: action.obj
        })
      })
    });
  case ref.CHECKBOXNESTED_HANDLER:
    return Object.assign( {}, state, {
      profile: Object.assign( {}, state.profile, {
        skills: Object.assign( {}, state.profile.skills, {
          languages: action.body
        })
      })
    });

  case ref.ASSIGN_GITHUB_PROFILE:
    return Object.assign({}, state, {
      profile: Object.assign({}, state.profile, {
        avatar_url: state.gitHub.avatar_url,
        name: state.gitHub.name,
        company: state.gitHub.company,
        blog: state.gitHub.blog,
        location: state.gitHub.location,
        email: state.gitHub.email
      })
    });

  default:
    return state;
  }
};

export default reducer;
