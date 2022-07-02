import { Context, Dispatch, ReactElement, ReactNode, Reducer, } from "react";

export interface ContextBaseAction {
    type: string;
    key?: string;
    payload?: any;
}

export type ContextDefaultAction = () => ContextBaseAction;

export type MapStateToPropsType<S, P> = (state: S, ownProps: P) => (S | P) | (S & P);

export type MapDispatchToPropsType<D> = (
    dispatch: Dispatch<D>
) => D;

export interface MapStateToPropsArray<S, P> {
    context: Context<S>;
    mapStateToProps: MapStateToPropsType<S, P>;
}

export type EqualityFunctionType = (prevPropsOrState: any, nextPropsOrState: any) => boolean;

export type ConnectType<S, P> = (
    mapStateToPropsArray: MapStateToPropsType<S, P>[],
    // mapDispatchToProps: MapDispatchToPropsType<D>,
) => (Component: React.FC<P>) => (ownProps: P) => ReactElement<P>;

export type StringMap = Record<string, any>;

export type ReducerStateType = StringMap;

export type ComponentPropsType = StringMap;

export type ContextStoreNameType = number | string;

export type ContextType = any | Context<ReducerStateType>;

export type ReducerStateInitializerType = (stateOrProps: ReducerStateType | ComponentPropsType) => ReducerStateType;

export type ChildrenType = ReactNode | ReactElement | JSX.Element | React.FC<any> | React.ForwardRefRenderFunction<any>;

export interface ContextStoreProps {
    id?: String | Number;
    name?: ContextStoreNameType;
    stateContext?: ContextType;
    stateProviderValue?: ReducerStateType;
    dispatchContext?: ContextType;
    dispatchProviderValue: any;
    children: ChildrenType;
  }