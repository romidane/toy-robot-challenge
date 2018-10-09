import { expect } from 'chai';

import { move, left, right, log, report, place, initializeGrid} from './actions';

describe('Actions', () => {
  describe('.initializeGrid', () => {
    it('returns a INITIALIZE_GRID action', () => {
      expect(initializeGrid({rows: 2, columns: 2})).to.eql({
        type: 'INITIALIZE_GRID',
        payload: {rows: 2, columns: 2}
      });
    });
  });

  describe('.move', () => {
    it('returns a MOVE action', () => {
      expect(move()).to.eql({
        type: 'MOVE'
      });
    });
  });

  describe('.left', () => {
    it('returns a LEFT action', () => {
      expect(left()).to.eql({
        type: 'LEFT'
      });
    });
  });

  describe('.right', () => {
    it('returns a RIGHT action', () => {
      expect(right()).to.eql({
        type: 'RIGHT'
      });
    });
  });

  describe('.place', () => {
    it('returns a PLACE action', () => {
      expect(place(0, 0, "NORTH")).to.eql({
        type: 'PLACE',
        payload: { x: 0, y: 0, facing: 'NORTH' }
      });
    });
  });

  describe('.log', () => {
    it('returns a LOG action', () => {
      expect(log('foo')).to.eql({
        type: 'LOG',
        payload: 'foo'
      });
    });
  });

  describe('.report', () => {
    it('returns a LOG action', () => {
      expect(report({x: 0, y: 0, facing: 'NORTH'})).to.eql({
        type: 'LOG',
        payload: '0, 0, NORTH'
      });
    });
  });
});