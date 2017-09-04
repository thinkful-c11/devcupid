import React from 'react';

export default class NestedObjectWrapper extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      closed: true,
      submit:[this.props.language]
    }
  }

  componentWillReceiveProps(){
    let { libraries, language } = this.props;
    let submit = [language];
    for(let k in libraries){
      if(k !== '_active' && libraries[k]){
        submit.push(k);
        this.setState({
          submit: submit
        })
      }
    }
  }

  render(){
    let submit = this.state.submit;
    return(
      <div className={this.state.closed ? "jsNestedObj closed" : "jsNestedObj open"}>
        <span className="jsOpening" >{'{'}</span>
        <span className="dotdotdot">{'...'}</span>
        <div className={this.state.closed ? "jsObjectContent nested closed" : "jsObjectContent nested open"}>
          {this.props.children}
          <span className="func skills">addToSkills({submit.join(',')});</span>
        </div>
        <span className="jsClosing" >{'}'}</span>
      </div>
    );
  }
}