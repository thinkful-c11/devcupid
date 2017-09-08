import React from 'react';
import {shallow} from 'enzyme';
import ProfileHeader from '../../../components/profile/profileHeader.js';
describe('<ProfileHeader />',()=>{
    it('Render without crashing',()=>{
        shallow(<ProfileHeader />);
    });
});