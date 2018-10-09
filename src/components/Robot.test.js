import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import Robot from './Robot';

Enzyme.configure({ adapter: new Adapter() });

describe('<Cell />', () => {
  it('correctly positions the robot at 0 0', () => {
    const wrapper = Enzyme.mount(
      <Robot
        height={20}
        width={20}
        offset={200}
        position={{ x:0, y: 0, facing: 'NORTH'}}
      />);

    const root = wrapper.find('.app-robot');

    expect(root.prop('style')).to.eql({
      "transform": "translate(0px, 0px)",
      "width": "20px",
      "height": "20px"
    });
  });

  it('correctly positions the robot based on x and y', () => {
    const x = generateNumberBetween(1,4);
    const y = generateNumberBetween(1, 4);
    const offset = 200;
    const width = 20;
    const height = 20;

    const finalX = (offset * x) - (width / 2)
    const finalY = -((offset * y) - (height / 2))

    const wrapper = Enzyme.mount(
      <Robot
        height={20}
        width={width}
        offset={offset}
        position={{ x, y, facing: 'NORTH'}}
      />);

    const root = wrapper.find('.app-robot');

    expect(root.prop('style')).to.eql({
      "transform": `translate(${finalX}px, ${finalY}px)`,
      "width": "20px",
      "height": "20px"
    });
  });

  it('correctly positions the robot facing NORTH', () => {
    const wrapper = Enzyme.mount(
      <Robot
        height={20}
        width={20}
        offset={200}
        position={{ x:0, y: 0, facing: 'NORTH'}}
      />);

    const root = wrapper.find('.app-robot i');

    expect(root.prop('className')).to.equal('fas fa-robot');
  });

  it('correctly positions the robot facing EAST', () => {
    const wrapper = Enzyme.mount(
      <Robot
        height={20}
        width={20}
        offset={200}
        position={{ x:0, y: 0, facing: 'EAST'}}
      />);

    const icon = wrapper.find('.app-robot i');

    expect(icon.prop('className')).to.equal('fas fa-robot fa-rotate-90');
  });

  it('correctly positions the robot facing SOUTH', () => {
    const wrapper = Enzyme.mount(
      <Robot
        height={20}
        width={20}
        offset={200}
        position={{ x:0, y: 0, facing: 'SOUTH'}}
      />);

    const icon = wrapper.find('.app-robot i');

    expect(icon.prop('className')).to.equal('fas fa-robot fa-rotate-180');
  });

  it('correctly positions the robot facing WEST', () => {
    const wrapper = Enzyme.mount(
      <Robot
        height={20}
        width={20}
        offset={200}
        position={{ x:0, y: 0, facing: 'WEST'}}
      />);

    const icon = wrapper.find('.app-robot i');

    expect(icon.prop('className')).to.equal('fas fa-robot fa-rotate-270');
  });
});

function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * min) + max
}