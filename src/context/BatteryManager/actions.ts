import { setBatteryManagerKeyAction, setBatteryManagerAction } from './types';

export const ACTION_BATTERY_MANAGER_SET = 'ACTION_BATTERY_MANAGER_SET';
export const ACTION_BATTERY_MANAGER_SET_KEY = 'ACTION_BATTERY_MANAGER_SET_KEY';
export const ACTION_BATTERY_MANAGER_SET_ANALYTICS = 'ACTION_BATTERY_MANAGER_SET_ANALYTICS';

export const setBatteryManager: setBatteryManagerAction = (payload) => ({ type: ACTION_BATTERY_MANAGER_SET, payload });
export const setBatteryManagerKey: setBatteryManagerKeyAction = (key, payload) => ({ type: ACTION_BATTERY_MANAGER_SET_KEY, key, payload });

export const setBatteryManagerAnalytics = () => ({ type: ACTION_BATTERY_MANAGER_SET_ANALYTICS });