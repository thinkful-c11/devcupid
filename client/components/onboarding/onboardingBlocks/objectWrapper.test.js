import React from 'react';
import {shallow} from 'enzyme';
import ObjectWrapper from './objectWrapper.js';
describe('<ObjectWrapper />',()=>{
    it('Render without crashing',()=>{
        shallow(<ObjectWrapper />);
    });
});