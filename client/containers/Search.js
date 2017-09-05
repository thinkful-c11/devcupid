import React from 'react';
import { connect } from 'react-redux';

import SearchForm from '../components/search/SearchForm';
import SearchItem from '../components/search/SearchItem';
import SearchLoadingNotifier from '../components/search/SearchLoadingNotifier';

export class Search extends React.Component {
  render(){
    let userResults;
    if (this.props.searchResults) {
      userResults = this.props.searchResults.map((user, i) => {
        return <SearchItem user={user} key={i}/>;
      });
    }
    // document.readyState prevents SearchLoadingNotifier
    // from displaying during page load
    let isLoading = (this.props.loading && document.readyState === 'complete')
                      ? <SearchLoadingNotifier /> : <div></div>;
    return(
      <div>
        <SearchForm />
        {isLoading}
        <div className="user-results-container">
          {userResults}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  loading: state.loading
});

export default connect(mapStateToProps)(Search);
