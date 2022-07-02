
import { useRef, useReducer, useCallback, MutableRefObject, ReducerState, Reducer, } from 'react';
import { setObjectStateReducer } from './reducers';
import useEffectAfterMount from './useEffectAfterMount';

const defaultCallback = () => { };

export interface useSetStateReducerProps { reducer?: Reducer<any, any>, initializerArg: ReducerState<any>, initializer?: (arg: ReducerState<any>) => ReducerState<any>; }

export type AugmentedDispatch = (updater: Record<string, any>, callback?: () => any) => any;

/**
 * Mimics React.Component this.state and this.setState
 */
const useSetStateReducer = ({ reducer = setObjectStateReducer, initializerArg, initializer = (initializerArg) => initializerArg }: useSetStateReducerProps) => {
    // Temporarily holds the reference to a callback
    const callbackRef: MutableRefObject<(arg: ReducerState<any>) => ReducerState<any>> = useRef(defaultCallback);

    const [state, dispatch] = useReducer(
        reducer,
        initializerArg,
        initializer
    );

    /**
     * Augments the dispatch to accept a callback as a second parameter
     */
    const setState: AugmentedDispatch = useCallback((updater, callback) => {
        callbackRef.current = callback || defaultCallback;
        dispatch(updater);
    }, []);

    // Synchronously call the callback after every state change
    useEffectAfterMount(() => {
        callbackRef.current(state);
        callbackRef.current = defaultCallback;
    }, [state]);

    return [state, setState];
};

export default useSetStateReducer;
