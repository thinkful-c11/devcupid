import React from 'react';
import {shallow} from 'enzyme';
import {App} from '../../containers/App.js';
describe('<App />',()=>{
    it('Render without crashing',()=>{
        shallow(<App />);
    });
});