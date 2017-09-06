import React from 'react';
import { Link } from 'react-router-dom';

// export default (props) => {
//   return (
//     <Link
//       to={'/me'}
//       className='submit-Link'
//       type='submit'
//     >
//       <span className="func">Submit</span>
//     </Link>
//   );
// };

export default class SubmitButton extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Link to={`/`}>
        <button onClick={() => this.props.onClick()}><span className="func">submit</span></button>
      </Link>
    );
  }
}
