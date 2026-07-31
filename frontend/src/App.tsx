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
    path: "/dashboard",
    element: <ProfileDashboard />
  },
  {
    path: "/album",
    element: <Album />
  },
  {
    path: "/potenciadores",
    element: <Potenciadores />
  }
])

function App() {
  return <RouterProvider router={router} />;
}
export default App;