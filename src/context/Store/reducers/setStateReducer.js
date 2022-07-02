import isFunction from 'lodash/isFunction';

/**
 * A generic reducer that augments the useReducer hook
 * to return the state if the options is a callback
 * @param {ReducerState} state
 * @param {ReducerAction | GetStateCallback} options
 * @returns
 */
const setStateReducer = (state, options) => (isFunction(options) ? options(state) : options);

export default setStateReducer;
