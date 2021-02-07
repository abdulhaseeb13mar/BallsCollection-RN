import {combineReducers} from 'redux';
import ActionTypes from './actionTypes';

let currentBall = {};

const currentBallReducer = (state = currentBall, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_BALL:
      state = Object.assign({}, state, {...action.payload});
      return state;

    default:
      break;
  }
  return state;
};

export default combineReducers({currentBallReducer});
