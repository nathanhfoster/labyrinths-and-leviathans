import { useRef, useEffect } from 'react';

const useMounted: (initialValue?: boolean) => boolean = (initialValue = false) => {
  const mounted = useRef(initialValue);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  });

  return mounted.current;
};

export default useMounted;
