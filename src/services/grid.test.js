import { expect } from 'chai';

import { Just, Nothing } from 'crocks/Maybe';

import {
  emptyGridOf,
  place,
  move,
  report,
  left,
  right,
} from './grid';

describe('Grid', () => {
  describe('.emptyGridOf', () => {
    it('generates a grid of a given size', () => {
      const grid = emptyGridOf({ rows: 5, columns: 5});
      expect(grid.length).to.equal(5, "The grid show have 5 rows");

      grid.forEach(row => {
        expect(row.length).to.equal(5, "Each row should have 5 columns")
      });
    });
  });

  describe('.report', () => {
    it('returns the position of the an entity on a grid', () => {
      const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
      const grid = place(emptyGrid, { x: 0, y: 0, facing: 'NORTH'});
      const result = report(grid);

      expect(result.equals(Just({x: 0, y: 0, facing: 'NORTH'}))).to.equal(true, "There was no entity on the grid");
    });

    it('returns Nothing if there is no entity on the grid', () => {
      const grid = emptyGridOf({ rows: 5, columns: 5});
      const result = report(grid);

      expect(result.equals(Nothing())).to.equal(true, "There wasn't supposed to be an entity on the grid");
    });
  })

  describe('.place', () => {
    it('places an entity on a grid', () => {
      const grid = emptyGridOf({ rows: 5, columns: 5});
      const location = { x: 1, y: 1, facing: 'NORTH'};
      const newGrid = place(grid, location);

      const result = report(newGrid);

      expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");
    });

    describe('when an invalid facing position is passed', () => {
      it('does not change the grid', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 0, y: 0, facing: 'NORTH'};
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = place(grid, {x: 0, y: 0, facing: 'America'});
        const updatedResult = report(updatedGrid);
        expect(updatedResult.equals(Just(location))).to.equal(true, "entity position was not changed");
      });
    })

    describe('when invalid coordinates are passed', () => {
      it('does not change the grid', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 0, y: 0, facing: 'NORTH'};
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = place(grid, {x: Infinity, y: Infinity, facing: 'NORTH'});
        const updatedResult = report(updatedGrid);
        expect(updatedResult.equals(Just(location))).to.equal(true, "entity position was not changed");
      });
    });
  });

  describe('.move', () => {
    describe('NORTH', () => {
      it('moves the entity one unit north', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 0, y: 0, facing: 'NORTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 1, facing: 'NORTH' }))).to.equal(true, "The entity did not move");
      });

      it('does not move the entity out of grid bound', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 0, y: 4, facing: 'NORTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 4, facing: 'NORTH' }))).to.equal(true, "The entity did not move")
      });
    });

    describe('EAST', () => {
      it('moves the entity one unit EAST', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 0, y: 0, facing: 'EAST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 1, y: 0, facing: 'EAST' }))).to.equal(true, "The entity did not move");
      });

      it('does not move the entity out of grid bound', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 4, y: 0, facing: 'EAST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 4, y: 0, facing: 'EAST' }))).to.equal(true, "The entity did not move")
      });
    });

    describe('WEST', () => {
      it('moves the entity one unit WEST', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 1, y: 0, facing: 'WEST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'WEST' }))).to.equal(true, "The entity did not move");
      });

      it('does not move the entity out of grid bound', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 0, y: 0, facing: 'WEST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'WEST' }))).to.equal(true, "The entity did not move")
      });
    });

    describe('SOUTH', () => {
      it('moves the entity one unit SOUTH', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 1, y: 1, facing: 'SOUTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 1, y: 0, facing: 'SOUTH' }))).to.equal(true, "The entity did not move");
      });

      it('does not move the entity out of grid bound', () => {
        const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
        const location = { x: 0, y: 0, facing: 'SOUTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = move(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'SOUTH' }))).to.equal(true, "The entity did not move")
      });
    });

  });

  describe('.left', () => {
    describe('Anticlockwise rotation', () => {
      const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
      it('rotates from NORTH to WEST', () => {
        const location = { x: 0, y: 0, facing: 'NORTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = left(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'WEST' }))).to.equal(true, "The entity did not rotate")
      });

      it('rotates from WEST to SOUTH', () => {
        const location = { x: 0, y: 0, facing: 'WEST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = left(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'SOUTH' }))).to.equal(true, "The entity did not rotate")
      });

      it('rotates from SOUTH to EAST', () => {
        const location = { x: 0, y: 0, facing: 'SOUTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = left(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'EAST' }))).to.equal(true, "The entity did not rotate")
      });

      it('rotates from EAST to NORTH', () => {
        const location = { x: 0, y: 0, facing: 'EAST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = left(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'NORTH' }))).to.equal(true, "The entity did not rotate")
      });

    })
  });

  describe('.right', () => {
    describe('clockwise rotation', () => {
      const emptyGrid = emptyGridOf({ rows: 5, columns: 5});
      it('rotates from NORTH to EAST', () => {
        const location = { x: 0, y: 0, facing: 'NORTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = right(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'EAST' }))).to.equal(true, "The entity did not rotate")
      });

      it('rotates from EAST to SOUTH', () => {
        const location = { x: 0, y: 0, facing: 'EAST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = right(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'SOUTH' }))).to.equal(true, "The entity did not rotate")
      });

      it('rotates from SOUTH to WEST', () => {
        const location = { x: 0, y: 0, facing: 'SOUTH'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = right(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'WEST' }))).to.equal(true, "The entity did not rotate")
      });

      it('rotates from WEST to NORTH', () => {
        const location = { x: 0, y: 0, facing: 'WEST'}
        const grid = place(emptyGrid, location);

        const result = report(grid);
        expect(result.equals(Just(location))).to.equal(true, "entity was not successfully placed on the grid");

        const updatedGrid = right(grid);
        const updatedResult = report(updatedGrid);

        expect(updatedResult.equals(Just({ x: 0, y: 0, facing: 'NORTH' }))).to.equal(true, "The entity did not rotate")
      });

    })
  });
});
