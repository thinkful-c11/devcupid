import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { search } from '../../actions/actions';

import SearchResults from './SearchResults';

export class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: '', 
      login: '',
      languages: '',
      roles: ''
    };
  }
  
  formatQuery() {
    let s = '';
    
    this.state.name.length > 0 ? s += 'name=' + this.state.name + '&' : '';
    this.state.login.length > 0 ? s += 'login=' + this.state.login + '&' : '';
    this.state.languages.length > 0 ? s += 'languages=' + this.state.languages + '&' : '';
    this.state.roles.length > 0 ? s += 'roles=' + this.state.roles + '&' : '';
    
    return s;
  }
  
  handleSubmit(e) {
    e.preventDefault();
    this.props.search(this.formatQuery());
  }
  
  render() {
    return(
      <div className="search-from">
        <form onSubmit={e => this.handleSubmit(e)}>
          <input type="text" 
            value={this.state.name} 
            placeholder="Name" 
            onChange={e => this.setState({ name: e.target.value })}
          />
          <input type="text" 
            value={this.state.login} 
            placeholder="GitHub Login" 
            onChange={e => this.setState({ login: e.target.value })}
          />
          <input type="text" 
            value={this.state.languages} 
            placeholder="Languages" 
            onChange={e => this.setState({ languages: e.target.value })}
          />
          <input type="text" 
            value={this.state.roles} 
            placeholder="Roles" 
            onChange={e => this.setState({ roles: e.target.value })}
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