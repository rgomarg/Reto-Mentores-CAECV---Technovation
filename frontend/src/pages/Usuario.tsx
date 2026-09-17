import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { obtenerTodosUsuarios, type UsuarioDTO } from '../services/usuarioService';

export default function Usuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ID actual efectivo: de la URL o del usuario en sesión
  const currentUserId = id || localStorage.getItem('loggedUserId') || '1';

  const [datosUsuario, setDatosUsuario] = useState<UsuarioDTO | null>(null);
  const [totalCromos, setTotalCromos] = useState<number>(0);
  const [usuariosDisponibles, setUsuariosDisponibles] = useState<UsuarioDTO[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // 1. Cargar lista de todos los usuarios de la BBDD para el dropdown
  useEffect(() => {
    let isMounted = true;
    obtenerTodosUsuarios()
      .then(users => {
        if (isMounted) {
          setUsuariosDisponibles(users);
        }
      })
      .catch(err => console.error("Error al cargar usuarios de la BBDD:", err));

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Cargar datos del usuario seleccionado y total del álbum
  useEffect(() => {
    let isMounted = true;
    setCargando(true);

    // Obtener datos del usuario desde la API
    fetch(`/api/usuarios/${currentUserId}`)
      .then(res => {
        if (!res.ok) throw new Error("Usuario no encontrado");
        return res.json();
      })
      .then(data => {
        if (isMounted) {
          setDatosUsuario(data);
          setCargando(false);
        }
      })
      .catch(err => {
        console.error("Error al cargar usuario:", err);
        if (isMounted) setCargando(false);
      });

    // Obtener total de cromos del juego
    fetch('/api/cromos')
      .then(res => res.json())
      .then(data => {
        if (isMounted && Array.isArray(data)) {
          setTotalCromos(data.length);
        }
      })
      .catch(err => console.error("Error al cargar cromos:", err));

    return () => {
      isMounted = false;
    };
  }, [currentUserId]);

  // Manejador del cambio de usuario activo
  const handleCambiarUsuario = (nuevoId: string) => {
    const userObj = usuariosDisponibles.find(u => u.id.toString() === nuevoId);
    if (userObj) {
      localStorage.setItem('loggedUserId', nuevoId);
      localStorage.setItem('loggedUserName', userObj.nombre);
      // Disparar evento para que el Navbar actualice su avatar al instante
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('user-changed', { detail: { id: nuevoId, nombre: userObj.nombre } }));
    }
    navigate(`/usuario/${nuevoId}`);
  };

  if (cargando && !datosUsuario) {
    return (
      <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex justify-center items-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-[#DE6D5C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl font-semibold text-[#1C201C]">Cargando perfil de usuario...</p>
          </div>
        </div>
      </div>
    );
  }

  const isAlbumCompleto = totalCromos > 0 && (datosUsuario?.nCromos || 0) >= totalCromos;

  return (
    <div className="min-h-screen bg-[#FCF6DF] flex flex-col font-sans text-[#1C201C]">
      {/* 1. Menú Global */}
      <Navbar />

      {/* 2. Contenido Principal */}
      <div className="flex-grow flex flex-col items-center px-4 py-8 max-w-4xl mx-auto w-full">

        {/* Barra superior del perfil: Selector dinámico de usuario */}
        <div className="w-full max-w-2xl bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-6 shadow-sm border border-[#C1C69A]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">👤</span>
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Usuario activo
              </span>
              <span className="text-sm font-bold text-[#1C201C]">
                {datosUsuario?.nombre || 'Selecciona un usuario'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="user-select" className="text-xs font-medium text-gray-600 shrink-0">
              Cambiar:
            </label>
            <select
              id="user-select"
              value={currentUserId}
              onChange={(e) => handleCambiarUsuario(e.target.value)}
              className="w-full sm:w-auto bg-[#FCF6DF] hover:bg-white text-[#1C201C] font-semibold text-sm py-2 px-3 rounded-xl border border-[#C1C69A] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DE6D5C] cursor-pointer transition-all"
            >
              {usuariosDisponibles.length > 0 ? (
                usuariosDisponibles.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nombre} ({u.puntuacionUsuario} pts)
                  </option>
                ))
              ) : (
                <option value={currentUserId}>
                  {datosUsuario?.nombre || `Usuario #${currentUserId}`}
                </option>
              )}
            </select>
          </div>
        </div>

        {/* Avatar Centralizado */}
        <div className="flex flex-col items-center justify-center mt-2 mb-10">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#DE6D5C] rounded-full flex items-center justify-center text-white font-bold text-5xl mb-4 shadow-md border-4 border-white">
              {datosUsuario?.nombre ? datosUsuario.nombre.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="absolute bottom-4 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white" title="Usuario activo"></div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C201C]">
            {datosUsuario?.nombre}
          </h2>
          <span className="text-sm text-gray-600 font-medium mt-1">
            Jugador del Reto CAECV • ID #{currentUserId}
          </span>
        </div>

        {/* Grid de 4 Estadísticas */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-2">
          
          {/* Card 1: Puntos totales */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C1C69A]/30 flex flex-col justify-center transition-transform hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-3xl font-extrabold text-[#1C201C]">{datosUsuario?.puntuacionUsuario || 0}</span>
              <span className="text-2xl">⭐</span>
            </div>
            <span className="text-base font-bold text-gray-800">Puntos totales</span>
            <span className="text-xs text-gray-500 mt-0.5">Calculados a partir de tus cromos y potenciadores</span>
          </div>

          {/* Card 2: Progreso Álbum */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C1C69A]/30 flex flex-col justify-center transition-transform hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-3xl font-extrabold text-[#1C201C]">
                {datosUsuario?.nCromos || 0} / {totalCromos || '?'}
              </span>
              <span className="text-2xl">🃏</span>
            </div>
            <span className={`text-base font-bold ${isAlbumCompleto ? 'text-green-600' : 'text-gray-800'}`}>
              {isAlbumCompleto ? '¡Álbum completo!' : 'Progreso del álbum'}
            </span>
            <span className="text-xs text-gray-500 mt-0.5">Cromos únicos coleccionados</span>
          </div>

          {/* Card 3: Boss derrotados */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C1C69A]/30 flex flex-col justify-center transition-transform hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-3xl font-extrabold text-[#1C201C]">4</span>
              <span className="text-2xl">🪲</span>
            </div>
            <span className="text-base font-bold text-gray-800">Boss derrotados</span>
            <span className="text-xs text-gray-500 mt-0.5">Plagas y retos superados</span>
          </div>

          {/* Card 4: Racha */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#C1C69A]/30 flex flex-col justify-center transition-transform hover:scale-[1.01]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-3xl font-extrabold text-[#1C201C]">5 días</span>
              <span className="text-2xl">🔥</span>
            </div>
            <span className="text-base font-bold text-gray-800">Racha activa</span>
            <span className="text-xs text-gray-500 mt-0.5">Días consecutivos apoyando la huerta ecológica</span>
          </div>

        </div>

        {/* Enlace rápido a colecciones del usuario */}
        <div className="w-full max-w-2xl mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 px-2">
          <button
            onClick={() => navigate(`/dashboard/${currentUserId}/album`)}
            className="p-3 bg-white hover:bg-[#FCF6DF] border border-[#C1C69A] rounded-xl text-center font-bold text-sm text-[#1C201C] transition-all shadow-sm flex flex-col items-center gap-1"
          >
            <span>📖 Ver Álbum</span>
          </button>
          <button
            onClick={() => navigate(`/dashboard/${currentUserId}/potenciadores`)}
            className="p-3 bg-white hover:bg-[#FCF6DF] border border-[#C1C69A] rounded-xl text-center font-bold text-sm text-[#1C201C] transition-all shadow-sm flex flex-col items-center gap-1"
          >
            <span>⚡ Potenciadores ({datosUsuario?.nPotenciadores || 0})</span>
          </button>
          <button
            onClick={() => navigate(`/dashboard/${currentUserId}/batallas`)}
            className="col-span-2 sm:col-span-1 p-3 bg-white hover:bg-[#FCF6DF] border border-[#C1C69A] rounded-xl text-center font-bold text-sm text-[#1C201C] transition-all shadow-sm flex flex-col items-center gap-1"
          >
            <span>⚔️ Batallas</span>
          </button>
        </div>

        {/* Link a Datos Personales */}
        <div className="w-full max-w-2xl flex justify-end items-center mt-10 pr-4 cursor-pointer hover:opacity-70 transition-opacity">
          <span className="text-base sm:text-lg font-medium mr-2">Datos personales</span>
          <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" fill="transparent" stroke="black"/>
            <path d="M12 16l4-4-4-4" />
            <path d="M8 12h8" />
          </svg>
        </div>

      </div>
    </div>
  );
}
