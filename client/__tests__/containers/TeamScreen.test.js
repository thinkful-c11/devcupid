import React from 'react';
import {shallow} from 'enzyme';
import {TeamScreen} from '../../containers/TeamScreen.js';
describe('<TeamScreen />',()=>{
    it('Render without crashing',()=>{
        shallow(<TeamScreen />);
    });
});