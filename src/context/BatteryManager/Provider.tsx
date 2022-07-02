import { FC, createContext, useContext, useEffect } from 'react';
import useSetStateReducer from '../../hooks/useSetStateReducer';
import { setBatteryManager, setBatteryManagerAnalytics } from './actions';
import { batteryManagerInitialState, batteryManagerReducer } from './reducer';
import {
  BatteryManagerProviderProps,
  BatteryManager,
  BatteryManagerEvents
} from './types';

const BatteryManagerEventsKeys: (keyof BatteryManagerEvents)[] = [
  'chargingchange',
  'levelchange',
  'chargingtimechange',
  'dischargingtimechange'
];

export const BatteryManagerStateContext = createContext(
  batteryManagerInitialState
);
BatteryManagerStateContext.displayName = 'BatteryManagerStateContext';
export const useBatteryManagerState = () =>
  useContext(BatteryManagerStateContext);

export const BatteryManagerDispatchContext = createContext((payload: any) => ({
  type: 'UNKNOWN',
  payload
}));
BatteryManagerDispatchContext.displayName = 'BatteryManagerDispatchContext';
export const useBatteryManagerDispatch = () =>
  useContext(BatteryManagerDispatchContext);

export const BatteryManagerProvider: FC<BatteryManagerProviderProps> = ({
  children
}) => {
  const [state, dispatch] = useSetStateReducer({
    reducer: batteryManagerReducer,
    initializerArg: batteryManagerInitialState
  });

  useEffect(() => {
    (async function getBatteryManager() {
      const setBatteryManagerAndAnalytics = (
        batteryManager: BatteryManager
      ) => {
        dispatch(setBatteryManager(batteryManager), () =>
          dispatch(setBatteryManagerAnalytics())
        );
      };

      return await navigator
        //@ts-ignore
        ?.getBattery?.()
        .then((batteryManager: BatteryManager) => {
          setBatteryManagerAndAnalytics(batteryManager);
          BatteryManagerEventsKeys.forEach(batteryEvent => {
            batteryManager.addEventListener(batteryEvent, e => {
              setBatteryManagerAndAnalytics(e.target as BatteryManager);
            });
          });
        });
    })();
  }, []);

  return (
    //@ts-ignore
    <BatteryManagerDispatchContext.Provider value={dispatch}>
      <BatteryManagerStateContext.Provider value={state}>
        {children}
      </BatteryManagerStateContext.Provider>
    </BatteryManagerDispatchContext.Provider>
  );
};
