import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function ProfileDashboard() {
  const navigate = useNavigate();
  // Extraemos el id de la URL (Asegúrate de que en App.tsx la ruta sea /dashboard/:idUsuario)
  const { id } = useParams();
  
  // Le decimos a TypeScript que puede ser <any> para que no se queje del null inicial
  const [datosUsuario, setDatosUsuario] = useState<any>(null);

  useEffect(() => {
    // Ajusta la URL si finalmente decidisteis usar /api o no
    fetch(`/api/usuarios/${id}`)
      .then(respuesta => respuesta.json())
      .then(datosDelBackend => {
        setDatosUsuario(datosDelBackend);
      });
  }, [id]);


  if (datosUsuario == null) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-xl font-semibold">Cargando datos... </p>
      </div>
    );
  }

  return (
    // 1. Fondo principal gris de toda la pantalla de ordenador
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans text-black py-4">
      
      {/* 2. Contenedor que simula la pantalla del móvil */}
      <div className="w-full max-w-[450px] min-h-[800px] bg-gradient-to-b from-[#a8e6a3] to-[#80d07b] flex flex-col shadow-2xl sm:rounded-[40px] overflow-hidden relative">
          
        {/* Botón Volver (Flotante) */}
        <button 
          className='absolute top-6 left-6 rounded-3xl hover:bg-black/20 px-4 py-2 bg-black/10 text-sm font-medium transition'
          onClick={() => navigate('/perfiles')}
        >
          Volver
        </button>

        {/* Cabecera (Avatar + Stats) */}
        <div className="flex flex-row w-full border-b-[3px] border-black mt-20 pb-8 px-4">
          
          {/* Lado Izquierdo: Avatar y Nombre */}
          <div className="flex flex-col items-center justify-center w-1/2 pr-2">
            <div className="w-24 h-24 rounded-full border-[4px] border-black flex items-center justify-center mb-3 bg-transparent">
              <svg className="w-14 h-14 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 12c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-center leading-tight">
              Bienvenidx,<br/>{datosUsuario.nombre}
            </h2>
          </div>

          {/* Lado Derecho: Estadísticas */}
          <div className="flex flex-col justify-center w-1/2 border-l-[3px] border-black pl-4 text-sm font-medium gap-3">
            <div className="flex justify-between">
              <span>Puntos:</span>
              <span className="font-bold">{datosUsuario.puntuacionUsuario}</span>
            </div>
            <div className="flex justify-between">
              <span>Nº Cromos:</span>
              <span className="font-bold">{datosUsuario.nCromos}</span>
            </div>
            <div className="flex justify-between text-xs sm:text-sm">
              <span>Nº Poten:</span>
              <span className="font-bold">{datosUsuario.nPotenciadores}</span>
            </div>
          </div>
        </div>

        {/* Tarjetas de Acción (Álbum y Potenciadores) */}
        <div className="flex flex-row justify-center gap-4 p-6 flex-grow items-start mt-2">
          
          {/* Tarjeta Album */}
          <button 
            // Pasamos los cromos por el estado de React Router para usarlos mañana
            onClick={() => navigate(`/dashboard/${id}/album`, { state: { cromos: datosUsuario.usuarioCromos} })}
            className="flex-1 w-full aspect-[1/1.6] border-[3px] border-black bg-transparent hover:bg-black/5 transition duration-300 flex flex-col items-center pt-8"
          >
            <span className="text-2xl font-bold mb-10">Album</span>
            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 10h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10Z" />
              <path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>

          {/* Tarjeta Potenciadores */}
          <button 
            onClick={() => navigate('/potenciadores')}
            className="flex-1 w-full aspect-[1/1.6] border-[3px] border-black bg-transparent hover:bg-black/5 transition duration-300 flex flex-col items-center pt-8 px-1"
          >
            <span className="text-lg font-bold mb-10 text-center break-words leading-tight">Potenciadores</span>
            <svg className="w-20 h-20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </button>
        </div>

      </div>
    </div>
  );
}
