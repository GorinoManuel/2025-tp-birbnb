import './App.css';
import { AppRoutes } from './routes';
import { AlojamientosProvider } from './context/alojamientoProvider';
import { DetailProvider } from './context/detailProvider';
import { ReservasProvider } from './context/reservaProvider';

function App() {
  return (
    <>
      <AlojamientosProvider>
        <ReservasProvider>
          <AppRoutes/>
        </ReservasProvider>
      </AlojamientosProvider>
    </>
  );
}

export default App;
