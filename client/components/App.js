import React from 'react';
import '../SCSS/App.scss';

export class App extends React.Component {
    render() {
        return (
            <div className="temporary-button"><a href="/api/auth/github/callback">CLICK ME TO SIGN IN FOR NOW</a></div>
        );
    }
}