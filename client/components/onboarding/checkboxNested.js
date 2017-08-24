import React from 'react';
import * as actions from '../../actions/actions';

export default class CheckboxNested extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
    const emptyState = {};
    this.setState({
      emptyState
    });
    this.props.currentQuestion.choices.forEach(choice => {
      let language = {
        _active: false,
      };
      choice.libraries.forEach(library => {
        language[library] = false;
      })
      this.setState({
        [choice.language]: language
      })
    })
  }

  onChangeLanguage(e){
    let language = e.target.value;
    let value = e.target.checked;
    this.setState({
      [language]: Object.assign({}, this.state[language], {
        _active: value
      })
    }, () => {
      this.props.dispatch(actions.checkboxNested_handler(this.state))
    });
  }

  onChangeLibrary(language, e){
    let library = e.target.value;
    let value = e.target.checked;
    this.setState({
      [language]: Object.assign({}, this.state[language], {
        [library]: value
      })
    }, () => {
      this.props.dispatch(actions.checkboxNested_handler(this.state))
    });
  }

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        {
          currentQuestion.choices.map((q, index) => {
            return (
              <div key={index}>
                <label htmlFor={index}>{q.language}</label>
                <input id={index} type='checkbox' value={q.language} onChange={e => this.onChangeLanguage(e)} checked={this.state[q.language]._active}/>
                {
                    q.libraries.map((l, index) => {
                      return (
                        <div key={`language${index}`} style={ {paddingLeft: 30+'px'} }>
                          <label htmlFor={`language${index}`}>{l}</label>
                          <input
                            id={`language${index}`}
                            type='checkbox'
                            value={l} 
                            onChange={e => this.onChangeLibrary(q.language, e)}
                            checked={this.state[q.language][l]} />
                        </div>
                      );
                    })
                  }
              </div>
            );
          })
        }
      </div>
    );
  }
}