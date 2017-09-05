import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { search } from '../../actions/actions';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userInput: '' };
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.search();
  }
  
  render() {
    return(
      <div className="search-from">
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" 
            value={this.state.userInput} 
            placeholder="Search for friends!" 
            onChange={e => this.setState({userInput: e.target.value})}
          />
          <input type="submit" placeholder="Go!" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
  loading: state.loading
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    search: search
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);