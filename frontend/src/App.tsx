import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Imagina que has creado estos dos componentes en otros archivos:
import Inicio from './pages/Inicio';
import Agricultor from './pages/Agricultor'; 
import CrearUsuarios from './pages/CrearUsuarios';

// Nuevas pantallas del mockup
import ProfileSelection from './pages/ProfileSelection';
import ProfileDashboard from './pages/ProfileDashboard';
import Album from './pages/Album';
import Potenciadores from './pages/Potenciadores';
import NfcScan from './pages/NfcScan';
import CromoDetalle from './pages/CromoDetalle';
import NFCPage from './pages/NFCPage';
import Batallas from './pages/Batallas'; // <- IMPORTAMOS LA NUEVA PANTALLA

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />
  },
  {
    path: "/agricultor/a",
    element: <Agricultor />
  },
  {
    path:"/usuarios",
    element: <CrearUsuarios/>
  },
  {
    path: "/perfiles",
    element: <ProfileSelection />
  },
  {
    path: "/dashboard/:id",
    element: <ProfileDashboard />
  },
  {
    path: "/dashboard/:id/album",
    element: <Album />
  },
  {
    path: "/dashboard/:id/potenciadores",
    element: <Potenciadores />
  },
  {
    path: "/dashboard/:id/batallas", // <- NUEVA RUTA
    element: <Batallas />
  },
  {
    path: "/nfc/:id?",
    element: <NfcScan />
  },
  {
    path: "/nfc/cromo/:idCromo",
    element: <NFCPage />
  },
  {
    path: "/cromo/:id",
    element: <CromoDetalle />
  }
])

function App() {
  return <RouterProvider router={router} />;
}
export default App;