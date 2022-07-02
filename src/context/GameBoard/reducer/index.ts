import { Reducer, } from 'react';
import { GameBoardState } from './types';
import { GameBoardAction } from '../actions/types';
import * as ActionTypes from '../actions/types';

export const GameBoardIntialState: GameBoardState = {
    ref: undefined,
    height: window.innerHeight,
    width: window.innerWidth
};

export const GameBoardReducer: Reducer<GameBoardState, GameBoardAction> = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.SET_BOARD_REF:
            const context = payload.current?.getContext('2d') as CanvasRenderingContext2D;
            context.fillStyle = '#000000';
            context.fillRect(0, 0, context.canvas.width, context.canvas.height);
            return {
                ...state,
                ref: payload
            };

        case ActionTypes.SET_BOARD_DEMENSIONS:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};