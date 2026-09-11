import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/UserContext';
import type { UserProfile } from '../context/types';

export default function ProfileDashboard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, currentUserId } = useUser();

  const activeId = id ? parseInt(id, 10) : currentUserId;
  const [userData, setUserData] = useState<UserProfile | null>(() => {
    if (!id || parseInt(id, 10) === currentUser?.id) {
      return currentUser;
    }
    return null;
  });
  const [loading, setLoading] = useState<boolean>(!userData);

  useEffect(() => {
    let isMounted = true;
    if (activeId) {
      setLoading(true);
      fetch(`/api/usuarios/${activeId}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Error al cargar perfil');
        })
        .then((data) => {
          if (isMounted && data) {
            setUserData({
              id: activeId,
              nombre: data.nombre,
              puntuacionUsuario: data.puntuacionUsuario ?? 0,
              nCromos: data.nCromos ?? 0,
              nPotenciadores: data.nPotenciadores ?? 0,
              usuarioCromos: data.usuarioCromos || [],
              usuarioPotenciadores: data.usuarioPotenciadores || [],
            });
          }
        })
        .catch(() => {
          if (isMounted) {
            // Si falla la API o estamos offline, fallback a los datos del contexto o diseño
            setUserData(currentUser);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, [activeId, currentUser]);

  const displayUser = userData || currentUser;
  const nombre = displayUser?.nombre || 'Nombre';
  const initial = nombre.charAt(0).toUpperCase();
  const puntos = displayUser?.puntuacionUsuario ?? 55;
  const cromosCount = displayUser?.nCromos ?? 4;
  const totalCromos = 20;

  return (
    <div className="min-h-screen bg-[#FAF8EB] flex flex-col font-sans text-gray-900 antialiased selection:bg-amber-200">
      {/* Navbar Superior con highlight en el avatar del perfil */}
      <Navbar activeTab="perfil" />

      {/* Contenido Principal del Perfil */}
      <main className="flex-grow flex flex-col items-center justify-between px-6 pt-10 pb-8 max-w-4xl mx-auto w-full">
        {/* Cabecera del Usuario: Gran Avatar Coral + Nombre */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#DE6B58] text-white font-black text-3xl sm:text-4xl flex items-center justify-center shadow-sm select-none transition-transform duration-300 hover:scale-105">
            {initial}
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight mt-3">
            {nombre}
          </h1>
        </div>

        {/* Cuadrícula 2x2 de Estadísticas / Tarjetas Blancas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-2xl mb-12">
          {/* Tarjeta 1: Puntos totales */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 flex flex-col justify-center transition-all hover:shadow-md">
            <span className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-1">
              {puntos}
            </span>
            <span className="text-xs sm:text-sm font-bold text-black tracking-tight">
              Puntos totales
            </span>
          </div>

          {/* Tarjeta 2: Álbum completo */}
          <div 
            onClick={() => navigate('/album')}
            className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 flex flex-col justify-center cursor-pointer transition-all hover:shadow-md hover:border-amber-200 group"
          >
            <span className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-1 group-hover:text-amber-600 transition-colors">
              {cromosCount} / {totalCromos}
            </span>
            <span className="text-xs sm:text-sm font-bold text-black tracking-tight">
              Álbum completo
            </span>
          </div>

          {/* Tarjeta 3: Boss derrotados */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 flex flex-col justify-center transition-all hover:shadow-md">
            <span className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-1">
              4
            </span>
            <span className="text-xs sm:text-sm font-bold text-black tracking-tight">
              Boss derrotados
            </span>
          </div>

          {/* Tarjeta 4: Racha */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-gray-100 flex flex-col justify-center transition-all hover:shadow-md">
            <span className="text-3xl sm:text-4xl font-black text-black tracking-tight mb-1">
              5 días
            </span>
            <span className="text-xs sm:text-sm font-bold text-black tracking-tight">
              Racha
            </span>
          </div>
        </div>

        {/* Indicador de carga discreto */}
        {loading && (
          <p className="text-xs text-gray-400 animate-pulse mb-4">Sincronizando perfil con BBDD...</p>
        )}

        {/* Enlace Inferior Derecho: Datos personales -> */}
        <div className="w-full flex justify-end">
          <button
            onClick={() => navigate('/perfiles')}
            className="flex items-center gap-2 text-black font-extrabold text-sm sm:text-base hover:opacity-80 active:scale-98 transition group cursor-pointer"
          >
            <span>Datos personales</span>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
