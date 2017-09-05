import React from 'react';

export default class BooleanField extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <select
        className="jsBoolean"
        id={this.props.id}
        onChange={e => this.props.onChange(e)}>
        <option value={false}>False</option>
        <option value={true}>True</option>
      </select>
    );
  }
}