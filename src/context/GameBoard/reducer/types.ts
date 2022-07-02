import { RefObject } from 'react';

export interface GameBoardState {
    ref?: RefObject<HTMLCanvasElement>;
    height: Number;
    width: Number;
}
