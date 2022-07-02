import { FC } from 'react';
import { ContextStoreProps } from '../types';

const Provider: FC<ContextStoreProps> = ({
  id,
  stateContext: StateContext,
  stateProviderValue,
  dispatchProviderValue,
  dispatchContext: DispatchContext,
  children
}) => {
  const StateContextProvider = (
    <StateContext.Provider
      value={stateProviderValue}
      displayName={`${StateContext.displayName}${id ? `-${id}` : ''}`}
    >
      {children}
    </StateContext.Provider>
  );

  return DispatchContext ? (
    <DispatchContext.Provider
      value={dispatchProviderValue}
      displayName={DispatchContext.displayName}
    >
      {StateContextProvider}
    </DispatchContext.Provider>
  ) : (
    StateContextProvider
  );
};

Provider.defaultProps = {
  id: '',
  children: null
};

export default Provider;
