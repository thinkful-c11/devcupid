import React from 'react';
import {shallow} from 'enzyme';
import Passions from '../../../components/profile/passions.js';
describe('<Passions />',()=>{
    it('Render without crashing',()=>{
        shallow(<Passions />);
    });
});