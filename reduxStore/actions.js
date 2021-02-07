import ActionTypes from './actionTypes';

export const setCurrentBallAction = (paintingInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_BALL,
      payload: paintingInfo,
    });
  };
};

export const setUserInfoAction = (userInfo) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER_INFO,
      payload: userInfo,
    });
  };
};
