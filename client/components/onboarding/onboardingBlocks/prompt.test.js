import React from 'react';
import {shallow} from 'enzyme';
import Prompt from './prompt.js';
describe('<Prompt />',()=>{
    it('Render without crashing',()=>{
        shallow(<Prompt />);
    });
});