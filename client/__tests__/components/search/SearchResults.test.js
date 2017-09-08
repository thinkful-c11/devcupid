import React from 'react';
import {shallow} from 'enzyme';
import SearchResults from '../../../components/search/SearchResults.js';
describe('<SearchResults />',()=>{
    it('Render without crashing',()=>{
        shallow(<SearchResults />);
    });
});