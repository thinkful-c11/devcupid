import React from 'react';

export default class SoftwareTools extends React.Component {
  formatTools(user) {
    let tools = user.skills.softwareTools;
    let formatted = [];
    for (let tool in tools) {
      if (tools[tool]) {
        formatted.push(tool);
      }
    }
    return formatted;
  }
  render() {
    const { user } = this.props;
    const formattedTools = this.formatTools(user);
    const tools = formattedTools.map((tool, index) => {
      return <li key={`softwareTools ${index}`}>{tool}</li>;
    });
    return (
      <div className="pop-card tools">
        <div className="cardHeader">
          Tools
        </div>
        <ul className="cardBody">
          {tools}
        </ul>
      </div>
    );
  }
}
