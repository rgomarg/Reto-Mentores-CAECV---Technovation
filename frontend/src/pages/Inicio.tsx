import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MapaCiudad from '../components/MapaCiudad';
import { obtenerRankingUsuarios, type UsuarioRankingDTO } from '../services/usuarioService';

export default function Inicio() {
  const navigate = useNavigate();
  const [ranking, setRanking] = useState<UsuarioRankingDTO[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const loggedUserId = localStorage.getItem('loggedUserId') || '1';

  useEffect(() => {
    let isMounted = true;
    setCargando(true);

    obtenerRankingUsuarios()
      .then((data) => {
        if (isMounted) {
          setRanking(data);
          setCargando(false);
        }
      })
      .catch((err) => {
        console.error("Error al cargar ranking:", err);
        if (isMounted) setCargando(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getPodiumBadge = (posicion: number) => {
    switch (posicion) {
      case 1:
        return (
          <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shadow-sm">
            1º
          </span>
        );
      case 2:
        return (
          <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shadow-sm">
            2º
          </span>
        );
      case 3:
        return (
          <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
            3º
          </span>
        );
      default:
        return (
          <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 font-bold text-sm flex items-center justify-center">
            {posicion}º
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C]">
      {/* 1. Menú Global de Navegación */}
      <Navbar />

      {/* 3. Contenedor Principal en 2 Paneles (Izquierda: Ranking | Derecha: Mapa) */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-grow">
        
        {/* ========================================================= */}
        {/* PANEL IZQUIERDO: Ranking / Clasificación Dinámica        */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-[#C1C69A]/30">
          
          {/* Cabecera del Ranking */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C201C] tracking-tight">
                  Clasificación
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Liga en curso • Puntuaciones en tiempo real
              </p>
            </div>

            <span className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200">
              En vivo
            </span>
          </div>

          {/* Lista de Clasificación */}
          {cargando ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-gray-500">
              <div className="w-8 h-8 border-4 border-[#DE6D5C] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Cargando clasificación desde la BBDD...</span>
            </div>
          ) : ranking.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No se han encontrado usuarios registrados.
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {ranking.map((usuario) => {
                const isCurrentUser = usuario.id.toString() === loggedUserId;

                return (
                  <div
                    key={usuario.id}
                    onClick={() => navigate(`/usuario/${usuario.id}`)}
                    className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isCurrentUser
                        ? 'bg-[#FCF6DF] border-[#DE6D5C] shadow-sm ring-1 ring-[#DE6D5C]/30'
                        : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-[#C1C69A]'
                    }`}
                  >
                    {/* Posición + Avatar + Nombre */}
                    <div className="flex items-center gap-3">
                      {/* Medalla o número de posición */}
                      <div className="shrink-0">
                        {getPodiumBadge(usuario.posicion)}
                      </div>

                      {/* Avatar circular */}
                      <div className="w-10 h-10 rounded-full bg-[#DE6D5C] text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                        {usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U'}
                      </div>

                      {/* Nombre y datos secundarios */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-[#1C201C] text-sm sm:text-base leading-tight">
                            {usuario.nombre}
                          </span>
                          {isCurrentUser && (
                            <span className="text-[10px] bg-[#DE6D5C] text-white font-bold px-1.5 py-0.5 rounded-md leading-none">
                              TÚ
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                          <span>🃏 {usuario.nCromos} cromos</span>
                          <span>•</span>
                          <span>⚡ {usuario.nPotenciadores} pot.</span>
                        </div>
                      </div>
                    </div>

                    {/* Puntuación */}
                    <div className="flex flex-col items-end shrink-0 pl-2">
                      <span className="text-base sm:text-lg font-black text-[#1C201C] tracking-tight">
                        {usuario.puntuacionUsuario}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 -mt-1">
                        puntos
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pie del Panel de Ranking */}
          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span>Total participantes: {ranking.length}</span>
            <button
              onClick={() => navigate('/usuarios')}
              className="text-emerald-700 font-bold hover:underline"
            >
              + Nuevo usuario
            </button>
          </div>

        </div>

        {/* ========================================================= */}
        {/* PANEL DERECHO: Mapa Urbano Interactivo                   */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 flex flex-col">
          <MapaCiudad />
        </div>

      </div>
    </div>
  );
}