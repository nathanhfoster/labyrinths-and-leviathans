
import { Reducer } from "react";
import { ACTION_BATTERY_MANAGER_SET, ACTION_BATTERY_MANAGER_SET_KEY, ACTION_BATTERY_MANAGER_SET_ANALYTICS } from "./actions";
import { BatteryManagerState, BatteryManagerAction } from "./types";

export const batteryManagerInitialState: BatteryManagerState = {
    charging: false,
    chargingTime: Infinity,
    dischargingTime: Infinity,
    level: 0,
    onchargingchange: undefined,
    onchargingtimechange: undefined,
    ondischargingtimechange: undefined,
    onlevelchange: undefined,
    addEventListener: () => { },
    dispatchEvent: () => false,
    removeEventListener: () => { },
    analytics: {
        chargeLevelPerSecond: Infinity,
        dischargeLevelPerSecond: Infinity
    }
};

export const batteryManagerReducer: Reducer<BatteryManagerState, BatteryManagerAction> = (state, action) => {
    const { type, key, payload } = action;
    const startTime = new Date();

    switch (type) {
        case ACTION_BATTERY_MANAGER_SET:
            const {
                charging,
                chargingTime,
                dischargingTime,
                level,
                onchargingchange,
                onchargingtimechange,
                ondischargingtimechange,
                onlevelchange
            } = payload;
            return {
                ...state,
                charging,
                chargingTime,
                dischargingTime,
                level,
                onchargingchange,
                onchargingtimechange,
                ondischargingtimechange,
                onlevelchange,
            };

        case ACTION_BATTERY_MANAGER_SET_KEY:
            return {
                ...state,
                [key as keyof BatteryManagerState]: payload
            };

        case ACTION_BATTERY_MANAGER_SET_ANALYTICS:
            const endTime = new Date();
            //@ts-ignore
            const timeDiff = (endTime - startTime) / 1000;

            return {
                ...state,
                analytics: {
                    ...state.analytics, chargeLevelPerSecond: timeDiff
                }
            };

        default:
            return state;
    }
};