import React from 'react';
import * as actions from '../../actions/actions';

import CommentHeader from './onboardingBlocks/commentHeader';
import ObjectWrapper from './onboardingBlocks/objectWrapper';
import Prompt from './onboardingBlocks/prompt';
import BooleanField from './onboardingBlocks/booleanField';

export default class Checkbox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      'Ed tech':false
    };
  }

  componentDidMount(){
    this.props.currentQuestion.choices.forEach(choice => {
      this.setState({
        [choice]: false
      }, () => {
        for(let k in this.state){
          if(this.state[k] === true){
            this.state[k] = false
          }
        }
      })
    })
  }

  onChange(e){
    let keyPos = e.target.id.split('_');
    let key = keyPos[0];
    let pos = keyPos[1];
    let value = (e.target.value == 'true' ? true : false);
    this.setState({
      [pos]: value
    }, 
      () => {
        let arr = [];
        for(let k in this.state){
          if(this.state[k] === true){
            arr.push(k)
          }
        }
        this.props.dispatch(actions.checkbox_handler(key, this.state));
      }
    );
  }

  
  

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <CommentHeader text={currentQuestion.text}/>
        <ObjectWrapper qTitle={'Passions'} userName={this.props.profile.name}>
          {
            currentQuestion.choices.map((q, index) => {
              return (
                <div key={`${q}${index}`} className="jsLine">
                  <Prompt labelFor={currentQuestion.key + '_' + q}>{q}</Prompt>
                  <BooleanField id={currentQuestion.key + '_' + q} onChange={e => this.onChange(e)} />
                </div>
              );
            })
          }
          {this.props.button}
        </ObjectWrapper>
      </div>
    );
  }
}