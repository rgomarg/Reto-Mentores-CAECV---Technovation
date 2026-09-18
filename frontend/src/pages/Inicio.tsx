/*
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

  // Determinar icono o estilo de avatar según la fila/posición para asemejar a la maqueta
  const renderAvatar = (usuario: UsuarioRankingDTO, index: number) => {
    const letra = usuario.nombre ? usuario.nombre.charAt(0).toUpperCase() : 'U';

    if (index === 0) {
      // Primer puesto: Círculo coral con la letra inicial
      return (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DE6D5C] text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm shrink-0">
          {letra}
        </div>
      );
    } else if (index === 1) {
      // Segundo puesto: Icono de persona en color coral
      return (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#DE6D5C]/15 text-[#DE6D5C] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else if (index === 2) {
      // Tercer puesto: Icono de persona en color verde huerta
      return (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7BC422]/20 text-[#5FA314] flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      );
    } else {
      // Otros puestos
      return (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-semibold text-xs shrink-0">
          {letra}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C]">
      {/!* Barra superior de navegación *!/}
      <Navbar />

      {/!* Contenedor Principal Centrado (Izquierda: Tarjeta Liga Oro | Derecha: Mapa Urbano) *!/}
      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
          
          {/!* ========================================================= *!/}
          {/!* PANEL IZQUIERDO: Tarjeta "LIGA ORO" Fiel al Mockup        *!/}
          {/!* ========================================================= *!/}
          <div className="w-full max-w-sm sm:max-w-md lg:w-80 xl:w-88 shrink-0 flex flex-col shadow-sm rounded-2xl overflow-hidden bg-white">
            
            {/!* Cabecera Dorada "LIGA ORO" *!/}
            <div className="bg-[#E5A93C] px-5 py-3.5 sm:py-4">
              <h1 className="text-[#1C201C] font-extrabold text-lg sm:text-xl tracking-wide uppercase">
                LIGA ORO
              </h1>
            </div>

            {/!* Cuerpo de la tabla de clasificación *!/}
            <div className="p-3 sm:p-4 flex flex-col gap-1.5 min-h-[260px] sm:min-h-[300px]">
              {cargando ? (
                <div className="flex-grow flex flex-col items-center justify-center py-12 gap-3 text-gray-400">
                  <div className="w-7 h-7 border-3 border-[#E5A93C] border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs font-medium">Cargando clasificación...</span>
                </div>
              ) : ranking.length === 0 ? (
                <div className="flex-grow flex items-center justify-center text-xs text-gray-400 py-12">
                  No hay usuarios disponibles.
                </div>
              ) : (
                ranking.map((usuario, index) => {
                  const isFirst = index === 0;
                  const isCurrent = usuario.id.toString() === loggedUserId;

                  return (
                    <div
                      key={usuario.id}
                      onClick={() => navigate(`/usuario/${usuario.id}`)}
                      className={`flex items-center px-3 py-2.5 rounded-xl cursor-pointer transition-colors duration-150 ${
                        isFirst
                          ? 'bg-[#FBF3DF]' // Resaltado suave como en la maqueta
                          : isCurrent
                          ? 'bg-[#FBF3DF]/60'
                          : 'hover:bg-gray-50'
                      }`}
                      title={`Ver perfil de ${usuario.nombre}`}
                    >
                      {/!* Posición numérica *!/}
                      <span className="w-5 text-left font-bold text-sm sm:text-base text-[#1C201C] shrink-0">
                        {usuario.posicion}
                      </span>

                      {/!* Avatar representativo *!/}
                      <div className="ml-1.5 sm:ml-2">
                        {renderAvatar(usuario, index)}
                      </div>

                      {/!* Nombre del usuario *!/}
                      <span className="ml-3 sm:ml-4 font-semibold text-sm sm:text-base text-[#1C201C] flex-grow truncate">
                        {usuario.nombre}
                      </span>

                      {/!* Puntuación en tono coral / rojizo *!/}
                      <span className="font-extrabold text-base sm:text-lg text-[#DE6D5C] shrink-0 pl-3">
                        {usuario.puntuacionUsuario}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

          </div>

          {/!* ========================================================= *!/}
          {/!* PANEL DERECHO: Mapa Urbano Limpio Sin Marcos Exteriores   *!/}
          {/!* ========================================================= *!/}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl flex items-center justify-center">
            <MapaCiudad />
          </div>

        </div>
      </main>
    </div>
  );
}*/


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
              </div>
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