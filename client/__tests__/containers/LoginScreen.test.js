import React from 'react';
import {shallow} from 'enzyme';
import {LoginScreen} from '../../containers/LoginScreen.js';
describe('<LoginScreen />',()=>{
    it('Render without crashing',()=>{
        shallow(<LoginScreen />);
    });
});