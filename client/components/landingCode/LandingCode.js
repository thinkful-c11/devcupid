import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {devCupid} from './syntaxhighlights';

import {languages} from './languages';

export default class LandingCode extends React.Component{
  render(){
    return(
      <SyntaxHighlighter language={languages.javascript.key} style={devCupid}>
        {languages.javascript.text}
      </SyntaxHighlighter>
    );
  }
}