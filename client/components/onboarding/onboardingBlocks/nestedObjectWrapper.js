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

  expandObject(e){
    this.setState({
    closed: false
    });
  }

  closeObject(e){
    this.setState({
      closed:true
    })
  }

  cancelSkill(language){
    this.closeObject();
    this.props.cancelSkill(language);
  }

  render(){
    let submit = this.state.submit;
    return(
      <div className={this.state.closed ? "jsNestedObj" : "jsNestedObj open"} >
        <span className="jsOpening" >{'{'}
          <span className={this.state.closed ? "dotdotdot termPrompt" : "dotdotdot termPrompt spread"} onClick={e => this.expandObject(e)} ref={dotdotdot => this.dotdotdot = dotdotdot}>
            <span className="dot">{'.'}</span>
            <span className="dot">{'.'}</span>
            <span className="dot">{'.'}</span>
            <span className="jsClosing dot" >{'},'}</span>
          </span>
        </span>
        <div className={this.state.closed ? "jsObjectContent nested closed" : "jsObjectContent nested"}>
          {this.props.children}
          <div className=" jsLine">
            <button className="func skills" onClick={e=> this.closeObject(e)}>addToSkills({submit.join(',')});</button>
          </div>
          <div className=" jsLine">
            <button className="func skills" onClick={()=> this.cancelSkill(this.props.language)}>cancel();</button>
          </div>
          <div className="jsClosing jsLine" >{'},'}</div>
        </div>
      </div>
    );
  }
}