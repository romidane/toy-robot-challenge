import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { fakeStore } from './testHelpers';
import App from './App';

const state = {
  grid: {
    board: [],
    currentPosition: {
      x: 0,
      y: 0,
      facing: 'NORTH'
    },
  },
  log: []
};

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={fakeStore(state)}>
        <App />
      </Provider>

    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

