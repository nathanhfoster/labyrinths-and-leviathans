import ActionTypes from './actionTypes';
import { ContextDefaultAction } from '../../types';

export const ContextDefaultDispatch: ContextDefaultAction = () => ({ type: ActionTypes.INIT });