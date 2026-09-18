import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Usuario from './pages/Usuario';
import Agricultor from './pages/Agricultor'; 
import CrearUsuarios from './pages/CrearUsuarios';
import ProfileSelection from './pages/ProfileSelection';
import Album from './pages/Album';
import Potenciadores from './pages/Potenciadores';
import NfcScan from './pages/NfcScan';
import CromoDetalle from './pages/CromoDetalle';
import NFCPage from './pages/NFCPage';
import Batallas from './pages/Batallas';
import DemoAdmin from './pages/DemoAdmin'; // Panel oculto para el pitch

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicio />
  },
  {
    path: "/inicio",
    element: <Inicio />
  },
  {
    path: "/usuario",
    element: <Usuario />
  },
  {
    path: "/usuario/:id",
    element: <Usuario />
  },
  {
    path: "/perfil",
    element: <Usuario />
  },
  {
    path: "/perfil/:id",
    element: <Usuario />
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
    path: "/demo", // Ruta oculta
    element: <DemoAdmin />
  },
  {
    path: "/dashboard/:id",
    element: <Usuario />
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
    path: "/dashboard/:id/batallas",
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