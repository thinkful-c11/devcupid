import React from 'react';
import {shallow,mount} from 'enzyme';
import OnboardingIntro from './onboardingIntro.js';
describe('<OnboardingIntro />',()=>{
    it('Render without crashing',()=>{
        shallow(<OnboardingIntro />);
    });
});