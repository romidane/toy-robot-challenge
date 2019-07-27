import {
  emptyGridOf,
  place,
  move,
  report,
  left,
  right
} from "../../services/grid";
import {
  NORTH,
  MOVE,
  LEFT,
  RIGHT,
  PLACE,
  INITIALIZE_GRID
} from "../../constants";

const defaultState = {
  board: [],
  currentPosition: { x: 0, y: 0, facing: NORTH }
};

function gridReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case INITIALIZE_GRID: {
      const emptyGrid = emptyGridOf({
        rows: payload.rows,
        columns: payload.columns
      });
      const grid = place(emptyGrid, { x: 0, y: 0, facing: NORTH });

      return {
        ...state,
        board: grid,
        currentPosition: report(grid).option()
      };
    }
    case MOVE: {
      const newGrid = move(state.board);
      return {
        board: newGrid,
        currentPosition: report(newGrid).option()
      };
    }
    case LEFT: {
      const newGrid = left(state.board);
      return {
        board: newGrid,
        currentPosition: report(newGrid).option()
      };
    }
    case RIGHT: {
      const newGrid = right(state.board);
      return {
        board: newGrid,
        currentPosition: report(newGrid).option()
      };
    }
    case PLACE: {
      const newGrid = place(state.board, payload);
      return {
        board: newGrid,
        currentPosition: report(newGrid).option()
      };
    }
    default:
      return state;
  }
}

export default gridReducer;
