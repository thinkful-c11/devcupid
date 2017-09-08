import React from 'react';
import {shallow} from 'enzyme';
import {languages} from '../../../components/landingCode/languages.js';
describe('<languages />',()=>{
    it('Render without crashing',()=>{
        shallow(<languages />);
    });
});