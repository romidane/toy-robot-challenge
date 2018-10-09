import { MOVE, LEFT, RIGHT, PLACE, LOG, INITIALIZE_GRID } from '../constants';

export const initializeGrid = ({ rows, columns }) => ({
  type: INITIALIZE_GRID,
  payload: { rows, columns }
})

export const move = () => ({
  type: MOVE
});

export const left = () => ({
  type: LEFT
});

export const right = () => ({
  type: RIGHT
});

export const place = (x, y, facing) => ({
  type: PLACE,
  payload: {
    x: parseInt(x),
    y: parseInt(y),
    facing: facing.replace(/("|')/g, "")
  }
});

export const log = (command) => ({
  type: LOG,
  payload: command
});


export const report = ({x, y, facing}) => ({
  type: LOG,
  payload: `${x}, ${y}, ${facing}`
});