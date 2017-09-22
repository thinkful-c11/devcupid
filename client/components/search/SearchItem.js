import React from 'react';
import { Link } from 'react-router-dom';

export default class SearchItem extends React.Component {
    render() {
        const user = this.props.user;
        return (
            <Link to={'/profile/' + user.gitHub.id}>
                <div className="search-item pop-card">
                    <span className="result name">{user.profile.name}</span>
                    <span className="result punc">{":"}</span>
                    <span className="result bracket">{"{"}</span>
                    <div className="result body">
                        <ul className="result item roles">
                            <span className="result title">
                                {'Roles:'}
                            </span>
                            {
                                this.props.roles.map((role, index) => {
                                    return (
                                        <li key={index}>
                                            {role}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        {<ul className="result item tech">
                            <span className="result title">
                                {'Tech:'}
                            </span>
                            {
                                this.props.languages.map((tech, index) => {
                                    return (
                                        <li key={index}>
                                            {tech}
                                        </li>
                                    );
                                })
                            }
                        </ul>}
                    </div>
                    <span className="result bracket">{"}"}</span>
                </div>
            </Link>
        );
    }
}
