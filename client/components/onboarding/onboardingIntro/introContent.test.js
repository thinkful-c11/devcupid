import React from 'react';
import {shallow} from 'enzyme';
import introContent from './introContent.js';
describe('<introContent />',()=>{
    it('Render without crashing',()=>{
        shallow(<introContent />);
    });
});