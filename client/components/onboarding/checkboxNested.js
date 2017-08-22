import React from 'react';

export default class CheckboxNested extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const {currentQuestion} = this.props;
    return(
      <div>
        <h2>{currentQuestion.text}</h2>
        {
          currentQuestion.choices.map((q, index) => {
            return (
              <div key={index}>
                <label htmlFor={index}>{q.language}</label>
                <input id={index} type='checkbox' value={q.language} />
                {
                    q.libraries.map((l, index) => {
                      return (
                        <div key={`language${index}`}>
                          <label htmlFor={`language${index}`}>{l}</label>
                          <input
                            id={`language${index}`}
                            type='checkbox'
                            value={l} />
                        </div>
                      );
                    })
                  }
              </div>
            );
          })
        }
      </div>
    );
  }
}