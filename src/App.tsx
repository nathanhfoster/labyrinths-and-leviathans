import './App.css';
import { BatteryManagerProvider } from './context/BatteryManager/Provider';
import GameBoard from './context/GameBoard';

const App = () => {
  return (
    <BatteryManagerProvider>
      <GameBoard />
    </BatteryManagerProvider>
  );
};

export default App;
