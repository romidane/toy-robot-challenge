import { expect } from 'chai';

import { gridToArray, emptyGridOf, place, move, left, right } from '../../services/grid';
import gridReducer from './grid';

const defaultState = {
  board: [],
  currentPosition: { x: 0, y: 0, facing: 'NORTH' },
};

describe('logReducer', () => {
  it('returns a default state', () => {
    expect(gridReducer(undefined, { type: 'UNKNOWN' })).to.eql(defaultState)
  });

  it('returns the state with an initialized grid', () => {
    const action = {
      type: 'INITIALIZE_GRID',
      payload: {
        rows: 2,
        columns: 2
      }
    };

    const emptyGrid = emptyGridOf(action.payload);
    const expectedGrid = place(emptyGrid, { x: 0, y: 0, facing: 'NORTH' });
    const result = gridReducer(defaultState, action);

    expect(result.currentPosition).to.eql({ x: 0, y: 0, facing: 'NORTH' });
    expect(gridToArray(result.board)).to.eql(gridToArray(expectedGrid));
  });


  it('returns the state with current position moved by one unit on the grid', () => {
    const action = {
      type: 'MOVE',
    };

    const emptyGrid = emptyGridOf({ columns: 5, rows: 5});
    const grid = place(emptyGrid, { x: 0, y: 0, facing: 'NORTH' });

    const state = {
      board: grid,
      currentPosition: { x: 0, y: 0, facing: 'NORTH' }
    }

    const expectedGrid = move(state.board);
    const result = gridReducer(state, action);

    expect(result.currentPosition).to.eql({ x: 0, y: 1, facing: 'NORTH' });
    expect(gridToArray(result.board)).to.eql(gridToArray(expectedGrid));
  });

  it('returns the state with a changed facing position anticlockwise', () => {
    const action = {
      type: 'LEFT',
    };

    const emptyGrid = emptyGridOf({ columns: 5, rows: 5});
    const grid = place(emptyGrid, { x: 0, y: 0, facing: 'NORTH' });

    const state = {
      board: grid,
      currentPosition: { x: 0, y: 0, facing: 'WEST' }
    }

    const expectedGrid = left(state.board);
    const result = gridReducer(state, action);

    expect(result.currentPosition).to.eql({ x: 0, y: 0, facing: 'WEST' });
    expect(gridToArray(result.board)).to.eql(gridToArray(expectedGrid));
  });

  it('returns the state with a changed facing position clockwise', () => {
    const action = {
      type: 'RIGHT',
    };

    const emptyGrid = emptyGridOf({ columns: 5, rows: 5});
    const grid = place(emptyGrid, { x: 0, y: 0, facing: 'NORTH' });

    const state = {
      board: grid,
      currentPosition: { x: 0, y: 0, facing: 'NORTH' }
    }

    const expectedGrid = right(state.board);
    const result = gridReducer(state, action);

    expect(result.currentPosition).to.eql({ x: 0, y: 0, facing: 'EAST' });
    expect(gridToArray(result.board)).to.eql(gridToArray(expectedGrid));
  });

  it('returns the state with a changed current position changed', () => {
    const action = {
      type: 'PLACE',
      payload: { x: 3, y: 0, facing: "SOUTH" },
    };

    const emptyGrid = emptyGridOf({ columns: 5, rows: 5});
    const grid = place(emptyGrid, { x: 0, y: 0, facing: 'NORTH' });

    const state = {
      board: grid,
      currentPosition: { x: 0, y: 0, facing: 'NORTH' }
    }

    const expectedGrid = place(state.board, action.payload);
    const result = gridReducer(state, action);

    expect(result.currentPosition).to.eql({ x: 3, y: 0, facing: 'SOUTH' });
    expect(gridToArray(result.board)).to.eql(gridToArray(expectedGrid));
  });
})