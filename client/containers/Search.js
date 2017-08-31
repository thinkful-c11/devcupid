import React from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { search } from '../actions/actions';

import SearchItem from '../components/search/SearchItem';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInput: '' };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.search();
  }
  
  render(){
    let userResults;
    if (this.props.searchResults) {
      userResults = this.props.searchResults.map((user, i) => {
        return <SearchItem user={user} key={i}/>;
      });
    }
    
    return(
      <div>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" 
            value={this.state.userInput} 
            placeholder="Search for friends!" 
            onChange={e => this.setState({userInput: e.target.value})}
          />
          <input type="submit" placeholder="Go!" />
        </form>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    search: search
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
