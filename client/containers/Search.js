import React from 'react';
import { connect } from 'react-redux';

import SearchForm from '../components/search/SearchForm';
import SearchResults from '../components/search/SearchResults';
import SearchLoadingNotifier from '../components/search/SearchLoadingNotifier';

export class Search extends React.Component {
  render(){
    let isLoading = (this.props.loading && document.readyState === 'complete')
                      ? <SearchLoadingNotifier /> : <div></div>;
    return(
      <div style={{width: "100%"}}>
        <SearchForm />
        <SearchResults isLoading={isLoading}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  loading: state.loading
});

export default connect(mapStateToProps)(Search);
