import React from 'react';
import {shallow} from 'enzyme';
import InputField from './inputField.js';
describe('<InputField />',()=>{
    it('Render without crashing',()=>{
        shallow(<InputField />);
    });
});