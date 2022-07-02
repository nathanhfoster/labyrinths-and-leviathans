import { ReactNode, FC } from 'react';
import { GameBoardProivder } from './Provider';

export interface BoardProps {
  children?: ReactNode;
}

const GameBoard: FC<BoardProps> = ({ children }) => {
  return <GameBoardProivder>{children}</GameBoardProivder>;
};

export default GameBoard;
