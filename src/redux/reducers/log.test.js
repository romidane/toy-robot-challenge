import { expect } from 'chai';

import logReducer from './log';

const defaultState = []

describe('logReducer', () => {
  it('returns a default state', () => {
    expect(logReducer(undefined, { type: 'UNKNOWN' })).to.eql(defaultState)
  });

  it('returns the state with a log message', () => {
    expect(logReducer(defaultState, { type: 'LOG', payload: 'foo' })).to.eql(['foo'])
  });
})