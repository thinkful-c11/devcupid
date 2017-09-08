import React from 'react';
import {shallow} from 'enzyme';
import {LandingCode} from '../../../components/landingCode/LandingCode.js';
describe('<LandingCode />',()=>{
    it('Render without crashing',()=>{
        shallow(<LandingCode />);
    });
});