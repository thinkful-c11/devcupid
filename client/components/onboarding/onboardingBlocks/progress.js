import React from 'react';

export default class Progress extends React.Component{
  constructor(props){
    super(props);
  }

  createBar(prog){
    /// 82 hashes fit inside regularly tized terminal card
    let num = 82*prog;
    let bArr = [];
    for(let i=1; i<= num; i++){
      bArr.push(<span key={i} className="progHash">#</span>)
    }
    return bArr;
  }

  render(){
    let prog = this.props.index / this.props.length;
    let perc = Math.ceil(prog * 100);
    return(
      <div className="progressBar comment">
        <div>progress: {perc}%</div>
        <div>{this.createBar(prog)}</div>
      </div>
    );
  }
}