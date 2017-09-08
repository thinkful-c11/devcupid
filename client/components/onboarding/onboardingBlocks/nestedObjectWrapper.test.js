import React from 'react';
import {shallow} from 'enzyme';
import NestedObjectWrapper from './nestedObjectWrapper.js';
describe('<NestedObjectWrapper />',()=>{
    it('Render without crashing',()=>{
        shallow(<NestedObjectWrapper />);
    });
});