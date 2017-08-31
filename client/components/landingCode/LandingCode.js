import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles';

import {languages} from './languages';

export default class LandingCode extends React.Component{
  render(){
    return(
      <SyntaxHighlighter language={languages.javascript.key} style={darcula}>
        {languages.javascript.text}
      </SyntaxHighlighter>
    );
  }
}