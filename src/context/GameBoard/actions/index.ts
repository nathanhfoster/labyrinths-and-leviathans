
import * as ActionTypes from './types';

export const SetBoardRef = (ref: React.RefObject<HTMLCanvasElement>) => ({ type: ActionTypes.SET_BOARD_REF, payload: ref });

export const SetBoardDemensions = (height = window.innerHeight, width = window.innerWidth) => ({ type: ActionTypes.SET_BOARD_DEMENSIONS, payload: { height, width } });