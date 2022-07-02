import { useCallback, useRef } from 'react';

export type useDebounceCallbackType = (callback: () => any, delay?: number) => () => void;

const useDebounceCallback: useDebounceCallbackType = (callback, delay = 400) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const callbackRef = useRef(callback);

    const debouncedCallback = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(callbackRef.current, delay);
    }, [delay]);

    return debouncedCallback;
};

export default useDebounceCallback;