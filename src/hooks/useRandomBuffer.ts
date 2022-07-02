import { useState, useRef, useEffect } from "react";
import { getRandomInt } from "../utils";

interface useRandomBufferArgument {
    value: number;
    min?: number;
    max?: number;
    initialBuffer?: number;
}

type useRandomBufferProps = (args: useRandomBufferArgument) => [number, (newBuffer: number) => void];

const useRandomBuffer: useRandomBufferProps = ({ value, min = 0, max = 100, initialBuffer = max - value, }) => {
    const normalize = (value: number) => isFinite(value) ? Math.ceil(((value - min) * 100) / (max - min)) : 0;

    const [buffer, setBuffer] = useState(initialBuffer);

    const progressRef = useRef(() => { });

    useEffect(() => {
        progressRef.current = () => {
            const maxDiff = (100 - value) / 2;
            const diff = getRandomInt(0, maxDiff);
            const diff2 = getRandomInt(0, maxDiff);
            setBuffer(normalize(value + diff + diff2));
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 1200);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return [buffer, setBuffer];
};

export default useRandomBuffer;