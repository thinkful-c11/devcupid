import React from 'react';
import {shallow,mount} from 'enzyme';
import CreateTeamForm from '../../../components/team/CreateTeamForm.js';
describe('<CreateTeamForm />',()=>{
    it('Render without crashing',()=>{
        shallow(<CreateTeamForm />);
    });
});