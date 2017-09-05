import React from 'react';
import * as actions from '../../actions/actions';

import CommentHeader from './onboardingBlocks/commentHeader';
import ObjectWrapper from './onboardingBlocks/objectWrapper';
import NestedObjectWrapper from './onboardingBlocks/nestedObjectWrapper';
import Prompt from './onboardingBlocks/prompt';
import BooleanField from './onboardingBlocks/booleanField';

export default class CheckboxNested extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillMount(){
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

  cancelSkill(language){
    this.setState({
      [language]: Object.assign({}, this.state[language], {
        _active: false
      })
    })
  }

  onChangeLibrary(e){
    let langLib = e.target.id.split('_');
    let language = langLib[0];
    let library = langLib[1];
    let value = (e.target.value == 'true' ? true : false);
    this.setState({
      [language]: Object.assign({}, this.state[language], {
        _active: true,
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
        <CommentHeader text={currentQuestion.text} />
        <ObjectWrapper qTitle={"Tech"} userName={this.props.profile.name}>
          {
            currentQuestion.choices.map((q, index) => {
              return (
                <div key={index} className={"jsLine"}>
                  <Prompt labelFor={index}>{q.language}</Prompt>
                  <NestedObjectWrapper language={q.language} libraries={this.state[q.language]}>
                  {
                      q.libraries.map((library, index) => {
                        return (
                          <div key={`language${index}`}  className={"jsLine"}>
                            <Prompt labelFor={q.language + '_' + library}>{library}</Prompt>
                            <BooleanField
                              id={q.language + '_' + library}
                              onChange={e => this.onChangeLibrary(e)}
                            />
                          </div>
                        );
                      })
                    }
                  </NestedObjectWrapper>
                </div>
              );
            })
          }
        </ObjectWrapper>
        {this.props.button}
      </div>
    );
  }
}