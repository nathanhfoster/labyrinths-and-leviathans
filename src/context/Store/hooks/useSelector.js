import { useContext } from 'react';
import isFunction from 'lodash/isFunction';

/**
 * This hook simulates Redux's useSelector hook
 * The problem is that the useContext API always causes a rerender
 * If you want memoization, use the connect API
 * @param {MapStateToSelector} mapStateToSelector - similar to mapStateProps
 * @param {SelectorEqualityFunction=} isEqual - determines if the
 * selector's returned value should be recomputed
 * @param {React.ContextConsumer=} contextConsumer - the context consumer
 * @returns {React.FunctionComponent} - a memoized component
 */

const useSelector = (contextConsumer, mapStateToSelector) => {
  if (!isFunction(mapStateToSelector)) {
    throw new Error('The first argument mapStateToSelector must be a function');
  }

  const state = useContext(contextConsumer);

  const currentSelector = mapStateToSelector(state);

  return currentSelector;
};

export default useSelector;
