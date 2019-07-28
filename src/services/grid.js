import { Just, Nothing } from "crocks/Maybe";
import { head } from "crocks/pointfree";
import {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  ANTICLOCKWISE,
  CLOCKWISE
} from "../constants";

/* data Grid = [[Maybe { facing: String }]] */

/*
  type Location =  { x: Int
                   , y: Int
                   , facing: String
                   }
*/

const cords = {
  [NORTH]: 0,
  [EAST]: 90,
  [SOUTH]: 180,
  [WEST]: 270
};

// emptyGridOf :: ({ x: Int, y: Int }) -> Grid
export const emptyGridOf = ({ x = 5, y = 5 }) =>
  Array(x)
    .fill([])
    .map(el => Array(y).fill(Nothing()));

// isValidDirection :: String -> Boolean
const isValidDirection = position =>
  [NORTH, SOUTH, EAST, WEST].includes(position);

// coordsWithinBounds :: Grid -> { x: Int, y: Int} -> Boolean
const coordsWithinBounds = (grid, { x, y }) => {
  const rowsLength = grid.length - 1;

  if (x > rowsLength || x < 0) return false;

  const columnLength = grid[0].length - 1;

  if (y > columnLength || y < 0) return false;

  return true;
};

// report :: Grid -> Maybe Location
export const report = grid => {
  return grid.reduce((acc, row, rowIndex) => {
    if (!acc.equals(Nothing())) return acc;

    return row.reduce((columnAcc, columnVal, columnIndex) => {
      if (!columnAcc.equals(Nothing())) return columnAcc;

      if (columnVal.equals(Nothing())) {
        return Nothing();
      }

      return Just({
        x: rowIndex,
        y: columnIndex,
        facing: columnVal.option().facing
      });
    }, Nothing());
  }, Nothing());
};

// place :: Grid -> Location -> Grid
export const place = (grid, { x, y, facing }) => {
  if (!isValidDirection(facing)) return grid;

  if (!coordsWithinBounds(grid, { x, y })) return grid;

  return grid.map((row, rowIndex) => {
    return row.map((column, columnIndex) => {
      if (rowIndex === x && columnIndex === y) {
        return Just({ facing });
      }

      return Nothing();
    });
  });
};

// moveByOneUnit :: Location -> Location
const moveByOneUnit = ({ x, y, facing }) => {
  switch (facing) {
    case NORTH:
      return { x, y: y + 1, facing };
    case EAST:
      return { x: x + 1, y, facing };
    case WEST:
      return { x: x - 1, y, facing };
    case SOUTH:
      return { x, y: y - 1, facing };
    default:
      return { x, y, facing };
  }
};

// findKeyByValue :: Int -> Maybe String
const findKeyByValue = val => {
  const keys = Object.keys(cords).filter(key => cords[key] === val);

  return head(keys);
};

// rotate :: String -> Maybe String
const rotate = (facing, direction) => {
  let next;
  const rotationDegree = 90;

  if (direction === ANTICLOCKWISE) {
    next = cords[facing] - rotationDegree;
  } else {
    next = cords[facing] + rotationDegree;
  }

  const result = findKeyByValue(next);

  return result.alt(Just(facing));
};

// rotateRight :: Location -> Location
const rotateRight = ({ x, y, facing }) => {
  // reset
  if (facing === WEST) {
    return { x, y, facing: NORTH };
  }

  return { x, y, facing: rotate(facing, CLOCKWISE).option() };
};

// rotateLeft :: Location -> Location
const rotateLeft = ({ x, y, facing }) => {
  // reset
  if (facing === NORTH) {
    return { x, y, facing: WEST };
  }

  return { x, y, facing: rotate(facing, ANTICLOCKWISE).option() };
};

// move :: Grid -> Grid
export const move = grid => {
  const position = report(grid);

  if (position.equals(Nothing())) {
    return grid;
  }

  const nextPosition = moveByOneUnit(position.option());

  return place(grid, nextPosition);
};

// left :: Grid -> Grid
export const left = grid => {
  const position = report(grid);

  if (position.equals(Nothing())) {
    return grid;
  }

  const nextPosition = rotateLeft(position.option());

  return place(grid, nextPosition);
};

// right :: Grid -> Grid
export const right = grid => {
  const position = report(grid);

  if (position.equals(Nothing())) {
    return grid;
  }

  const nextPosition = rotateRight(position.option());

  return place(grid, nextPosition);
};

// gridToArray :: Grid -> [ [a] ]
export const gridToArray = grid => {
  return grid.map(row => {
    return row.map(column => {
      return column.toString();
    });
  });
};
