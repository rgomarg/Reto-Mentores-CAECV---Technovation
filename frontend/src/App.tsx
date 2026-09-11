import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Páginas principales del diseño de 4 pantallas
import Inicio from './pages/Inicio';
import Album from './pages/Album';
import CromoDetalle from './pages/CromoDetalle';
import Batallas from './pages/Batallas';

// Otras páginas existentes del proyecto
import Agricultor from './pages/Agricultor'; 
import CrearUsuarios from './pages/CrearUsuarios';
import ProfileSelection from './pages/ProfileSelection';
import ProfileDashboard from './pages/ProfileDashboard';
import Potenciadores from './pages/Potenciadores';
import NfcScan from './pages/NfcScan';
import NFCPage from './pages/NFCPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />
  },
  {
    path: "/album",
    element: <Album />
  },
  {
    path: "/batallas",
    element: <Batallas />
  },
  {
    path: "/cromo/:id",
    element: <CromoDetalle />
  },
  {
    path: "/agricultor/a",
    element: <Agricultor />
  },
  {
    path: "/usuarios",
    element: <CrearUsuarios />
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
    path: "/potenciadores",
    element: <Potenciadores />
  },
  {
    path: "/nfc/:id?",
    element: <NfcScan />
  },
  {
    path: "/nfc/cromo/:idCromo",
    element: <NFCPage />
  }
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;