import React from 'react';
import {shallow} from 'enzyme';
import Roles from '../../../components/profile/roles.js';
describe('<Roles />',()=>{
    it('Render without crashing',()=>{
        shallow(<Roles />);
    });
});