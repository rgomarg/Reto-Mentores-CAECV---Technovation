import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function ProfileDashboard() {
  const { id } = useParams();

  const [datosUsuario, setDatosUsuario] = useState<any>(null);
  const [totalCromos, setTotalCromos] = useState<number>(0);

  useEffect(() => {
    // 1. Obtener datos del usuario
    fetch(`/api/usuarios/${id}`)
      .then(respuesta => respuesta.json())
      .then(datosDelBackend => {
        setDatosUsuario(datosDelBackend);
      });

    // 2. Obtener total de cromos en el juego
    fetch('/api/cromos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTotalCromos(data.length);
        }
      })
      .catch(err => console.error("Error al cargar total de cromos:", err));
  }, [id]);

  if (datosUsuario == null) {
    return (
      <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <p className="text-xl font-semibold text-[#1C201C]">Cargando datos... </p>
        </div>
      </div>
    );
  }

  const isAlbumCompleto = totalCromos > 0 && datosUsuario.nCromos >= totalCromos;

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C]">
      
      {/* 1. Menú Global */}
      <Navbar />

      {/* 2. Contenido Principal */}
      <div className="flex-grow flex flex-col items-center px-4 py-8">
        
        {/* Avatar Centralizado */}
        <div className="flex flex-col items-center justify-center mt-6 mb-12">
          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#DE6D5C] rounded-full flex items-center justify-center text-white font-bold text-5xl mb-4 shadow-sm">
            {datosUsuario.nombre ? datosUsuario.nombre.charAt(0).toUpperCase() : 'A'}
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            {datosUsuario.nombre}
          </h2>
        </div>

        {/* Grid de 4 Estadísticas (Max Width para ordenador) */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-2">
          
          {/* Card 1: Puntos totales */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-bold mb-1">{datosUsuario.puntuacionUsuario || 0}</span>
            <span className="text-base font-bold text-gray-800">Puntos totales</span>
          </div>

          {/* Card 2: Progreso Álbum */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-bold mb-1">
               {datosUsuario.nCromos || 0} / {totalCromos || '?'}
            </span>
            <span className={`text-base font-bold ${isAlbumCompleto ? 'text-green-600' : 'text-gray-800'}`}>
              {isAlbumCompleto ? '¡Álbum completo!' : 'Progreso del álbum'}
            </span>
          </div>

          {/* Card 3: Boss derrotados (Simulado) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-bold mb-1">4</span>
            <span className="text-base font-bold text-gray-800">Boss derrotados</span>
          </div>

          {/* Card 4: Racha (Simulado) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <span className="text-3xl font-bold mb-1">5 días</span>
            <span className="text-base font-bold text-gray-800">Racha</span>
          </div>

        </div>

        
        

      </div>
    </div>
  );
}
