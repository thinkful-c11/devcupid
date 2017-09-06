import React from 'react';

export default class Tech extends React.Component{
  constructor(props){
    super(props);
  }

  formatLanguages(user){
    let languages = user.skills.languages;
    let formatted = [];
    let i = 0;
    for(let language in languages){
      if(languages[language]._active){
        formatted.push({
          name: language,
          libs: []
        });
        for(let library in languages[language]){
          if(languages[language][library] && library !== '_active'){
            formatted[i].libs.push(library);
          }
        };
        i++;
      }
    }
    return formatted;
  }

  render(){
    const { user } = this.props;
    const languages = this.formatLanguages(user);
    const tech = languages.map((language, index) => {
      return(
        <li key={`${language} ${index}`}>
          {language.name}
          <ul>
            {
              language.libs.map((library, index) => {
                return <li key={`${library} ${index}`}>{library}</li>;
              })
            }
          </ul>
        </li>
      );
    });
    return(
      <div className="pop-card tech">
        <div className="cardHeader">
          Tech
        </div>
        <ul className="cardBody">
          {tech}
        </ul>
      </div>
    );
  }
}
