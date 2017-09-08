import React from 'react';
import {shallow} from 'enzyme';
import ContactButton from '../../../components/profile/contactButton.js';
describe('<ContactButton />',()=>{
    it('Render without crashing',()=>{
        shallow(<ContactButton />);
    });
});