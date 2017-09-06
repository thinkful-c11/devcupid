import React from 'react';
import { connect } from 'react-redux';

import SearchItem from './SearchItem';

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
            <div>
                <div className="prev-button">
                    <button onClick={() => this.prev()}>
                        Previous
                    </button>
                </div>
                <div className="next-button">
                    <button onClick={() => this.next()}>
                        next
                    </button>
                </div>
                <div>
                    {userResults}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults
});

export default connect(mapStateToProps)(SearchResults);