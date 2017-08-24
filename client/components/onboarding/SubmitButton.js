import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <Link
      to={'/me'}
      className='submit-Link'
      type='submit'
    >
      Submit
    </Link>
  );
};
