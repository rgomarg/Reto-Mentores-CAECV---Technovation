import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Bienvenido al reto del CAECV</h1>
      <p className="mt-4">Aquí va la información inicial...</p>
      
      {/* Botón para ir a productos */}
      <Link to="/agricultor/a" className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded">
        Como ser agricultor/a
      </Link>
      <Link to="/usuarios" className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded">
        Crear usuario
      </Link>
    </div>
  );
}

export default Inicio; // <-- ¡Muy importante exportarlo!