import React from 'react';
import {shallow,mount} from 'enzyme';
import TextInput from '../../../components/onboarding/textInput.js';
describe('<TextInput />',()=>{
    it('Render without crashing',()=>{
        shallow(<TextInput />);
    });
});