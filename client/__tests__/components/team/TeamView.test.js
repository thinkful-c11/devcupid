import React from 'react';
import {shallow,mount} from 'enzyme';
import TeamView from '../../../components/team/TeamView.js';
describe('<TeamView />',()=>{
    it('Render without crashing',()=>{
        shallow(<TeamView />);
    });
});