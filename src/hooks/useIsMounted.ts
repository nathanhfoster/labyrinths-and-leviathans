import { useRef, useEffect } from 'react';

const useIsMounted = (initialValue = false) => {
    const mounted = useRef(initialValue);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    });

    return mounted.current;
};

export default useIsMounted;
