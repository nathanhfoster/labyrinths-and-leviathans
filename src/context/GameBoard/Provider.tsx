import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef
} from 'react';
import useDebounceCallback from '../../hooks/useDebounceCallback';
import useReducerWithThunk from '../Store/hooks/useReducerWithThunk';
import Provider from '../Store/Provider';
import { ContextDefaultDispatch } from '../Store/utils';
import { SetBoardDemensions, SetBoardRef } from './actions';
import { GameBoardIntialState, GameBoardReducer } from './reducer';

export const GameBoardStateContext = createContext(GameBoardIntialState);
GameBoardStateContext.displayName = 'GameBoardStateContext';
export const GameBoardDispatchContext = createContext(ContextDefaultDispatch);
GameBoardDispatchContext.displayName = 'GameBoardDispatchContext';

export interface GameBoardProivderProps {
  children?: ReactNode;
}

export const GameBoardProivder: FC<GameBoardProivderProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const handleResize = useDebounceCallback(
    () => dispatch(SetBoardDemensions()),
    100
  );

  const [state, dispatch] = useReducerWithThunk(
    GameBoardReducer,
    GameBoardIntialState
  );

  useEffect(() => {
    dispatch(SetBoardRef(canvasRef));
  }, [state.height, state.width, dispatch]);

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <Provider
      stateContext={GameBoardStateContext}
      stateProviderValue={state}
      dispatchContext={GameBoardDispatchContext}
      dispatchProviderValue={dispatch}
    >
      <canvas ref={canvasRef} height={state.height} width={state.width} />
      {children}
    </Provider>
  );
};
