import { ReactNode } from "react";
import { ContextBaseAction } from "../types";


export interface BatteryManagerEvents extends EventTarget {
    chargingchange?: Event;
    levelchange?: Event;
    chargingtimechange?: Event;
    dischargingtimechange?: Event;
}


export interface BatteryManager extends BatteryManagerEvents {
    charging: boolean; // A Boolean value indicating whether the battery is currently being charged.
    chargingTime: number; // A number representing the remaining time in seconds until the battery is fully charged, or 0 if the battery is already fully charged.
    dischargingTime: number; // A number representing the remaining time in seconds until the battery is completely discharged and the system suspends.
    level: number; // A number representing the system's battery charge level scaled to a value between 0.0 and 1.0.

    onchargingchange?: () => void;
    onchargingtimechange?: () => void;
    ondischargingtimechange?: () => void;
    onlevelchange?: () => void;
}

export interface BatteryManagerEvent {
    target: BatteryManager;
}

export interface BatteryManagerAction extends ContextBaseAction {

}

export interface BatteryManagerProviderProps {
    children: ReactNode;
}

export interface BatteryManagerAnalytics {
    chargeLevelPerSecond: number;
    dischargeLevelPerSecond: number;
}

export interface BatteryManagerState extends BatteryManager {
    analytics: BatteryManagerAnalytics;
}


export type setBatteryManagerKeyAction = (key: keyof BatteryManager, payload: BatteryManager[typeof key]) => BatteryManagerAction;

export type setBatteryManagerAction = (payload: BatteryManager) => BatteryManagerAction;