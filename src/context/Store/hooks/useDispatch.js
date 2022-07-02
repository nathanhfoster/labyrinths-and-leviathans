import { useContext } from 'react';
/**
 * Hook that consumers a dispatchContext and returns it's dispatch API
 * @callback useDispatch
 * @param {React.context} dispatchContext - The context that was used to create the store's dispatch
 * @returns {Dispatch} - The dispatch API instance for a particular store
 */
const useDispatch = (dispatchContext) => useContext(dispatchContext);

export default useDispatch;
