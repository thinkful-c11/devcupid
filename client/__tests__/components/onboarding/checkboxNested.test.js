import React from 'react';
import {shallow,mount} from 'enzyme';
import CheckboxNested from '../../../components/onboarding/checkboxNested.js';
describe('<CheckboxNested />',()=>{
    it('Render without crashing',()=>{
        shallow(<CheckboxNested />);
    });
});