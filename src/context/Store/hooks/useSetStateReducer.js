import { useRef, useReducer, useCallback, useEffect } from 'react';
import setStateReducer from '../reducers/setStateReducer';
import defaultInitializer from '../utils/defaultInitializer';

const defaultCallback = () => {};

/**
 * Mimics React.Component this.state and this.setState
 * @callback useSetStateReducer
 * @param {ReducerState=} initializerArg - The initial state
 * @param {ReducerStateInitializer=} initializer - Callback that initializes the state of the reducer
 * @returns {array.<ReducerState, SetState>}
 */
const useSetStateReducer = (initializerArg = {}, initializer = defaultInitializer) => {
  // Temporarily holds the reference to a callback
  const callbackRef = useRef(defaultCallback);
  const [state, dispatch] = useReducer(setStateReducer, initializerArg, initializer);

  /**
   * Augments the dispatch to accept a callback as a second parameter
   */
  const setState = useCallback((updater, callback) => {
    callbackRef.current = callback ?? defaultCallback;
    dispatch(updater);
  }, []);

  // Call the callback after every state change
  useEffect(() => {
    callbackRef.current(state);
    callbackRef.current = defaultCallback;
  }, [state]);

  return [state, setState];
};

export default useSetStateReducer;
