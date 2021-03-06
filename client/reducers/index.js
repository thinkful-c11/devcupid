import * as ref from "../actions/refs";

const initialState = {
	loading: false,
	error: null,
	user: false,
	currentProfileView: false,
	onboarded: false,
	// List of teams the user is on
	userTeams: [],
	// Team info held in state when viewing a team page
	activeTeam: {},
	gitHub: {
		login: "williamtwobit",
		avatar_url: "https://avatars3.githubusercontent.com/u/27362400?v=4",
		html_url: "https://github.com/williamtwobit",
		name: "William Martin",
		company: "",
		blog: "",
		location: "Atlanta",
		email: "",
		hireable: false,
		bio: "Just a lil baby coder",
		id: "27362400",
	},
	profile: {
		twitter: "",
		linked_in: "",
		blog: "",
		personal_website: "",
		bio: "",
		email: "",
		company: "",
		remoteOk: false,
		location: "",
		personalTitle: "",
		name: "",
		avatar_url: "",
		skills: {
			roles: {
				"Ed tech": false,
				"Front-End Web Developer": false,
				"Back-End Web Developer": false,
				"Full-Stack Web Developer": false,
				"Web Designer": false,
				"UI Engineer": false,
				"UX Engineer": false,
				"Database Architect": false,
				Founder: false,
				Investor: false,
				DevOps: false,
				Developer: false,
				Designer: false,
			},
			speciality: {
				"Ed tech": false,
				Mobile: false,
				CRM: false,
				Blog: false,
				Web: false,
				UI: false,
				UX: false,
			},
			softwareTools: {
				"Ed tech": false,
				Sketch3: false,
				"Adobe Photoshop": false,
				"Adobe Illustrator": false,
				"Adobe InDesign": false,
				"Adobe XD": false,
				XCode: false,
				Eclipse: false,
				"Visual Studio": false,
				Trello: false,
				GitHub: false,
				Git: false,
				Postman: false,
				Slack: false,
				"Git Kraken": false,
			},
			passions: {
				"Ed tech": false,
				"Ed Tech": false,
				"Machine Learning": false,
				Design: false,
				UI: false,
				UX: false,
				"Fin Tech": false,
				"Social Media": false,
				"Big Data": false,
				"Data Science": false,
				B2B: false,
				"Internet of Things": false,
				Linux: false,
			},
			languages: {
				JavaScript: {
					_active: false,
					React: false,
					Redux: false,
					Angular: false,
					"Angular 2/4": false,
					Mongoose: false,
					JQuery: false,
					Vue: false,
					Node: false,
				},
				HTML5: {
					_active: false,
					Pug: false,
				},
				CSS3: {
					_active: false,
					SASS: false,
					LESS: false,
					Bootstrap: false,
					Foundation: false,
					Materialize: false,
					"CSS Grid": false,
					"Responsive Design": false,
					"Mobile First": false,
				},
				C: {
					_active: false,
				},
				"C++": {
					_active: false,
				},
				"C#": {
					_active: false,
				},
				Java: {
					_active: false,
					Swing: false,
					"Spring Boot": false,
					Guava: false,
				},
				PHP: {
					_active: false,
					Laravel: false,
					Dispatch: false,
				},
				Python: {
					_active: false,
					Django: false,
					Flask: false,
				},
				Perl: {
					_active: false,
				},
				Ruby: {
					_active: false,
					Rails: false,
					Sinatra: false,
				},
				Go: {
					_active: false,
				},
				Rust: {
					_active: false,
				},
				Scala: {
					_active: false,
				},
				Clojure: {
					_active: false,
					Leiningen: false,
					Ring: false,
					Om: false,
				},
				"Swift/Objective-C": {
					_active: false,
				},
				Elm: {
					_active: false,
				},
				"F#": {
					_active: false,
				},
			},
		},
	},

	onboardingQuestions: [
		{
			text:
				"To make things a little easier, we went ahead and pulled some info from gitHub. Overwrite those items if you’d like, or just feel free to leave them as-is. Click on a value to change it.",
			type: "signup", //enumerated value 'multiple choice', etc.
			choices: [
				{
					key: "name",
					label: "What's your name?",
				},
				{
					key: "location",
					label: "Where are based out of?",
				},
				{
					key: "remoteOk",
					label: "Are you willing to work remotely?",
				},
				{
					key: "personalTitle",
					label:
						"In a few words, how would you describe your primary skillset?",
				},
				{
					key: "email",
					label: "What email address can you reliably be reached at?",
				},
				{
					key: "company",
					label: "What company do you currently work for?",
				},
				{
					key: "personal_website",
					label: "What's the URL of your personal website or portfolio?",
				},
				{
					key: "blog",
					label: "What's the URL of your personal blog, if you have one?",
				},
			],
		},
		{
			text:
				"Please write a short bio about yourself (to help us help you find great collaborators).",
			type: "textInput", //enumerated value 'multiple choice', etc.
			choices: [
				{
					key: "bio",
					label: "Personal Bio",
				},
			],
		},
		{
			text: "Select some of the things you are passionate about.",
			type: "checkbox",
			key: "passions",
			choices: [
				"Ed Tech",
				"Machine Learning",
				"Design",
				"UI",
				"UX",
				"Fin Tech",
				"Social Media",
				"Big Data",
				"Data Science",
				"B2B",
				"Internet of Things",
				"Linux",
			],
		},
		{
			text: "Select some of the roles you can perform.",
			type: "checkbox",
			key: "roles",
			choices: [
				"Front-End Web Developer",
				"Back-End Web Developer",
				"Full-Stack Web Developer",
				"Web Designer",
				"UI Engineer",
				"UX Engineer",
				"Database Architect",
				"Founder",
				"Investor",
				"DevOps",
				"Developer",
				"Designer",
			],
		},
		{
			text: "What (if any) languages and libraries are you competent with?",
			type: "checkbox-nested",
			key: "languages",
			choices: [
				{
					language: "JavaScript",
					libraries: [
						"React",
						"Redux",
						"Angular",
						"Angular 2/4",
						"Mongoose",
						"JQuery",
						"Vue",
						"Node",
					],
				},
				{
					language: "HTML5",
					libraries: ["Pug"],
				},
				{
					language: "CSS3",
					libraries: [
						"SASS",
						"LESS",
						"Bootstrap",
						"Foundation",
						"Materialize",
						"CSS Grid",
						"Responsive Design",
						"Mobile First",
					],
				},
				{
					language: "C",
					libraries: [],
				},
				{
					language: "C++",
					libraries: [],
				},
				{
					language: "C#",
					libraries: [],
				},
				{
					language: "Java",
					libraries: ["Swing", "Spring Boot", "Guava"],
				},
				{
					language: "PHP",
					libraries: ["Laravel", "Dispatch"],
				},
				{
					language: "Python",
					libraries: ["Django", "Flask"],
				},
				{
					language: "Perl",
					libraries: [],
				},
				{
					language: "Ruby",
					libraries: ["Rails", "Sinatra"],
				},
				{
					language: "Go",
					libraries: [],
				},
				{
					language: "Rust",
					libraries: [],
				},
				{
					language: "Scala",
					libraries: [],
				},
				{
					language: "Clojure",
					libraries: ["Leiningen", "Ring", "Om"],
				},
				{
					language: "Swift/Objective-C",
					libraries: [],
				},
				{
					language: "Elm",
					libraries: [],
				},
				{
					language: "F#",
					libraries: [],
				},
			],
		},
		{
			text: "What are some of your design specialties?",
			type: "checkbox",
			key: "speciality",
			choices: ["Mobile", "CRM", "Blog", "Web", "UI", "UX"],
		},
		{
			text: "What software tools do you have experience with?",
			type: "checkbox",
			key: "softwareTools",
			choices: [
				"Sketch3",
				"Adobe Photoshop",
				"Adobe Illustrator",
				"Adobe InDesign",
				"Adobe XD",
				"XCode",
				"Eclipse",
				"Visual Studio",
				"Trello",
				"GitHub",
				"Git",
				"Postman",
				"Slack",
				"Git Kraken",
			],
		},
	],
	searchResults: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ref.SIGNUP_HANDLER:
			return Object.assign({}, state, {
				profile: Object.assign({}, state.profile, {
					[action.key]: action.value,
				}),
			});

		case ref.TEXTINPUT_HANDLER:
			return Object.assign({}, state, {
				profile: Object.assign({}, state.profile, {
					[action.key]: action.value,
				}),
			});

		//Login User Reducers
		case ref.LOGIN_REQUEST:
			return Object.assign({}, state, {
				loading: true,
			});

		//TODO: figure out a way to handle nulls in action.gitHub
		case ref.LOGIN_SUCCESS:
			return Object.assign(
				{},
				state,
				{ loading: false, user: true, onboardProgress: -1 },
				action.user,
			);

		case ref.LOGIN_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});

		case ref.PROFILE_REQUEST:
			return Object.assign({}, state, {
				loading: true,
			});

		case ref.PROFILE_SUCCESS:
			return Object.assign({}, state, {
				currentProfileView: action.profile,
			});

		case ref.PROFILE_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});

		//Update Profile Reducers
		case ref.UPDATE_REQUEST:
			return Object.assign({}, state, {
				loading: true,
			});

		case ref.UPDATE_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				onboarded: action.onboarded,
				onboardProgress: action.progress,
				profile: action.profile,
			});

		case ref.UPDATE_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});

		case ref.CHECKBOX_HANDLER:
			return Object.assign({}, state, {
				profile: Object.assign({}, state.profile, {
					skills: Object.assign({}, state.profile.skills, {
						[action.key]: action.obj,
					}),
				}),
			});
		case ref.CHECKBOXNESTED_HANDLER:
			return Object.assign({}, state, {
				profile: Object.assign({}, state.profile, {
					skills: Object.assign({}, state.profile.skills, {
						languages: action.body,
					}),
				}),
			});

		case ref.ASSIGN_GITHUB_PROFILE:
			return Object.assign({}, state, {
				profile: Object.assign({}, state.profile, {
					avatar_url: state.gitHub.avatar_url,
					name: state.gitHub.name,
					company: state.gitHub.company,
					blog: state.gitHub.blog,
					location: state.gitHub.location,
					email: state.gitHub.email,
					bio: state.gitHub.bio,
				}),
			});

		case ref.SEARCH_REQUEST:
			return Object.assign({}, state, {
				loading: true,
			});

		case ref.SEARCH_SUCCESS: {
			return Object.assign({}, state, {
				loading: false,
				searchResults: action.results,
			});
		}

		case ref.SEARCH_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});

		// Team Reducers
		case ref.TEAM_REQUEST:
			return Object.assign({}, state, {
				loading: true,
			});
		case ref.CREATE_TEAM_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				activeTeam: action.team,
				teams: action.teams,
				newTeam: true,
			});
		case ref.SINGLE_TEAM_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				activeTeam: action.team,
			});
		case ref.TEAM_LIST_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				userTeams: action.teams,
			});
		case ref.TEAM_ADD_MEMBER_SUCCESS:
			console.log(action.body);
			return state;
		case ref.TEAM_ERROR:
			return Object.assign({}, state, {
				loading: false,
				error: action.error,
			});

		default:
			return state;
	}
};

export default reducer;
