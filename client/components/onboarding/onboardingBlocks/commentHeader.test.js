import React from 'react';
import {shallow} from 'enzyme';
import CommentHeader from './commentHeader.js';
describe('<CommentHeader />',()=>{
    it('Render without crashing',()=>{
        shallow(<CommentHeader />);
    });
});