import React from 'react';
import {shallow} from 'enzyme';
import Speciality from '../../../components/profile/speciality.js';
describe('<Speciality />',()=>{
    it('Render without crashing',()=>{
        shallow(<Speciality />);
    });
});