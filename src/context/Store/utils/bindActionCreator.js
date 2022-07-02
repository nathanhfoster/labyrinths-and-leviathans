/* eslint-disable prefer-spread */
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Thunk} dispatch - the dispatch function available from the useReducerWithThunk hook
 * @returns {Action|ThunkActionDispatch} - An actionCreator object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @returns {Action} - the action callback function
 *
 * @returns {ThunkActionDispatch} - The object mimicking
 * the original object, but with
 * every action creator wrapped into the dispatch call. If you passed a
 * function as actionCreators, the return value will also be a single
 * function.
 */
const bindActionCreator =
  (dispatch) =>
  (actionCreator) =>
  (...args) =>
    dispatch(actionCreator?.apply?.(undefined, args) || actionCreator);

export default bindActionCreator;
