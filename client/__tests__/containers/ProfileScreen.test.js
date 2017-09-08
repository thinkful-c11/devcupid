import React from 'react';
import {shallow} from 'enzyme';
import {ProfileScreen} from '../../containers/ProfileScreen.js';
describe('<ProfileScreen />',()=>{
    it('Render without crashing',()=>{
        shallow(<ProfileScreen />);
    });
});