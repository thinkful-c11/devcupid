import React from 'react';
import {shallow} from 'enzyme';
import {OnboardingScreen} from '../../containers/OnboardingScreen.js';
describe('<OnboardingScreen />',()=>{
    it('Render without crashing',()=>{
        shallow(<OnboardingScreen />);
    });
});