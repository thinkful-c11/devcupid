import React from 'react';
import {shallow} from 'enzyme';
import Footer from '../../../components/static/footer.js';
describe('<Footer />',()=>{
    it('Render without crashing',()=>{
        shallow(<Footer />);
    });
});