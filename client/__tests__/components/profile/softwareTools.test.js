import React from 'react';
import {shallow} from 'enzyme';
import SoftwareTools from '../../../components/profile/softwareTools.js';
describe('<SoftwareTools />',()=>{
    it('Render without crashing',()=>{
        shallow(<SoftwareTools />);
    });
});