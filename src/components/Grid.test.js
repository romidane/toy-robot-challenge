import React from 'react';
import { Provider } from 'react-redux';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { expect } from 'chai';

import { fakeStore } from '../testHelpers';
import Cell from './Cell';
import Grid from './Grid';

Enzyme.configure({ adapter: new Adapter() });


const mountApp = store => Enzyme.mount(
  <Provider store={store}>
    <Grid width="400" size={{ rows: 2, columns: 2}} />
  </Provider>
)

const state = {
  grid: {
    board: [
      [{}, {}],
      [{}, {}],
    ],
    currentPosition: {
      x: 0,
      y: 0,
      facing: 'NORTH'
    }
  }
}

describe('<Grid />', () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = fakeStore(state);
    wrapper = mountApp(store);
  })
  it('initializes the grid on component mount', () => {
    mountApp(store);

    expect(store.dispatch.calledWith({
      type: 'INITIALIZE_GRID',
      payload: {
        rows: 2,
        columns: 2
      }
    })).to.equal(true, 'the action INITIALIZE_GRID was not called correctly');
  })
  it('renders the correct number of cells', () => {
    const cells = wrapper.find(Cell);

    expect(cells.length).to.equal(4, '4 cells were not rendered (rows * columns)')
    expect(cells.at(0).props('style')).to.eql({ width: 200, height: 200})
  });

  it('renders cells of even height and width', () => {
    const cells = wrapper.find(Cell);

    cells.forEach(cell => {
      expect(cell.props('style')).to.eql({ width: 200, height: 200})
    });
  });
})