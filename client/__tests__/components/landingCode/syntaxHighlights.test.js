import React from 'react';
import {shallow} from 'enzyme';
import {devCupid} from '../../../components/landingCode/syntaxHighlights.js';
describe('<devCupid />',()=>{
    it('Render without crashing',()=>{
        shallow(<devCupid />);
    });
});