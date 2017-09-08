import React from 'react';
import {shallow} from 'enzyme';
import SearchItem from '../../../components/search/SearchItem.js';
describe('<SearchItem />',()=>{
    it('Render without crashing',()=>{
        shallow(<SearchItem />);
    });
});