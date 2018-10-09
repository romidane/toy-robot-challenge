import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import Cell from './Cell';

Enzyme.configure({ adapter: new Adapter() });

describe('<Cell />', () => {
  it('renders with props', () => {
    const wrapper = Enzyme.mount(<Cell height={20} width={20} />);
    const root = wrapper.find('.app-grid-cell');

    expect(root.prop('style')).to.eql({ width: 20, height: 20 })
  });
});