import React from 'react';
import {Link} from 'react-router-dom';

export default class SearchItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            roles:[],
            languages:[],
        }
    }

    formatRoles(user) {
        let roles = user.profile.skills.roles;
        let formatted = [];
        for (let role in roles) {
            if (roles[role]) {
                formatted.push(role);
            }
        }
        let diff = formatted.length - 3
        formatted = formatted.slice(0,3);
        if (diff > 0){
            formatted.push(`+ ${diff} more`)
        }
        formatted = formatted.join(',_');
        formatted = formatted.split('_');
        this.setState({
            roles: formatted
        });
    }

    formatTech(user){
        let languages = user.profile.skills.languages;
        let formatted = [];
        for(let language in languages){
            if(languages[language]._active){
                formatted.push(language);
                for(let library in languages[language]){
                    if(languages[language][library] && library !== '_active'){
                        formatted.push(library);
                    }
                }
            }
        };
        let diff = formatted.length - 3
        formatted = formatted.slice(0,3);
        if (diff > 0){
            formatted.push(`+ ${diff} more`)
        }
        formatted = formatted.join(',_');
        formatted = formatted.split('_');
        this.setState({
            languages: formatted
        });
    }

    componentWillMount(){
        let { user } = this.props;
        this.formatRoles(user);
        this.formatTech(user);
    }

    componentWillReceiveProps(){
        let { user } = this.props;
        this.formatRoles(user);
        this.formatTech(user);
    }



    render() {
        console.log(this.state);
        return (
            <Link to={'/profile/' + this.props.user.gitHub.id}>
                <div className="search-item pop-card">
                    <span className="result name">{this.props.user.profile.name}</span>
                    <span className="result punc">{":"}</span>
                    <span className="result bracket">{"{"}</span>
                    <div className="result body">
                        <ul className="result item roles">
                            <span className="result title">
                                {'Roles:'}
                            </span>
                            {
                                this.state.roles.map((role, index) => {
                                    return (
                                        <li key={index}>
                                            {role}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <ul className="result item tech">
                            <span className="result title">
                                {'Tech:'}
                            </span>
                            {
                                this.state.languages.map((tech, index) => {
                                    return (
                                        <li key={index}>
                                            {tech}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <span className="result bracket">{"}"}</span>
                </div>
            </Link>
        );
    }
}