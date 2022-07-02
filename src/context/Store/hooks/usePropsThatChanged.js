import { useRef } from 'react';
import shallowEquals from '../utils/shallowEquals';
import useLazyMemo from './useLazyMemo';
import usePreviousValue from './usePreviousValue';

/**
 * Returns a copy of the next props whose values shallowly differ from the previous ones
 * @param {object} props - the props you want to mutate
 * @returns {object} - the props whose values are shallowly differnt from the previous
 */
const usePropsThatChanged = (nextProps = {}) => {
  const previousProps = usePreviousValue(nextProps);
  const propsThatChanged = useRef({});
  const propKeys = useLazyMemo(() => Object.keys(nextProps));

  // The key length between previousProps and nextProps must be the same
  propKeys.forEach(key => {
    if (!shallowEquals(previousProps[key], nextProps[key])) {
      propsThatChanged.current[key] = nextProps[key];
    }
  });

  return propsThatChanged.current;
};

export default usePropsThatChanged;
