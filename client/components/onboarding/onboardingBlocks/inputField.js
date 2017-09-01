import React from 'react';

export default class InputField extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      active:false,
      modified:false
    }
  }

  onClick(){
    this.setState({active:true});
  }

  onChange(e){
    this.setState({modified:true});
    this.props.onChange(e);
  }

  onFocus(){
    this.setState({active:true});
  }

  onBlur(){
    this.setState({active:false});
  }

  render(){
    let field;
    if((!this.props.value) && (!this.state.active)){
      field = <span className="jsUndefined" onClick={() => this.onClick()}>undefined</span>
    }
    else{
      field = (
      <span className="jsString">{this.props.value}
      <input className='jsInput' 
      id={this.props.id} type="text" value={this.props.value} autoFocus={this.state.active}
      onChange={e => this.onChange(e)}
      onFocus={e => this.onFocus(e)}
      onBlur={e => this.onBlur(e)}
      />
      </span>);
    }
    return(
      <span className="strInputContainer">
        {field}
      </span>
    );
  }
}