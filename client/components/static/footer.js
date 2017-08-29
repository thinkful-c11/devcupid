import React from 'react';
import '../../SCSS/footer.scss'

export default class Footer extends React.Component{
    render(){
        return(
            <footer className="container">
                <div className="bottomBar content container">
                    <p>Made by Avi Zajac, Kyle Rogers, Thomas Kastanek, William Martin | 2017</p>
                </div>
            </footer>
        );
    }
}