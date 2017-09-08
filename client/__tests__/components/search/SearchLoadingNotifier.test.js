import React from 'react';
import {shallow} from 'enzyme';
import SearchLoadingNotifier from '../../../components/search/SearchLoadingNotifier.js';
describe('<SearchLoadingNotifier />',()=>{
    it('Render without crashing',()=>{
        shallow(<SearchLoadingNotifier />);
    });
});