import React from 'react';
import {shallow} from 'enzyme';
import Tech from '../../../components/profile/tech.js';
describe('<Tech />',()=>{
    it('Render without crashing',()=>{
        shallow(<Tech />);
    });
});