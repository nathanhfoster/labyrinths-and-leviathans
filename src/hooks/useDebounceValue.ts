import { useState, useEffect } from 'react';

const useDebounceValue = (value: any, delay = 200) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return debouncedValue;
};



export default useDebounceValue;
