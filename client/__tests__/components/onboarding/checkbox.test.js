import React from 'react';
import {shallow,mount} from 'enzyme';
import {Checkbox} from '../../../components/onboarding/checkbox.js';
describe('<Checkbox />',()=>{
    it('Render without crashing',()=>{
        shallow(<Checkbox />);
    });
});