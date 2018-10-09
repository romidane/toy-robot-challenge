import React from 'react';
import { Provider } from 'react-redux';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { expect } from 'chai';

import { fakeStore } from '../testHelpers';
import Console from './Console';

Enzyme.configure({ adapter: new Adapter() });


const mountApp = store => Enzyme.mount(
  <Provider store={store}>
    <Console />
  </Provider>
)

const state = {
  log: ['foo', 'bar', 'baz'],
  grid: {
    currentPosition: {
      x: 0,
      y: 0,
      facing: 'NORTH'
    }
  }
}

describe('<Console />', () => {
  it('renders logs', () => {
    const store = fakeStore(state);
    const wrapper = mountApp(store);

    const logs = wrapper.find('.app-shell-body');

    expect(logs.text()).to.contain('foo');
    expect(logs.text()).to.contain('bar');
    expect(logs.text()).to.contain('baz');
  });

  describe('When a command is submitted', () => {
    let wrapper;
    let store;
    let form;
    let textInputNode;

    beforeEach(() => {
      store = fakeStore(state);
      wrapper = mountApp(store);
      form = wrapper.find('.app-console__form');
      textInputNode = wrapper.find('input[type="text"]').getDOMNode()
    });

    it('logs the command', () => {
      textInputNode.value = 'fooCommand()';
      form.simulate('submit');

      expect(store.dispatch.calledWith({ type: 'LOG', payload: 'fooCommand()'})).to.equal(true, 'log action was not called correctly on submit')
    })
    it('logs invalid commands', () => {
      textInputNode.value = 'move';
      form.simulate('submit');

      expect(store.dispatch.calledWith({ type: 'LOG', payload: 'Invalid command'})).to.equal(true, 'log action was not called correctly on submit')
    })
    it('calls the move() action', () => {
      textInputNode.value = 'move()';
      form.simulate('submit');

      expect(store.dispatch.calledWith({ type: 'MOVE' })).to.equal(true, 'MOVE action was not called correctly on submit')
    });

    it('calls the left() action', () => {
      textInputNode.value = 'left()';
      form.simulate('submit');

      expect(store.dispatch.calledWith({ type: 'LEFT' })).to.equal(true, 'LEFT action was not called correctly on submit')
    });

    it('calls the right() action', () => {
      textInputNode.value = 'right()';
      form.simulate('submit');

      expect(store.dispatch.calledWith({ type: 'RIGHT' })).to.equal(true, 'RIGHT action was not called correctly on submit')
    });

    it('calls the place() action', () => {
      textInputNode.value = 'place(1,3, EAST)';
      form.simulate('submit');

      expect(store.dispatch.calledWith({ type: 'PLACE', payload: { x: 1, y: 3, facing: "EAST"} })).to.equal(true, 'PLACE action was not called correctly on submit')
    });

    it('calls the report() action', () => {
      textInputNode.value = 'report()';
      form.simulate('submit');
      expect(store.dispatch.calledWith({ type: 'LOG', payload: '0, 0, NORTH' })).to.equal(true, 'Report action was not called correctly on submit')
    });
  });
});