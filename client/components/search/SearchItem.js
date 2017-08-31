import React from 'react';

export default class SearchItem extends React.Component {
    render() {
        console.log('user', this.props.user);
        return (
            <p>{this.props.user.gitHub.bio}</p>
        );
    }
}