import React from 'react';

export class App extends React.Component {
    render() {
        return (
            <div className="temporary-button"><a href="/auth/github/callback">CLICK ME TO SIGN IN FOR NOW</a></div>
        );
    }
}