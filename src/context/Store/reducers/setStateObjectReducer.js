import setStateReducer from './setStateReducer';
import getDerivedStateFromProps from '../utils/getDerivedStateFromProps';

/**
 * Allows a functional component to have
 * a setState API that is similar to a class component's this.setState
 * @param {ReducerState} state
 * @param {ReducerAction | GetStateCallback} action
 * @returns {ReducerState}
 */
export const setObjectStateReducer = (state, action) => {
  const nextStateToOverwrite = setStateReducer(state, action);
  const nextState = getDerivedStateFromProps(state, nextStateToOverwrite);

  return nextState;
};
