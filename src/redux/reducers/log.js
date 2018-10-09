import {
  LOG,
} from '../../constants';


const defaultState = [];

export default function logReducer(state = defaultState, { type, payload }) {
  switch(type) {
    case LOG:
      return [
        ...state,
        payload,
      ]
    default:
     return state;
  }
}