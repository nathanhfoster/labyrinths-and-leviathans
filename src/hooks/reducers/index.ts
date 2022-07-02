import { Reducer, } from "react";
import { getDerivedStateFromProps } from "../../utils";


export const setStateReducer: Reducer<any, any> = (state, action) => (typeof action === 'function' ? action(state) : action);

export const setObjectStateReducer: Reducer<any, any> = (state, action) => {
    const nextStateToOverwrite = setStateReducer(state, action);
    const nextState = getDerivedStateFromProps(state, nextStateToOverwrite);

    return nextState;
};