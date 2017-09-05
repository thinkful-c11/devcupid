import React from 'react';

export default class SearchItem extends React.Component {
    render() {
        console.log(this.props.user);
        return (
            <div className="search-item">
                <p>Name: {this.props.user.profile.name}</p>
                <p>GH: {this.props.user.gitHub.login}</p>
                <hr />
            </div>
        );
    }
}