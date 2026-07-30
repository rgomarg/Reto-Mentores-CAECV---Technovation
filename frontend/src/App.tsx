import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Imagina que has creado estos dos componentes en otros archivos:
import Inicio from './pages/Inicio';
import Agricultor from './pages/Agricultor'; 
import CrearUsuarios from './pages/CrearUsuarios';


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
  }
])

function App() {
  return <RouterProvider router={router} />;
}
export default App;