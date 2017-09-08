import React from 'react';
import {shallow} from 'enzyme';
import BooleanField from './booleanField.js';
describe('<BooleanField />',()=>{
    it('Render without crashing',()=>{
        shallow(<BooleanField />);
    });
});