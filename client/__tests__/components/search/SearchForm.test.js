import React from 'react';
import {shallow,mount} from 'enzyme';
import SearchForm from '../../../components/search/SearchForm.js';
describe('<SearchForm />',()=>{
    it('Render without crashing',()=>{
        shallow(<SearchForm />);
    });
});