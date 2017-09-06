import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import * as Cookies from 'js-cookie';

export class Personality extends React.Component {
    componentDidMount(){
        const accessToken=Cookies.get('accessToken');
        if(accessToken){
            this.props.dispatch(actions.fetchUser(accessToken));
        }
    }
    render(){
        return(
            <div>Testing</div>
        );
    }
}
export default connect()(Personality);