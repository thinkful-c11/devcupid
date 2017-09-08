import React from 'react';
import {shallow} from 'enzyme';
import NextButton from '../../../components/onboarding/nextButton.js';
describe('<NextButton />',()=>{
    it('Render without crashing',()=>{
        shallow(<NextButton />);
    });
});