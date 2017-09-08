import React from 'react';
import {shallow} from 'enzyme';
import SubmitButton from '../../../components/onboarding/SubmitButton.js';
describe('<SubmitButton />',()=>{
    it('Render without crashing',()=>{
        shallow(<SubmitButton />);
    });
});