import { useRef, useCallback } from 'react';
import getReducerDefaultState from '../utils/getReducerDefaultState';
import defaultInitializer from '../utils/defaultInitializer';
import getDerivedStateFromProps from '../utils/getDerivedStateFromProps';
import useSetStateReducer from './useSetStateReducer';
import useLazyMemo from './useLazyMemo';
import usePropsThatChanged from './usePropsThatChanged';
import useEffectAfterMount from '../../../hooks/useEffectAfterMount';

/**
 * Augments React's useReducer() hook
 * so that the action dispatcher supports thunks.
 */
const useReducerWithThunk = (
  reducer,
  initialState = getReducerDefaultState(reducer),
  initializer = defaultInitializer,
  derivedStateFromProps
) => {
  // Only keep the props that changed to override the state
  const derivedStateFromPropsThatChanged = usePropsThatChanged(
    derivedStateFromProps
  );

  // Get initial hook state once
  const initialHookState = useLazyMemo(
    useCallback(
      () =>
        getDerivedStateFromProps(
          initialState,
          derivedStateFromPropsThatChanged
        ),
      []
    )
  );

  const [hookState, setHookState] = useSetStateReducer(
    initialHookState,
    initializer
  );

  // State management
  const state = useRef(hookState);

  const getState = useCallback(() => state.current, [state]);

  const setState = useCallback(
    (newState, callback) => {
      const derivedState = getDerivedStateFromProps(
        newState,
        derivedStateFromPropsThatChanged
      );
      state.current = derivedState;
      setHookState(derivedState, callback);
    },
    [derivedStateFromPropsThatChanged, setHookState]
  );

  // make the state controlled from an HOC by passing derivedStateFromPropsThatChanged
  useEffectAfterMount(() => {
    setState(state.current);
  }, [derivedStateFromPropsThatChanged]);

  // Reducer
  const reduce = useCallback(
    action => reducer(getState(), action),
    [reducer, getState]
  );

  // Augmented dispatcher
  const dispatch = useCallback(
    (action, callback) => {
      if (action instanceof Function) {
        return action(dispatch, getState);
      }
      const newState = reduce(action);
      return setState(newState, callback);
    },
    [reduce, getState, setState]
  );

  return [hookState, dispatch];
};

export default useReducerWithThunk;
