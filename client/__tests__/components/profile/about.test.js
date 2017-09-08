import React from 'react';
import {shallow} from 'enzyme';
import About from '../../../components/profile/about.js';
describe('<About />',()=>{
    it('Render without crashing',()=>{
        shallow(<About />);
    });
});