import ActionTypes from './actionTypes';

/**
 * Initializes a reducers state
 * @param {Reducer}
 * @returns {ReducerState}
 */

const getReducerDefaultState = (reducer) => reducer(undefined, { action: ActionTypes.INIT });

export default getReducerDefaultState;
