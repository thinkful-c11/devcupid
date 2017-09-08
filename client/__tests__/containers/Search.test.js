import React from 'react';
import {shallow} from 'enzyme';
import {Search} from '../../containers/Search.js';
describe('<Search />',()=>{
    it('Render without crashing',()=>{
        shallow(<Search />);
    });
});