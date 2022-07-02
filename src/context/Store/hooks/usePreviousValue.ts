import { useEffect, useRef } from 'react';

/**
 * On each render returns the previous value of the given variable/constant
 * @param {*} value - any value
 * @returns {*} any previous value
 */
const usePreviousValue: (value: any) => any = (value) => {
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value;
  });

  return prevValue.current;
};

export default usePreviousValue;
