import React from 'react';
import {shallow} from 'enzyme';
import Progress from './progress.js';
describe('<Progress />',()=>{
    it('Render without crashing',()=>{
        shallow(<Progress />);
    });
});