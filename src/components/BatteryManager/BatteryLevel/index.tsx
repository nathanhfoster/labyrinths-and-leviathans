import { FC, useRef } from 'react';
import { BatteryManagerStateContext } from '../../../context/BatteryManager/Provider';
import { BatteryManager } from '../../../context/BatteryManager/types';
import connect from '../../../context/Store/connect';
import { MapStateToPropsType } from '../../../context/types';
import useRandomBuffer from '../../../hooks/useRandomBuffer';
import { secondsToHms, toFixedNumber } from '../../../utils';

interface BatteryLevelProps {
  value: number;
  initialBuffer?: number;
  color: string;
  chargingTimeMessage: string;
}

const BatteryLevel: FC<BatteryLevelProps> = ({
  value,
  initialBuffer,
  color,
  chargingTimeMessage
}) => {
  const progressRef = useRef<HTMLProgressElement>(null);
  const [buffer] = useRandomBuffer({ value, initialBuffer });

  return (
    <>
      <div id='battery' style={{ display: 'flex', justifyContent: 'center' }}>
        <progress
          ref={progressRef}
          max='100'
          value={buffer}
          //@ts-ignore
          style={{ height: '3rem' }}
        >
          {value}%
        </progress>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h6>{chargingTimeMessage}</h6>
      </div>
    </>
  );
};

const mapStateToProps: MapStateToPropsType<
  BatteryManager,
  BatteryLevelProps
> = ({ charging, chargingTime, dischargingTime, level }) => {
  const value = toFixedNumber(level * 100, 1);
  const initialBuffer = charging ? chargingTime : undefined;
  const color = value <= 30 ? 'error' : value <= 50 ? 'warning' : 'success';

  const chargingTimeMessage = `${secondsToHms(
    charging ? chargingTime : dischargingTime
  )} until ${charging ? 'fully charged' : 'empty'}`;

  return { value, initialBuffer, color, chargingTimeMessage };
};

const mapStateToPropsArray = [
  { context: BatteryManagerStateContext, mapStateToProps }
];

export default connect(mapStateToPropsArray)(BatteryLevel);
