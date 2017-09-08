import React from 'react';
import {shallow,mount} from 'enzyme';
import SignUp from '../../../components/onboarding/signup.js';
describe('<SignUp />',()=>{
    it('Render without crashing',()=>{
        shallow(<SignUp />);
    });
});