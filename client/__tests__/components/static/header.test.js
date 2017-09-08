import React from 'react';
import {shallow} from 'enzyme';
import Header from '../../../components/static/header.js';
describe('<Header />',()=>{
    it('Render without crashing',()=>{
        shallow(<Header />);
    });
});