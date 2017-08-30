import React from 'react';
import { connect } from 'react-redux';

import { search } from '../../actions/actions';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInput: '' };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    search();
  }
  
  render(){
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
        <p>{JSON.stringify(this.props.searchResults)}</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults
});

export default connect(mapStateToProps)(SearchBar);
