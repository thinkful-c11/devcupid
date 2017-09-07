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
        this.setState({ resultsIndex: this.state.resultsIndex + 3 });
    }
    
    prev() {
        if (this.state.resultsIndex !== 0) {
            this.setState({ resultsIndex: this.state.resultsIndex - 3 });
        }
    }
    
    render() {
        let userResults;
        if (this.props.searchResults) {
            userResults = this.props.searchResults
                .slice(this.state.resultsIndex, this.state.resultsIndex + 3)
                .map((user, i) => {
                    return <SearchItem user={user} key={i} />;
                });
        }
        
        return (
            <div className="resultsBody">
                <div className="pgbtn prev-button">
                    <button onClick={() => this.prev()}>
                        Previous
                    </button>
                </div>
                <div>
                    {userResults}
                </div>
                <div className="pgbtn next-button">
                    <button onClick={() => this.next()}>
                        next
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults
});

export default connect(mapStateToProps)(SearchResults);