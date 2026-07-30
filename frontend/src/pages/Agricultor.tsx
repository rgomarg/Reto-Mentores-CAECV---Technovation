import { Link } from 'react-router-dom';

function Agricultor() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Bienvenido</h1>
      <p className='mt-2'>Información para un futuro/a agricultor/a</p>

      <Link to="/" className="text-blue-500 underline mt-4 block">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Agricultor;