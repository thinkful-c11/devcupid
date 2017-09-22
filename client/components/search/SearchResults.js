import React from 'react';
import { connect } from 'react-redux';

import SearchItem from './SearchItem';

import '../../SCSS/search.scss';

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = { resultsIndex: 0 };
    }
    
    next() {
        if (this.state.resultsIndex + 3 < this.props.searchResults.length){
            this.setState({ resultsIndex: this.state.resultsIndex + 3 });
        }
    }
    
    prev() {
        if (this.state.resultsIndex !== 0) {
            this.setState({ resultsIndex: this.state.resultsIndex - 3 });
        }
    }
    
    formatRoles(roles) {
        let formatted = [];
        for (let role in roles) {
            if (roles[role]) {
                formatted.push(role);
            }
        }
        
        let lengthDiff = formatted.length - 3;
        formatted = formatted.slice(0, 3);
        if (lengthDiff > 0) {
            formatted.push(`+ ${lengthDiff} more`);
        }
        
        formatted = formatted.join(',_');
        return formatted.split('_');
    }

    formatTech(languages){
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
        }
        
        let diff = formatted.length - 3;
        formatted = formatted.slice(0, 3);
        if (diff > 0){
            formatted.push(`+ ${diff} more`);
        }
        
        formatted = formatted.join(',_');
        return formatted.split('_');
         
    }
    
    render() {
        let userResults;
        if (this.props.searchResults) {
            userResults = this.props.searchResults
                .slice(this.state.resultsIndex, this.state.resultsIndex + 3) 
                .map((user, i) => {
                    return (
                        <SearchItem 
                            user={user}
                            roles={this.formatRoles(user.profile.skills.roles)} 
                            languages={this.formatTech(user.profile.skills.languages)} 
                            key={i}
                        />
                    );
                });
        }

        return (
            <div className="resultsBody">
                <div className="pgbtn prev-button">
                    {userResults ? 
                        <button onClick={() => this.prev()}>
                            {'<'}
                        </button>
                        : null
                    }
                </div>
                <div className="results users">
                    {this.props.isLoading}
                    {userResults}
                </div>
                <div className="pgbtn next-button">
                    {userResults ? 
                        <button onClick={() => this.next()}>
                            {'>'}
                        </button>
                        : null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults
});

export default connect(mapStateToProps)(SearchResults);
